#Localization Detection
With an Argos app you have four included `index` files:

`index.html`, `index-dev.html`, `index.aspx` and `index-dev.aspx`.

Namely two files each for dev and production - the difference lies in the file extension and thereby the
way it adds in the needed localization.

##HTML Files

The `*.html` files hard-code the localization:

    require([application].concat(configuration), function(application, configuration) {
        var localization = [
            'localization/en',
            'localization/appname/en'
        ];

Which includes two localization pieces:

* Top Level: `localization/en` which is for currency, decimal and thousands symbols, etc; and
* App Strings: `localization/appname/en` which is the translated strings .js file from [Argos-Localizer](https://github.com/Saleslogix/argos-localizer).



##ASPX Files

The `*.aspx` files use server side code for detecting the localization of the browser and dynamically
include the needed localization paths:

    require([application].concat(configuration), function(application, configuration) {
        var localization = <%= Serialize(
            EnumerateLocalizations("localization")
                .Select(item => item.Path.Substring(0, item.Path.Length - 3))
        ) %>;

Note that the C# code gets the _browsers_ locale meaning depending on which browser you use the locale
may be set in the browser itself, the operating system you are running, or even a plugin.



##Adding a New Language

To add a new language you need to have both the "top level" and the "app strings" pieces:

`localization/klingon.js` and `localization/appname/klingon.js`


###Top Level
To define a new top level localization piece:

1\. Download a [sample top level](guides/v2_localization_detection/en.js)

2\. Rename to the proper
[ISO 3166](http://www.iso.org/iso/country_codes.htm) code. Note that the locale detection performs a fall-
back to generic locale (browser detects `de-DE`, doesn't find `de-DE.js` so it tries `de.js` which is successful).

3\. Edit the file, making sure to change the define path:

    define('localization/en', ['dojo/_base/lang'], function(lang) {

to

    define('localization/klingon', ['dojo/_base/lang'], function(lang) {

4\. Save and drop into the `products/appname/localization/` folder.


###App Strings

1\. Follow either [Localization Example](#!/guide/v2_localization_example) or the Argos-Localizer code directly on [Github](https://github.com/Saleslogix/argos-localizer).

2\. Take the resulting `.js` file and drop it into the `products/appname/localization/appname/` folder.



##Testing

There are two approaches depending on what tools you want to use:

1\. Edit the `.html` file; or

2\. Change the browser locale and use `.aspx`.

Note that in both cases if you don't see a change right away that means you should a) clear your cache or
b) close all browser instances and restart it (in the case of approach 2).


###Editing the HTML File

Testing using the hard coded HTML file is the easiest and most direct approach:

1\. Change the default English locale:

    require([application].concat(configuration), function(application, configuration) {
        var localization = [
            'localization/en',
            'localization/appname/en'
        ];

to your added locale

    require([application].concat(configuration), function(application, configuration) {
        var localization = [
            'localization/klingon',
            'localization/appname/klingon'
        ];

2\. Save and open the file.


###Changing the Browser Locale

To use the `.aspx` file auto-detection you need to alter the browsers locale.

####Chrome (Windows)

1\. Create a shortcut to Chrome

2\. Right-click, edit Properties

3\. Add to the Target field:

    path_to_chrome.exe --lang=klingon

4\. Optionally, you may add:

    --user-data-dir=C:\chrome_profiles\klingon

This saves all the chrome data to a new profile and not your default one.

There is also a way under the Wrench but it is several levels deep, a shortcut is easier to maintain
multiple languages and you can add more command line options to point to your file, enable extra logging
and other features.


####Chrome (Mac)

No option available besides changing:

1\. From the Apple Menu choose `System Preferences`;

2\. Then under `Personal` select `International`;

3\. Set the locale;

4\. Restart all browser sessions.


####FireFox

Since FireFox has an excellent extension API it is possible to alter the locale directly via a plugin:

[Quick Locale Switcher](https://addons.mozilla.org/en-US/firefox/addon/quick-locale-switcher/)

1\. Install and load the plugin.

2\. After opening the page, use the plugins icon to change the locale.


####IE9

1\. Click the gears icon and select `Internet options`;

2\. In the `General` tab, at the bottom, click `Languages`; and

3\. Add the locale and move it to the very top. Click Ok.

