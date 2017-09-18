Argos-SDK uses Dojo's AMD loader system for defining modules, declaring "classes" and loading said modules.

AMD stands for Asynchronous Module Definition which means that you define all your parts into separate files and when your page loads it loads asynchronously only the modules it needs to display that page.

Concretely you get:

* Automatic dependent components being loaded first, no more "Oh, you need to include this script before that script...";
* Faster loading as the loader runs asynch and handles all the tricky queuing and waiting;
* Away from giant objects like `dojo` or `$` that contain a myriad of functions; and
* Easier to locate usage, with explicit dependencies you can quickly call up what modules are in use.

## Define
All modules will be wrapped in a `define()` statement. For the purposes of argos-template it will always use the following skeleton:
```javascript
    define( /*Path To File*/ ,
    ['Array of dependencies to require'], function(
    /*the returned object of each dependency*/
    ) {
    return {}; // the object that this module defines, to then be required in other modules
    });
```
An example:
```javascript
    define('Sage/Platform/Mobile/Format', [
        'dojo/_base/lang',
        'dojo/string'
    ], function(
        lang,
        string,
    ) {
        return lang.setObject('argos.Format', { ... });
    });
```
At first glance the paths don't quite look like paths, you can setup shortcuts to your folder structure in your `index-dev.html` file to point to libraries or setup a namespace etc.

Breaking this down, this file should will be loaded from: `../../argos-sdk/src/Format.js'.
It see's that it requires the two files: 'lang.js' and 'string.js' from the dojo library so it goes and loads those, and their dependencies (and so on), once `lang` and `string` are loaded and initialized then our `Format` module is started and is passed in the result of those two files into the function.

Now we are within the `{ }` which can be considered "private". Things defined here are only ran once during the loading process and if the return object does not expose them they are no longer accessible.

In this case we are returning a global object with some various properties. So if another module adds this `Format` module as a dependency the object that is passed to their function will be the object `argos.Format`.

It is important to note that the loader only initializes each module once and it passes the references to any module that needs it.

##Declare
The example above used `lang.setObject()` to set a global object, however, in most cases you will use `declare` which sets up a factory-like class where you would use the `new` keyword to create instances of.

Meaning if you have this:
```javascript
    define('Mobile/Template/Views/Account/List', [
        'dojo/_base/declare',
        'dojo/string',
        'Sage/Platform/Mobile/List'
    ], function(
        declare,
        string,
        List
    ) {
        return declare('Mobile.Template.Views.Account.List', [List], {
            // Localization
            titleText: 'Accounts',

            //Templates
            itemTemplate: new Simplate([
                '<p class="listview-heading">{%= $.AccountName %}</p>'
            ]),

            //View Properties
            id: 'account_list',
            detailView: 'account_detail',
            insertView: 'account_edit',
            querySelect: [
                'AccountName'
            ],
            resourceKind: 'accounts',

            formatSearchQuery: function(searchQuery) {
                return string.substitute('AccountName like "%${0}%"', [
                    this.escapeSearchQuery(searchQuery.toUpperCase())
                ]);
            }
        });
    });
```
Then when you require (as a dependency) in another module you need to use `new`, or refer to the `prototype`:
```javascript
    define('Mobile/Template/ApplicationModule', [
        Mobile/Template/Views/Account/List
    ], function(AccountList) {

    var viewInstance = new AccountList();
    var accountListTitle = AccountList.prototype.titleText;

    });
```
