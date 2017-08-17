Navigation is an important role in a single page app as it needs to not only handle showing/hiding but also the context and history.

All Views have an `id` property. Knowing the `id` enables you to get a references to that View, and therefore it's `show()` function for navigation.

This guide assumes you have completed [Argos-Template Guide](#!/guide/v2-template-guide). For all the exercises the id's of the views in argos-template are: `account_list`, `account_detail` and `account_edit`.

## Navigation Options
Navigation Options, or sometimes called View Options, is the object passed into the `show()` call that get stored into the views `options` property. Many Views have custom navigation options that they respond to and they will be covered under their respective help pages, for now let's try out passing `key` to a Detail View.

1\. Go back to the Home Screen, via refresh or pressing the Home button.

2\. Back in the javascript console type: `App.getView('account_detail').show({key: 'AGHEA0002677'})` and press enter.

3\. You are shown the Template Inc Detail entry. Press Back or Home.

4\. Now type in: `App.getView('account_detail').show({key: 'AA2EK0013031'})` and press enter.

5\. You are shown the Boilerplate Co Detail entry.

This is just one example of using navigation options to change the behavior of the new view being shown. In this case Detail Views look for the `key` property and make a data request for that key and shows the results in the Detail View.

## Inspecting Home Navigation
We've used the commands in the console window, but let's take a peek at the existing logic in `Home.js` and `MainToolbar.js` for their uses of the same command.

1\. Open `products\argos-template\src\Views\Home.js` in a text editor and find the `createLayout` function, ignore the top half and look for the for loop and the line where it's adding an object:

    visible.children.push({ ... });

2\. This line is adding each row and it's definition is very similar to tool items mentioned in the previous section. This structure will be a common recurring theme.

3\. Note that the `action` property is set to `navigateToView` and `view` is set to the Views `id` property (see where this is going?) - scroll up to the `navigateToView` function.

4\. NavigateToView is being passed `params` which has the `view` property pointing back to the views `id`. The rest of the code is the exact same command used in Exercise 1.

You may have used the Home button to return back to the main page, let's look at that next.

1\. Open `MailToolbar.js` and find where it is defining the `tools` variable in the `showTools` function:

    tools = (tools || []).concat([ ... ]);

2\. This line is appending the `back` and `home` tool items to every view

3\. Look at the `home` tool item definition at the `fn` property it's set directly to `navigateToHomeView`

4\. NavigateToHome View is defined near the bottom and it uses a shortcut `App.navigateToHomeView()`, which if you follow it to the definition it reads:


    navigateToHomeView: function() {
        var view = this.getView('home');
        if (view)
            view.show();
    },


5\. Which is the same code as before (as `this` is App).

Navigation within the app uses the same logic and commands that work from the console.

## Navigation History
One of the main usability issues with HTML5 based apps is the lack of history context, always taking you to the base page or using funny URLs to work around the problem. Argos-SDK has a complete solution into storing, loading and using the navigation history to the fullest extent.

1\. Open the app and click `Accounts` to be taken to the List View, then select an entry to be taken to the Detail View.

2\. Now go to your javascript console and type: `ReUI.context.history` and press return.

3\. Inspect the three objects within the array - it saves a lot of data about each page into the navigation history for context retrieval and navigation restoration.

4\. Back in the app, click the Home button.

5\. Run the same command in the console.

6\. Note that the history has been "cleaned" to only show the Home View. The management system keeps the history trimmed to only the relevant tree path to recreate the navigation state.

If you think of breadcrumbs (World > Politics > 2012 > Article#1) on a news site for example the same theory is applied to the navigation history, in order to get to Article#1 it needs the context information from each step to get back there. If you were to click World then it doesn't need to step all the way down then back up so all the history in between gets removed.
