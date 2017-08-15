#Overview

##Starting Files
Using `argos-template` as a starting point provides the following files to get started:

**index-dev.aspx**   
Development landing page. Pulls in CSS, libraries and initializes application. Use .html version for non-asp servers. All references and defaults are set to development versions.

**index.aspx**   
Production landing page. This file will be used when application is built and deployed. Use .html version for non-asp servers.

**src/Application.js**   
Application is the global object accessible anywhere using the `App` variable. It handles communication the underlying rendering library and handles topics like: navigation history, initializing views, global events. You may want to consider code that affects the entire app to be placed here: login, user info, session state, preference saving/loading etc.

**src/ApplicationModule.js**   
This file is the "load and register" module. All views and any supporting modules will be put as dependencies and referenced in this module. It also handles registering the built in toolbars and loading any external customizations.

**src/Views/Home.js**   
This is the built in Home page that is initially loaded and navigated to upon load. It is like a table of contents with links to the rest of your app.

**src/Views/MainToolbar.js and FooterToolbar.js**   
These two modules are for establishing a base top and bottom toolbars that inject standard mobile buttons such as back, home, top of page, etc.

**localization/en.js**   
This file sets up the culture configuration such as decimal places, digits, currency symbol, percent symbols. 

**localization/template/en.js**   
This file is empty as the app will be setup as english in default. When adding more locales their respective file within this folder will have overrides for all the strings and formatters in the application.

**content/**   
All css and image files.

**configuration/development.js and production.js**   
These two files contain the SData service setup information like URL, contract, and format type. `index-dev` uses development and `index` uses production.

**build/release.jsb2**   
This file is the build description, any new files (or deletion of files) will need to be updated in this definition.

**build/release.cmd and release.sh**   
These are the script options to run for this application such target folder, .net tool, java tool, what to xcopy etc.
