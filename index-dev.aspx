<%@ Page AutoEventWireup="true" Language="c#" Culture="auto" UICulture="auto" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>

<!DOCTYPE html>
<!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en" class="gtie9 modern">
<!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no,email=no,address=no" />

    <title>Saleslogix</title>

    <link rel="apple-touch-icon" href="content/images/touch-icon-iphone.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="content/images/72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="content/images/touch-icon-ipad.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="content/images/114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="content/images/touch-icon-iphone-retina.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="content/images/144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="content/images/touch-icon-ipad-retina.png" />
    <link rel="apple-touch-startup-image" href="content/images/loading.png">

    <!-- less files -->
    <link rel="stylesheet/less" type="text/css" href="../../argos-sdk/content/css/themes/swiftpage.less" />
    <link rel="stylesheet/less" type="text/css" href="content/css/app.less" />

    <!-- less -->
    <script type="text/javascript">
        less = {
            env: "development", // or "production"
            async: false,       // load imports async
            fileAsync: false,   // load imports async when in a page under
                                // a file protocol
            poll: 1000,         // when in watch mode, time in ms between polls
            functions: {},      // user functions, keyed by name
            dumpLineNumbers: "all", // or "mediaQuery" or "all"
            relativeUrls: true,// whether to adjust url's to be relative
                                // if false, url's are already relative to the
                                // entry less file
            rootpath: ""// a path to add on to the start of every url
                                //resource
        };
    </script>
    <script type="text/javascript" src="../../argos-sdk/libraries/less/less-1.4.1.min.js"></script>

    <!-- JSON -->
    <script type="text/javascript" src="../../argos-sdk/libraries/json2.js"></script>

    <!-- ReUI -->
    <script type="text/javascript">
    reConfig = {
        autoInit: false,
        legacyMode: false,
        showInitialPage: false,
        updateBackButtonText: false
    };
    </script>
    <script type="text/javascript" src="../../argos-sdk/libraries/reui/reui.js"></script>

    <!-- SData Client Library -->
    <script type="text/javascript" src="../../argos-sdk/libraries/sdata/sdata-client-dependencies-debug.js"></script>
    <script type="text/javascript" src="../../argos-sdk/libraries/sdata/sdata-client-debug.js"></script>

    <!-- Simplate -->
    <script type="text/javascript" src="../../argos-sdk/libraries/Simplate.js"></script>

    <!-- Overthrow -->
    <script type="text/javascript" src="../../argos-sdk/libraries/overthrow/overthrow.js"></script>

    <!-- canvas2image for when HTMLCanvasElement.prototype.toDataURL isn't available -->
    <script type="text/javascript" src="../../argos-sdk/libraries/canvas2image.js"></script>

    <!-- Dojo -->
    <script type="text/javascript" src="../../argos-sdk/libraries/dojo/dojo/dojo.js" data-dojo-config="parseOnLoad:false, async:true, blankGif:'content/images/blank.gif'"></script>
    <script type="text/javascript">
    require({
        baseUrl: "./",
        packages: [
            { name: 'dojo', location: '../../argos-sdk/libraries/dojo/dojo' },
            { name: 'dijit', location: '../../argos-sdk/libraries/dojo/dijit' },
            { name: 'dojox', location: '../../argos-sdk/libraries/dojo/dojox' },
            { name: 'snap', location: '../../argos-sdk/libraries/snap', main: 'snap' },
            { name: 'moment', location: '../../argos-sdk/libraries/moment', main: 'moment' },
            { name: 'moment_langs', location: '../../argos-sdk/libraries/moment/min', main: 'langs' },
            { name: 'Sage/Platform/Mobile', location: '../../argos-sdk/src' },
            { name: 'Mobile/SalesLogix', location: 'src' },
            { name: 'configuration', location: 'configuration' },
            { name: 'localization', location: 'localization' }
        ],
        paths: {
            'Mobile/SalesLogix': './src',
            'Sage/Platform/Mobile': '../../argos-sdk/src'
        }
    });
    </script>

    <script type="text/javascript">
    (function() {
        var application = 'Mobile/SalesLogix/Application',
            configuration = [
                'configuration/development'
            ];
        require([application].concat(configuration), function(application, configuration) {
            var localization = <%= Serialize(
                EnumerateLocalizations("localization")
                    .Select(item => item.Path.Substring(0, item.Path.Length - 3))
            ) %>;
            require(localization.concat(['moment_langs', 'dojo/domReady!']), function() {
                moment.lang('<%= System.Globalization.CultureInfo.CurrentUICulture.Parent.ToString().ToLower() %>');
                var instance = new application(configuration);

                instance.activate();
                instance.init();
                instance.run();
            });
        });
    })();
    </script>
</head>
<body>
    <!-- Run "grunt watch" to enable this script -->
    <script src="http://localhost:35729/livereload.js"></script>
</body>
</html>

<script type="text/C#" runat="server">
    protected class FileItem
    {
        public string Path { get; set; }
        public FileInfo File { get; set; }
    }

    protected string Serialize(object item)
    {
        var serializer = new JavaScriptSerializer();
        return serializer.Serialize(item);
    }

    protected string ToRelativeUrlPath(DirectoryInfo rootDirectory, FileInfo file)
    {
        var rootPath = rootDirectory.FullName;
        var filePath = file.FullName;
        
        if (filePath.StartsWith(rootPath)) 
        {           
            var relativePath = filePath.Substring(rootPath.Length + 1);
            return relativePath.Replace('\\', '/');
        }

        throw new ApplicationException("Invalid root path specified.");
    }              
                
    protected IEnumerable<FileItem> Enumerate(string path, Predicate<FileInfo> predicate)
    {
        var rootDirectory = new DirectoryInfo(Path.GetDirectoryName(Request.PhysicalPath));
        var includeDirectory = new DirectoryInfo(Path.Combine(rootDirectory.FullName, path));

        if (includeDirectory.Exists)
        {
            var files = includeDirectory.GetFiles("*", SearchOption.AllDirectories).AsEnumerable();

            if (predicate != null) files = files.Where(file => predicate(file));

            foreach (var file in files)            
                yield return new FileItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, file),
                    File = file
                };            
        }
    }

    protected IEnumerable<FileItem> Enumerate(string path)
    {
        return Enumerate(path, (file) => true);
    }

    protected IEnumerable<FileItem> Enumerate(string path, Regex include)
    {
        return Enumerate(path, (file) => include.IsMatch(file.Name));
    }

    protected IEnumerable<FileItem> EnumerateLocalizations(string path)
    {
        return EnumerateLocalizations(String.Empty, path);
    }

    protected IEnumerable<FileItem> EnumerateLocalizations(string root, string path)
    {
        var currentCulture = System.Globalization.CultureInfo.CurrentUICulture;
        var rootDirectory = new DirectoryInfo(Path.Combine(Path.GetDirectoryName(Request.PhysicalPath), root));
        var includeDirectory = new DirectoryInfo(Path.Combine(rootDirectory.FullName, path));
        
        if (includeDirectory.Exists)
        {
            var parentFileName = String.Format(@"{0}.js", currentCulture.Parent.Name);
            var parentFile = new FileInfo(Path.Combine(includeDirectory.FullName, parentFileName));
            var targetFileName = String.Format(@"{0}.js", currentCulture.Name);
            var targetFile = new FileInfo(Path.Combine(includeDirectory.FullName, targetFileName)); 
                                  
            if (targetFile.Exists)            
                yield return new FileItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, targetFile),
                    File = targetFile
                };    
            else if (parentFile.Exists)
                yield return new FileItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, parentFile),
                    File = targetFile
                };  
            
            foreach (var moduleDirectory in includeDirectory.GetDirectories())
            {
                parentFile = new FileInfo(Path.Combine(moduleDirectory.FullName, parentFileName));
                targetFile = new FileInfo(Path.Combine(moduleDirectory.FullName, targetFileName));
                
                if (targetFile.Exists)            
                    yield return new FileItem
                    {
                        Path = ToRelativeUrlPath(rootDirectory, targetFile),
                        File = targetFile
                    };    
                else if (parentFile.Exists)
                    yield return new FileItem
                    {
                        Path = ToRelativeUrlPath(rootDirectory, parentFile),
                        File = targetFile
                    };   
            }    
        }
    }
     
</script>
