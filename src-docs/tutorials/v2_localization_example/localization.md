While the [How To Localize Guide](#!/guide/v2_beyond_the_guide_localization) explains it at the high level, this guide will take the completed
[Argos Template](#!/guide/v2_template_guide), configure the localizer and show the results.


## Pre-Setup

If you have completed the Argos Template Guide, then you already have the folder structure and needed source files.

1\. Create a root folder, for this example we will be using `C:\code\mobile`.

2\. In that root folder, download and extract (or git clone) the latest version of the [Argos-SDK](https://github.com/Saleslogix/argos-sdk) into a new folder named `argos-sdk`.

3\. Create another folder at the same level named 'products'.

4\. Within the products folder, download and extract the [finished Argos-Template](files/argos-template_guide-complete.zip) into a new folder named `argos-template`.

5\. You should have something like this:


    /code/mobile
                /argos-sdk
                /products
                         /argos-template


## Setup

Now that you have all the source files, it's time to get the localizer tool itself.

1\. Download and extract the [windows exe bundle](https://github.com/downloads/Saleslogix/argos-localizer/argos-localizer-windows.zip), for this example it'll be extracted to `C:\code\argos-localizer`.

2\. Duplicate (copy+paste and rename) the file `C:\code\argos-localizer\config\argos-saleslogix.json` to the same folder and named `argos-template`.

3\. Open the new config file `C:\code\argos-localizer\config\argos-template.json` and find the `export` key at the top:

    "export": {
        "transform": "transforms/argos-saleslogix-export.xslt",
        "path": "localization/argos-saleslogix/slx-mobile-strings-beta1.xml",
        "split": true
    },

4\. Leave the `transform` as-is - note that the xml transform path is relative to the argos-localization tool.

5\. Change the `path` to `localization/argos-template/mobile-strings.xml`:

    "export": {
        "transform": "transforms/argos-saleslogix-export.xslt",
        "path": "localization/argos-template/mobile-strings.xml",
        "split": true
    },

6\. Scroll down to the `projects` key. Change the second item to point to Argos-Template where its `path` is the `src` folder (where all the .js files are):

    "projects": [{
        "name": "Argos SDK",
        "path": "argos-sdk/src",
        "alias": "argos-sdk"
    },{
        "name": "Template",
        "path": "products/argos-template/src",
        "alias": "argos-template"
    }]

* Note, if you do not want to include the SDK strings then simply remove it from the projects array, leaving only `[{argos-template}]`.


7\. Since `path` in step 5. is relative to our source code root (`C:\code\mobile`) save the config file and make its two folders:

    C:\code\mobile\localization\

and

    C:\code\mobile\localization\argos-template\



## Exporting Strings

This first step of the tool inspects dojo AMD defined modules and extracts any property that name ends with `Text`, adding them into a XML file for translation.

1\. Run the tool by opening Windows Run (winkey+r) and entering the following command (quotes are not needed unless you have spaces in the path):

    "C:\code\argos-localizer\argos-localizer.exe export --base-path "C:\code\mobile" --config-path "C:\code\argos-localizer\config\argos-template.json"

2\. Depending on how many strings it's extracting it may take anywhere from 10-30 seconds, you'll see a command prompt (black window) with the files it is
parsing.

3\. Open the combined XML file: `C:\code\mobile\localization\argos-template\mobile-strings.xml`

    <?xml version="1.0" encoding="UTF-8"?>
    <localization>
      <data class="Sage.Platform.Mobile.Calendar" property="titleText" type="text">
        <description/>
        <value>Calendar</value>
      </data>
      <data class="Sage.Platform.Mobile.Calendar" property="amText" type="text">
        <description/>
        <value>AM</value>
      </data>

      ... and so on ...

4\. The two other XML files generated are the same strings except `mobile-strings-text.xml` contains only text strings to localize and `mobile-strings-format.xml`
contains only format (date for example) strings to localize. This may help the localization team in deciding what action to take, if not needed the base `mobile-strings.xml`
is the combined file.



## Translate

At this point the localization team/department would duplicate the base xml file and translate the `<value>` for each data entry, naming the duplicated
file with the locale they are translating it into: `mobile-strings-de.xml`, `mobile-strings-fr.xml` and so on.

Meaning at the end you should have the base xml file (which is really `mobile-strings-en-US.xml`) and one (or two if using the split ones) per locale.

For this example duplicate the file to `mobile-strings-de.xml` and change the `titleText` for the Home View to `Zuhause` (the `<data>` node for
Home should be near the bottom of your xml file):

    <data class="Mobile.Template.Views.Home" property="titleText" type="text">
        <description/>
        <value>Zuhause</value>
    </data>

Save and continue to Importing XML.



## Importing XML

The last half of the localization tool takes all the translated XML files and transforms them into javascript.

1\. Open the config file as we need to change the import portion: `C:\code\argos-localizer\config\argos-template.json`

2\. Under the `import` key is the `map` key which defines the locales we are importing. Currently it has several locales but we only have `de`.
Go ahead and delete the others:

    "map": {
        "de": {
            "in": [
                    "localization/argos-saleslogix/slx-mobile-strings-beta1-format-de.xml",
                    "localization/argos-saleslogix/slx-mobile-strings-beta1-text-de.xml"
                ],
            "out": "localization/argos-saleslogix/de.js"
        }
    }

3\. The `in` key can be an array pointing the two split files (as seen) or it can be just a string pointing the combined file, change it to be the path of our combined de file:

    "map": {
        "de": {
            "in": "localization/argos-template/mobile-strings-de.xml",
            "out": "localization/argos-saleslogix/de.js"
        }
    }

4\. Adjust the `out` key to the path you want the generated javascript file to be. The name of the javascript file must be
the [ISO 3166](http://www.iso.org/iso/country_codes.htm) country-language code to match:

    "map": {
        "de": {
            "in": "localization/argos-template/mobile-strings-de.xml",
            "out": "localization/argos-template/de.js"
        }
    }

5\. Leave the transform as is, thats the part that reads the XML but we do need a new template, so change the `import` `template` to:

    "import": {
        "transform": "transforms/argos-saleslogix-import.xslt",
        "template": "templates/argos-template.erb",
        "map": {
            "de": {
                "in": "localization/argos-template/mobile-strings-de.xml",
                "out": "localization/argos-template/de.js"
            }
        }
    },


6\. Duplicate and rename `C:\code\argos-localizer\templates\argos-saleslogix.erb` to `argos-template.erb`.

7\. Open the new file and adjust the namespaces:

    define('localization/template/<%= culture %>', ['localization/<%= culture %>', 'Mobile/Template/ApplicationModule'], function() {
    <% localized.each do |name, object| %>

    localize("<%= name %>", <%= JSON.pretty_generate(object) %>);
    <% end %>
    });

8\. We changed the define path which is where the `.js` file will be placed and the `ApplicationModule` name to our application module.

9\. Open Windows Run (winkey+r) and run the tool with the same options as before but `import` instead of `export`:

    "C:\code\argos-localizer\argos-localizer.exe import --base-path "C:\code\mobile" --config-path "C:\code\argos-localizer\config\argos-template.json"

10\. You should now have the file `C:\code\mobile\localization\argos-template\de.js` that looks like:

    define('localization/template/de', ['localization/de', 'Mobile/Template/ApplicationModule'], function() {

    localize("Sage.Platform.Mobile.Calendar", {
      "titleText": "Calendar",
      "amText": "AM",
      "pmText": "PM"
    });

    localize("Sage.Platform.Mobile.Detail", {

    ... and so on ....


## Applying The Localization

We have the German javascript translation for our app -- time to add it in and load it up.

1\. Copy the `de.js` file to  `C:\code\mobile\products\argos-template\localization\template\`. Make sure it is within the `template` folder within `localization`.

* The top level localization folder is for non-string localization such as currency, number grouping, decimal symbol, etc.

2\. Open `C:\code\mobile\products\argos-template\index-dev.html` and scroll down to where it is creating the localization array:

        require([application].concat(configuration), function(application, configuration) {
            var localization = [
                'localization/en',
                'localization/template/en'
            ];


3\. Change it from `/en` to `/de`:

        require([application].concat(configuration), function(application, configuration) {
            var localization = [
                'localization/de',
                'localization/template/de'
            ];

4\. Open `index-dev.html` and notice the top title:

![German Home](img/German_home.png)

5\. Use `index-dev.aspx` for dynamic server (C#) detection of the locale the browser is running instead of typing it in manually in `index-dev.html`.
