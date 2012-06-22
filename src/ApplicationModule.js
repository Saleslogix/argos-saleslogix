
define('Mobile/SalesLogix/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/ApplicationModule',
    './ApplicationViews',
    './Fields/AddressField',
    './Fields/NameField',
    './Fields/PicklistField',
    './Fields/RecurrencesField'
], function(
    declare,
    lang,
    ApplicationModule,
    ApplicationViews,
    AddressField,
    NameField,
    PicklistField,
    RecurrencesField
) {

    return declare('Mobile.SalesLogix.ApplicationModule', [ApplicationModule], {
        loadViews: function(scene) {
            this.inherited(arguments);

            scene.registerViews(ApplicationViews);
        },
        loadCustomizations: function() {
            /*
            this.loadBaseCustomizations();
            */
        },
        loadBaseCustomizations: function() {
            lang.extend(List, {
                expose: true,
                getSecurity: function() {
                    return (this.expose && this.security); // only check security on exposed views
                }
            });
        }
    });

});
