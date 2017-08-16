## Titlebar Text
All Views by default have a Title bar defined and the text shown is controlled with the Views `titleText` property.

1\. Open the Home View: `src/Views/Home.js`.

2\. Find the `titleText` property and change it to read `Hello World!`:

    //Localization
    titleText: 'Hello World!',

3\. Save and refresh your browser.

![Toolbar Hello](img/toolbar-hello.png)

Upon refreshing you should the title text at the top change to Hello World!, this property provides the most basic way of setting the title.

## Adding a Toolbar Item

It's not much of a toolbar without a toolbar item!

1\. Go back to within `Home.js` and locate the `createToolLayout` function

2\. It currently is defining `this.tools` to be an object with the `tbar` key to an empty array

3\. The key `tbar` refers to the title bar and is explicitly setting it to have no items, but let's add a new object in that array

4\. Give that object the following properties: id, icon, title and action. Set to `myButton`, `content/images/icons/add_24.png`, `Hello` and `onHello` respectfully:

    createToolLayout: function() {
        return this.tools || (this.tools = {
            tbar: [{
                id: 'myButton',
                icon: 'content/images/icons/add_24.png',
                title: 'Hello',
                action: 'onHello'
            }]
        });
    },

5\. Add a new function to the view named `onHello` and have it show an alert box with a message:

    onHello: function() {
        alert('Hello Dave!');
    },

6\. Save and reload your app

![Adding Toolbar Item](img/toolbar-button.png)

You should now have a big green plus sign on the right hand side of your Titlebar, and on click it should run the `onHello` function. To go a bit deeper into each property:

    id: '', // a unique id for this item, will be used for referencing
    icon: '', // path to image to display
    title: '', // use for ARIA conformance
    action: '', // string of the function name of the current view to run on click
    fn: function, // instead of action you can point to a function to run directly, or define inline
    scope: object // the scope to call the fn function if defined, defaults to current view


## Toolbar Item Sided-ness
As noted in Adding a Toolbar, the new item automatically went to the right side -- what if we wanted it to be on the left?

1. Go back to your custom button and add a new property key `side` and set it to `left`:

    tbar: [{
       id: 'myButton',
       icon: 'content/images/icons/add_24.png',
       title: 'Hello',
       action: 'onHello',
       side: 'left'
    }]

2\. Save and reload

Since the Titlebar supports the `side` property it added the appropriate CSS class to move the toolbar item visually.

## Custom Markup
Since the Titlebar only supports icon-only items out the box you may wish to pass in your own markup to use. Note that in order for the toolbar item to function there needs to be a `button` element with `data-action="invokeTool"` and `data-tool="{%= $.id %}"`.

1\. In `Home.js` add a new property to the view itself called `textOnlyToolTemplate` and set it as:

    textOnlyToolTemplate: new Simplate([
        '<button class="button toolButton toolButton-{%= $.side || "right" %} {%= ($$.enabled) ? "" : "toolButton-disabled" %} {%= $.cls %}"',
                'data-action="invokeTool" data-tool="{%= $.id %}"',
                'aria-label="{%: $.title || $.id %}">',
            '<span>{%: $.text %}</span>',
        '</button>'
    ]),

2\. Then add the `template` property to your custom tool item and set it to `this.textOnlyToolTemplate`

3\. Also add the `text` property and set it to `Click`:

    tbar: [{
       id: 'myButton',
       icon: 'content/images/icons/add_24.png',
       title: 'Hello',
       action: 'onHello',
       side: 'left',
       template: this.textOnlyToolTemplate,
       text: 'Click'
    }]

4\. Save and reload.

The green plus should have disappeared and been replaced with the word `Click`. It should still show up on the left side and function as normal. The `template` property overrides the default Simplate used to define the tool item markup.

## Footer text
All the previous exercises have focused on the title bar, which derives from the `MainToolbar` class in `argos-template/src/Views/MainToolbar.js` (which in turn inherits MainToolbar from argos-sdk). The bottom footer bar on the other hand is defined in `argos-template/src/Views/FooterToolbar` and has slightly different properties - namely `copyrightText` and already supporting text in the items.

First we will change the copyright text:

1\. Open `argos-template/src/Views/FooterToolbar.js` and find the property `copyrightText`.

2\. Change it to read `Free for the world.`

    // Localization
    copyrightText: 'Free for the world',

3\. Save and reload

The text in the footer changed to our new string, notice however that the Views have no ties to the `copyrightText` as it is assumed the footer to be fairly static in regards to copyright.

## Footer items
The footer tool items, however, are customized just like the Title bar items are. Let's move our custom button down to the right side of the footer bar.

1\. Open `Home.js` and go to the `createToolLayout` function

2\. Set a new key to the `this.tools` object named `fbar` and set it to an empty array:

    return this.tools || (this.tools = {
        tbar: [/*snipped*/],
        fbar: []
    });

3\. Cut your tool item out of the `tbar` array into the `fbar` array

4\. Delete the `template` and `text` properties

5\. Change the `side` property to `right`

    return this.tools || (this.tools = {
        tbar: [],
        fbar: [{
            id: 'myButton',
            icon: 'content/images/icons/add_24.png',
            title: 'Hello',
            action: 'onHello',
            side: 'right'
        }]
    });

6\. Save and reload

Your tool item should now show up on the right side of the footer bar, with icon and text displayed. Notice that the footerbar default tool template uses the `title` property for setting text.
