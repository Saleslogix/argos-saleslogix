/**
 * @class crm.Views.Offline.Detail
 *
 *
 * @extends argos._DetailBase
 * @requires argos._DetailBase
 *
 */
import declare from 'dojo/_base/declare';
import _DetailBase from 'argos/_DetailBase';
import array from 'dojo/_base/array';
import domConstruct from 'dojo/dom-construct';
import format from '../../Format';
import _RelatedWidgetDetailMixin from 'argos/_RelatedViewWidgetDetailMixin';
import MODEL_TYPES from 'argos/Models/Types';
import lang from 'dojo/_base/lang';
import query from 'dojo/query';


export default declare('crm.Views.Offline.Detail', [_DetailBase, _RelatedWidgetDetailMixin], {
  id: 'offline_detail',
  titleText: 'Offline Detail',
  offlineText: 'Offline',
  idProperty: 'id',
  offlineDoc: null,
  detailHeaderTemplate: new Simplate([
    '<div class="detail-header">',
    '{%: $.value %}',
    '</div>',
    '<div class="detail-sub-header">',
    '{%: $.offlineDate %}',
    '</div>',
  ]),
  relatedTemplate: new Simplate([
    '<li class="{%= $.cls %}">',
    '<a data-action="activateRelatedList" data-view="{%= $.view %}" data-name="{%: $.name %}" data-context="{%: $.context %}" {% if ($.disabled) { %}data-disable-action="true"{% } %} class="{% if ($.disabled) { %}disabled{% } %}">',
    '{% if ($.icon) { %}',
    '<img src="{%= $.icon %}" alt="icon" class="icon" />',
    '{% } else if ($.iconClass) { %}',
    '<div class="{%= $.iconClass %}" alt="icon"></div>',
    '{% } %}',
    '<span class="related-item-label">{%: $.label %}</span>',
    '</a>',
    '</li>',
  ]),
  show: function show(options) {
    this._initOfflineView(options);
    this.inherited(arguments);
  },
  _initOfflineView: function _initOfflineView(options) {
    this.offlineContext = {
      entityName: null,
      entityId: null,
      viewId: null,
      offlineDate: null,
      source: null,
    };
    this.refreshRequired = true;
    lang.mixin(this.offlineContext, options.offlineContext);
    this._model = App.ModelManager.getModel(this.offlineContext.entityName, MODEL_TYPES.OFFLINE);

    const views = App.getViews()
      .filter((view) => {
        return view.id === this.offlineContext.viewId && view.createLayout;
      });

    this._entityView = views[0];
  },
  _applyStateToGetOptions: function _applyStateToGetOptions() {},
  _buildGetExpression: function _buildGetExpression() {
    const options = this.options;
    return options && (options.id || options.key);
  },
  placeDetailHeader: function placeDetailHeader() {
    let value;
    let offlineDate = '';
    if (this._model && this._model.entityDisplayName) {
      value = this._model.entityDisplayName + ' ' + this.informationText;
    } else {
      value = this.entityText + ' ' + this.informationText;
    }
    value = value + ' - ' + this.offlineText;
    if (this.entry.$offlineDate) {
      offlineDate = format.relativeDate(this.entry.$offlineDate);
    }
    domConstruct.place(this.detailHeaderTemplate.apply({ value: value, offlineDate: offlineDate }, this), this.tabList, 'before');
  },
  createLayout: function createLayout() {
    const view = this._entityView;
    let layout = [];
    if (view) {
      view.entry = this.entry;
      layout = view.createLayout.apply(view);
    }
    this.disableSections(layout);
    this.applyRelatedSections(layout);
    return layout;
  },
  disableSections: function disableSections(sections) {
    array.forEach(sections, (section) => {
      this.disableSection(section);
    }, this);
  },
  disableSection: function disableSection(section) {
    array.forEach(section.children, (property) => {
      this.disableProperty(section, property);
    }, this);
  },
  disableProperty: function disableProperty(section, property) {
    if (property.enableOffline) {
      return;
    }
    property.disabled = true;
  },
  applyRelatedSections: function applyRelatedSections(sections) {
    this._relatedItems = {};
    array.forEach(sections, (section) => {
      if (section.name === 'RelatedItemsSection') {
        section.children = [];
        this.addRelatedLayout(section);
      }
    }, this);
  },
  addRelatedLayout: function addRelatedLayout(section) {
    const rels = this._model.relationships;
    array.forEach(rels, (rel) => {
      if (rel && rel.childEntity) {
        const viewId = (rel.viewId) ? rel.viewId : rel.childEntity.toLowerCase() + '_related';
        const item = {
          name: rel.name,
          entityName: rel.childEntity,
          label: rel.displayName,
          view: viewId,
          relationship: rel,
        };
        this._relatedItems[item.name] = item;
        section.children.push(item);
      }
    }, this);
  },
  _processRelatedItem: function _processRelatedItem(data, context, rowNode) {
    const labelNode = query('.related-item-label', rowNode)[0];
    const count = this._model.getRelatedCount(context.relationship, this.entry);
    if (labelNode) {
      const html = '<span class="related-item-count">' + count + '</span>';
      domConstruct.place(html, labelNode, 'before');
    } else {
      console.warn('Missing the "related-item-label" dom node.'); //eslint-disable-line
    }
  },
  activateRelatedList: function activateRelatedList(params) {
    if (params.context) {
     // this.navigateToRelatedView(params.view, parseInt(params.context, 10), params.descriptor);
      this.navigateToRelatedView(params);
    }
  },
  navigateToRelatedView: function navigateToRelatedView(params) {
    const rel = this._relatedItems[params.name];
    const view = App.getView('offline_list');
    const queryExpression = this._model.buildRelatedQueryExpression(rel.relationship, this.entry);
    const options = {
      offlineContext: {
        parentEntry: this.entry,
        parentEntityId: this._model.getEntityId(this.entry),
        entityName: rel.entityName,
        viewId: rel.view,
        related: rel,
        source: this,
        queryExpression: queryExpression,
      }};
    options.fromContext = this;
    options.selectedEntry = this.entry;
    if (view && options) {
      view.show(options);
    }
  },
});


