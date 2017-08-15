#How List Search Works
By default all List views have a built in search bar that lets the user search for more records. This topic will first cover hiding/showing the bar and then into the specifics of what happens when a user types in a query and presses search.

##Hiding Search
Since the default is to show a search we will turn it off in a view then turn it back on. We will use the Account List view made in [Argos-Template Guide](#!/guide/v2_template_guide).

1\. Open `argos-template/src/Views/Account/List.js`.

2\. Add the property `hideSearch` (around where id and querySelect are) and set it to `true`:

        hideSearch: true,

3\. Save, open your app and navigate to the Account List view -- no more Search bar! You could also accomplish the same feat by setting the property `enableSearch` to `false`, but that means it not even add a search widget to your view. HideSearch adds/removes a CSS class that changes the display so it is technically still there as you may want to show it at a later time.

4\. Go back and either remove `hideSearch` or set it to false. Save your app and go ahead and check that it now shows up.

##Manipulating the Expression
When a search is performed it does a new SData request using the text from the user as the `where=` clause of the current entity url. Typically you want to insert the text into some sort of expression for the server to process.

1\. Open `argos-template/src/Views/Account/List.js`.

2\. Add a new function named `formatSearchQuery`. It is passed the text the user typed in and should return the final modified where expression:

    formatSearchQuery: function(searchText) {
        return searchText;
    },

3\. Be aware that there is a helper function {@link List#escapeSearchQuery escapeSearchQuery} that takes a double quoute `"` and makes into a double double quoute `""`.

4\. Example HQL expression for AccountName:

    formatSearchQuery: function(searchQuery) {
        return string.substitute('AccountName like "${0}%"', [this.escapeSearchQuery(searchQuery)]);
    }


##View to Search Widget Relationship
Each List View has a property named `searchWidget` and it is set to an instance of a dijit widget that implements: widgetTemplate, onSearchExpression, and configure.

1\. Open `argos-sdk/src/List.js` and scroll down to the `postCreate()` function. A large block of it is within `if (this.enableSearch) {}` everything in there is creating an instance, hooking it up and placing it into the List views DOM. In particular look at these lines:

                    this.searchWidget = this.searchWidget || new searchWidgetCtor({
                        'class': 'list-search',
                        'owner': this,
                        'onSearchExpression': lang.hitch(this, this._onSearchExpression)
                    });
                    this.searchWidget.placeAt(this.searchNode, 'replace');

2\. The key here is that when the search widget fires its `onSearchExpression` the List Views `_onSearchExpression` also fires and will receive the same arguments. Meaning the search widget itself handles everything until the very end then calls `onSearchExpression` which we know is being listed to. Scroll down to `_onSearchExpression` and you will find:

            _onSearchExpression: function(expression) {

                this.clear(false);
                this.queryText = '';
                this.query = expression;

                this.requestData();
            },

3\. Which takes the result (`expression` being passed in), clears the view empties any pre-existing queryText, sets `this.query` to the result and calls `requestData()` which starts the request-handle success-render feed process.

4\. The last part that the List View does is in the `startup()` function which runs when the application is being initialized:

                if (this.searchWidget)
                    this.searchWidget.configure({
                        'hashTagQueries': this._createCustomizedLayout(this.createHashTagQueryLayout(), 'hashTagQueries'),
                        'formatSearchQuery': lang.hitch(this, this.formatSearchQuery)
                    });

5\. This is where the `configure()` comes into play, it passes in the views hashtags and format search function so that this views instance of the search widget is now "configured" for this view.


##Search Widget
The final piece is the search widget itself, the one provided out of the box is located at `argos-sdk/src/SearchWidget.js` and has a processor for hashtags and using the configured formatter for the remaining text.

1\. Open up `argos-sdk/src/SearchWidget.js` and let's go through the interesting properties:

`widgetTemplate` - Simplate that describes the markup. This markup will be placed at the top of the list view (look for the searchNode in the List Views widgetTemplate.

`searchText` - Watermark text placed inside the search box and also the text inside the search button.

2\. The flow of the search widget goes:

   * User clicks Search button, onClick fires which is attached to `search()`
   * Search is called, determines if there are hashtags or custom tags and calls their respective handlers
   * calls `onSearchExpression()` with the result of the handler
   * (which is being listened to by the View, saves the result and calls requestData())

###Result
Use the hideSearch property to show/hide the search bar. Each List View uses a Search Widget which is definable and acts upon the resulting expression in `_onSearchExpression()`. The view uses the expression to make an entirely new data call and processes the results. The search widget is entirely self contained with its own markup, events, etc needing only to implement a few details to be configured for each view.