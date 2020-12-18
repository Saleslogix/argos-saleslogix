# End to End (e2e) Tests


The e2e test framework is a replacement for the selenium based automation framework. It uses mochajs.org for the test framework, Chaijs.com for assertions, and [playwright.dev](https://playwright.dev/) to automate the browser (Chromium, Firefox, and WebKit are supported).

## Getting started
  - Copy the .env.example file to .env and adjust the values for your environment
  - You can also set environment variables for each key/value pair in the .env file
      - The values set in your environment variables will NOT be overwritten by the .env file!
  - Run `yarn run e2e` to execute the tests
  - Run `yarn run e2e:debug` to show additional debug information (see the [debug](https://www.npmjs.com/package/debug) package for more information). This is a Powershell, windows only command.

## Filtering tests
npm/yarn allow you to pass in additional arguments to run scripts. This allows us to pass the MochaJS --grep argument to filter out what tests are executed. For example, to only execute Activity tests, run: `yarn run e2e -- --grep Activities`

## Common Gotchas
  Use cation when adjusting the Playwright slowMo setting (PLAYWRIGHT_SLOMO env). There are several views within the application that will dynamically adjust values as they are shown. This can result in timing issues where a test might work in slow motion, but not when set back to a default of 0. Try to capture the state of the element AFTER the view is shown and use that selector.

  Try to write the selectors manually like you would for CSS. Chrome's elements view has the ability to copy a selector, but it can result in long brittle selectors. For example, copying a selector for the "My Schedule" element in the left nav results in this: `#left_drawer > div > div.accordion.panel.inverse.has-icons > div.accordion-pane.is-expanded > div.accordion-header.no-icon.is-selected.hide-focus > a`, while doing this manually, we can compress it down into something like this: `#left_drawer a[data-view="myday_list"]`. Now if the DOM happens to change, the latter will be much less likely to break.
