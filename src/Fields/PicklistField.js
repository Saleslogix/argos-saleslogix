import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import LookupField from 'argos/Fields/LookupField';
import PickList from '../Views/PickList';
import FieldManager from 'argos/FieldManager';
const viewsByName = {};
let viewsByNameCount = 0;
//   getOrCreateViewFor,
//   control,
//   viewsByNameCount = 0;

const getOrCreateViewFor = function getOrCreateViewFor(name) {
  if (viewsByName[name]) {
    return viewsByName[name];
  }

  const view = new PickList({
    id: `pick_list_${viewsByNameCount++}`,
    expose: false,
  });

  App.registerView(view);
  viewsByName[name] = view;

  return App.getView(view.id);
};

const control = declare('crm.Fields.PicklistField', [LookupField], {
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
      default:
        this.keyProperty = 'text';
        this.textProperty = 'text';
    }
  },
  isReadOnly: function isReadOnly() {
    return !this.picklist;
  },
  formatResourcePredicate: function formatResourcePredicate(name) {
    return string.substitute("name eq '${0}'", [name]);
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
      options.resourcePredicate = this.formatResourcePredicate(
        this.dependsOn // only pass dependentValue if there is a dependency
        ? this.expandExpression(this.picklist, options.dependentValue) : this.expandExpression(this.picklist)
      );
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
          scope: this,
        }, {
          id: 'cancel',
          cls: 'fa fa-ban fa-fw fa-lg',
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
    const view = App.getView(this.view) || getOrCreateViewFor(this.picklist);

    if (view && options) {
      view.refreshRequired = true;
      view.show(options);
    }
  },
});

lang.setObject('Mobile.SalesLogix.Fields.PickListField', control);
export default FieldManager.register('picklist', control);
