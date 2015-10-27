import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from '../../Format';
// import validator from '../../Validator';
import Edit from 'argos/Edit';
import domConstruct from 'dojo/dom-construct';
import domAttr from 'dojo/dom-attr';
import query from 'dojo/query';
import utility from 'argos/Utility';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';
import MODEL_TYPES from 'argos/Models/Types';
import FieldManager from 'argos/FieldManager';

const resource = window.localeContext.getEntitySync('offlineOptionsEdit').attributes;

/**
 * @class crm.Views.OfflineOptions.Edit
 *
 * @extends argos.Edit
 *
 * @requires crm.Format
 * @requires crm.Validator
 */
const __class = declare('crm.Views.OfflineOptions.Edit', [Edit], {
  // Localization
  titleText: resource.titleText,


  // View Properties
  id: 'offline_options_edit',
  _usageSectionBeginTemplate: new Simplate([
    '<h2 id="_usageNodeHeader"  data-action="toggleSection" class="{% if ($.collapsed || $.options.collapsed) { %}collapsed{% } %}">',
    '{%: ($.title || $.options.title) %}<button class="collapsed-indicator" aria-label="{%: $$.toggleCollapseText %}"></button>',
    '</h2>',
    '<fieldset id="_usageNodeFields" class="{%= ($.cls || $.options.cls) %}">',
  ]),
  _usageSectionEndTemplate: new Simplate([
     '</fieldset>',
  ]),
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      name: 'maxdays',
      property: 'maxdays',
      label: 'keep offline data for n days',
      type: 'lookup',
      textProperty: 'days',
      view: 'offline_days_list',
    }]);
  },
  requestData: function requestData() {
    return this.getUsage().then((data) => {
      this._onGetComplete(data);
    }, (err) => {
      this._onGetError(null, err);
    });
  },
  getUsage: function getUsage() {
    const def = new Deferred();
    let usageRequests = [];
    this.models = App.ModelManager.getModels(MODEL_TYPES.OFFLINE).filter((model) => {
      if (model && (model.entityName !== 'RecentlyViewed') && (model.entityName !== 'Briefcase')) {
        return model;
      }
    });
    this._createUsageSection();
    usageRequests = this.models.map((model) => {
      return model.getUsage();
    });
    if (usageRequests.length > 0) {
      all(usageRequests).then((results) => {
        const usage = {};
        usage.entites = results;
        def.resolve(usage);
      }, (err) => {
        def.reject(err);
      });
    } else {
      def.resolve();
    }
    return def.promise;
  },
  processEntry: function processEntry(entry) {
    return {
      maxdays: 5,
      usage: entry,
    };
  },
  setValues: function setValues() {
    this._processUsage();
  },
  onRefreshUpdate: function onRefreshUpdate() {
    this.requestData();
  },
  _createUsageSection: function _createUsageSection() {
    let i;
    let rowNode;
    // let docfrag;
    let Ctor;
    let field;
    // let name;
    let content;
    let template;
    let fieldDef;
    this._destroyUsage();
    content = [];
    this._usageFields = [];
    content.push(this._usageSectionBeginTemplate.apply({ options: { collapsed: false, title: 'Usage' } }, this));
    // docfrag = document.createDocumentFragment();
    for (i = 0; i < this.models.length; i++) {
      const model = this.models[i];
      try {
        fieldDef = {
          label: model.entityDisplayNamePlural ? model.entityDisplayNamePlural : model.entityName,
          type: 'text',
          property: 'entity_' + model.entityName,
          name: 'entity_' + model.entityName,
        };
        Ctor = FieldManager.get(fieldDef.type);
        field = this._usageFields[fieldDef.name] = new Ctor(lang.mixin({
          owner: this,
        }, fieldDef));

        template = field.propertyTemplate || this.propertyTemplate;
        content.push(template.apply(field, this));

        this.connect(field, 'onShow', this._onShowField);
        this.connect(field, 'onHide', this._onHideField);
        this.connect(field, 'onEnable', this._onEnableField);
        this.connect(field, 'onDisable', this._onDisableField);
      } catch (err) {
        console.log(err); // eslint-disable-line
      }
    }

    content.push(this._usageSectionEndTemplate.apply({}, this));
    rowNode = domConstruct.toDom(content.join(''));
    domConstruct.place(rowNode, this.contentNode, 'last');

    query('div[data-field]', this.contentNode).forEach((node) => {
      const name = domAttr.get(node, 'data-field');
      field = this._usageFields[name];
      if (field) {
        field.renderTo(node);
      }
    }, this);
  },
  _processUsage: function _processUsage() {
    let i;
    const entities = this.entry.usage.entites;
    for (i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (entity) {
        const field = this._usageFields['entity_' + entity.entityName];
        if (field) {
          field.setValue(format.bigNumber(utility.getValue(entity, 'size')), true);
        }
      }
    }
  },
  _destroyUsage: function _destroyUsage() {
    for (const name in this._usageFields) {
      if (this._usageFields.hasOwnProperty(name)) {
        const field = this._usageFields[name];
        if (field) {
          field.destroy();
        }
      }
    }
    domConstruct.destroy('_usageNodeHeader');
    domConstruct.destroy('_usageNodeFields');
  },
});

export default __class;
