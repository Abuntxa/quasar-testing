# Quasar App Testing Demo

The aim of this repo is to show the problems I was having in the instantiation of the components for testing purposes.

To reproduce the problems. run:
> npm run test:unit

To see the tests passing uncomment/comment the beforeEach for beforeAll and afterEach for afterAll; and run again:
> npm run test:unit

## How has the project been created?

### Create the basic project

The project has been created using the v1.0 quasar-cli
> quasar create quasar-testing -b dev

Installed features:
* ESLint
* Axios
* Vue-i18n

Package manager used:
* Yarn

Added testing support
> quasar ext add @quasar/testing

Testing harnesses to install:
* Jest Unit testing

Jest additional options:
* Extra scripts in package.json
* SFC webpack \<test> loader

I have saved in a single commit the initial setup

### Modify the basic testing project

Then I have made the basic changes to reproduce the problem:

1. Added my testing helper code.
> test\jest\utils\testCommon.js
2. Added dependency with portal-vue (so that my testing helper code is exactly the same as here).
> yarn add portal-vue
2. Modified the default page with dummy code to be tested making use of a quasar plugin (localStorage on mount event) to have a clearer error.
> src\pages\Index.vue
3. Created the test of the dummy code where it's just tested the correct instantiation of the component.
> src\pages\__tests__\Index.spec.js
4. Modified jest configuration for easy access to my testing helper code and so that jest detects the location of my new test.
> jest.config.js
