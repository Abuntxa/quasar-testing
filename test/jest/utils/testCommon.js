import PortalVue from 'portal-vue'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import * as All from 'quasar'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, LocalStorage } = All //, date //quasar date library
// We import all available Quasar quasarComponents to make them available straight away to all tested quasarComponents.
// In the real instances the list of default quasarComponents is configured in the quasar.conf.js
const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

/**
 * Mounts a page component.
 * This methods initializes the component with the basic Quasar things initialized plus all extra
 * required elements of a QPage component with a SisteplantPage using vue portals
 * @param {QPage} componentPage The type of Page component to mount
 * @param {*} options The mounting options to be passed into the component. See: https://vue-test-utils.vuejs.org/api/options.html
 * @param {*} mountFullTree  Wether make a full tree mount or a shallow mount (optional: default shallowMount)
 * @returns The Vue testing wrapper of the component. See: https://vue-test-utils.vuejs.org/api/wrapper/
 */
export const mountPageComponent = (componentPage, options, mountFullTree)=>{
  let mountingOptions = {
    // Injections for quasarComponents with a QPage root Element
    provide: {
      pageContainer: true,
      layout: {
        header: {},
        right: {},
        footer: {},
        left: {},
        scroll: {}
      },
      ...options
    }
  }
  return mountComponent(componentPage, mountingOptions, mountFullTree, [ PortalVue ])
}

/**
 * Mounts a component.
 * This methods initializes the component with the basic Quasar things initialized
 * @param {Vue} component The component to be tested
 * @param {*} options The mounting options to be passed into the component. See: https://vue-test-utils.vuejs.org/api/options.html
 * @param {boolean} mountFullTree Wether make a full tree mount or a shallow mount (optional: default shallowMount)
 * @param {Array<PluginObject>} The collection of plugins to use in the local vue instance
 * @returns The Vue testing wrapper of the component. See: https://vue-test-utils.vuejs.org/api/wrapper/
 */
export const mountComponent = (component, options, mountFullTree, vuePlugins) => {
  let localVue = createLocalVue()
  let $t = () => {}
  //We use all passed vue plugins
  if (vuePlugins){
    for(let i=0; i< vuePlugins.length; i++){
      localVue.use(vuePlugins[i])
    }
  }
  // Here there should be added all quasarComponents, plugins and directives added through quasar.conf.js
  localVue.use(Quasar, { components, plugins: { LocalStorage } }) // , lang: langEn

  let mountingOptions = { localVue, mocks: { $t }, ...options }
  if (mountFullTree) {
    return mount(component, mountingOptions)
  } else {
    return shallowMount(component, mountingOptions)
  }
}
