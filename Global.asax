<%@ Application Language="C#" %>
<%@ Import Namespace="System.Threading" %>
<%@ Import Namespace="System.Globalization" %>

<script runat="server">

    public override void Init()
    {
        this.BeginRequest += new EventHandler(Global_BeginRequest);
        base.Init();
    }

    public void Global_BeginRequest(Object s, EventArgs e)
    {
        this.InitializeCulture();
    }
    private void InitializeCulture()
    {

        string cultureCode;
        CultureInfo culture = null;

        if (HttpContext.Current != null && HttpContext.Current.Request.UserLanguages != null)
        {
            cultureCode = HttpContext.Current.Request.UserLanguages[0];
            culture = this.getCultureFromCode(cultureCode);
            if (culture == null)
            {
                cultureCode = cultureCode.Split('-')[0];
                culture = this.getCultureFromCode(cultureCode);
            }
            if (culture != null)
            {
                Thread.CurrentThread.CurrentCulture = culture;
                Thread.CurrentThread.CurrentUICulture = culture;
            }
        }

    }
    private CultureInfo getCultureFromCode(string cultureCode)
    {
        CultureInfo culture = null;
        try
        {
            culture = CultureInfo.CreateSpecificCulture(cultureCode);
        }
        catch (Exception)
        {
        }
        return culture;
    }

</script>
