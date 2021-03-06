﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="index-body.ascx.cs" Inherits="Index_html" %>
<%@ Import Namespace="System.Globalization" %>

<noscript>
    <p>JavaScript is required for this application.</p>
</noscript>

<div id="rootNode"></div>

<script type="text/javascript">
    var languages = <%= Languages %>;

    var supportedLocales = <%= SupportedLocales %>,
        defaultLocale = language || 'en',
        currentLocale = language || '<%= CurrentCulture.Name.ToLower() %>',
        parentLocale = language || '<%= CurrentCulture.Parent.Name.ToLower() %>',
        defaultRegionLocale = regionLocale || 'en',
        currentRegionLocale = regionLocale || '<%= CurrentCulture.Name.ToLower() %>',
        parentRegionLocale = regionLocale || '<%= CurrentCulture.Parent.Name.ToLower() %>',
        cacheFiles = <%= FilesToCache %>;
    (function () {

        // Shim, sohoxi will use define.amd and require it.
        define('jquery', function () {
            return window.$;
        });
        require(['crm/polyfills/index', 'crm/Bootstrap'], function (polyfills, bootstrap) {
            bootstrap({
                serviceWorkerPath: './serviceworker.js',
                serviceWorkerRegistrationOptions: null,
                cacheFiles: cacheFiles,
                supportedLocales: supportedLocales,
                defaultLocale: 'en',
                currentLocale: currentLocale,
                parentLocale: parentLocale,
                defaultRegionLocale: 'en',
                currentRegionLocale: currentRegionLocale,
                parentRegionLocale: parentRegionLocale,
                isRegionMetric: <%= (CurrentRegion.IsMetric) ? "true" : "false" %>,
                configuration: <%= Configuration %>,
                application: 'crm/Application',
                legacyLocalization: <%= LegacyLocalization %>,
                legacyLocalizationFallback: <%= LegacyLocalizationFallback %>,
                // TODO limit to only strings
                localeFiles: <%= LocaleFiles %>,
                regionalFiles: <%= RegionalFiles %>,
                rootElement: document.getElementById('rootNode')
        });
    });
    })();
</script>
