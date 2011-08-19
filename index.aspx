<%@ Page AutoEventWireup="true" Language="c#" Culture="auto" UICulture="auto" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Generic" %>

<!DOCTYPE html>
<html manifest="index.manifest.ashx">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no,email=no,address=no" />
    
    <title>SalesLogix</title> 

    <link rel="apple-touch-icon-precomposed" href="content/images/icon.png" />
    <link rel="apple-touch-startup-image" href="content/images/loading.png">

    <link type="text/css" rel="stylesheet" href="content/reui/themes/sage-green/theme.css" />
    <link type="text/css" rel="stylesheet" href="content/css/toggle.css" />
    <link type="text/css" rel="stylesheet" href="content/css/base.css" />  
    <link type="text/css" rel="stylesheet" href="content/css/app.css" />
    
    <script type="text/javascript" src="content/ext/ext-core.js"></script>
    <script type="text/javascript">
    reConfig = {
        autoInit: false,
        legacyMode: false,
        showInitialPage: false,
        updateBackButtonText: false
    };
    </script>
    <script type="text/javascript" src="content/javascript/argos-dependencies.js"></script>
    <script type="text/javascript" src="content/javascript/argos-sdk.js"></script>
    <script type="text/javascript" src="content/javascript/argos-saleslogix.js"></script>

    <!-- Configuration -->
    <% foreach (var include in Enumerate("configuration")) { %>
    <script type="text/javascript" src="<%= include.Path %>"></script>
    <% } %>

    <!-- Localization -->
    <% foreach (var include in EnumerateLocalizations("localization")) { %>
    <script type="text/javascript" src="<%= include.Path %>"></script>
    <% } %>

    <script type="text/javascript">
    Ext.onReady(function() {
        var application = new Mobile.SalesLogix.Application();

        application.activate();
        application.init();
        application.run();
    });
    </script>
</head>
<body>
</body>
</html>

<script type="text/C#" runat="server">
    public class EnumerationItem
    {
        public string Path { get; set; }
        public FileInfo File { get; set; }
    }

    protected string ToRelativeUrlPath(DirectoryInfo rootDirectory, FileInfo file)
    {
        return file.FullName.Substring(rootDirectory.FullName.Length + 1).Replace('\\', '/');
    }
                
    protected IEnumerable<EnumerationItem> Enumerate(string path, Predicate<FileInfo> predicate)
    {
        var rootDirectory = new DirectoryInfo(Path.GetDirectoryName(Request.PhysicalPath));
        var includeDirectory = new DirectoryInfo(Path.Combine(rootDirectory.FullName, path));

        if (includeDirectory.Exists)
        {
            var files = includeDirectory.GetFiles("*", SearchOption.AllDirectories).AsEnumerable();

            if (predicate != null) files = files.Where(file => predicate(file));

            foreach (var file in files)            
                yield return new EnumerationItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, file),
                    File = file
                };            
        }
    }

    protected IEnumerable<EnumerationItem> Enumerate(string path)
    {
        return Enumerate(path, (file) => true);
    }

    protected IEnumerable<EnumerationItem> Enumerate(string path, Regex include)
    {
        return Enumerate(path, (file) => include.IsMatch(file.Name));
    }    

    protected IEnumerable<EnumerationItem> EnumerateLocalizations(string path)
    {
        var currentCulture = System.Globalization.CultureInfo.CurrentUICulture;
        var rootDirectory = new DirectoryInfo(Path.GetDirectoryName(Request.PhysicalPath));
        var includeDirectory = new DirectoryInfo(Path.Combine(rootDirectory.FullName, path));        

        if (includeDirectory.Exists)
        {
            var parentFileName = String.Format(@"{0}.js", currentCulture.Parent.Name);
            var parentFile = new FileInfo(Path.Combine(includeDirectory.FullName, parentFileName));
            var targetFileName = String.Format(@"{0}.js", currentCulture.Name);            
            var targetFile = new FileInfo(Path.Combine(includeDirectory.FullName, targetFileName)); 
                                  
            if (targetFile.Exists)            
                yield return new EnumerationItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, targetFile),
                    File = targetFile
                };    
            else if (parentFile.Exists)
                yield return new EnumerationItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, parentFile),
                    File = targetFile
                };  
            
            foreach (var moduleDirectory in includeDirectory.GetDirectories())
            {
                parentFile = new FileInfo(Path.Combine(moduleDirectory.FullName, parentFileName));
                targetFile = new FileInfo(Path.Combine(moduleDirectory.FullName, targetFileName));
                
                if (targetFile.Exists)            
                    yield return new EnumerationItem
                    {
                        Path = ToRelativeUrlPath(rootDirectory, targetFile),
                        File = targetFile
                    };    
                else if (parentFile.Exists)
                    yield return new EnumerationItem
                    {
                        Path = ToRelativeUrlPath(rootDirectory, parentFile),
                        File = targetFile
                    };   
            }    
        }
    }
     
</script>