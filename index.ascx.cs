using System;
using System.Collections.Generic;
using System.Web;
using System.IO;
using System.Linq;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using Antlr4.Runtime;
using Antlr4.Runtime.Tree;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Index_html : System.Web.UI.UserControl
{
    private string _supportedLocales;
    protected string SupportedLocales
    {
        get
        {
            if (null == _supportedLocales)
                _supportedLocales = Serialize(
                   Enumerate(@"localization\locales\crm", (file) => true)
                       .Select(item => item.Directory.Name).Distinct());
            return _supportedLocales;
        }
    }

    private string _configuration;
    protected string Configuration
    {
        get
        {
            if (null == _configuration)
                _configuration = Serialize(
                          Enumerate("configuration", (file) => file.Name == "production.js")
                              .Select(item => item.Path.Substring(0, item.Path.Length - 3)));
            return _configuration;
        }
    }

    private string _legacyLocalization;
    protected string LegacyLocalization
    {
        get
        {
            if (null == _legacyLocalization)
                _legacyLocalization = Serialize(
                      EnumerateLocalizations("localization")
                          .Select(item => item.Path.Substring(0, item.Path.Length - 3)));
            return _legacyLocalization;
        }
    }

    private string _legacyLocalizationFallback;
    protected string LegacyLocalizationFallback
    {
        get
        {
            if (null == _legacyLocalizationFallback)
                _legacyLocalizationFallback = Serialize(
                  EnumerateLocalizations(string.Empty, "localization", "en")
                      .Select(item => item.Path.Substring(0, item.Path.Length - 3)));
            return _legacyLocalizationFallback;
        }
    }

    private string _localeFiles;
    protected string LocaleFiles
    {
        get
        {
            if (null == _localeFiles)
                _localeFiles = Serialize(
                    Enumerate(@"localization", (file) => file.Extension == ".l20n" && file.Name.IndexOf("regional") == -1)
                        .Select(item => item.Path));
            return _localeFiles;
        }
    }

    private string _regionalFiles;
    protected string RegionalFiles
    {
        get
        {
            if (null == _regionalFiles)
                _regionalFiles = Serialize(
                    Enumerate(@"localization", (file) => file.Extension == ".l20n" && file.Name.IndexOf("regional") != -1)
                        .Select(item => item.Path));
            return _regionalFiles;
        }
    }

    protected string Languages
    {
        get
        {
            if (CustomListener.languages.Count == 0)
            {
                var folders = Enumerate(@"localization\locales\argos", (file) => true)
                       .Select(item => item.Directory.FullName).Distinct();
                foreach (var folder in folders)
                {
                    string[] files = Directory.GetFiles(folder);
                    foreach (var file in files)
                    {
                        if (file.EndsWith("regional.l20n"))
                        {
                            var content = File.ReadAllText(file);
                            Parser(content);
                        }
                    }
                }
            }
            return Serialize(CustomListener.languages);
        }
    }

    protected class FileItem
    {
        public string Path { get; set; }
        public FileInfo File { get; set; }
        public DirectoryInfo Directory { get; set; }
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
                    File = file,
                    Directory = file.Directory
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
        return EnumerateLocalizations(String.Empty, path, null);
    }

    protected IEnumerable<FileItem> EnumerateLocalizations(string root, string path, string culture)
    {
        var currentCulture = System.Globalization.CultureInfo.CurrentCulture;
        var rootDirectory = new DirectoryInfo(Path.Combine(Path.GetDirectoryName(Request.PhysicalPath), root));
        var includeDirectory = new DirectoryInfo(Path.Combine(rootDirectory.FullName, path));

        if (includeDirectory.Exists)
        {
            var parentFileName = String.Format(@"{0}.js", culture ?? currentCulture.Parent.Name);
            var parentFile = new FileInfo(Path.Combine(includeDirectory.FullName, parentFileName));
            var targetFileName = String.Format(@"{0}.js", culture ?? currentCulture.Name);
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

    private CultureInfo _culture;
    protected CultureInfo CurrentCulture
    {
        get
        {
            if (null == _culture)
                _culture = System.Globalization.CultureInfo.CurrentCulture;
            return _culture;
        }
    }

    private RegionInfo _region;
    protected RegionInfo CurrentRegion
    {
        get
        {
            if (null == _region)
                _region = new RegionInfo(CurrentCulture.LCID);
            return _region;
        }
    }

    protected void Parser(string input)
    {
        ICharStream stream = CharStreams.fromstring(input);
        ITokenSource lexer = new L20nLexer(stream);
        ITokenStream tokens = new CommonTokenStream(lexer);
        L20nParser parser = new L20nParser(tokens);
        parser.BuildParseTree = true;
        IParseTree tree = parser.document();
        CustomListener listener = new CustomListener();
        ParseTreeWalker.Default.Walk(listener, tree);
    }
}
