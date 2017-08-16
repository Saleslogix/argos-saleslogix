This topic will cover creating a new record via Edit as Insert. The Edit View is a dual-purpose in that in serves as creating new records as well as updating existing records, both have unique data flows and properties.

To signify we are inserting when creating the navigation options in the previous view add `insert: true`. This will then be stored into `this.inserting` of the Edit view.

## Function Order Overview
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

## Functions in Detail
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

   Since we are inserting it then checks to see if `this.options.template` is defined. If it is then `processTemplateEntry` is immediately called with the passed template. If not then `requestTemplate` is called.

* `requestTemplate()` - creates a request via `this.createTemplateRequest()` and calls `request.read()` sending success to `onRequestTemplateSuccess` and failures to `onRequestTemplateFailure`.

* `createTemplateRequest()` - an `Sage.SData.Client.SDataTemplateResourceRequest` is created using the following properties:

   * `this.resourceKind` => `request.setResourceKind`
   * `this.querySelect` => `request.setQueryArg`
   * `this.queryInclude` => `request.setQueryArg`

* `onTransitionTo()` - fires

* Navigation state is cleaned up and saved to local storage

* `onRequestTemplateSuccess()` - is passed with the template and simple passes it on to `processTemplateEntry`, meeting up with if we had passed a template via navigation options.

* `processTemplateEntry(template)` - first it calls `convertEntry(template)` and saves it to `this.templateEntry` then it calls `setValues(templateEntry)`, then `applyFieldDefaults()`, next `applyContext()`, and lastly it checks to see if `this.options.changes` is defined and calls `setValues(changes)`. It also removes the `panel-loading` class defined earlier once all values are set.

* `convertEntry(template)` - this loops over the entry and converts any stringified dates to a javascript date object.

* `setValues(values)` - it loops over the `this.fields` if the field is hidden (by checking `field.isHidden()`) it is skipped. If a field has `applyTo` defined it tries to get the `applyTo` property out of the supplied `values`, else it tries the `field.property` (or `field.name` if property is not defined). If a value is found it is then applied to the field via `field.setValue(value, true)` meaning it is an initial - "clean" value.

* `applyFieldDefaults()` - loops over the fields again checking to see if the field has `"default"` defined and if it does, apply it to the field via `field.setValue(defaultValue, true)`.

* `applyContext()` - empty, but an Edit view will typically provide this function and query the navigation history to see if the previous view has data that would apply to this view.

* Edit View is now finished loading and is fully interactive.

## Properties
* `this.fields` - object where each key is a fields `name` and the value being the corresponding field.
* `this.options` - the navigation options, where you will find `entry`, `template`, `changes`, `insert`, and other values to base decisions off of.
* `this.templateEntry` - if a template was requested it will be stored here.
* `this.domNode` - the main `<div>` element of the Edit View.
