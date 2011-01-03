<%@ WebHandler Language="C#" Class="CacheManifestHandler" %>

using System;
using System.Configuration;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.IO;
using System.Linq;
using System.Text;
using System.Globalization;
using System.Web;
using System.Web.Hosting;
using System.Web.Caching;
using System.Reflection;

public class CacheManifestHandler : IHttpHandler
{
    public const string CACHE_KEY = "manifest"; 
    
    public void Refresh(string key, object item, CacheItemRemovedReason reason)
    {
        if (reason != CacheItemRemovedReason.Removed) ProcessManifest();
    }

    public string ProcessManifest()
    {
        var manifestPath = ConfigurationManager.AppSettings["cacheManifestPath"] ?? "~/template.manifest";
        var physicalPath = Path.IsPathRooted(manifestPath) ? manifestPath : HostingEnvironment.MapPath(manifestPath);

        string content = null;
                
        using (var output = new StringWriter())
        {
            var processor = new CacheManifestProcessor(physicalPath);

            processor.Process(output);

            content = output.ToString();
        }
                
        HttpRuntime.Cache.Insert(
            CACHE_KEY,
            content,
            new CacheDependency(Path.GetDirectoryName(physicalPath)),
            Cache.NoAbsoluteExpiration,
            Cache.NoSlidingExpiration,
            CacheItemPriority.Default,
            new CacheItemRemovedCallback(Refresh)
        );
        
        return content;
    }

    public void ProcessRequest(HttpContext context)
    {
        var response = context.Response;

        var content = HttpRuntime.Cache.Get(CACHE_KEY) as string;
        if (content == null)
            content = ProcessManifest();

        response.ContentType = "text/cache-manifest";
        response.Write(content);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }    
}

public class CacheManifestProcessor
{
    private Regex _commandSignature = new Regex(@"^@");
    private CommandParser _parser = new CommandParser();  
    
    public string Path { get; protected set; }    

    public CacheManifestProcessor(string path)
    {
        Path = path;
    }
    
    public void Process(TextWriter output) 
    {
        using (var input = new StreamReader(Path))
        {
            string line;
            while ((line = input.ReadLine()) != null)
            {
                var commandMatch = _commandSignature.Match(line);
                if (commandMatch.Success)
                {
                    var command = _parser.Parse(new StringReader(line));
                    var methodName = String.Format("Command{0}{1}", Char.ToUpper(command.Name[0]), command.Name.Substring(1));

                    var method = GetType().GetMethod(methodName, BindingFlags.Public | BindingFlags.Instance);
                    if (method != null)
                    {
                        var methodParameters = method.GetParameters();
                        var invokeParameters = new object[methodParameters.Length];

                        for (var i = 0; i < methodParameters.Length - 1 && i < command.Arguments.Count; i++)                        
                            invokeParameters[i] = command.Arguments.ElementAt(i);                        

                        invokeParameters[methodParameters.Length - 1] = output;

                        method.Invoke(this, invokeParameters);
                    }
                }
                else
                {
                    output.WriteLine(line);
                }
            }
        }
    }

    public void CommandInclude(string path, Regex include, TextWriter output)
    {
        var rootPath = System.IO.Path.GetDirectoryName(Path);
        var includePath = System.IO.Path.Combine(rootPath, path);

        if (Directory.Exists(includePath))
        {
            var files = Directory.GetFiles(includePath, "*", SearchOption.AllDirectories).AsEnumerable();

            if (include != null) files = files.Where(name => include.IsMatch(name));

            foreach (var name in files)
            {
                var relativePath = name.Substring(rootPath.Length + 1).Replace('\\', '/');

                output.WriteLine(relativePath);
            }
        }
    }

    public void CommandValue(string name, TextWriter output)
    {
        output.WriteLine(ConfigurationManager.AppSettings[name]);
    }

    public void CommandVersion(TextWriter output)
    {
        output.WriteLine("# version {0}", DateTime.UtcNow.ToString("s"));
    }  
            
    class Command
    {
        public string Name { get; set; }
        public ICollection<object> Arguments { get; set; }
    }

    class CommandParser
    {
        enum Token
        {
            Command,
            DoubleQuotedString,
            SingleQuotedString,
            Regex,
            Number,
            Literal,
            Separator,
            End,
            Error
        }

        void SkipSpaces(TextReader reader)
        {
            int current;
            while ((current = reader.Peek()) > -1)
            {
                if (current == ' ' || current == '\t' || current == '\r')
                    reader.Read();
                else
                    break;
            }
        }

        Token ReadToken(TextReader reader)
        {
            SkipSpaces(reader);

            int current = reader.Peek();
            switch (current)
            {
                case '@':
                    return Token.Command;
                case ',':
                    return Token.Separator;
                case '"':
                    return Token.DoubleQuotedString;
                case '\'':
                    return Token.SingleQuotedString;
                case '/':
                    return Token.Regex;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '-':
                    return Token.Number;
                case '\n':
                case -1:
                    return Token.End;
                default:
                    return Token.Literal;
            }
        }

        public Command Parse(TextReader reader)
        {
            Command command = null;
            Token token;
            while ((token = ReadToken(reader)) != Token.End)
            {
                switch (token)
                {
                    case Token.Command:
                        command = ReadCommand(reader);
                        break;
                }
            }

            return command;
        }

        public Command ReadCommand(TextReader reader)
        {
            var command = new Command
            {
                Arguments = new List<object>()
            };

            var builder = new StringBuilder();

            int current = reader.Read(); // indicator
            while ((current = reader.Peek()) > -1)
            {
                if ((current >= 'a' && current <= 'z') ||
                    (current >= 'A' && current <= 'Z') ||
                    (current == '-'))
                {
                    builder.Append((char)reader.Read());
                }
                else
                    break;
            }

            command.Name = builder.ToString();

            Token token;
            while ((token = ReadToken(reader)) != Token.End)
            {
                switch (token)
                {
                    case Token.DoubleQuotedString:
                        command.Arguments.Add(ReadString(reader, true));
                        break;
                    case Token.SingleQuotedString:
                        command.Arguments.Add(ReadString(reader, false));
                        break;
                    case Token.Number:
                        command.Arguments.Add(ReadNumber(reader));
                        break;
                    case Token.Regex:
                        command.Arguments.Add(ReadRegex(reader));
                        break;
                    case Token.Literal:
                        command.Arguments.Add(ReadLiteral(reader));
                        break;
                    case Token.Separator:
                        reader.Read();
                        break;
                    default:
                        throw new ApplicationException("Syntax error: invalid command.");
                }
            }

            return command;
        }

        object ReadLiteral(TextReader reader)
        {
            var builder = new StringBuilder();

            int current;
            while ((current = reader.Peek()) > -1)
            {
                if ((current >= 'a' && current <= 'z') ||
                    (current >= 'A' && current <= 'Z') ||
                    (current == '-' || current == '_') ||
                    (current == ':'))
                {
                    builder.Append((char)reader.Read());
                }
                else
                    break;
            }

            var valueAsString = builder.ToString();

            switch (valueAsString)
            {
                case "true": return true;
                case "false": return false;
                case "null": return null;
                default:
                    throw new ApplicationException("Syntax error: invalid literal.");
            }
        }

        object ReadString(TextReader reader, bool doubleQuoted)
        {
            var builder = new StringBuilder();
            var quote = doubleQuoted ? '"' : '\'';

            int current;

            current = reader.Read(); // opening quote
            while ((current = reader.Read()) > -1)
            {
                if (current == '\\')
                {
                    switch (reader.Read())
                    {
                        case 'r': builder.Append('\r'); break;
                        case 'n': builder.Append('\n'); break;
                        case 't': builder.Append('\t'); break;
                        case '\\': builder.Append('\\'); break;
                    }
                }
                else if (current == quote)
                {
                    break;
                }
                else
                {
                    builder.Append((char)current);
                }
            }

            if (current != quote) throw new ApplicationException("Syntax error: string terminated incorrectly.");

            return builder.ToString();
        }

        object ReadNumber(TextReader reader)
        {
            var builder = new StringBuilder();
            var isDouble = false;
            var isHex = false;

            int current;
            while ((current = reader.Peek()) > -1)
            {
                if ((current >= 'a' && current <= 'f') ||
                    (current >= 'A' && current <= 'F'))
                {
                    isHex = true;
                    builder.Append((char)reader.Read());
                }
                else if (current >= '0' && current <= '9')
                {
                    builder.Append((char)reader.Read());
                }
                else if (current == '-' || current == '+')
                {
                    builder.Append((char)reader.Read());
                }
                else if (current == 'x' || current == 'X')
                {
                    isHex = true;
                    reader.Read(); // do not need, leading zero ok
                }
                else if (current == '.')
                {
                    isDouble = true;
                    builder.Append((char)reader.Read());
                }
                else
                    break;
            }

            var valueAsString = builder.ToString();

            if (isHex)
                return Int32.Parse(valueAsString, NumberStyles.HexNumber);
            else if (isDouble)
                return Double.Parse(valueAsString);
            else
                return Int32.Parse(valueAsString);
        }

        object ReadRegex(TextReader reader)
        {
            var builder = new StringBuilder();
            var onFlags = false;
            var options = RegexOptions.None;

            int current = reader.Read(); // opening slash
            while ((current = reader.Peek()) > -1)
            {
                if (onFlags)
                {
                    if (current == 'i')
                        options |= RegexOptions.IgnoreCase;
                    else
                        break;

                    reader.Read();
                }
                else
                {
                    if (current == '\\')
                    {
                        builder.Append((char)reader.Read());
                        builder.Append((char)reader.Read());
                    }
                    else if (current == '/')
                    {
                        onFlags = true;

                        reader.Read();
                    }
                    else
                        builder.Append((char)reader.Read());
                }
            }

            if (!onFlags) throw new ApplicationException("Syntax error: regex terminated incorrectly.");

            var valueAsString = builder.ToString();

            return new Regex(valueAsString, options);
        }
    }
}