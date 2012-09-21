define('Mobile/SalesLogix/Fields/PicklistField', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/Fields/LookupField',
    '../Views/PickList',
    'argos!scene'
], function(
    declare,
    string,
    LookupField,
    PickList,
    scene
) {
    var viewsByName = {},
        viewsByNameCount = 0;

    var getOrCreateViewFor = function(name) {
        if (viewsByName[name])
            return viewsByName[name];

        var view = new PickList({
            id: 'pick_list_' + (viewsByNameCount++),
            expose: false
        });

        App.registerView(view);

        return (viewsByName[name] = view);
    };

    return declare('Mobile.SalesLogix.Fields.PicklistField', [LookupField], {
        view: 'pick_list',
        picklist: false,
        orderBy: 'number asc',
        storageMode: 'text',
        requireSelection: false,
        valueKeyProperty: false,
        valueTextProperty: false,

        constructor: function(options) {
            switch (this.storageMode)
            {
                case 'text':
                    this.keyProperty = 'text';
                    this.textProperty = 'text';
                    break;
                case 'code':
                    this.keyProperty = 'code';
                    this.textProperty = 'text';
                    this.requireSelection = typeof options.requireSelection !== 'undefined'
                        ? options.requireSelection
                        : true;
                    break;
                case 'id':
                    this.keyProperty = '$key';
                    this.textProperty = 'text';
                    this.requireSelection = typeof options.requireSelection !== 'undefined'
                        ? options.requireSelection
                        : true;
                    break;
            }
        },
        isReadOnly: function() {
            return !this.picklist;
        },
        formatResourcePredicate: function(name) {
            return string.substitute('name eq "${0}"', [name]);
        },
        createSelections: function() {
            var value = this.getText(),
                selections = (value)
                    ? (value.indexOf(', ') !== -1)
                        ? value.split(', ')
                        : [value]
                    : [];
            return selections;
        },
        createNavigationOptions: function() {
            var options = this.inherited(arguments);

            if (this.picklist)
            {
                options.resourcePredicate = this.formatResourcePredicate(
                    this.dependsOn // only pass dependentValue if there is a dependency
                        ? this.expandExpression(this.picklist, options.dependentValue)
                        : this.expandExpression(this.picklist)
                );
                options.singleSelect = this.singleSelect;
                options.previousSelections = !this.singleSelect ? this.createSelections() : null;
            }

            return options;
        },
        navigateToListView: function() {
            var options = this.createNavigationOptions();

            scene().showView(this.view, options);

            /* todo: add support for multiple picklist list views */
            /*
            var options = this.createNavigationOptions(),
                view = App.getView(this.view) || getOrCreateViewFor(this.picklist);

            if (view && options)
                view.show(options);
            */
        }
    });
});