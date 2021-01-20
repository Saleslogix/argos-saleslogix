A common extension of List Views is a Grouped List which is used to logically categorize the list items into sections.

## Contact List
To demonstrate we will make a new List view for the Contact entity but it will be based off GroupedList instead of List. When the items are added to the page they will be alphabetized and separated by the first letter of the last names -- just like a phone book.

If you have completed [How List Search Works](#!/guide/v2_beyond_the_guide_list_search) then you already have the file defined, just follow along and add the new properties.

1\. Create a new folder in `argos-template/src/Views` named Contact. Within that folder create a file named `List.js` and open it up.

2\. Add the following code and note we are now pulling in, referencing and mixing in `GroupedList` instead of `List`:
```javascript
    define('Mobile/SalesLogix/Views/Contact/List', [
        'dojo/_base/declare',
        'dojo/string',
        'Sage/Platform/Mobile/GroupedList'
    ], function(
        declare,
        string,
        action,
        GroupedList
    ) {

        return declare('crm.Views.Contact.List', [GroupedList], {
            titleText: 'Contacts',

            id: 'contact_list',
            icon: 'content/images/icons/login_24.png',
            resourceKind: 'contacts'
        });
    });
```

3\. For querySelect get: `NameLF` and `AccountName`, order by `'LastNameUpper, FirstName'` and for the itemTemplate use `NameLF` in a `listview-heading` and `AccountName` in a `micro-text`:

```
        return declare('crm.Views.Contact.List', [GroupedList], {
            titleText: 'Contacts',

            itemTemplate: new Simplate([
                '<p class="listview-heading">{%: $.NameLF %}</p>',
                '<p class="micro-text">{%: $.AccountName %}</p>'
            ]),

            id: 'contact_list',
            icon: 'content/images/icons/login_24.png',
            queryOrderBy: 'LastNameUpper,FirstName',
            querySelect: [
                'NameLF',
                'AccountName'
            ],
            resourceKind: 'contacts',
```

4\. Now add the `formatSearchQuery()` function that formats to `like LastNameUpper or like upper(FirstName)`:

```javascript
            formatSearchQuery: function(searchQuery) {
                return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
            }
```
5\. Save, register and add it to the home view. You now see a fully functioning List view for contacts - but not grouped. We need to add the Grouped List logic.

6\. GroupedLists have a function named {@link GroupedList#getGroupForEntry getGroupForEntry()} and it is passed each list item and it should return an object with two keys: `tag` and `title`. Each entry will be grouped with other entries that have the same `tag` and will be added to the List view under a collapsible header using the `title` as the header text.

7\. Add the `getGroupForEntry` function that takes the first letter of `NameLF` and uses it for both title and tag:

            getGroupForEntry: function(entry) {
                var firstChar = entry['NameLF'].substring(0,1).toUpperCase();
                return {
                    tag: firstChar,
                    title: firstChar
                };
            },

8\. Save, run your app and browse to the Contacts List. You should now see results grouped by letter and you can collapse/expand each section.
