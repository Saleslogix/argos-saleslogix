<%@ Page AutoEventWireup="true" Language="c#" Culture="auto" UICulture="auto" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no,email=no,address=no" />

    <title>SalesLogix</title>

    <link rel="apple-touch-icon-precomposed" href="content/images/icon.png" />
    <link rel="apple-touch-startup-image" href="content/images/loading.png">

    <!-- CSS -->
    <link type="text/css" rel="stylesheet" href="../../argos-sdk/content/reui/themes/sage-green/theme.css" />
    <link type="text/css" rel="stylesheet" href="../../argos-sdk/content/css/base.css" />
    <link type="text/css" rel="stylesheet" href="content/css/toggle.css" />
    <link type="text/css" rel="stylesheet" href="content/css/app.css" />

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

    <!-- DateJS -->
    <script type="text/javascript" src="../../argos-sdk/libraries/datejs/build/date.js"></script>
    <!-- DateJS Localization -->
    <% foreach (var include in EnumerateLocalizations("../../argos-sdk", "libraries/datejs/src/globalization")) { %>
    <script type="text/javascript" src="../../argos-sdk/<%= include.Path %>"></script>
    <% } %>

    <!-- Simplate -->
    <script type="text/javascript" src="../../argos-sdk/libraries/Simplate.js"></script>

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
        { name: 'Sage/Platform/Mobile', location: '../../argos-sdk/src' },
        { name: 'Mobile/SalesLogix', location: 'src' }
    ]});
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
            require(localization.concat('dojo/domReady!'), function() {
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
