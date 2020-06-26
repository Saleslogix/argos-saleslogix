define("crm/Fields/PicklistField", ["exports", "dojo/_base/declare", "argos/Fields/LookupField", "../Views/PickList", "argos/FieldManager"], function (_exports, _declare, _LookupField, _PickList, _FieldManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _LookupField = _interopRequireDefault(_LookupField);
  _PickList = _interopRequireDefault(_PickList);
  _FieldManager = _interopRequireDefault(_FieldManager);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var viewsByName = {};
  var viewsByNameCount = 0;

  var getOrCreateViewFor = function getOrCreateViewFor(name) {
    if (viewsByName[name]) {
      return viewsByName[name];
    }

    var view = new _PickList["default"]({
      id: "pick_list_".concat(viewsByNameCount++),
      expose: false,
      picklistName: name
    });
    App.registerView(view);
    viewsByName[name] = view;
    return App.getView(view.id);
  };

  var control = (0, _declare["default"])('crm.Fields.PicklistField', [_LookupField["default"]], {
    picklist: false,
    picklistName: false,
    picklistOptions: null,
    languageCode: null,
    languageCodeProperty: null,
    storageMode: 'text',
    requireSelection: false,
    valueKeyProperty: false,
    valueTextProperty: false,
    iconClass: 'more',
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

        default:
          this.keyProperty = 'text';
          this.textProperty = 'text';
      }
    },
    isReadOnly: function isReadOnly() {
      return !this.picklist;
    },
    isCodePicklist: function isCodePicklist() {
      // Name Prefix and Suffix are both text picklists that have code like functionality
      if (this.picklistName === 'Name Prefix' || this.picklistName === 'Name Suffix') {
        return false;
      } // Current flag for checking whether the picklist is a code picklist server side is the default language


      var picklist = App.picklistService.getPicklistByName(this.picklistName, this.languageCode);
      return picklist && picklist.defaultLanguage;
    },
    formatResourcePredicate: function formatResourcePredicate(name) {
      return "name eq \"".concat(name, "\"");
    },
    _handleSaleslogixMultiSelectPicklist: function _handleSaleslogixMultiSelectPicklist(value, unloadedValues) {
      if (typeof value === 'string') {
        return value;
      }

      var values = [];

      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          var data = value[key].data;

          if (data && data.text) {
            values.push(data.text);
          } else if (typeof data === 'string') {
            values.push(data);
          }
        }
      }

      if (Array.isArray(unloadedValues)) {
        values = values.concat(unloadedValues);
      }

      return values.join(', ');
    },
    textRenderer: function textRenderer(value, unloadedValues) {
      var results;

      if (this.singleSelect) {
        if (typeof value === 'string' || typeof value === 'number') {
          results = value;
        } else {
          results = value[this.textProperty];
        }
      } else {
        results = this._handleSaleslogixMultiSelectPicklist(value, unloadedValues);
      }

      return results;
    },
    formatValue: function formatValue(value) {
      var results;

      if (this.singleSelect) {
        results = this.inherited(formatValue, arguments);
      } else {
        results = this._handleSaleslogixMultiSelectPicklist(value);
      }

      return results || value;
    },
    getLanguageCode: function getLanguageCode() {
      if (this.languageCodeProperty) {
        return this.owner && this.owner.entry && this.owner.entry[this.languageCodeProperty] && this.owner.entry[this.languageCodeProperty].trim();
      }

      return this.languageCode || App.getCurrentLocale();
    },
    setValue: function setValue(val) {
      // eslint-disable-line
      if (this.singleSelect) {
        if (val && !this.picklistName) {
          this.picklistName = this.picklist;

          if (typeof this.picklistName === 'function') {
            var dependent = this.getDependentValue();

            if (_typeof(dependent) === 'object') {
              dependent = dependent.code;
            }

            this.picklistName = this.dependsOn // only pass dependentValue if there is a dependency
            ? this.expandExpression(this.picklist, dependent) : this.expandExpression(this.picklist);
          }
        }

        var picklistItem = false;
        this.languageCode = this.getLanguageCode();

        if (this.storageMode === 'text') {
          picklistItem = this.app.picklistService.getPicklistItemTextByCode(this.picklistName, val, this.languageCode);
        } else if (this.storageMode !== 'id') {
          picklistItem = this.app.picklistService.getPicklistItemByCode(this.picklistName, val, this.languageCode);
        } else {
          // Special case of item being stored by $key...
          picklistItem = this.app.picklistService.getPicklistItemByKey(this.picklistName, val, this.languageCode);
        }

        if (picklistItem) {
          val = picklistItem;

          if (this.storageMode !== 'id' && this.storageMode !== 'text') {
            this.keyProperty = 'code';
          }

          this.textProperty = 'text';
        }
      }

      this.inherited(setValue, arguments);
    },
    createSelections: function createSelections() {
      var value = this.getText();
      var selections = [];

      if (value) {
        if (value.indexOf(', ') !== -1) {
          selections = value.split(', ');
        } else {
          selections.push(value);
        }
      }

      return selections;
    },
    createNavigationOptions: function createNavigationOptions() {
      var options = this.inherited(createNavigationOptions, arguments);

      if (this.picklist) {
        this.picklistName = this.picklist;

        if (typeof this.picklistName === 'function') {
          this.picklistName = this.dependsOn // only pass dependentValue if there is a dependency
          ? this.expandExpression(this.picklist, options.dependentValue.code || options.dependentValue) : this.expandExpression(this.picklist);
        }

        options.resourcePredicate = this.formatResourcePredicate(this.picklistName);
        options.singleSelect = this.singleSelect;
        options.previousSelections = !this.singleSelect ? this.createSelections() : null;
        options.keyProperty = this.keyProperty;
        options.textProperty = this.textProperty;
        options.picklistOptions = this.picklistOptions && this.picklistOptions(this.owner && this.owner.entry || {}) || {};

        if (this.picklistName !== 'Name Prefix' && this.picklistName !== 'Name Suffix') {
          // Default to current locale IF not name prefix and suffix picklists (these are filtered text picklists)
          this.languageCode = App.getCurrentLocale();
        }

        options.languageCode = this.languageCode;
      }

      if (!this.singleSelect) {
        options.tools = {
          tbar: [{
            id: 'cancel',
            title: this.cancelText,
            svg: 'cancel',
            side: 'left',
            fn: ReUI.back,
            scope: ReUI
          }, {
            id: 'complete',
            title: this.completeText,
            svg: 'check',
            fn: this.complete,
            scope: this
          }]
        };
      }

      return options;
    },
    navigateToListView: function navigateToListView() {
      if (this.isDisabled()) {
        return;
      }

      var options = this.createNavigationOptions();

      if (this.isCodePicklist()) {
        this.keyProperty = 'code';
      }

      var view = App.getView(this.view) || getOrCreateViewFor(this.picklistName, this.languageCode);

      if (view && options) {
        view.refreshRequired = true;
        view.show(options);
      }
    }
  });

  var _default = _FieldManager["default"].register('picklist', control);

  _exports["default"] = _default;
});