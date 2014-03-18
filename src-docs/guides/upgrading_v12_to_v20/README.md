#Upgrading 1.2 to 2.0
With the release of SLX Mobile 2.0 there have been many major changes in how the application works. This was done not only to align with SLX Web 
but to also bring faster performance, newer features and a more customize-able environment. These changes include:

* AMD script loading;
* Removed the Ext framework and replaced it with Dojo 1.7.1;
* Minor folder restructuring;
* Properties and Functions renamed to be more descriptive; and
* Additional properties and functions to enhance customizing.


##Steps to Convert

1. Change all modules (files) to use AMD loading.
1. Change all Ext calls to Dojo equivalents.
1. Verify that all modules names are fixed to reflect the new folder structure.
1. Verify that any property name changes do not effect your views or customization's.
1. Verify that the changed function names/removal do not effect your views or customization's.
1. Consider the newly added properties and methods to enhance existing customization's.


##AMD Script Loading
AMD stands for Asynchronous Module Definition which means that instead of declaring globals in every script file you use 
the `define()` function to setup a module. In the definition you also declare what dependencies (requires) that module needs. 
The AMD loader will load all files asynch, then define each module in the correct order passing in references to each dependency.

What this means for upgrading is that you go from:

####Ext:
    Ext.namespace("Mobile.SalesLogix.Calendar");
    (function() {
        Mobile.SalesLogix.Calendar.MonthView = Ext.extend(Sage.Platform.Mobile.List, {
            // define view
        });
    });

####To Dojo AMD:
    define('Mobile/SalesLogix/Views/Calendar/MonthView', [
        'dojo/_base/declare',
        'dojo/_base/array',
        'dojo/string',
        'dojo/query',
        'dojo/dom-attr',
        'dojo/dom-class',
        'dojo/dom-construct',
        'Mobile/SalesLogix/Format',
        'Sage/Platform/Mobile/ErrorManager',
        'Sage/Platform/Mobile/Convert',
        'Sage/Platform/Mobile/List'
    ], function(
        declare,
        array,
        string,
        query,
        domAttr,
        domClass,
        domConstruct,
        format,
        ErrorManager,
        convert,
        List
    ) {

        return declare('Mobile.SalesLogix.Views.Calendar.MonthView', [List], {
            // define view
        });
    });

While this does seem to be a lot of extra code the gains far outweigh the additional keystrokes. We now can see what other modules the `MonthView` requires, we also know the path name and no longer have to memorize global variable names.

To break down the define statement we have:

    define('Path/To/My/Script',
        [dependencies],
    function(references), {

        /*private space*/

        return declare('My.Module.Name', [Inheritances], {
            /* definition */
        });
    });

#####Path/To/My/Script
This is the path to the script minus the extension. In the `index` file you can setup shortcuts (namespaces) and in this case `Mobile/SalesLogix` links to `argos-saleslogix/src`, so the final path for Month View is:
`argos-saleslogix/src/Views/Calendar/MonthView.js`, which translates to: `Mobile.SalesLogix.Views.Calendar.MonthView`.

#####[dependencies]
This is an array of other script paths that this module needs to run, again using the shortcuts defined in the `index` file.

#####function(references)
This function will recieve an instance of each dependency required. The reason each dependency and reference is on its own line in the code 
above is to quickly make sure there is a one-for-one match as it needs to go in the same order.

#####/*private space/*
The code inside here will only be ran once when defined, the returned object will be what actually defines the module meaning anything before the return space is private unless exposed in your returned object.

#####declare()
This is the dojo equivalent of Ext's `Ext.extend`, as it sets up a constructor (factory) to be later used with the new keyword to create instances.

#####'My.Module.Name'
The name of the module, for our purposes this will match the path used to eliminate confusion.

#####[Inheritances]
An array of objects that this new module should inherit from - in Dojo terms these are called `mixins`.


###Notes
As seen in the first example you will no longer reference global variables as you have a local variable instance as a reference. Notice in the old Ext code we had:

`Sage.Platform.Mobile.List`   

and now we pull it in as a dependency: `Sage/Platform/Mobile/List`, get passed a reference: `function(,,, List)` and then use the List variable:   

`declare('Mobile.SalesLogix.Views.Calendar.MonthView', [List], ...`

This happens for all globals like `Mobile.SalesLogix.Format` or `Sage.Platform.Mobile.Convert` - you will see them pulled in and used in code as `format` and `convert`.

Naming the references is completely up to the person creating the module but the standard used by SLX Mobile, and in general Dojo, is that constructors (factories) are initial case and everything else is lowercase.

When viewing the Dojo documentation you will want to look for the `Dojo 1.7+` example which will show you the path to add as a dependency and the suggested reference name.



##Ext to Dojo Functions
Ext has been removed completely, all references to `Ext.*` and any of it's extended functions such as String.format will need to be replaced with Dojo 1.7.1 equivalents. The following is a short list of typical Ext code used in SLX Mobile and it's Dojo translation:

Ext: `Ext.namespace('my.object')`   
Dojo: No longer required when defining views. For singletons, require "dojo/_base/lang" and use `lang.setObject('my.object', {})`

Ext: `Ext.extend()`   
Dojo: Require "dojo/_base/declare" and use `declare()`

Ext: `Object.superclass.function.apply(this, arguments)`   
Dojo: `this.inherited(arguments)`. Where `this` is in the "child" of the inherited object context.

Ext: `Ext.override(object, {})`   
Dojo: Require "dojo/_base/lang" and use `lang.extend(object, {})`

Ext: `String.format('format', arg1, arg2)`. Where `{0}` = arg1   
Dojo: Require "dojo/string" and use `string.substitute('format', [arg1, arg2])`. Where `${0}` = arg1

Ext: `function.createDelegate(scope, [arg1, arg2], bool appendArgs)`   
Dojo: `function.bindDelegate(scope, arg1, arg2)`

Ext: `Object.on('event', handler, scope)`   
Dojo: `this.connect(object, 'event', handler)`. Where `this` is in a View context

Ext: `Ext.each(myArray, function(item){}, scope)`   
Dojo: Require "dojo/_base/array" and use `array.forEach(myArray, function(item){}, scope)`

Ext: `this.el`. Where `this` is in a View context   
Dojo: `this.domNode`. Where `this` is in a View context

Ext: `attachmentPoints: { name : selector }`   
Dojo: In the actual HTML markup add the attribute: `data-dojo-attach-point="name"`.



##Folder Re-structure
With the move to AMD the folder structure has been re-organized and since all module names are based off their physical path the object names themselves have changed.

Folder Name Changes:   
`argos-sdk/src/Controls` to `argos-sdk/src/Fields`   
`argos-saleslogix/src/views` to `argos-saleslogix/src/Views`

What this means for your code is if you are referencing `Account.Detail` like so:   
`Mobile.SalesLogix.Accout.Detail`   
it is now:   
`Mobile.SalesLogix.Views.Account.Detail`

The same goes for Controls which are now Fields:   
`Sage.Platform.Mobile.Controls.BooleanField`   
to:   
`Sage.Platform.Mobile.Fields.BooleanField`


The following modules have been moved from `argos-sdk/src/Controls` to `argos-saleslogix/src/Fields`:

* AddressField
* NameField
* PicklistField

With their name change correspondingly:   
`SalesLogix.Platform.Mobile.Controls.AddressField`   
to:   
`Mobile.SalesLogix.Fields.AddressField`



##Properties Renamed
To better describe several properties they have been renamed to a more intuitive name.

1.2: View.viewTemplate    
2.0: View.widgetTemplate   
Notes: Simple rename now that all Views are Dojo Dijits

1.2: List.itemTemplate   
2.0: List.rowTemplate   
Notes: This is the `<li>` markup for describing the rows structure, not normally changed.

1.2: List.contentTemplate   
2.0: List.itemTemplate   
Notes: This template sets up the markup for an item within a row (within rowTemplate). This template is overriden every view to be tailored to its entity.

1.2: Detail/Edit createLayout children fields. `name` is used for SData binding   
2.0: Detail/Edit createLayout children fields. `name` is now the unique identifer, `property` is for SData binding   
Notes: This is backward compatible, if `property` does not exist it will use `name` for identification and SData binding

##Function Changes

1.2: View.setTitle(value)   
2.0: View.set('title', value)   
Notes: The function has been removed and replaced with normal get/set.

1.2: View.isActive()   
2.0: App.isViewActive(view)   
Notes: Views no longer have the function it is globally available in the App namespace.

1.2: App.getActiveView()   
2.0: App.getPrimaryActiveView()   
Notes: Renamed


##Additional Properties

###Detail/Edit createLayout
All objects within layout now have a `name` property as a unique identifier. This includes sections, quick actions, fields, controls and related views. 
The purpose of this so in `registerCustomization` the `at: function(row)` part can now use `row.name` to target any piece of the layout.

###Hash Tag Customization
Hash Tags now use the same customization engine as detail/edit views, enabling ease of modifying, inserting or removing hash tags.

    this.registerCustomization('list/hashTagQueries', 'opportunity_list', {
        at: true, // insert anywhere (hash tag queries are not ordered)
        type: 'insert',
        value: {
            tag: 'g500k',
            query: 'SalesPotential gt "500000"'
        }
    });

    this.registerCustomization('list/hashTagQueries', 'history_list', {
        // hashes are identified by their key property
        at: function(hash) { return hash['key'] === 'phonecall'; },
        type: 'modify',
        value: {
            query: 'Type eq "atMobileCall"'
        }
    });

###Toolbar Customization
Toolbars now use the same customization engine as detail/edit views (and hash tags). No longer need to override `createToolLayout()`.

    this.registerCustomization('detail/tools', 'account_detail', {
    at: function(tool){ return tool.id === 'edit'; },
    type: 'insert',
    where: 'after',
    value: {
        id: 'customButton',
        icon: 'content/images/icons/Hello_World_24.png',
        action: 'showHelloWorld'
    }
    });

###Multiple Insert Customizations
Before the registerCustomization engine would only insert one value at a time, causing multiple calls to insert items at the same place. Now you 
may pass an array for the `value` key and it will insert each object sequentially at that point. Note this only works when `type` is `insert`.

    this.registerCustomization('detail/tools', 'account_detail', {
        at: function(tool){ return tool.id === 'edit'; },
        type: 'insert',
        where: 'after',
        value: [{
            id: 'b1',
            icon: 'content/images/icons/b1.png',
            action: 'b1Function'
        }, {
            id: 'b2',
            icon: 'content/images/icons/b2.png',
            action: 'b2Function'
        }]
    });
    // results in a toolbar with: [Edit][B1][B2]

###View Security
Now that secured actions is available via SData in SalesLogix 8.0+ each individual view now has a `security` property that can be set to a string defining the secured action required.

When a user logs in the security is stored in:   

`App.context.userSecurity`   

as a hash table with each key as the action and the value as true. If a key does not exist in that list it is assumed the user does not have the security permissions to access that view.

####Example:   
Ticket List may be defined as:   

    define('...Ticket.List', [], function() { return declare('...Ticket.List', [], {
        security: 'Entities/Ticket/View'
    }); });


Say, a user named Lee has the following actions:  

    App.context.userSecurity = {
        Entities/Account/View: true,
        Entities/Contact/View: true,
        Entities/Opportunity/View: true
    }

while user called Barb has these:   

    App.context.userSecurity = {
        Entities/Account/View: true,
        Entities/Ticket/View: true,
        Entities/Opportunity/View: true
    }

When Lee logs in, his Home page will NOT have Tickets and he will not be able to navigate to Tickets in anyway. Even if Account Detail has a "related Tickets" shortcut it will not function.
Whereas Barb will have it on her Home page (but not Contacts).

For SalesLogix 7.5.4 and below since it does not reply with a users secured actions it will set the `userSecurity` to `null` and grant full access just as 
before.


