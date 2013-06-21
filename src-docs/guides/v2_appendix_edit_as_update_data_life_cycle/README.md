#Edit as Update Data Life Cycle
This topic will cover editing an existing record. The Edit View is a dual-purpose in that in serves as creating new records as well as updating existing records, both have unique data flows and properties.

When creating the navigation options in the previous view you have two ways to signal we are Updating an existing record:

1\. Pass in `options.entry` as the entry to update.

2\. Pass in `options.key` which will then be used to request the entry from SData and then applied as initial data.

##Function Order Overview
* `show(options, transition options)`
* `onShow()`
* `refreshRequiredFor(options)`
* `getTag()`
* `getContext()`
* `ReUI.show()`
* `load()`
* `App._beforeViewTransitionTo(view)`
* `onBeforeTransitionTo()`
* Transition happens
* `App._viewTransitionTo()`
* `getTools()`
* `createToolLayout()`
* `transitionTo()`
* `refresh()`
* `clearValues()`
* `requestTemplate()`
* `createTemplateRequest()`
* `onTransitionTo()`
* Navigation state applied and saved
* `onRequestTemplateSuccess()`
* `processTemplateEntry(template)`
* `convertEntry(template)`
* `setValues(values)`
* `applyFieldDefaults()`
* `applyContext()`

##Functions in Detail
* `show(options, transition options)` - show is called with the navigation options, first it fires `onShow()` then checks to see if `refreshRequiredFor(options)` is true and sets `this.refreshRequired = true` if it is. Then it saves the nav options to `this.options` and sets the title bar to `options.title` if present. Lastly it calls `ReUI.show()` passing the transition options. `this.getTag()` and `this.getContext()`.

* `onShow()` - fired.

* `refreshRequiredFor(options)` - If options were passed it returns true - unless the `options.key` matches `this.options.key` in which case it returns false.

* `getTag()` - returns empty.

* `getContext()` - returns an object with resourceKind set to `this.resourceKind`, insert set to `true` and key set to false.

* `ReUI.show()` - ReUI will now handle the transition.

* `load()` - fires.

* `App._beforeViewTransitionTo(view)` this is at the Application (window.App) level and it handles calling the before transition functions and it clears out all the toolbars.

* `onBeforeTransitionTo()` is fired, since `this.options.inserting` is true it will add the `panel-loading` class to the View which shows a spinner.

* ReUI applies CSS transition effect

* `App._viewTransitionTo()` - handles all ReUI transitionTos and first gets the tools from a) view.options.tools or from view.getTools() or sets to blank {}. The tools are then passed to each toolbar by calling the toolbars showTools(tools) function.

* `getTools()` - this calls this.createToolLayout() and passes the result to the customization engine for the tools header.

* `createToolLayout()` - this should define and return this.tools which is an object where the keys are the names of the toolbars and the values are array of toolbar item definitions.

* `transitionTo()` - the transition effect has now finished and you will see an empty Detail screen. This functions checks if this.refreshRequired is true and if it is, sets it to false and calls this.refresh().

* `refresh()` - All the magic happens here for Edit views. First it clears the following properties:

   * `this.entry`;
   * `this.changes`;
   * `this.inserting` - to `this.options.insert` or false; and
   * calls `clearValues()` which loops through all the `this.fields` and calls there `field.clearValue()`.

   Now it checks if we have a passed entry via `this.options.entry` and if we do to call `processEntry(entry)` and then check for changes and call `setValues(changes)` as dirty data. If instead we were passed a key via `this.options.key` we make a request: `requestData()`.

* `requestData()` - creates a request via `this.createRequest()` and calls `request.read()` sending success to `onRequestDataSuccess` and failures to `onRequestDataFailure`.

* `createRequest()` - an `Sage.SData.Client.SDataSingleResourceRequest` is created using the following properties:

   * `this.entry['$key'] or this.options['key']` => `request.setResourceSelector`
   * `this.contractName` => `request.setContractName`
   * `this.resourceKind` => `request.setResourceKind`
   * `this.querySelect` => `request.setQueryArg`
   * `this.queryInclude` => `request.setQueryArg`
   * `this.queryOrderBy` => `request.setQueryArg`

* `onTransitionTo()` - fires

* Navigation state is cleaned up and saved to local storage

* `onRequestDataSuccess(entry)` - is passed with the entry and simple passes it on to `processEntry`, then it applies `this.options.changes` as modified data. Now it meets up as if we had passed an entry via navigation options.

* `processEntry(entry)` - sets `this.entry` to the entry and calls `setValues(changes, true)` (unmodified data) and removes the `panel-loading` set earlier.

* `setValues(values, initial)` - it loops over the `this.fields` if the field is hidden (by checking `field.isHidden()`) it is skipped. If a field has `applyTo` defined it tries to get the `applyTo` property out of the supplied `values`, else it tries the `field.property` (or `field.name` if property is not defined). If a value is found it is then applied to the field via `field.setValue(value, true)` meaning it is an initial - "clean" value.

* Edit View is now finished loading and is fully interactive.

##Properties
* `this.fields` - object where each key is a fields `name` and the value being the corresponding field.
* `this.options` - the navigation options, where you will find `entry`, `template`, `changes`, `insert`, and other values to base decisions off of.
* `this.entry` - the entry, either requested or the passed in options.
* `this.domNode` - the main `<div>` element of the Edit View.
