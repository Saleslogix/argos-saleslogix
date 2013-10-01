/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Fields/PicklistField', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/Fields/LookupField',
    'Mobile/SalesLogix/Views/PickList',
    'Sage/Platform/Mobile/FieldManager'
], function(
    declare,
    string,
    LookupField,
    PickList,
    FieldManager
) {
    var viewsByName = {},
        viewsByNameCount = 0;

    var getOrCreateViewFor = function(name) {
        if (viewsByName[name]) {
            return viewsByName[name];
        }

        var view = new PickList({
            id: 'pick_list_' + (viewsByNameCount++),
            expose: false
        });

        App.registerView(view);
        viewsByName[name] = view;

        return App.getView(view.id);
    };

    var control = declare('Mobile.SalesLogix.Fields.PicklistField', [LookupField], {
        picklist: false,
        orderBy: 'number asc',
        storageMode: 'text',
        requireSelection: false,
        valueKeyProperty: false,
        valueTextProperty: false,

        constructor: function(options) {
            switch (this.storageMode) {
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

            if (this.picklist) {
                options.resourcePredicate = this.formatResourcePredicate(
                    this.dependsOn // only pass dependentValue if there is a dependency
                        ? this.expandExpression(this.picklist, options.dependentValue)
                        : this.expandExpression(this.picklist)
                );
                options.singleSelect = this.singleSelect;
                options.previousSelections = !this.singleSelect ? this.createSelections() : null;
            }

            if (!this.singleSelect) {
                options.tools = {
                    tbar: [{
                            id: 'complete',
                            fn: this.complete,
                            scope: this
                        }, {
                            id: 'cancel',
                            side: 'left',
                            fn: ReUI.back,
                            scope: ReUI
                        }]
                };
            }

            return options;
        },
        navigateToListView: function() {
            var options = this.createNavigationOptions(),
                view = App.getView(this.view) || getOrCreateViewFor(this.picklist);

            if (view && options) {
                view.show(options);
            }
        }
    });

    return FieldManager.register('picklist', control);
});
