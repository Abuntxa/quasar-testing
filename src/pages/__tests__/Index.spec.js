/**
 * @jest-environment jsdom
 */
import IndexPage from '../index'
import { mountPageComponent } from 'test-common'
import { LocalStorage } from 'quasar'

/**
 * Contains the tests of the page DashboardDesignerPage
 */
describe('Dashboard designer page tests', () => {
  let component
  let qLocalStorage
  let localStorageKey = 'definition'

  /**
   * Before each test we recreate the component loading the full tree
   */
  beforeEach(() => {
  // beforeAll(() => {

    let quasarPluginInstantiator = { $q: {} }
    LocalStorage.install(quasarPluginInstantiator)
    qLocalStorage = quasarPluginInstantiator.$q.localStorage
    // We create a basic dummy configuration
    let definition = [
      'Hello',
      ' ',
      'World!'
    ]
    // We use the quasar localStorage plugin to store the configuration
    // as it has a wrapper that allows serialization with types
    qLocalStorage.set(localStorageKey, definition)

    component = mountPageComponent(IndexPage, {}, true)
  })

  /**
   * After each test we will cleanup the shared state (localStorage)
   */
  afterEach(() => {
  // afterAll(() => {
    qLocalStorage.remove(localStorageKey)
  })

  /**
   * Tests if it is Vue instance.
   * The basic test to check if we managed to
   */
  it('passes the sanity check to see if at least is a Vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  /**
   * Tests if it is Vue instance.
   * The basic test to check if we managed to
   */
  it('passes the sanity check to see if at least is a Vue instance2 ', () => {
    expect(component.isVueInstance()).toBe(true)
  })
})
