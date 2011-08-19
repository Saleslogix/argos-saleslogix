<%@ Page AutoEventWireup="true" Language="c#" Culture="auto" UICulture="auto" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Generic" %>

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

    <!-- Ext Core -->
    <script type="text/javascript" src="../../argos-sdk/libraries/ext/ext-core.js"></script>

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

    <!-- Simplate -->
    <script type="text/javascript" src="../../argos-sdk/libraries/Simplate.js"></script>

    <!-- Argos SDK -->
    <script type="text/javascript" src="../../argos-sdk/src/Application.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/ApplicationModule.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Utility.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Convert.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Format.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Toolbar.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/MainToolbar.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/View.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/List.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/GroupedList.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Detail.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Edit.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Calendar.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/Field.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/TextField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/DecimalField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/HiddenField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/EditorField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/AddressField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/NameField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/NoteField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/PhoneField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/BooleanField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/LookupField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/PicklistField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/SelectField.js"></script>
    <script type="text/javascript" src="../../argos-sdk/src/Controls/DateField.js"></script>

    <!-- Argos SalesLogix -->
    <script type="text/javascript" src="src/Environment.js"></script>
    <script type="text/javascript" src="src/Application.js"></script>
    <script type="text/javascript" src="src/ApplicationModule.js"></script>
    <script type="text/javascript" src="src/Format.js"></script>
    <script type="text/javascript" src="src/Template.js"></script>
    <script type="text/javascript" src="src/Validator.js"></script>
    <script type="text/javascript" src="src/views/MainToolbar.js"></script>
    <script type="text/javascript" src="src/views/FooterToolbar.js"></script>
    <script type="text/javascript" src="src/views/UpdateToolbar.js"></script>
    <script type="text/javascript" src="src/views/Home.js"></script>
    <script type="text/javascript" src="src/views/Help.js"></script>
    <script type="text/javascript" src="src/views/Login.js"></script>
    <script type="text/javascript" src="src/views/PickList.js"></script>
    <script type="text/javascript" src="src/views/NameEdit.js"></script>
    <script type="text/javascript" src="src/views/TextEdit.js"></script>
    <script type="text/javascript" src="src/views/Configure.js"></script>
    <script type="text/javascript" src="src/views/Settings.js"></script>
    <script type="text/javascript" src="src/views/SelectList.js"></script>
    <script type="text/javascript" src="src/views/ContextDialog.js"></script>
    <script type="text/javascript" src="src/views/AddAccountContact.js"></script>
    <script type="text/javascript" src="src/views/AreaCategoryIssueLookup.js"></script>
    <script type="text/javascript" src="src/views/address/Edit.js"></script>
    <script type="text/javascript" src="src/views/account/List.js"></script>
    <script type="text/javascript" src="src/views/account/Detail.js"></script>
    <script type="text/javascript" src="src/views/account/Edit.js"></script>
    <script type="text/javascript" src="src/views/activity/List.js"></script>
    <script type="text/javascript" src="src/views/activity/Detail.js"></script>
    <script type="text/javascript" src="src/views/activity/Edit.js"></script>
    <script type="text/javascript" src="src/views/activity/Complete.js"></script>
    <script type="text/javascript" src="src/views/activity/TypesList.js"></script>
    <script type="text/javascript" src="src/views/calendar/MonthView.js"></script>
    <script type="text/javascript" src="src/views/calendar/UserActivityList.js"></script>
    <script type="text/javascript" src="src/views/campaign/List.js"></script>
    <script type="text/javascript" src="src/views/campaign/Detail.js"></script>
    <script type="text/javascript" src="src/views/campaign/Edit.js"></script>
    <script type="text/javascript" src="src/views/contact/List.js"></script>
    <script type="text/javascript" src="src/views/contact/Detail.js"></script>
    <script type="text/javascript" src="src/views/contact/Edit.js"></script>
    <script type="text/javascript" src="src/views/contract/List.js"></script>
    <script type="text/javascript" src="src/views/contract/Detail.js"></script>
    <script type="text/javascript" src="src/views/contract/Edit.js"></script>
    <script type="text/javascript" src="src/views/opportunity/List.js"></script>
    <script type="text/javascript" src="src/views/opportunity/Detail.js"></script>
    <script type="text/javascript" src="src/views/opportunity/Edit.js"></script>
    <script type="text/javascript" src="src/views/opportunityproduct/List.js"></script>    
    <script type="text/javascript" src="src/views/salesorder/List.js"></script>
    <script type="text/javascript" src="src/views/salesorder/Detail.js"></script>
    <script type="text/javascript" src="src/views/salesorder/Edit.js"></script>
    <script type="text/javascript" src="src/views/lead/List.js"></script>
    <script type="text/javascript" src="src/views/lead/Detail.js"></script>
    <script type="text/javascript" src="src/views/lead/Edit.js"></script>
    <script type="text/javascript" src="src/views/return/List.js"></script>
    <script type="text/javascript" src="src/views/return/Detail.js"></script>
    <script type="text/javascript" src="src/views/return/Edit.js"></script>
    <script type="text/javascript" src="src/views/ticket/List.js"></script>
    <script type="text/javascript" src="src/views/ticket/Detail.js"></script>
    <script type="text/javascript" src="src/views/ticket/Edit.js"></script>
    <script type="text/javascript" src="src/views/defect/List.js"></script>
    <script type="text/javascript" src="src/views/defect/Detail.js"></script>
    <script type="text/javascript" src="src/views/defect/Edit.js"></script>
    <script type="text/javascript" src="src/views/defectproblem/Detail.js"></script>
    <script type="text/javascript" src="src/views/defectproblem/Edit.js"></script>
    <script type="text/javascript" src="src/views/defectsolution/Detail.js"></script>
    <script type="text/javascript" src="src/views/defectsolution/Edit.js"></script>
    <script type="text/javascript" src="src/views/history/List.js"></script>
    <script type="text/javascript" src="src/views/history/Edit.js"></script>
    <script type="text/javascript" src="src/views/history/Detail.js"></script>
    <script type="text/javascript" src="src/views/user/List.js"></script>
    <script type="text/javascript" src="src/views/owner/List.js"></script>
    <script type="text/javascript" src="src/views/leadsource/List.js"></script>
    <script type="text/javascript" src="src/views/ticket/UrgencyLookup.js"></script>

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
        var application = new Mobile.SalesLogix.Application({environment: 'development'});

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
