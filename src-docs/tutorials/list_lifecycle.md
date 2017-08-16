Of the three base views List data is the easiest to understand with a clear cut refresh, clear, request, process cycle.

## Function Order Overview
* `show(options)`
* `refreshRequiredFor(options)`
* `beforeTransitionTo()`
* `clear()`
* `transitionTo()`
* `configureSearch()`
* `_loadPreviousSelections()`
* `refresh()`
* `requestData()`
* `createRequest()`
* `onRequestDataSuccess(feed)`
* `processFeed(feed)`
* `hasMoreData()`

* `_onRefresh()`

## Functions In Detail
* The List view is being shown via `view.show(options);`

* `refreshRequiredFor(options)` is called and checks the option values vs the current values for the following properties:
   * stateKey
   * where
   * query
   * resourceKind
   * resourcePredicate

   If any property does not match, then refreshRequired is set to true.

* `beforeTransitionTo()` is called and it does the following:
   * Show/Hide search bar based on `this.hideSearch` or passed via options
   * Show/Hide selectors if selections are enabled
   * Sets `useSingleSelection` mode based on options
   * Sets `enableActions` based on options, show/hide actions and force singleSelection if true
   * if `refreshRequired` is true, call `clear()`, else just clear the selection model

* `clear()` if called clears the following properties:
   * _selectionModel
   * entries
   * feed
   * query
   * calls searchWidget.clear()
   * replaces all `listContent` DOM nodes with the `loadingTemplate`

* CSS Transition happens

* `transitionTo()` is called and does the following:
   * calls `configureSearch()` which passes the hashtags and formatter function to the searchWidget
   * calls `_loadPreviousSelections()` which attempts to load any saved selection data back into the selectionModel
   * if `refreshRequired` is true it sets it to false and calls `refresh()`

* `refresh()` is called, and it calls `requestData()`

* `requestData()` adds the loading CSS class, create a SData request via `createRequest()`, executes the query passing in callbacks

* `createRequest()` creates a `Sage.SData.Client.SDataResourceCollectionRequest`, for properties it first looks for them in the navigation options, then the view itself. If a property is not defined in either then that property is not set. It looks for the following properties:
   * pageSize
   * contractName
   * resourceKind
   * resourceProperty
   * resourcePredicate
   * querySelect (options.select)
   * queryInclude (not available via options)
   * queryOrderBy (options.orderBy)
   * queryWhere (options.where)
   * query (not available via options)

   queryWhere and query will be joined via ` and `.

* The request was passed three callbacks for the following states: success, failure and aborted. The handlers are: `onRequestDataSuccess()`, `onRequestDataFailure()` and `onRequestDataAborted()`.

* If request fails `onRequestDataFailure()` is called and an alert is shown, response added to ErrorManager and loading CSS removed.

* If the request is cancelled `onRequestDataAborted()` is called and sets `this.options` to false which forces refreshRequired to be true on next `show()`, adds the response to the ErrorManager and removes the loading CSS.

* If the request succeeds `onRequestDataSuccess()` is called and it calls `processFeed()` with the response and removes the loading CSS.

* `processFeed()` is called with the full SData response and does the following:
   * stores the response into `this.feed`
   * if `feed.$totalResults` is 0, set the noDataTemplate
   * loop `feed.$resources`
      * extract the `$descriptor` and `$key` from each $resource item
      * store the item into `this.entries{}` using the item $key
      * apply the `rowTemplate` using the item for `$` and view for `$$`
      * place all markup at once into `this.contentNode`
   * Set the amount of rows remaining text using the following equation:
      `$totalResults - $startIndex + $itemsPerPage - 1`
   * Call `hasMoreData()` to toggle the `list-has-more` CSS class (which shows the Request Next X Items button)

* `hasMoreData()` returns true if `$startIndex + $itemsPerPage <= $totalResults`

List Views subscribe to the global `/app/refresh` event and connect it to `_onRefresh()` where it checks if the message object has the `resourceKind` property and if it does and it matches the List Views' resourceKind set `refreshRequired` to true. This is how List Views knows to refresh when an Edit View performs a save.

##Important View Properties

**this.feed** - during `processFeed()` the entire SData response is stored to this.feed.

**this.entries** - also during `processFeed()` each entry is stored to the `entries: {}` object where the $key of the entry is the key in `this.entries`.

**this.options** - during `show()` the navigation options are stored after calling `refreshRequiredFor`.
