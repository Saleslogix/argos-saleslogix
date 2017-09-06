Each row object has many properties available that allow you to control almost every aspect of the row. For Detail View rows these properties are:

   * Provider
   * Value
   * onCreate
   * Renderer
   * Template
   * Encode
   * Cls
   * Use


## Provider
The `provider` property allows you to provide a custom mapping between the row and the SData entry. Normally it is a one to one mapping
of the rows `property` value to the entry property e.g.:

    // row
    {
       name: 'NameLF',
       property: 'NameLF',
       label: this.nameLFText,
    }

    // SData Entry
    {
       Account: 'Tests Inc.',
       NameLF: 'McTest, Tester',
       Email: 'tester@tests.org'
    }

    // Resulting row value:
    row.value = entry[row.property]
    row.value = entry['NameLF']
    row.value = 'McTest, Tester'


If the one-to-one mapping is not desired you may define a `provider` function that takes the SData entry and the `property` of the row and
whatever it returns will be the value of the row.

1\. If you've followed the Argos-Template Guide, open `argos-template/src/Views/Account/Detail.js` and go to the `createLayout()` function.

2\. Add two new fields to the querySelect array: Type and SubType

    querySelect: [
      'AccountName',
      'AccountManager/UserInfo/Username',
      'WebAddress',
      'MainPhone',
      'Industry',
      'Type',
      'SubType'
    ]


3\. Add a new row to Details section children array with the following properties:

    {
        name: 'CombinedType',
        property: 'CombinedType',
        label: this.combinedTypeText,
        provider: this.combineTypes
    }


4\. Wait! We added a property that does not correspond to our data (querySelect), this is because when you provide a `provider()` function
it will pass the SData entry to your function and let you figure out how to extract the property `CombinedType`.

5\. Define a new function (above createLayout) named `combineTypes`, for parameters you have `entry` and `property`. It should return
a string that joins `entry['Type']` and `entry['SubType']` with ` > `.

    combineTypes: function(entry, property) {
       if (entry['Type'] && entry['SubType'])
           return string.substitute('${Type} > ${SubType}', entry);
       else
           return entry['Type'] || '';
    },


6\. Add the localizable label string:

    combinedTypeText: 'type',


7\. Save and run your up and open an Detail for an entry. At type you should see something like: `Customer > Hardware`.

That's it for `provider` - you may use it to combine values, do different lookups based on custom logic or anything you like for pulling a
value out of the SData entry.



## Value
Setting the `value` property of a row object makes it skip the SData mapping and let's you set a value directly. While the use case for
 static values in a data-driven app is limited it is typically used to set a placeholder while another request is made for the real data.

We will now add a loading text value directly and then in the `onCreate` topic you can see it expanded to be replaced with an asych call.

1\. Open `argos-template/src/Views/Account/Detail.js` and go to the `createLayout()` function.

2\. Add to querySelect the field `Address/$key`.

    querySelect: [
      'AccountName',
      'AccountManager/UserInfo/Username',
      'WebAddress',
      'MainPhone',
      'Industry',
      'Type',
      'SubType',
      'Address/$key'
    ]

3\. Create a new row object under the Contact Info section and use "Address", "Address/$key", `this.addressText` and
 `this.loadingText` for name, property, label and value respectively.

    {
        name: 'Address',
        property: 'Address/$key',
        label: this.addressText,
        value: this.loadingText
    }

4\. Add the localizable strings to the view

    addressText: 'address',
    loadngText: 'loading...'

5\. Save, run your app and go to a Detail view entry. The value should always show the loading text, no matter what entry
you go to. As mentioned before this is usually tied to the `onCreate` property for retrieving a different SData entry and setting the result.




## OnCreate
Every time a Detail View is `refresh()`ed (when it gets new data) it deletes the entire layout and re-constructs it with the new data.
This is in contrast to Edit Views where on `refresh()` they merely empty out the inputs. When the layout is being constructed it goes
row by row and when a row is added to the DOM it fires the rows `onCreate` function and passes all sorts of data.


This exercise is a follow up to the `value` section above where the static loading text was set as a placeholder, we will now add
a `onCreate` function that gets new data and replaces the placeholder.

1\. Open `argos-template/src/Views/Account/Detail.js` and go to the `createLayout()` function.

2\. In the `Address` row add the key `onCreate` with a value of `this.requestAddress`:

    {
        name: 'Address',
        property: 'Address/$key',
        label: this.addressText,
        value: this.loadingText,
        onCreate: this.requestAddress
    }

3\. Add a new function named requestAddress and its parameters are: row, node, value and entry:

    requestAddress: function(row, node, value, entry) {
        // row refers to the row object (where we just added onCreate)
        // node is the corresponding HTML Node in the DOM for this row
        // value is set to loading... so not much of a concern
        // entry is the full SData entry response

    },

4\. While out of scope for going into the details of making SData requests you can just follow along. If you want to know more about
the functions used here please see the github repo [SDataJavascriptClientLib](https://github.com/Saleslogix/SDataJavaScriptClientLib). Add the SData request:

    requestAddress: function(row, node, value, entry) {
       var request = this.createRequest();
       request.setResourceKind('addresses');
       request.setResourceSelector(entry['Address']['$key']);
       request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, 'FullAddress');

       request.read({
          success: lang.hitch(this, this.onRequestAddressSuccess, row, node, entry),
          failure: this.onRequestAddressFailure,
          scope: this
       });
    },

5\. To briefly cover what is going on, we are using the views `createRequest()` function which sets up a single entry request but it is using
our views resourceKind, querySelect, etc so we need to change those to be for `Address`. Then it executes (reads) the request passing
the callbacks and the scope of the callbacks. The `lang.hitch()` is used to "append" arguments to the `onRequestAddressSuccess` function.

6\. As we needed the dojo lang module, add that as a dependency and reference:
```javascript
    define('Mobile/Template/Views/Account/Detail', [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/string',
        'Sage/Platform/Mobile/Detail'
    ], function(
        declare,
        lang,
        string,
        Detail
    ) {
```
7\. Now define the onAddressRequestSuccess like so:

    onAddressRequestSuccess: function(row, node, entry, response) {
       var address = response['FullAddress'];
       query('span', node).text(address);
    },

8\. In the above code we extracted the value and then used `dojo.query` on the HTML Node we got from onCreate.
If you inspect the HTML of a row you will see that there are various parts and the text the user see's is within the
only child span element. Since we are now using the dojo query module add that as a dependency and reference:

    define('Mobile/Template/Views/Account/Detail', [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/query',
        'dojo/string',
        'Sage/Platform/Mobile/Detail'
    ], function(
        declare,
        lang,
        query,
        string,
        Detail
    ) {

9\. If you now save and load your application and navigate to a Detail entry you should see the text `loading...` until the request is
fired and returned. Then it will change to the Full Address property of the Address Key provided by Address/$key.

While this example is a simple one, the `onCreate` attribute may be used for any purpose that fires when the row is created.



##Renderer
The `renderer` property is used a "presenter" it takes the existing value and changes the rendered format without modifying the value underneath.
Some examples are phone numbers, addresses, dates, clickable URLs, boolean to yes/no text, and others. Note that `renderer` merely alters the
value into a different (or new) string.

This exercise assumes you've completed Argos-Template Guide.

Renderer may also be set a function of your view, let's take the Industry row and have a custom message when a name is matched.

1\. Open `argos-template/src/Views/Account/Detail.js` and go to the `createLayout()` function.

2\. In the Industry row object add the key `renderer` set to `this.formatIndustry`:

              },{
                  name: 'Industry',
                  property: 'Industry',
                  label: this.industryText,
                  renderer: this.formatIndustry
              },{

3\. Create the function `formatIndustry()` in your view and it is being passed a single parameter: `value`

    formatIndustry: function(value) {
       // needs to return a formatted value
    },

4\. Add a new property to your value (up near your localizable strings) named: industryDescriptionText and have it be a object with a
key of `Communications` and value of `Communications including phone, fax and e-mail`:

    industryDescriptionText: {
        'Transportation/Shipping': 'Shipping including ground, air and boat'
    },

5\. Back in the formatIndustry have it check for the value within our industryDescription object and send the description value back, if it is
not there send back just the industry value:

    formatIndustry: function(value) {
       return this.industryDescriptionText[value] || value;
    },

6\. Save and run your app and view the Account entry "Allied Corp." which happens to have the Trans/Shipping industry. You should now
see the custom message instead of the value. For other entries it should still show the industry.

Renderer is also commonly used to take Object values and return the displayed format - for example if you set a field to `owner/*` you could use renderer
to return `value.FirstName + value.LastName`. The implementations are endless when it comes to renderer.



## Template
The `template` attribute, or its shorthand `tpl`, provides a Simplate override for this row, but only to the value part. Meaning the row will still be
a `<div>` with a `<label>` and `<span>` children with the resulting markup of template being put into the `<span>`. If you want to change the
entire row markup see `use`.

This exercise assumes you've complete Argos-Template Guide, which already covered using a template for setting the first and last name of the owner.

Now we will alter the markup to include an icon of the business if we have one defined.

1\. Open `argos-template/src/Views/Account/Detail.js` and go to the `createLayout()` function.

2\. In the 'AccountName' row add the `template` attribute and set it as follows:

              },{
                  name: 'AccountName',
                  property: 'AccountName',
                  label: this.accountNameText,
                  template: new Simplate([
                     '{% if ($$.logos[$.value]) { %}',
                      '<img src="$$.logos[$.value]">',
                      '{% } %}',
                      '{%= $.value %}'
                  ])
              },{

3\. Define the `logos` hash on the view itself (up near id, editView):

    logos: {
        'Abbott Ltd.': 'content/images/icons/Company_24.png'
    }

4\. Save and reload. If you view the `Abbott Ltd.` entry the account name should now also include an image of a company, other accounts should just show the name.

While it may seem that Renderer and Template overlap, it is more the intent of what you want to accomplish. If you want to simply alter a value or change
how a value is displayed - use `renderer`. If you want to wrap the value in additional HTML then use `template`. The last case - you want to alter the entire
rows HTML markup you need to use `use`.


## Use
While `template` is useful for modifying the value, `use` modifies the markup of the entire row. It gets passed the row object after all the
other modifications have taken place.

First we'll take a look at the standard template for rows and then add a new template that includes an icon before label.

1\. Open `argos-sdk/src/Detail.js` and find the `propertyTemplate` property and you will see this:

        propertyTemplate: new Simplate([
            '<div class="row {%= $.cls %}" data-property="{%= $.property || $.name %}">',
            '<label>{%: $.label %}</label>',
            '<span>{%= $.value %}</span>',
            '</div>'
        ]),

2\. As you can see the default one already uses the basic properties directly but just so you aware any property defined on your row object is
available via `$` and the detail view via `$$`.

3\. Now go back to your `argos-template/src/Views/Account/Detail.js` and under `createLayout()` find the Industry row we changed earlier to
include a message.

4\. Add the key `use` and set it to `this.rowWithIconTemplate`:

              },{
                  name: 'Industry',
                  property: 'Industry',
                  label: this.industryText,
                  renderer: this.formatIndustry,
                  use: this.rowWithIconTemplate
              },{

5\. On the view itself define a new property named `rowWithIconTemplate` and have it define a new Simplate with the following:

    rowWithIconTemplate: new Simplate([
        '<div class="row {%= $.cls %}" data-property="{%= $.property || $.name %}">',
            '<img style="position:absolute" src="{%= $$.industryIcons[$.Industry] || $$.industryIcons["default"] %}">',
            '<label">{%: $.label %}</label>',
            '<span>{%= $.value %}</span>',
        '</div>'
    ]),

6\. Then define on the view itself the `industryIcons` object that maps the industry values to their icons;

    industryIcons: {
       'Communications': 'content/images/icons/Call_24x24.png',
       'default': 'content/images/icons/Company_24.png'
    },

7\. To walk through all that we defined:

   a\) When the detail view is passed a new key, requests data and starts to process the results

   b\) The layout gets recreated and loops through the entire `this.layout` array and builds each row

   c\) When it gets to Industry it see's we defined a `use` template and calls it passing the row object itself and the view for scope

   d\) In the Simplate we have it using pretty much the same markup except for an `<img>` element where the source is set using the object map `industryIcons`

   e\) The resulting HTML is then added to the DOM for the Industry row and it continues on.

8\. Save and run your app you should now see a little icon to the left of label for industry rows. As you can see you can easily override the
default `propertyTemplate` via the `use` property.



## Encode
Encode is a flag that runs the value through `argos-sdk/src/Format`'s encode function that encodes `&><"` to their HTML entities. By default it
is `true` - all values get encoded, however if you are using a `renderer` or `template` then the default is `false` and must be
explicitly set to `true` in the row object to be encoded.

This exercise will turn encoding off so you can see the effects.

1\. Open the `argos-template` app and go to the Account List view. Do a search for "space" and select `Spacetek & Correct`.

2\. In the Detail view notice that the AccountName row correctly shows `Spacetek & Correct`.

3\. Now open up your `argos-template/src/Views/Account/Detail.js` and down to `createLayout()` and the AccountName row.

4\. Add the key `encode` and set it to false:
```javascript
              children: [{
                  name: 'AccountName',
                  property: 'AccountName',
                  label: this.accountNameText,
                  encode: false
              },{
```
5\. Save and run (doing a search again) and go to the Detail view. Now the AccountName row shows `Spacetek &amp; Correct`
(note: most modern browsers will auto-escape for you and you may need a debugger in the format encode function to see it did alter the value).

6\. Go back and remove the `encode: false` - this was just to demonstrate - and save.

## Cls
Cls is a quick way to add a custom CSS class to the container div of the row markup.

This can be used for many purposes but the only one provided out of the box is `content-loading` and we will see that in action.

1\. Assuming the you've completed the `value` example and the followup onCreate exercises, open your `Account/Detail.js` and down
to `createLayout` and the `Address` row object we added with the placeholder that gets replaced.

2\. Add the key `cls` and set to `'content-loading'`:

    {
        name: 'Address',
        property: 'Address/$key',
        label: this.addressText,
        value: this.loadingText,
        onCreate: this.requestAddress,
        cls: 'content-loading'
    }

3\. If you want to view the corresponding CSS open `argos-sdk/content/css/base.css` and you'll find the following definition:

    .content-loading > span
    {
        padding-left: 32px;
        font-size: 0.7em;
        background: url('../images/content-loading-light-green.gif') no-repeat scroll 12px 50%;
    }

4\. Save, and open a detail view. You'll now see a loading indicator in the field itself next to the `loading...` text.
Yet when the data is loaded the text changes but the loading indicator is still there.
To fix that we edit the success handler to remove the class:

    onAddressRequestSuccess: function(row, node, entry, response) {
       var address = response['FullAddress'];
       query('span', node).text(address);
       domClass.remove(node, 'content-loading');
    },

5\. Since we now need the dojo dom-class module go ahead and add that as a dependency/reference:

    define('Mobile/Template/Views/Account/Detail', [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/dom-class',
        'dojo/query',
        'dojo/string',
        'Sage/Platform/Mobile/Detail'
    ], function(
        declare,
        lang,
        domClass,
        query,
        string,
        Detail
    ) {

6\. Save and run - now when you go to a Detail View you get a loading indicator while the field request is loading and on success it puts
the new text and removes the indicator.

Cls is used to provide quick one off css adjustments, if you need to greatly change the markup and styling see the `use` attribute for how to do that.
