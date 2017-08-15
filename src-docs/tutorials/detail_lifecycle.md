#Detail Data Life Cycle
The Detail View has a simplistic data process, namely that it re-constructs itself every time a new key is passed - completely refreshing everything.

##Function Order Overview
* `show(options)`
* `onShow()`
* `refreshRequiredFor(options)`
* `ReUI.show()`
* `_onLoad(evt, el, o)`
* `load()`
* `App._beforeViewTransitionTo(view)`
* `beforeTransitionTo()`
* `clear()`
* Transition
* `App._viewTransitionTo()`
* `getTools()`
* `createToolLayout()`
* `transitionTo()`
* `refresh()`
* `requestData()`
* `createRequest()`
* `onTransitionTo()`
* Navigation Saved
* Add loading spinner
* `onRequestDataSuccess(entry)`
* `processEntry(entry)`
* `createLayout()`
* `processLayout(layout, entry)`
   * any `onCreate()` defined
* Remove loading spinner

* `_onRefresh()`

##Functions In Detail

* `show(options)` - when a Detail view is being navigated to it must pass in the options `key` and optionally `descriptor`. Key will be used in the SData query as the resource predicate and `descriptor` will be set as the top toolbar title. Instead of `descriptor` you may also pass `title` to accomplish the same thing. The options will be stored into `this.options` after onShow and refreshRequiredFor are called.

* `onShow` function fires.

* `refreshRequiredFor(options)` this function determines if the Detail view needs to be refreshed. Namely it checks for the navigation options and if present then for the `options.key` and if it does not match the current `this.options.key` then to return true which sets `this.refreshRequired` to true.

* ReUI now kicks in to handle the transition and navigation history handling. To help handle history the view passes the result of `getTag` and `getContext`, the tag will be the unique identifier ($key) and the context will be JSON-serialized and stored into local storage. Context consists of `this.options`, `this.resourceKind`, `this.options.key` and `this.options.descriptor`. All of it is stored so when a user opens the app it can fully recreate the navigation path with all the options.

* `onLoad` is called which disconnects the `this._loadConnect` and calls `this.load()`

* `load()` is fired.

* `App._beforeViewTransitionTo(view)` this is at the Application (window.App) level and it handles calling the before transition functions and it clears out all the toolbars.

* `onBeforeTransitionTo()` is fired, this function is where you will see several views using to do things before the view is shown acting upon `this.options` and before any data is requested. 

* `beforeTransitionTo()` is function used internally, and it checks if `this.refreshRequired` is true and if so calls `this.clear()`.

* `clear()` as the name suggests empties the content `<div>` and applies the `this.emptyTemplate` passing the view as `$`.

* ReUI applies CSS transition effect

* `App._viewTransitionTo()` handles all ReUI transitionTos and first gets the tools from a) `view.options.tools` or from `view.getTools()` or sets to blank `{}`. The tools are then passed to each toolbar by calling the toolbars `showTools(tools)` function.

* `getTools()` this calls `this.createToolLayout()` and passes the result to the customization engine for the tools header.

* `createToolLayout()` - this should define and return `this.tools` which is an object where the keys are the names of the toolbars and the values are array of toolbar item definitions.

* `transitionTo()` the transition effect has now finished and you will see an empty Detail screen. This functions checks if `this.refreshRequired` is true and if it is, sets it to false and calls `this.refresh()`.

* `refresh()` if the user somehow got pass the initial security check (before `show()`) another check is done and if it fails the `this.notAvailableTemplate` is applied and nothing else happens. Otherwise it calls `this.requestData()`

* `requestData()` first sets the `panel-loading` class on the main container, creates a request via `this.createRequest()` and calls `request.read()` binding a successful request to `this.onRequestDataSuccess()`, failure to `this.onRequestDataFailure()` and aborted to `this.onRequestDataAborted()`.

* `createRequest()` creates an `Sage.SData.Client.SDataSingleResourceRequest` using the service defined in `configuration/development.js` (or production.js if running a compiled version). Without going into too much detail it will apply the following properties to the request:

   * `this.options.key` -> setResourceSelector
   * `this.resourceKind` -> setResourceKind
   * `this.querySelect` -> setQueryArg
   * `this.queryInclude` -> setQueryArg
   * `this.queryOrderBy` -> setQueryArg
   * `this.contractName` -> setContractName
 
* `onTransitionTo()` fires

* Navigation state is cleaned up and saved to local storage

* Data request is loading, user see's spinner from the `panel-loading` css.

* `onRequestDataSuccess(entry)` we get a response back, `this.processEntry` is called passing the response and `panel-loading` class is removed.

* `processEntry(entry)` stores the entry into `this.entry`, if entry is null it empties the detail content otherwise it calls `this.processLayout` passing the result of the customization engine which calls `this.createLayout()` first.

* `createLayout()` this is where the definition for `this.layout` is defined which is an array of sections that have children of rows.

* `processLayout(layout, entry)` this is the layout engine for detail views and is out of scope for this guide but to cover the key points: 
   * `children` property signifies current object is a "section" and to then iterate over the children
   * `include/exclude` if defined and opposite of their meaning then the row/section will not be processed at all and it will continue to the next object.
   * section and row elements are placed into the DOM as they are defined. Any `onCreate` callbacks are kept and then called after everything is in the DOM and is called within the scope of the Detail view.


* `_onRefresh()` all Detail views subscribe to the global `/app/refresh` event and this function is called. If the global event message has a `key` defined and it matches the current `this.options.key` then it means this Detail views object was changed and we need to reload it. It sets `this.refreshRequired` to true and if the message has `descriptor` defined it will now use that as the top title.

##Important View Properties

* `this.options` - navigation options this view was shown with
* `this.entry` - the response from SData for this view