# Infor CRM SLX Mobile
argos-saleslogix utilized the [argos-sdk](https://github.com/Saleslogix/argos-sdk) to form the Infor CRM SLX Mobile application. It includes list, detail, and edit views for most of the core CRM entities, such as Accounts, Contacts, Tickets, Leads, Opportunities, and Activities. Additional entities are available if the back office extensions (BOE) integration is enabled.

## API/Documentation
The Infor CRM SLX Mobile team maintains an "argos" documentation site available [here](http://developer.saleslogix.com/argos/). Additional guides are also available on the [argo-sdk](https://github.com/Saleslogix/argos-sdk/wiki) wiki. A sample customization is available [here](https://github.com/Saleslogix/argos-sample).

Also check out our new [Youtube Channel](https://www.youtube.com/channel/UCd6F-RBx63U0ARXOwj4KoFQ/videos)!

## Installation From AA (Application Architect) Bundle
- Download the latest mobile release from the Infor Extreme Portal
- Extract the zip
- There should be yet another zip file that ends with "VFS.zip". Example: "Infor Mobile v3.4 for 8.0 and later VFS.zip". Extract this zip as well.
- Once extracted, go into the Portal/SlxMobile/SourceFiles directory
- Copy the argos-sdk and products folders to your development location, such as C:\code\mobile
- In IIS (or your favorite web server), set the root directory to C:\code\mobile
- Open your browser to the URL your web server is listening on: (http://localhost:8000/products/argos-saleslogix/index-dev.html)

The AA bundle does not include index-dev-\*.html files. You can copy your product's index-dev-\*.html file (if doing a customization) into products/argos-saleslogix or use the out of the box one located [here](https://raw.githubusercontent.com/Saleslogix/argos-saleslogix/develop/index-dev.html).

## Installation From Source

### Prerequisites
* [NodeJS](https://nodejs.org/)
* [Grunt](http://gruntjs.com/getting-started)

### Install Dependencies
The package.json file in the root of argos-saleslogix contains a list of dependencies, required for building from source. Here is how to install them:
-	Open a command prompt in the argos-saleslogix directory
- run `npm install`

Once dependencies are installed, here are a list of commands available:
* `npm run test` - Runs the unit tests using Jasmine. Requires grunt cli.
* `npm start` - Local development web server. Open your browser to http://localhost:8000/. Copy scripts/default.config.json to scripts/config.json to override the port and/or the SData host.
* `npm run lint` - Lints the src folder. We use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md).
* `npm run less` - Compiles .less stylesheets into CSS. Requires grunt cli.
* `npm run build` - "Transpiles" the src folder and outputs to src-out. The src folder contains ECMAScript2015 code. The src-out folder will contain ECMAScript 5 code that older browsers will execute.
* `npm run watch` - Watches the src folder for changes and runs `npm run build` and `npm run lint` automatically when files are changed.

### Notice To Customizers
Starting in mobile 3.4, the index-dev-\*.html files no longer point to src, instead they point to src-out. The src folder now contains ECMAScript2015 (ES6) source code. A build step is required to populate the src-out. You will need to run `npm run build` from the argos-saleslogix directory if working from git.

### Clone repository
1.	Open a command prompt.
2.	change to the base directory where you cloned [Argos SDK][argos-sdk], eg:

		cd C:\code\mobile
3.	Execute the following commands (clone command shown with READ-ONLY URL; if you are a commiter, use the appropriate Read+Write URL).

		cd products

		git clone  git://github.com/SageSalesLogix/argos-saleslogix.git

### Setup and run the application in "debug" mode
1.	On your web server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the base directory where you cloned [Argos SDK][argos-sdk], eg:

		cd C:\code\mobile
3. 	Ensure you have a MIME type setup for .less files. Example using web.config in IIS7:
	```
	<system.webServer>
        	<staticContent>
            		<mimeMap fileExtension=".less" mimeType="text/css" />
        	</staticContent>
    	</system.webServer>
	```
2.	In your browser, navigate to the path `/mobile/products/argos-saleslogix/index-dev.html` on your web server, eg:

		http://localhost/mobile/products/argos-saleslogix/index-dev.html

### Building A Release Version From Source

#### Requirements
If building on windows, the argos-sdk tools folder contains a binary called JsBit that will read the release.jsb2 file and combine/minify the required resources. If building from Linux or OSX, Mono is required to execute JsBit.

### Build scripts
- Change to the argo-sdk directory, and execute the build script there: `cd ..\argos-sdk` and then `build\release.cmd` (`./build/release.sh` for non Windows)
- Copy the contents of `argos-sdk\deploy` to a common shared directory, such as `C:\code\mobile\deploy`
- Change back to the argos-saleslogix directory and run `build\release.cmd`
- Copy the contents of `argos-saleslogix\deploy` to the same shared deploy directory used in the sdk step (`C:\code\mobile\deploy`)
- Copy the deploy folder to your web server

### Deploying

#### Steps
1.	Open the deploy folder for the product, eg:

		mobile\deploy\argos-saleslogix
2.	Copy the entire contents of the product's deploy folder (eg: `mobile\deploy\argos-saleslogix`) to a location on the webserver that will be hosting the mobile content (hereafter, mobile server).
3.	On the mobile server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the directory where you copied the content to.  In the recommended configuration, on the same server where SData is being hosted, this mapping should be at the same level as the `sdata` mapping.
4.	If SData is being hosted on a different server than the mobile host, CORS (Cross Origin Resource Sharing), must be enabled on the SData server.  You can find documentation for setting it up on IIS at: [Setting-Up-CORS](https://github.com/Saleslogix/argos-sdk/wiki/Setting-Up-CORS).

## Customization
* You can customize the product without modifying the core views.
* See the [argos-sample][argos-sample] customization module for a set of customization scenario examples.

[argos-sdk]: https://github.com/Saleslogix/argos-sdk "Argos SDK Source"
[argos-sample]: https://github.com/Saleslogix/argos-sample "Customization module for argos-saleslogix"
[argos]: https://github.com/Saleslogix/argos "Argos SDK API Documentation"
