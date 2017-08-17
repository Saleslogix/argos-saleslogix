List Views may have what is called List Actions. Basically it treats every row as an actionable item so that tapping that row's icon displays a context-sensitive action ribbon below that row. As an example you may have a List view of Service Tickets, you could then define a list action bar with actions like "Close Ticket", "Delete Ticket" and "Call Customer".

The context-sensitive portion refers to the fact that the actions will have access to that rows data, most importantly the $key of that row.

## Layout
Defining List Actions is very similar to toolbars and layouts for views, it takes place within the `createActionLayout()` function and it returns and defines the `this.actions` array:

    createActionLayout: function() {
        return this.actions || (this.actions = [ /* action objects /* ]
        );
    }

## Action Objects
The action objects that describe each action button are, again, similar to toolbar objects:
```javascript
    {
        id: 'edit',
        icon: 'content/images/icons/edit_24.png',
        label: this.editActionText,
        enabled: this.isEditEnabled,
        action: 'navigateToEditView',
        /* fn: this.navigateToEditView or you can define a fn instead of action */
    }
```
* `id` - the unique identify for the action.
* `icon` - path to the icon to be used.
* `label` - the text shown below the icon.
* `enabled` - determines the enabled/disabled state. Can be `true/false` or a function that returns `true/false`.
* `fn` - Function to be called. It will be passed `(action, selection)` where:
   * `action` is the action object defined
   * `selection` is the selected object and you will mainly want `selection.data` for the row context.
* `action` - String name of the views function to be called on click. This is a shortcut instead of `fn: this.functionName`. See `fn` for the parameters passed.
* `template` - Simplate to be used instead of the List views `listActionItemTemplate` property.
* `security` - String or function. If defined it will be passed to the `App.hasAccessTo()` where that string will be compared to the array of secured actions. If it is not found in that list it will return false and the action object will be disabled (unless the array of actions is empty, in which it returns true for all `hasAccessTo` requests).
* `scope` - object, if defined and has `fn` defined the `fn` function will be invoked with the `scope` as the `this` property of the function. If not defined it will use the current view as the scope.

## Enabling List Actions
Even with `createActionLayout` defined there are still two flags to be on the List view in order to enable action items to be display:

* `allowSelection` to `true`; and
* `enableActions` to `true`.

The first flag lets the view know that when a row is clicked it is making a selection and to keep track of any selections made. The second flag signifies that this view has actions and it adjusts various CSS classes to show the icon next to each row.

These two flags can also be sent via navigation options to the list views to disable/hide the actions. This is used in all lookup fields because when making a selection it should show these actions.
