<%@ Page AutoEventWireup="true" Language="c#" Culture="auto" UICulture="auto" CodeFile="Index.aspx.cs" Inherits="Index" %>
<%@ Register Src="~/index-head.ascx" TagPrefix="uc1" TagName="head" %>
<%@ Register Src="~/index-body.ascx" TagPrefix="uc1" TagName="body" %>

<!DOCTYPE html>
<!--[if IE 9 ]>    <html lang="en" class="ie9" manifest="index.manifest.ashx"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en-US" class="gtie9 modern" manifest="index.manifest.ashx">
<!--<![endif]-->
<head>
    <uc1:head runat="server" id="index_head" />
    <!-- Place holder for custom modules. Do not remove line below -->
    <!--{{modules}}-->
</head>
<body>
    <uc1:body runat="server" id="index_body" />
</body>
</html>
