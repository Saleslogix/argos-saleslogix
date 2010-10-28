Installation
------------
### Prerequisites
*	A web server

### Clone repository
*	Open a command prompt
*	change to the base directory where you cloned [Argos SDK][argos-sdk], eg  

		cd \projects\sage\mobile
*	Execute the following commands

		cd products
		git clone http://github.com/SageScottsdalePlatform/argos-saleslogix.git
*	On your web server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the base directory where you cloned [Argos SDK][argos-sdk], eg
	
		cd \projects\sage\mobile
*	In your browser, navigate to the path `/mobile/products/argos-saleslogix/index-dev.html` on your web server, eg

		http://localhost/mobile/products/argos-saleslogix/index-dev.html

### Building A Release Version 

#### Requirements
*	Windows 
*	The Java Runtime (JRE)
*	The environment variable, `JAVA_HOME`, pointing to the JRE base path, eg

		c:\Program Files (x86)\Java\jre6

#### Steps
*	Save this [gist](http://gist.github.com/457984) as `build-product.cmd` to directory where you cloned [Argos SDK][argos-sdk]
*	Open a command prompt and excute the following, changing paths as appropriate

		cd \projects\sage\mobile
		build-product saleslogix
*	The deployed product will be in a `deploy` folder in the directory where you cloned [Argos SDK][argos-sdk]


[argos-sdk]: https://github.com/SageScottsdalePlatform/argos-sdk "Argos SDK Source"
