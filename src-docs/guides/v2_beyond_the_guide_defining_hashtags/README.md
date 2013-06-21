#Defining Hashtags
Hashtags are like a quick filter for searches and in the case of Argos, used to insert predefined Where expressions. For example: `#open` may insert `'Status eq "open"`, any other part of the search will go through the normal search formatting.

##Adding a Hashtag
Here we will be adding a simple hash tag to our Account List view (from the [Argos-Template Guide](#!/guide/v2_template_guide)) for finding small businesses with less than 10,000 in revenue using `#10k`.

1\. Open `argos-template/src/Views/Account/List.js` and add a new property `hashTagQueries` and set it to an object with a key of `10k` with value `'Revenue lt 10000'`:

    hashTagQueries: {
       '10k': 'Revenue lt 10000'
    },

2\. Save and open your app, but before going to the List open your network tools in your browser. Then browse to List and in the search bar type `#10k` and hit search.

3\. You should see a new set of results and in your network tab a GET request with a url containing `&where=(Revenue%20lt%2010000)`.

4\. To continue adding hashtags just keep adding more key value pairs to the `hashTagQueries` object for that view.

##Localizing Hashes
Hash tags a special case for localization as we need to create a map for the localization version to the English version that is set to the actual where expression. While that sounds a bit complicated it is really easy to implement.

1\. In the `List.js` we just added the `#10k` tag, add a new property named `hashTagQueriesText` and set it as an object with a key `'10k'` and value `'10k'` (think of it as English to English):

    hashTagQueriesText: {
       '10k': '10k'
    },

2\. As mentioned in the Localization topic any variable ending in `Text` gets picked up, so this will too. The localization will override only the value leaving the key intact.

3\. Let's say we wanted to add localization support for the German, open up `argos-template/localization/template/en.js`. It should be empty except for the `define` wrapper.

4\. Within call the `localize` function passing the string `'Mobile.Template.Views.Account.List'` as the first parameter and as a second parameter an empty object:

    define('localization/Template/en', ['localization/en', 'Mobile/Template/ApplicationModule'], function() {
       localize("Mobile.Template.Views.Account.List", {
       });
    });


5\. In the empty object we can pass overrides that get "deeply" mixed in. Meaning if our original `hashTagQueriesText` had `10` key values and we only called localize with `5` key values, it would only replace the `5` we passed in and not replace the entire object.

6\. Add the `hashTagQueriesText` with a key of `10k` (the key matches the key in `hashTagQueries`) and a value of `'10tds'` (German abbreviation for thousand):

        localize("Mobile.Template.Views.Account.List", {
            hashTagQueriesText: {
                '10k': '10tds'
            }
        });

        
7\. Save and run. If you type in `#10tds` into the search bar you will get the same filtered results as before. This happens because the hash engine matches up the keys of the two objects to the two values.