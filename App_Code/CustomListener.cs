using System;
using Antlr4.Runtime;
using System.Collections.Generic;
using Newtonsoft.Json;

/// <summary>
/// Listener while parsing argos regional l20n files.
/// </summary>
public class CustomListener : L20nParserBaseListener
{
    public static Dictionary<string, string> languages = new Dictionary<string, string>();

    public override void EnterEntityValue(L20nParser.EntityValueContext context)
    {
        dynamic settings = JsonConvert.DeserializeObject(context.Start.Text.Trim('"'));
        if (settings != null)
        {
            var name = settings.name.Value;
            var nativeName = settings.nativeName.Value;
            languages.Add(name, nativeName);
        }

    }
}
