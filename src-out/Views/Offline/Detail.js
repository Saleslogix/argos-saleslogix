define('crm/Views/Offline/Detail', ['module', 'exports', 'dojo/_base/declare', 'argos/_DetailBase', '../../Format', 'argos/_RelatedViewWidgetDetailMixin', 'argos/Models/Types', 'dojo/_base/lang', 'argos/I18n', 'dojo/string'], function (module, exports, _declare, _DetailBase2, _Format, _RelatedViewWidgetDetailMixin, _Types, _lang, _I18n, _string) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _DetailBase3 = _interopRequireDefault(_DetailBase2);

  var _Format2 = _interopRequireDefault(_Format);

  var _RelatedViewWidgetDetailMixin2 = _interopRequireDefault(_RelatedViewWidgetDetailMixin);

  var _Types2 = _interopRequireDefault(_Types);

  var _lang2 = _interopRequireDefault(_lang);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var resource = (0, _I18n2.default)('offlineDetail');
  exports.default = (0, _declare2.default)('crm.Views.Offline.Detail', [_DetailBase3.default, _RelatedViewWidgetDetailMixin2.default], {
    id: 'offline_detail',
    titleText: resource.titleText,
    offlineText: resource.offlineText,
    idProperty: 'id',
    offlineDoc: null,
    detailHeaderTemplate: new Simplate(['<div class="detail-header">', '{%: $.value %}', '</div>', '<div class="detail-sub-header">', '{%: $.offlineDate %}', '</div>']),
    relatedTemplate: new Simplate(['<li class="relatedviewitem {%= $.cls %}">', '<a data-action="activateRelatedList" data-view="{%= $.view %}" data-name="{%: $.name %}" data-context="{%: $.context %}" {% if ($.disabled) { %}data-disable-action="true"{% } %} class="{% if ($.disabled) { %}disabled{% } %}">', '{% if ($.icon) { %}', '<img src="{%= $.icon %}" alt="icon" class="icon" />', '{% } else if ($.iconClass) { %}', '<div class="{%= $.iconClass %}" alt="icon"></div>', '{% } %}', '<span class="related-item-label">', '<div class="busy-xs badge"', '<div class="busy-indicator-container" aria-live="polite">', '<div class="busy-indicator active">', '<div class="bar one"></div>', '<div class="bar two"></div>', '<div class="bar three"></div>', '<div class="bar four"></div>', '<div class="bar five"></div>', '</div>', '</div>', '</div>', '{%: $.label %}</span>', '</a>', '</li>']),
    show: function show(options) {
      this._initOfflineView(options);
      this.inherited(show, arguments);
    },
    _initOfflineView: function _initOfflineView(options) {
      this.offlineContext = {
        entityName: null,
        entityId: null,
        viewId: null,
        offlineDate: null,
        source: null
      };
      this.refreshRequired = true;
      _lang2.default.mixin(this.offlineContext, options.offlineContext);
      this._model = App.ModelManager.getModel(this.offlineContext.entityName, _Types2.default.OFFLINE);

      if (!this.offlineContext.viewId) {
        this.offlineContext.viewId = this._model.detailViewId ? this._model.detailViewId : this._model.entityName.toLowerCase() + '_detail';
      }

      this._entityView = this.getEntityView();
    },
    onTransitionTo: function onTransitionTo() {
      this.inherited(onTransitionTo, arguments);
      App.setToolBarMode(false);
    },
    getEntityView: function getEntityView() {
      var newViewId = this.id + '_' + this.offlineContext.viewId;
      var view = App.getView(this.offlineContext.viewId);

      if (this._entityView) {
        this._entityView.destroy();
        this._entityView = null;
      }

      if (view) {
        var ViewCtor = view.constructor;
        this._entityView = new ViewCtor({ id: newViewId });
      }
      return this._entityView;
    },
    _applyStateToGetOptions: function _applyStateToGetOptions() {},
    _buildGetExpression: function _buildGetExpression() {
      var options = this.options;
      return options && (options.id || options.key);
    },
    placeDetailHeader: function placeDetailHeader() {
      var value = void 0;
      var offlineDate = '';
      if (this._model && this._model.entityDisplayName) {
        value = _string2.default.substitute(this.informationText, [this._model.entityDisplayName]);
      } else {
        value = _string2.default.substitute(this.informationText, [this.entityText]);
      }
      value = value + ' - ' + this.offlineText;
      if (this.entry.$offlineDate) {
        offlineDate = _Format2.default.relativeDate(this.entry.$offlineDate);
      }
      $(this.tabContainer).before(this.detailHeaderTemplate.apply({ value: value, offlineDate: offlineDate }, this));
    },
    createLayout: function createLayout() {
      var view = this._entityView;
      var original = App.getView(this.offlineContext.viewId);
      var layout = [];
      if (view && original) {
        view.entry = this.entry;
        original.entry = this.entry;
        layout = original._createCustomizedLayout.apply(original, [original.createLayout.apply(original)]);
        original.layout = null;
        original.refreshRequired = true;
      }

      layout = layout.filter(function (_ref) {
        var enableOffline = _ref.enableOffline;

        if (typeof enableOffline === 'undefined' || enableOffline === null) {
          return true;
        }

        return enableOffline;
      });

      this.disableSections(layout);
      this.applyRelatedSections(layout);
      return layout;
    },
    disableSections: function disableSections() {
      var _this = this;

      var sections = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      sections.forEach(function (section) {
        _this.disableSection(section);
      });
    },
    disableSection: function disableSection() {
      var _this2 = this;

      var section = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      section.children.forEach(function (property) {
        _this2.disableProperty(section, property);
      });
    },
    disableProperty: function disableProperty(section, property) {
      if (property.enableOffline) {
        return;
      }
      property.disabled = true;
    },
    applyRelatedSections: function applyRelatedSections() {
      var _this3 = this;

      var sections = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this._relatedItems = {};
      sections.forEach(function (section) {
        if (section.name === 'RelatedItemsSection') {
          section.children = [];
          _this3.addRelatedLayout(section);
        }
      });
    },
    addRelatedLayout: function addRelatedLayout(section) {
      var _this4 = this;

      var rels = this._model.relationships || [];
      rels.forEach(function (rel) {
        if (rel && rel.relatedEntity) {
          var relatedModel = App.ModelManager.getModel(rel.relatedEntity, _Types2.default.OFFLINE);
          var viewId = void 0;
          if (rel.viewId) {
            viewId = rel.viewId;
          } else if (relatedModel && relatedModel.listViewId) {
            viewId = relatedModel.listViewId;
          } else {
            viewId = rel.relatedEntity.toLowerCase() + '_related';
          }

          var item = {
            name: rel.name,
            entityName: rel.relatedEntity,
            label: rel.displayName,
            view: viewId,
            relationship: rel
          };

          _this4._relatedItems[item.name] = item;
          section.children.push(item);
        }
      });
    },
    _processRelatedItem: function _processRelatedItem(data, context, rowNode) {
      var labelNode = $('.related-item-label', rowNode).first();
      var relationship = data.relationship;

      if (labelNode && relationship) {
        this._model.getRelatedCount(relationship, this.entry).then(function (count) {
          $('.busy-xs', labelNode).remove();
          var html = '<span class="info badge">' + count + '</span>';
          $(labelNode).before(html);
        }, function (err) {
          console.warn('Error getting related item count: ' + err); //eslint-disable-line
        });
      } else {
        console.warn('Missing the "related-item-label" dom node.'); //eslint-disable-line
      }
    },
    activateRelatedEntry: function activateRelatedEntry(params) {
      if (params.context) {
        // this.navigateToRelatedView(params.view, parseInt(params.context, 10), params.descriptor);
        this.navigateToRelatedDetailView(params);
      }
    },
    activateRelatedList: function activateRelatedList(params) {
      if (params.context) {
        this.navigateToRelatedListView(params);
      }
    },
    navigateToRelatedListView: function navigateToRelatedListView(params) {
      var rel = this._relatedItems[params.name];
      var view = App.getView('offline_list');
      var queryExpression = this._model.buildRelatedQueryExpression(rel.relationship, this.entry);
      var options = {
        title: rel.label,
        offlineContext: {
          parentEntry: this.entry,
          parentEntityId: this._model.getEntityId(this.entry),
          entityName: rel.entityName,
          viewId: rel.view,
          related: rel,
          source: this,
          queryExpression: queryExpression
        } };
      options.fromContext = this;
      options.selectedEntry = this.entry;
      if (view && options) {
        view.show(options);
      }
    },
    navigateToRelatedDetailView: function navigateToRelatedDetailView(params) {
      var slot = parseInt(params.context, 10);
      var rel = this._navigationOptions[slot];
      var relViewId = params.view;
      var relView = App.getView(relViewId);

      if (relView) {
        var model = relView.getModel();
        if (model) {
          var options = {
            descriptor: params.descriptor,
            title: params.descriptor,
            key: rel.key,
            fromContext: this,
            offlineContext: {
              entityId: rel.key,
              entityName: model.entityName,
              viewId: relViewId
            }
          };
          var view = this.getRelatedDetailView(model.entityName);

          if (view) {
            view.show(options);
          }
        }
      }
    },
    getRelatedDetailView: function getRelatedDetailView(entityName) {
      var viewId = 'offline_detail_' + entityName;
      var view = this.app.getView(viewId);

      if (view) {
        return view;
      }

      this.app.registerView(new this.constructor({ id: viewId }));
      view = this.app.getView(viewId);
      return view;
    },
    hasAction: function hasAction(actionName) {
      return typeof this._entityView[actionName] === 'function';
    },
    invokeAction: function invokeAction(actionName, parameters, evt, el) {
      return this._entityView[actionName].apply(this._entityView, [parameters, evt, el]);
    }
  });
  module.exports = exports['default'];
});