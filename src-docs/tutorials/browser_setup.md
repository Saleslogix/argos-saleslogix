##Supported Browsers
Any HTML5 compatible browser should be able to run `argos-sdk` without issue, namely: Chrome 11+, FireFox 4+, IE 9+, and Safari 5+.

###Cache
During development you may wish to disable browser caching: storing of cookies, form data, history, local storage etc. This way you can make a change to your code and simply refresh your browser to load the new changes:

* Chrome: Incognito `(Ctrl+Shift+N)` 
* FireFox: Private Browsing `(Ctrl+Shift+P)`
* IE: InPrivate Browsing `(Ctrl+Shift+P)`

These private browsing modes either a) don't store any information or b) store them in a temp location and is deleted upon closing the window. There are also command line arguments to always open the browser to a particular mode or profile.

###Console/Debugging
The final step is making sure you can:

1. Access the javascript console 
1. Inspect HTML/CSS of the document
1. View any network activity for your browser of choice:

**Chrome**   
Console: `Ctrl+Shift+j`   
HTML/CSS: Right click on web page, Inspect Element option   
Network: `Ctrl+Shift+i`, click Network tab

**FireFox** - install the FireBug plugin first   
Console: `Ctrl+F12`   
HTML/CSS: `Ctrl+F12`, select the Inspect Element tool, click on web page   
Network: `Ctrl+F12`, click Net tab

**IE**   
Console: `F12`, click Script tab   
HTML/CSS: `F12`, Ctrl+b (or click Select tool), click on web page   
Network: `F12`, click Network tab

**Safari**   
Console: `Ctrl+Alt+c`   
HTML/CSS: Right click web page, Inspect Element option   
Network: `Ctrl+Alt+c`, click Network tab
