#Wiring Detail to Edit View
Once you have an Edit View defined for an entity you will need to go back to the Detail and List view to point them in the right direction. This topic covers going from Detail to Edit

1\. Detail Views have a property named `editView` that is used to point to the correct view id upon clicking the Edit toolbar button.

2\. The Edit button is a toolbar item and is defined in the `createToolLayout` function. Open up `argos-sdk/src/Detail.js` and find the definition.

3\. Only one item is defined and its action is `navigateToEditView`:

           'tbar': [{
                 id: 'edit',
                 action: 'navigateToEditView',
                 security: App.getViewSecurity(this.editView, 'update')
            }]

4\. Scroll down to the `navigateToEditView()` function and we have this:

            navigateToEditView: function(el) {
                var view = App.getView(this.editView);
                if (view)
                    view.show({entry: this.entry});
            },

5\. The important part here is that it pulls the `editView` property and that in the navigation options it is passing `{entry: this.entry}`. To pass data to an Edit view, use the `entry` keyword and pass the entire entry (in Detail views it is stored as `this.entry`).

6\. When the user presses the Save toolbar item it will perform an UPDATE to the passed entry, it detects this by checking if we passed `{insert: true}` in the nav options, since we did not pass that, it performs the PUT update. If we did pass that in (like in [Wire List to Edit](https://github.com/Saleslogix/argos-template/wiki/Wire-List-to-Edit)) it will do an POST insert.
