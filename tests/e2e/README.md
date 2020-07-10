# End to End (e2e) Tests


The e2e test framework is a replacement for the selenium based automation framework. It uses mochajs.org for the test framework, Chaijs.com for assertions, and [playwright.dev](https://playwright.dev/) to automate the browser (Chromium, Firefox, and WebKit are supported).

## Getting started
  - Copy the .env.example file to .env and adjust the values for your environment
  - You can also set environment variables for each key/value pair in the .env file
      - The values set in your environment variables will NOT be overwritten
  - Run `yarn run e2e` to execute the tests
  - Run `yarn run e2e:debug` to show additional debug information (see the [debug](https://www.npmjs.com/package/debug) package for more information). This is a Powershell, windows only command.

## Filtering tests
npm/yarn allow you to pass in additional arguments to run scripts. This allows us to pass the MochaJS --grep argument to filter out what tests are executed. For example, to only execute Activity tests, run: `yarn run e2e -- --grep Activities`
