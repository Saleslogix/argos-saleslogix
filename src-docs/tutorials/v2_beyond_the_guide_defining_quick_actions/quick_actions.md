#Defining Quick Actions
Quick Actions are special row objects in a Detail view that instead of display a label and read-only text it has: icon, header, description and upon clicking performs an action. This is very similar to toolbar items but is placed in Detail View itself.

##Adding a Simple Quick Action
Let's add a simple quick action that opens the Account Address in a Google Maps window. If you have completed Advanced Detail: Value/OnCreate then you will need to adjust the following options rather than add them.

1\. Open `argos-template/src/Views/Account/Detail.js` and in `querySelect` add the property `Address/FullAddress`.

2\. In `createLayout()` add a new section to the layout with the following:

                return this.layout || (this.layout = [{
                    title: this.actionsText,
                    list: true,
                    cls: 'action-list',
                    name: 'QuickActionsSection',
                    children: []
                },{

3\. We have a new property `list`, if this is set to true it uses the "list" versions of the HTML markup where it uses `<li>` instead of `<div>` for the container. The corresponding Detail View properties are: `actionTemplate` for list and `actionPropertyTemplate` for non-lists.

4\. Add a new row object in our new section `children` with the following (if you already have a `Account/$key` row, move it up into this section with the following properties):

    {
        name: 'ViewAddressAction',
        property: 'Address/FullAddress',
        label: this.viewAddressText,
        icon: 'content/images/icons/srch_24.png',
        action: this.viewAddress
    }

5\. Now define the function `viewAddress()` it gets passed the entry and the value. It should open a new window pointing to google maps using the provided value:

    viewAddress: function(entry, value) {
       var url = string.substitute("http://maps.google.com/maps?q=${0}", [value]);
       window.open(url);
    },

6\. Lastly, add the strings for localization:

    actionsText: 'Quick Actions',
    viewAddressText: 'View address',

7\. Save and run your App. Your Account Detail views now have a Quick Action that opens up google maps for the accounts address.

We've added a simple Quick Action that uses the basic properties - just remember that all row objects support the same base set of properties so you can use things like: provider, cls, enabled/disabled, renderer etc to further enhance the usability of the action.