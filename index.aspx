<%@ Page AutoEventWireup="true" Language="c#" Culture="auto" UICulture="auto" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Text.RegularExpressions" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<!DOCTYPE html>
<!--[if IE 9 ]>    <html lang="en" class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en" class="gtie9 modern" manifest="index.manifest.ashx">
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
    <!-- Startup images -->

    <!-- iOS 6 & 7 iPad (retina, portrait) -->
    <link href="content/images/apple-touch-startup-image-1536x2008.png"
          media="(device-width: 768px) and (device-height: 1024px)
             and (orientation: portrait)
             and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">

    <!-- iOS 6 & 7 iPad (retina, landscape) -->
    <link href="content/images/apple-touch-startup-image-1496x2048.png"
          media="(device-width: 768px) and (device-height: 1024px)
             and (orientation: landscape)
             and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">

    <!-- iOS 6 iPad (portrait) -->
    <link href="content/images/apple-touch-startup-image-768x1004.png"
          media="(device-width: 768px) and (device-height: 1024px)
             and (orientation: portrait)
             and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image">

    <!-- iOS 6 iPad (landscape) -->
    <link href="content/images/apple-touch-startup-image-748x1024.png"
          media="(device-width: 768px) and (device-height: 1024px)
             and (orientation: landscape)
             and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image">

    <!-- iOS 6 & 7 iPhone 5 -->
    <link href="content/images/apple-touch-startup-image-640x1096.png"
          media="(device-width: 320px) and (device-height: 568px)
             and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">

    <!-- iOS 6 & 7 iPhone (retina) -->
    <link href="content/images/apple-touch-startup-image-640x920.png"
          media="(device-width: 320px) and (device-height: 480px)
             and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image">

    <!-- iOS 6 iPhone -->
    <link href="content/images/apple-touch-startup-image-320x480.png"
          media="(device-width: 320px) and (device-height: 480px)
             and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image">

    <link type="text/css" rel="stylesheet" href="content/css/themes/swiftpage/sdk.min.swiftpage.css" />
    <link type="text/css" rel="stylesheet" href="content/css/app.min.css" />

    <!-- Dojo -->
    <script type="text/javascript" src="content/dojo/dojo/dojo.js" data-dojo-config="parseOnLoad:false, async:true, blankGif:'content/images/blank.gif'"></script>
    <script type="text/javascript">
    require({
        baseUrl: "./",
        packages: [
            { name: 'dojo', location: 'content/dojo/dojo' },
            { name: 'dijit', location: 'content/dojo/dijit' },
            { name: 'dojox', location: 'content/dojo/dojox' },
            { name: 'configuration', location: 'configuration' },
            { name: 'localization', location: 'localization' }
        ],
        paths: {
            'Mobile/SalesLogix/DefaultMetrics.txt': 'content/javascript/DefaultMetrics.txt'
        }
    });
    </script>
    <script type="text/javascript" src="content/dojo/dojo-dependencies.js"></script>

    <!-- Core -->
    <script type="text/javascript">
    reConfig = {
        autoInit: false,
        legacyMode: false,
        showInitialPage: false,
        disableFx: true,
        updateBackButtonText: false
    };
    </script>
    <script type="text/javascript" src="content/javascript/argos-dependencies.js"></script>
    <script type="text/javascript" src="content/javascript/argos-sdk.js"></script>

    <!-- Application -->
    <script type="text/javascript" src="content/javascript/argos-saleslogix.js"></script>

    <!-- Modules -->
    <!--{{modules}}-->

    <script type="text/javascript">
    (function() {
        var application = 'Mobile/SalesLogix/Application',
            configuration = <%= Serialize(
                Enumerate("configuration", (file) => file.Name == "production.js")
                    .Select(item => item.Path.Substring(0, item.Path.Length - 3))
            ) %>;
        require(['moment', application].concat(configuration), function(moment, application, configuration) {
            var localization = <%= Serialize(
                EnumerateLocalizations("localization")
                    .Select(item => item.Path.Substring(0, item.Path.Length - 3))
            ) %>;
            require(localization.concat('dojo/domReady!'), function() {
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
        var currentCulture = System.Globalization.CultureInfo.CurrentCulture;
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
