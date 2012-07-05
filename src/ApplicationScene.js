define('Mobile/SalesLogix/ApplicationScene', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Scene',
    './ApplicationLayout'
], function(
    declare,
    lang,
    Scene,
    ApplicationLayout
) {
    return declare('Mobile.SalesLogix.ApplicationScene', [Scene], {
        components: [
            {type: ApplicationLayout, attachPoint: 'layout'}
        ]
    });
});