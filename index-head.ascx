<%@ Control Language="C#" AutoEventWireup="true" %>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no,email=no,address=no" />

<title>Infor CRM</title>

<link rel="icon" type="image/png" href="content/images/icon.png" />
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

<link type="text/css" rel="stylesheet" id="sohoxi-stylesheet" href="content/css/light-theme.min.css" />
<link type="text/css" rel="stylesheet" href="content/css/themes/crm/sdk.min.crm.css" />
<link type="text/css" rel="stylesheet" href="content/css/app.min.css" />

<!-- Provide an empty resource expected by l20n lib. Argos loads l20n files during bootstrap -->
<script type="application/l20n">{}</script>

<!-- Global (window) dependencies. Load these before the AMD loader -->
<script type="text/javascript" src="content/javascript/argos-dependencies.js"></script>

<!-- Dojo -->
<script pin="pin" type="text/javascript">
    var language, regionLocale;
    if (window.localStorage) {
        language = window.localStorage.getItem('language');
        regionLocale = window.localStorage.getItem('region');
    }
    var dojoConfig = {
        parseOnLoad: false,
        async: true,
        blankGif: 'content/images/blank.gif',
        locale: language || 'en',
        extraLocale: [regionLocale || 'en-us']
    };
</script>
<script type="text/javascript" src="content/dojo/dojo/dojo.js"></script>

<script type="text/javascript">
    require({
        baseUrl: "./",
        packages: [
            { name: 'dojo', location: 'content/dojo/dojo' },
            { name: 'dijit', location: 'content/dojo/dijit' },
            { name: 'configuration', location: 'configuration' },
            { name: 'localization', location: 'localization' }
        ],
        map: {
            '*': {
                'Sage/Platform/Mobile': 'argos',
                'Mobile/SalesLogix': 'crm',
                'icboe': 'crm/Integrations/BOE'
            }
        }
    });
</script>
<script type="text/javascript" src="content/dojo/dojo-dependencies.js"></script>
<script type="text/javascript" src="content/javascript/argos-amd-dependencies.js"></script>
<script type="text/javascript" src="content/javascript/argos-sdk.js"></script>

<!-- Application -->
<script type="text/javascript" src="content/javascript/argos-saleslogix.js"></script>
