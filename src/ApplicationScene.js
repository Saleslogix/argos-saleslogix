define('Mobile/SalesLogix/ApplicationScene', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Argos/Scene',
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