Once you have an Edit View defined for an entity you will need to go back to the Detail and List view to point them in the right direction. This topic covers going from List to Edit.

1\. List views have the `insertView` property and that should point to the id of the view that will handle inserting entities of the same kind.

2\. Since the Insert button is a toolbar item it is defined in the `createToolLayout` function. Open up `argos-sdk/src/List.js` and go to it.

3\. Only one item is defined and its action is `navigateToInsertView`:

                'tbar': [{
                    id: 'new',
                    action: 'navigateToInsertView',
                    security: App.getViewSecurity(this.insertView, 'insert')
                }]

4\. Scroll down to the `navigateToInsertView()` function and we have this:

            navigateToInsertView: function(el) {
                var view = App.getView(this.insertView || this.editView);
                if (view)
                {
                    view.show({
                        returnTo: this.id,
                        insert: true
                    });
                }
            },

5\. The important part here is that it pulls the `insertView` property we fixed and that in the navigation options it is passing `{insert: true}`. To tell an Edit view that we are inserting a new entity we must pass that in the navigation options, many of the Edit view functions check against that value for determining to do a "INSERT" or "UPDATE" command, to request a $template for default values, if values are "dirty" by default and others.

6\. When the user presses the Save toolbar item in the Edit View it will perform an PUT (insert), collecting all the values and sending them as a new entity. On success a global event is published and the List view will be refreshed when returning to it.
