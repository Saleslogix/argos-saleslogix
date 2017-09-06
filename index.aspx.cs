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

public partial class Index : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        base.OnPreInit(e);
        Session.Abandon();
        Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId") { Expires = DateTime.Now.AddDays(-1d) });
        Response.Cookies.Add(new HttpCookie("SlxStickySessionId") { Expires = DateTime.Now.AddDays(-1d) });
        Response.Cookies.Add(new HttpCookie(".SLXAUTH") { Expires = DateTime.Now.AddDays(-1d) });
    }
}
