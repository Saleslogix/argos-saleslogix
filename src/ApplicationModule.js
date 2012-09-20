define('Mobile/SalesLogix/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Argos/ApplicationModule',
    './ApplicationViews',
    'Argos/Fields/FieldRegistry',
    './Fields/AddressField',
    './Fields/NameField',
    './Fields/NoteField',
    './Fields/PicklistField',
    './Fields/RecurrencesField'
], function(
    declare,
    lang,
    ApplicationModule,
    ApplicationViews,
    FieldRegistry,
    AddressField,
    NameField,
    NoteField,
    PicklistField,
    RecurrencesField
) {

    return declare('Mobile.SalesLogix.ApplicationModule', [ApplicationModule], {
        loadViews: function(scene) {
            this.inherited(arguments);

            scene.registerViews(ApplicationViews);
            this.registerFields();
        },
        registerFields: function() {
            var fieldMap = {
                'address': AddressField,
                'name': NameField,
                'note': NoteField,
                'picklist': PicklistField,
                'recurrences': RecurrencesField
            };

            FieldRegistry.register(fieldMap);
        },
        loadCustomizations: function() {
            /*
            this.loadBaseCustomizations();
            */
        },
        loadBaseCustomizations: function() {
            /*
            lang.extend(List, {
                expose: true,
                getSecurity: function() {
                    return (this.expose && this.security); // only check security on exposed views
                }
            });
            */
        }
    });

});
