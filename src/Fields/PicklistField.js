import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import LookupField from 'argos/Fields/LookupField';
import PickList from '../Views/PickList';
import FieldManager from 'argos/FieldManager';
const viewsByName = {};
let viewsByNameCount = 0;

const getOrCreateViewFor = function getOrCreateViewFor(name) {
  if (viewsByName[name]) {
    return viewsByName[name];
  }

  const view = new PickList({
    id: `pick_list_${viewsByNameCount++}`,
    expose: false,
    picklistName: name,
  });

  App.registerView(view);
  viewsByName[name] = view;

  return App.getView(view.id);
};

const control = declare('crm.Fields.PicklistField', [LookupField], {
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
    const picklist = App.picklistService.getPicklistByName(this.picklistName, this.languageCode);
    return picklist && picklist.defaultLanguage;
  },
  formatResourcePredicate: function formatResourcePredicate(name) {
    return `name eq "${name}"`;
  },
  _handleSaleslogixMultiSelectPicklist: function _handleSaleslogixMultiSelectPicklist(value, unloadedValues) {
    if (typeof value === 'string') {
      return value;
    }

    let values = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const data = value[key].data;
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
    let results;

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
    let results;
    if (this.singleSelect) {
      results = this.inherited(arguments);
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
  setValue: function setValue(val) { // eslint-disable-line
    if (this.singleSelect) {
      if (val && !this.picklistName) {
        this.picklistName = this.picklist;
        if (typeof this.picklistName === 'function') {
          let dependent = this.getDependentValue();
          if (typeof dependent === 'object') {
            dependent = dependent.code;
          }
          this.picklistName = this.dependsOn // only pass dependentValue if there is a dependency
            ? this.expandExpression(this.picklist, dependent) : this.expandExpression(this.picklist);
        }
      }
      let picklistItem = false;
      this.languageCode = this.getLanguageCode();
      if (this.storageMode !== 'id') {
        // Name Prefix and Suffix are special case pick lists stored as text but languageCode may have changed, just ignore new method
        if (this.picklistName !== 'Name Prefix' && this.picklistName !== 'Name Suffix') {
          picklistItem = this.app.picklistService.getPicklistItemByCode(this.picklistName, val, this.languageCode);
        }
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
    this.inherited(arguments);
  },
  createSelections: function createSelections() {
    const value = this.getText();
    let selections = [];
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
    const options = this.inherited(arguments);

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
      options.picklistOptions = (this.picklistOptions && this.picklistOptions((this.owner && this.owner.entry) || {})) || {};
      // TODO: Need a function to generate the key
      // if (options.picklistOptions
      //     && options.picklistOptions.filterByLanguage !== true) {
      //   this.languageCode = ' ';
      // } else
      if (this.picklistName !== 'Name Prefix' || this.picklistName !== 'Name Suffix') {
        // Default to current locale IF not name prefix or suffix picklists (these are filtered text picklists)
        this.languageCode = App.getCurrentLocale();
      }
      options.languageCode = this.languageCode;
    }

    if (!this.singleSelect) {
      options.tools = {
        tbar: [{
          id: 'complete',
          svg: 'check',
          fn: this.complete,
          scope: this,
        }, {
          id: 'cancel',
          svg: 'cancel',
          side: 'left',
          fn: ReUI.back,
          scope: ReUI,
        }],
      };
    }

    return options;
  },
  navigateToListView: function navigateToListView() {
    if (this.isDisabled()) {
      return;
    }

    const options = this.createNavigationOptions();
    if (this.isCodePicklist()) {
      this.keyProperty = 'code';
    }
    const view = App.getView(this.view) || getOrCreateViewFor(this.picklistName, this.languageCode);

    if (view && options) {
      view.refreshRequired = true;
      view.show(options);
    }
  },
});

lang.setObject('Mobile.SalesLogix.Fields.PickListField', control);
export default FieldManager.register('picklist', control);
