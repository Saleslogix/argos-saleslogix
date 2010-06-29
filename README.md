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
		git clone git@github.com:SageScottsdalePlatform/argos-saleslogix.git
*	On your web server, create a Virtual Directory (IIS6), an Application (IIS7), or an Alias (Apache), or functional equivalent, called `mobile`, pointing to the base directory where you cloned [Argos SDK][argos-sdk], eg
	
		cd \projects\sage\mobile
*	In your browser, navigate to the path `/mobile/products/argos-saleslogix/index-dev.html` on your web server, eg

		http://localhost/mobile/products/argos-saleslogix/index-dev.html

[argos-sdk]: https://github.com/SageScottsdalePlatform/argos-sdk "Argos SDK Source"
