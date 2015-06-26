define('crm/Fields/PicklistField', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Fields/LookupField', '../Views/PickList', 'argos/FieldManager'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _argosFieldsLookupField, _ViewsPickList, _argosFieldManager) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _LookupField = _interopRequireDefault(_argosFieldsLookupField);

    var _PickList = _interopRequireDefault(_ViewsPickList);

    var _FieldManager = _interopRequireDefault(_argosFieldManager);

    var viewsByName = {},
        getOrCreateViewFor,
        control,
        viewsByNameCount = 0;

    getOrCreateViewFor = function (name) {
        if (viewsByName[name]) {
            return viewsByName[name];
        }

        var view = new _PickList['default']({
            id: 'pick_list_' + viewsByNameCount++,
            expose: false
        });

        App.registerView(view);
        viewsByName[name] = view;

        return App.getView(view.id);
    };

    control = (0, _declare['default'])('crm.Fields.PicklistField', [_LookupField['default']], {
        picklist: false,
        storageMode: 'text',
        requireSelection: false,
        valueKeyProperty: false,
        valueTextProperty: false,
        iconClass: 'fa fa-ellipsis-h fa-lg',

        constructor: function constructor(options) {
            switch (this.storageMode) {
                case 'text':
                    this.keyProperty = 'text';
                    this.textProperty = 'text';
                    break;
                case 'code':
                    this.keyProperty = 'code';
                    this.textProperty = 'text';
                    this.requireSelection = typeof options.requireSelection !== 'undefined' ? options.requireSelection : true;
                    break;
                case 'id':
                    this.keyProperty = '$key';
                    this.textProperty = 'text';
                    this.requireSelection = typeof options.requireSelection !== 'undefined' ? options.requireSelection : true;
                    break;
            }
        },
        isReadOnly: function isReadOnly() {
            return !this.picklist;
        },
        formatResourcePredicate: function formatResourcePredicate(name) {
            return _string['default'].substitute('name eq "${0}"', [name]);
        },
        _handleSaleslogixMultiSelectPicklist: function _handleSaleslogixMultiSelectPicklist(value) {
            var values, key, data;
            if (typeof value === 'string') {
                return value;
            }

            values = [];
            for (key in value) {
                if (value.hasOwnProperty(key)) {
                    data = value[key].data;
                    if (data && data.text) {
                        values.push(data.text);
                    } else if (typeof data === 'string') {
                        values.push(data);
                    }
                }
            }

            return values.join(', ');
        },
        textRenderer: function textRenderer(value) {
            var results;

            if (this.singleSelect) {
                if (typeof value === 'string' || typeof value === 'number') {
                    results = value;
                } else {
                    results = value[this.textProperty];
                }
            } else {
                results = this._handleSaleslogixMultiSelectPicklist(value);
            }

            return results;
        },
        formatValue: function formatValue(value) {
            var results;
            if (this.singleSelect) {
                results = this.inherited(arguments);
            } else {
                results = this._handleSaleslogixMultiSelectPicklist(value);
            }

            return results || value;
        },
        createSelections: function createSelections() {
            var value = this.getText(),
                selections = value ? value.indexOf(', ') !== -1 ? value.split(', ') : [value] : [];
            return selections;
        },
        createNavigationOptions: function createNavigationOptions() {
            var options = this.inherited(arguments);

            if (this.picklist) {
                options.resourcePredicate = this.formatResourcePredicate(this.dependsOn // only pass dependentValue if there is a dependency
                ? this.expandExpression(this.picklist, options.dependentValue) : this.expandExpression(this.picklist));
                options.singleSelect = this.singleSelect;
                options.previousSelections = !this.singleSelect ? this.createSelections() : null;
                options.keyProperty = this.keyProperty;
                options.textProperty = this.textProperty;
            }

            if (!this.singleSelect) {
                options.tools = {
                    tbar: [{
                        id: 'complete',
                        cls: 'fa fa-check fa-fw fa-lg',
                        fn: this.complete,
                        scope: this
                    }, {
                        id: 'cancel',
                        cls: 'fa fa-ban fa-fw fa-lg',
                        side: 'left',
                        fn: ReUI.back,
                        scope: ReUI
                    }]
                };
            }

            return options;
        },
        navigateToListView: function navigateToListView() {
            if (this.isDisabled()) {
                return;
            }

            var options = this.createNavigationOptions(),
                view = App.getView(this.view) || getOrCreateViewFor(this.picklist);

            if (view && options) {
                view.show(options);
            }
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Fields.PickListField', control);
    module.exports = _FieldManager['default'].register('picklist', control);
});
