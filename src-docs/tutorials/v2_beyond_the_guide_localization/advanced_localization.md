#How to Localize Strings and Formats

All throughout the guide and topics you may have seen `this.labelText` instead of a string. This is because every one of those string needs to be localizable. The Argos way of achieving that goal is to make those strings properties of the view they belong to, then at application startup a localization module is ran that may override any of the view properties replacing them with the localized version.

##Example
###View

    // (src/Views/Account/Detail.js)
    return declare('Mobile.MyApp.Views.Account.Detail', [Detail], {
       // Localization
       accountText: 'Account',
       descriptionText: 'Description',
    ...

###Localization Module

    // (localization/myapp/de.js)
    localize('Mobile.MyApp.Views.Account.Detail', {
       accountText: 'Konto',
       descriptionText: 'Beschreibung'
    });

##Making the Localization Module
Now you may make that localization file by hand, carefully copying all the strings and formats - by hey! We are programmers. Meaning if you follow the conventions you may utilize a Ruby localization script that extracts all the strings into a handy XML file for the translation team. Running the same script on the translated XML file converts it into the localization module.js as seen above.

Github: [Argos-Localizer](https://github.com/Saleslogix/argos-localizer)

Just follow the `README.md` file in argos-localizer.

##Conventions
In order to successfully use the tool you have to make sure:

1\. All localizable text property names end with `Text`: `accountText`, `userNameText`, `loginText`.

2\. All localizable format property names end with `Format`: `dateTimeFormat`, `weekFormat`, `hourOnlyFormat`. 

The distinction is to help the translation as pure text may go through a translation tool whereas the format needs special care to utilize whatever `printf` type convention is happening (datejs for date formats in Argos).

##File Placement and Loading
Once you have a localization file made, the name of the file needs to match the [ISO 3166](http://www.iso.org/iso/country_codes.htm) country-language codes. When loading via `index.aspx` the server retrieves the users region and attempts to find the "specific" localization file such as "de-DE.js", failing that it looks for the "generic" or country only: "de.js" and as a fallback "en.js".

Now that it is named properly you should place it under the top level localization file and then the name you've chosen as a namespace:

`localization/template/de.js`

As mentioned early if you are using `index.aspx` then it is loaded dynamically, if you are using `index.html` then you need to modify the following lines to add the needed locale:

    require([application].concat(configuration), function(application, configuration) {
        var localization = [
            'localization/en',
            'localization/Template/en'
        ];
        ...
    // to

    require([application].concat(configuration), function(application, configuration) {
        var localization = [
            'localization/de',
            'localization/Template/de'
        ];
        ...

Note that the file directly in the localization folder is the localization file that controls currency and numbers - decimals, symbols, comma's, etc.
