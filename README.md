Installation
------------
### Prerequisites
*	A web server (see NodeJS steps if you do not have a web server installed or would like to use a lightweight dev server)

### NodeJS (optional)
1.	Install NodeJS from: http://nodejs.org/
2.	Open a command prompt in the argos-saleslogix directory
3.	Install gruntjs (http://gruntjs.com/getting-started)

		npm install -g grunt-cli
4. 	The package.json file in the root of argos-saleslogix contains nodejs dependencies, to install them run:
	
		npm install

GruntJS is a task runner. We have defined tasks to run in Gruntfile.coffee. Here are some commands you can run via the command line (in the argos-saleslogix directory)
* Unit tests: `grunt test`
* Missing a web server? Run `grunt connect:server:keepalive` and open your browsser to http://localhost:8000/
* JSHint: `grunt jshint`
* csslint: `grunt csslint`
* cssmin: `grunt cssmin` - cssmin will output to the min/css folder. This folder is included in the build\release.cmd script
* Plus many more: http://gruntjs.com/plugins

### Clone repository
1.	Open a command prompt.
2.	change to the base directory where you cloned [Argos SDK][argos-sdk], eg:

		cd \projects\sage\mobile
3.	Execute the following commands (clone command shown with READ-ONLY URL; if you are a commiter, use the appropriate Read+Write URL).

		cd products
		git clone git://github.com/SageSalesLogix/argos-saleslogix.git

    __Note:__ If you're downloading and extracting the zip file instead of using git directly, the top-level folder in your download will probably be named something like "SageSalesLogix-argos-saleslogix-nnnnn". You'll want to rename this folder to argos-saleslogix, and put it under your products sub-folder. You'll end up with a folder structure like this:
        ...\mobile\argos-sdk
        ...\mobile\products\argos-saleslogix

### Setup and run the application in "debug" mode
1.	On your web server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the base directory where you cloned [Argos SDK][argos-sdk], eg:

		cd \projects\sage\mobile
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

### Building A Release Version

#### Requirements
*	Windows
*	The Java Runtime (JRE)
*	The environment variable, `JAVA_HOME`, pointing to the JRE base path, eg:

		c:\Program Files (x86)\Java\jre6

#### Steps
1.	Save this [gist](https://gist.github.com/jbest84/6943860) as `build-product.cmd` (or for *nix save this [gist](https://gist.github.com/jbest84/5391340) instead as `build-product.sh`) to directory where you cloned [Argos SDK][argos-sdk].
2.	Open a command prompt and excute the following, changing paths as appropriate, eg:

		cd \projects\mobile
		build-product saleslogix
3.	The deployed product will be in a `deploy` folder in the directory where you cloned [Argos SDK][argos-sdk].

### Deploying

#### Steps
1.	Open the deploy folder for the product, eg:

		mobile\deploy\argos-saleslogix
2.	If the mobile content is going to be hosted on a different server, the manifest file and the environment file must be changed (or a new one created).

	*	In the `index.manifest` file at the root of the deployed site, add the full SData server URL, including the trailing slash, to the end of the `NETWORK:` section, eg:

			NETWORK:
			../sdata/
			http://mysdataserver/sdata/
	*	Modify the environment file, `environment/default.js`, to point to the appropriate SData server.  If a new environment file was created, it must be added to the files:
		*	index.manifest
		*	index.html
		*	index-nocache.html
3.	Copy the entire contents of the product's deploy folder (eg: `mobile\deploy\argos-saleslogix`) to a location on the webserver that will be hosting the mobile content (hereafter, mobile server).
4.	On the mobile server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the directory where you copied the content to.  In the recommended configuration, on the same server where SData is being hosted, this mapping should be at the same level as the `sdata` mapping.
5.	On the mobile server, ensure that the MIME type corresponding to the `.manifest` extension is `text/cache-manifest`.  This is a requirement for application caching/offline access.
6.	If SData is being hosted on a different server than the mobile host, CORS (Cross Origin Resource Sharing), must be enabled on the SData server.  You can find documentation for setting it up on IIS at: [Setting-Up-CORS](https://github.com/Saleslogix/argos-sdk/wiki/Setting-Up-CORS).

### Customization
*       You can customize the product without modifying the core views.
*       See the [Argos Sample][argos-sample] customization module for a set of customization scenario examples.

[argos-sdk]: https://github.com/Saleslogix/argos-sdk "Argos SDK Source"
[argos-sample]: https://github.com/Saleslogix/argos-sample "Customization module for argos-saleslogix"
[argos]: https://github.com/Saleslogix/argos "Argos SDK API Documentation"
