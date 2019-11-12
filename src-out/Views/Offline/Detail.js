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

  /**
   * @class crm.Views.Offline.Detail
   *
   *
   * @extends argos._DetailBase
   * @requires argos._DetailBase
   *
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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
    }

  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImlkIiwidGl0bGVUZXh0Iiwib2ZmbGluZVRleHQiLCJpZFByb3BlcnR5Iiwib2ZmbGluZURvYyIsImRldGFpbEhlYWRlclRlbXBsYXRlIiwiU2ltcGxhdGUiLCJyZWxhdGVkVGVtcGxhdGUiLCJzaG93Iiwib3B0aW9ucyIsIl9pbml0T2ZmbGluZVZpZXciLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvZmZsaW5lQ29udGV4dCIsImVudGl0eU5hbWUiLCJlbnRpdHlJZCIsInZpZXdJZCIsIm9mZmxpbmVEYXRlIiwic291cmNlIiwicmVmcmVzaFJlcXVpcmVkIiwibWl4aW4iLCJfbW9kZWwiLCJBcHAiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIk9GRkxJTkUiLCJkZXRhaWxWaWV3SWQiLCJ0b0xvd2VyQ2FzZSIsIl9lbnRpdHlWaWV3IiwiZ2V0RW50aXR5VmlldyIsIm9uVHJhbnNpdGlvblRvIiwic2V0VG9vbEJhck1vZGUiLCJuZXdWaWV3SWQiLCJ2aWV3IiwiZ2V0VmlldyIsImRlc3Ryb3kiLCJWaWV3Q3RvciIsImNvbnN0cnVjdG9yIiwiX2FwcGx5U3RhdGVUb0dldE9wdGlvbnMiLCJfYnVpbGRHZXRFeHByZXNzaW9uIiwia2V5IiwicGxhY2VEZXRhaWxIZWFkZXIiLCJ2YWx1ZSIsImVudGl0eURpc3BsYXlOYW1lIiwic3Vic3RpdHV0ZSIsImluZm9ybWF0aW9uVGV4dCIsImVudGl0eVRleHQiLCJlbnRyeSIsIiRvZmZsaW5lRGF0ZSIsInJlbGF0aXZlRGF0ZSIsIiQiLCJ0YWJDb250YWluZXIiLCJiZWZvcmUiLCJhcHBseSIsImNyZWF0ZUxheW91dCIsIm9yaWdpbmFsIiwibGF5b3V0IiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJmaWx0ZXIiLCJlbmFibGVPZmZsaW5lIiwiZGlzYWJsZVNlY3Rpb25zIiwiYXBwbHlSZWxhdGVkU2VjdGlvbnMiLCJzZWN0aW9ucyIsImZvckVhY2giLCJzZWN0aW9uIiwiZGlzYWJsZVNlY3Rpb24iLCJjaGlsZHJlbiIsInByb3BlcnR5IiwiZGlzYWJsZVByb3BlcnR5IiwiZGlzYWJsZWQiLCJfcmVsYXRlZEl0ZW1zIiwibmFtZSIsImFkZFJlbGF0ZWRMYXlvdXQiLCJyZWxzIiwicmVsYXRpb25zaGlwcyIsInJlbCIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkTW9kZWwiLCJsaXN0Vmlld0lkIiwiaXRlbSIsImxhYmVsIiwiZGlzcGxheU5hbWUiLCJyZWxhdGlvbnNoaXAiLCJwdXNoIiwiX3Byb2Nlc3NSZWxhdGVkSXRlbSIsImRhdGEiLCJjb250ZXh0Iiwicm93Tm9kZSIsImxhYmVsTm9kZSIsImZpcnN0IiwiZ2V0UmVsYXRlZENvdW50IiwidGhlbiIsImNvdW50IiwicmVtb3ZlIiwiaHRtbCIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiYWN0aXZhdGVSZWxhdGVkRW50cnkiLCJwYXJhbXMiLCJuYXZpZ2F0ZVRvUmVsYXRlZERldGFpbFZpZXciLCJhY3RpdmF0ZVJlbGF0ZWRMaXN0IiwibmF2aWdhdGVUb1JlbGF0ZWRMaXN0VmlldyIsInF1ZXJ5RXhwcmVzc2lvbiIsImJ1aWxkUmVsYXRlZFF1ZXJ5RXhwcmVzc2lvbiIsInRpdGxlIiwicGFyZW50RW50cnkiLCJwYXJlbnRFbnRpdHlJZCIsImdldEVudGl0eUlkIiwicmVsYXRlZCIsImZyb21Db250ZXh0Iiwic2VsZWN0ZWRFbnRyeSIsInNsb3QiLCJwYXJzZUludCIsIl9uYXZpZ2F0aW9uT3B0aW9ucyIsInJlbFZpZXdJZCIsInJlbFZpZXciLCJtb2RlbCIsImRlc2NyaXB0b3IiLCJnZXRSZWxhdGVkRGV0YWlsVmlldyIsImFwcCIsInJlZ2lzdGVyVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7Ozs7OztBQWtCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7b0JB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QUFQO0FBQ0EsYUFBT2lCLElBQVA7QUFDRDs7QUFwUTBGLEdBQTlFLEMiLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT2ZmbGluZS5EZXRhaWxcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuX0RldGFpbEJhc2VcclxuICogQHJlcXVpcmVzIGFyZ29zLl9EZXRhaWxCYXNlXHJcbiAqXHJcbiAqL1xyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX0RldGFpbEJhc2UgZnJvbSAnYXJnb3MvX0RldGFpbEJhc2UnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBfUmVsYXRlZFdpZGdldERldGFpbE1peGluIGZyb20gJ2FyZ29zL19SZWxhdGVkVmlld1dpZGdldERldGFpbE1peGluJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb2ZmbGluZURldGFpbCcpO1xyXG5leHBvcnQgZGVmYXVsdCBkZWNsYXJlKCdjcm0uVmlld3MuT2ZmbGluZS5EZXRhaWwnLCBbX0RldGFpbEJhc2UsIF9SZWxhdGVkV2lkZ2V0RGV0YWlsTWl4aW5dLCB7XHJcbiAgaWQ6ICdvZmZsaW5lX2RldGFpbCcsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgb2ZmbGluZVRleHQ6IHJlc291cmNlLm9mZmxpbmVUZXh0LFxyXG4gIGlkUHJvcGVydHk6ICdpZCcsXHJcbiAgb2ZmbGluZURvYzogbnVsbCxcclxuICBkZXRhaWxIZWFkZXJUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiZGV0YWlsLWhlYWRlclwiPicsXHJcbiAgICAneyU6ICQudmFsdWUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImRldGFpbC1zdWItaGVhZGVyXCI+JyxcclxuICAgICd7JTogJC5vZmZsaW5lRGF0ZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICByZWxhdGVkVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGNsYXNzPVwicmVsYXRlZHZpZXdpdGVtIHslPSAkLmNscyAlfVwiPicsXHJcbiAgICAnPGEgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZVJlbGF0ZWRMaXN0XCIgZGF0YS12aWV3PVwieyU9ICQudmlldyAlfVwiIGRhdGEtbmFtZT1cInslOiAkLm5hbWUgJX1cIiBkYXRhLWNvbnRleHQ9XCJ7JTogJC5jb250ZXh0ICV9XCIgeyUgaWYgKCQuZGlzYWJsZWQpIHsgJX1kYXRhLWRpc2FibGUtYWN0aW9uPVwidHJ1ZVwieyUgfSAlfSBjbGFzcz1cInslIGlmICgkLmRpc2FibGVkKSB7ICV9ZGlzYWJsZWR7JSB9ICV9XCI+JyxcclxuICAgICd7JSBpZiAoJC5pY29uKSB7ICV9JyxcclxuICAgICc8aW1nIHNyYz1cInslPSAkLmljb24gJX1cIiBhbHQ9XCJpY29uXCIgY2xhc3M9XCJpY29uXCIgLz4nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5pY29uQ2xhc3MpIHsgJX0nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJ7JT0gJC5pY29uQ2xhc3MgJX1cIiBhbHQ9XCJpY29uXCI+PC9kaXY+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8c3BhbiBjbGFzcz1cInJlbGF0ZWQtaXRlbS1sYWJlbFwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJ1c3kteHMgYmFkZ2VcIicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJ1c3ktaW5kaWNhdG9yLWNvbnRhaW5lclwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJ1c3ktaW5kaWNhdG9yIGFjdGl2ZVwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJhciBvbmVcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJiYXIgdHdvXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYmFyIHRocmVlXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYmFyIGZvdXJcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJiYXIgZml2ZVwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAneyU6ICQubGFiZWwgJX08L3NwYW4+JyxcclxuICAgICc8L2E+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9pbml0T2ZmbGluZVZpZXcob3B0aW9ucyk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX2luaXRPZmZsaW5lVmlldzogZnVuY3Rpb24gX2luaXRPZmZsaW5lVmlldyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLm9mZmxpbmVDb250ZXh0ID0ge1xyXG4gICAgICBlbnRpdHlOYW1lOiBudWxsLFxyXG4gICAgICBlbnRpdHlJZDogbnVsbCxcclxuICAgICAgdmlld0lkOiBudWxsLFxyXG4gICAgICBvZmZsaW5lRGF0ZTogbnVsbCxcclxuICAgICAgc291cmNlOiBudWxsLFxyXG4gICAgfTtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIGxhbmcubWl4aW4odGhpcy5vZmZsaW5lQ29udGV4dCwgb3B0aW9ucy5vZmZsaW5lQ29udGV4dCk7XHJcbiAgICB0aGlzLl9tb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwodGhpcy5vZmZsaW5lQ29udGV4dC5lbnRpdHlOYW1lLCBNT0RFTF9UWVBFUy5PRkZMSU5FKTtcclxuXHJcbiAgICBpZiAoIXRoaXMub2ZmbGluZUNvbnRleHQudmlld0lkKSB7XHJcbiAgICAgIHRoaXMub2ZmbGluZUNvbnRleHQudmlld0lkID0gKHRoaXMuX21vZGVsLmRldGFpbFZpZXdJZCkgPyB0aGlzLl9tb2RlbC5kZXRhaWxWaWV3SWQgOiBgJHt0aGlzLl9tb2RlbC5lbnRpdHlOYW1lLnRvTG93ZXJDYXNlKCl9X2RldGFpbGA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZW50aXR5VmlldyA9IHRoaXMuZ2V0RW50aXR5VmlldygpO1xyXG4gIH0sXHJcbiAgb25UcmFuc2l0aW9uVG86IGZ1bmN0aW9uIG9uVHJhbnNpdGlvblRvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIEFwcC5zZXRUb29sQmFyTW9kZShmYWxzZSk7XHJcbiAgfSxcclxuICBnZXRFbnRpdHlWaWV3OiBmdW5jdGlvbiBnZXRFbnRpdHlWaWV3KCkge1xyXG4gICAgY29uc3QgbmV3Vmlld0lkID0gYCR7dGhpcy5pZH1fJHt0aGlzLm9mZmxpbmVDb250ZXh0LnZpZXdJZH1gO1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMub2ZmbGluZUNvbnRleHQudmlld0lkKTtcclxuXHJcbiAgICBpZiAodGhpcy5fZW50aXR5Vmlldykge1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3LmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fZW50aXR5VmlldyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgY29uc3QgVmlld0N0b3IgPSB2aWV3LmNvbnN0cnVjdG9yO1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3ID0gbmV3IFZpZXdDdG9yKHsgaWQ6IG5ld1ZpZXdJZCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9lbnRpdHlWaWV3O1xyXG4gIH0sXHJcbiAgX2FwcGx5U3RhdGVUb0dldE9wdGlvbnM6IGZ1bmN0aW9uIF9hcHBseVN0YXRlVG9HZXRPcHRpb25zKCkge30sXHJcbiAgX2J1aWxkR2V0RXhwcmVzc2lvbjogZnVuY3Rpb24gX2J1aWxkR2V0RXhwcmVzc2lvbigpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICByZXR1cm4gb3B0aW9ucyAmJiAob3B0aW9ucy5pZCB8fCBvcHRpb25zLmtleSk7XHJcbiAgfSxcclxuICBwbGFjZURldGFpbEhlYWRlcjogZnVuY3Rpb24gcGxhY2VEZXRhaWxIZWFkZXIoKSB7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBsZXQgb2ZmbGluZURhdGUgPSAnJztcclxuICAgIGlmICh0aGlzLl9tb2RlbCAmJiB0aGlzLl9tb2RlbC5lbnRpdHlEaXNwbGF5TmFtZSkge1xyXG4gICAgICB2YWx1ZSA9IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuaW5mb3JtYXRpb25UZXh0LCBbdGhpcy5fbW9kZWwuZW50aXR5RGlzcGxheU5hbWVdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5pbmZvcm1hdGlvblRleHQsIFt0aGlzLmVudGl0eVRleHRdKTtcclxuICAgIH1cclxuICAgIHZhbHVlID0gYCR7dmFsdWV9IC0gJHt0aGlzLm9mZmxpbmVUZXh0fWA7XHJcbiAgICBpZiAodGhpcy5lbnRyeS4kb2ZmbGluZURhdGUpIHtcclxuICAgICAgb2ZmbGluZURhdGUgPSBmb3JtYXQucmVsYXRpdmVEYXRlKHRoaXMuZW50cnkuJG9mZmxpbmVEYXRlKTtcclxuICAgIH1cclxuICAgICQodGhpcy50YWJDb250YWluZXIpLmJlZm9yZSh0aGlzLmRldGFpbEhlYWRlclRlbXBsYXRlLmFwcGx5KHsgdmFsdWUsIG9mZmxpbmVEYXRlIH0sIHRoaXMpKTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuX2VudGl0eVZpZXc7XHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IEFwcC5nZXRWaWV3KHRoaXMub2ZmbGluZUNvbnRleHQudmlld0lkKTtcclxuICAgIGxldCBsYXlvdXQgPSBbXTtcclxuICAgIGlmICh2aWV3ICYmIG9yaWdpbmFsKSB7XHJcbiAgICAgIHZpZXcuZW50cnkgPSB0aGlzLmVudHJ5O1xyXG4gICAgICBvcmlnaW5hbC5lbnRyeSA9IHRoaXMuZW50cnk7XHJcbiAgICAgIGxheW91dCA9IG9yaWdpbmFsLl9jcmVhdGVDdXN0b21pemVkTGF5b3V0LmFwcGx5KG9yaWdpbmFsLCBbb3JpZ2luYWwuY3JlYXRlTGF5b3V0LmFwcGx5KG9yaWdpbmFsKV0pO1xyXG4gICAgICBvcmlnaW5hbC5sYXlvdXQgPSBudWxsO1xyXG4gICAgICBvcmlnaW5hbC5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxheW91dCA9IGxheW91dC5maWx0ZXIoKHsgZW5hYmxlT2ZmbGluZSB9KSA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgZW5hYmxlT2ZmbGluZSA9PT0gJ3VuZGVmaW5lZCcgfHwgZW5hYmxlT2ZmbGluZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZW5hYmxlT2ZmbGluZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZGlzYWJsZVNlY3Rpb25zKGxheW91dCk7XHJcbiAgICB0aGlzLmFwcGx5UmVsYXRlZFNlY3Rpb25zKGxheW91dCk7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbiAgZGlzYWJsZVNlY3Rpb25zOiBmdW5jdGlvbiBkaXNhYmxlU2VjdGlvbnMoc2VjdGlvbnMgPSBbXSkge1xyXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLmRpc2FibGVTZWN0aW9uKHNlY3Rpb24pO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBkaXNhYmxlU2VjdGlvbjogZnVuY3Rpb24gZGlzYWJsZVNlY3Rpb24oc2VjdGlvbiA9IFtdKSB7XHJcbiAgICBzZWN0aW9uLmNoaWxkcmVuLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZVByb3BlcnR5KHNlY3Rpb24sIHByb3BlcnR5KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZGlzYWJsZVByb3BlcnR5OiBmdW5jdGlvbiBkaXNhYmxlUHJvcGVydHkoc2VjdGlvbiwgcHJvcGVydHkpIHtcclxuICAgIGlmIChwcm9wZXJ0eS5lbmFibGVPZmZsaW5lKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHByb3BlcnR5LmRpc2FibGVkID0gdHJ1ZTtcclxuICB9LFxyXG4gIGFwcGx5UmVsYXRlZFNlY3Rpb25zOiBmdW5jdGlvbiBhcHBseVJlbGF0ZWRTZWN0aW9ucyhzZWN0aW9ucyA9IFtdKSB7XHJcbiAgICB0aGlzLl9yZWxhdGVkSXRlbXMgPSB7fTtcclxuICAgIHNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuICAgICAgaWYgKHNlY3Rpb24ubmFtZSA9PT0gJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nKSB7XHJcbiAgICAgICAgc2VjdGlvbi5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWRkUmVsYXRlZExheW91dChzZWN0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBhZGRSZWxhdGVkTGF5b3V0OiBmdW5jdGlvbiBhZGRSZWxhdGVkTGF5b3V0KHNlY3Rpb24pIHtcclxuICAgIGNvbnN0IHJlbHMgPSB0aGlzLl9tb2RlbC5yZWxhdGlvbnNoaXBzIHx8IFtdO1xyXG4gICAgcmVscy5mb3JFYWNoKChyZWwpID0+IHtcclxuICAgICAgaWYgKHJlbCAmJiByZWwucmVsYXRlZEVudGl0eSkge1xyXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRNb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwocmVsLnJlbGF0ZWRFbnRpdHksIE1PREVMX1RZUEVTLk9GRkxJTkUpO1xyXG4gICAgICAgIGxldCB2aWV3SWQ7XHJcbiAgICAgICAgaWYgKHJlbC52aWV3SWQpIHtcclxuICAgICAgICAgIHZpZXdJZCA9IHJlbC52aWV3SWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZWxhdGVkTW9kZWwgJiYgcmVsYXRlZE1vZGVsLmxpc3RWaWV3SWQpIHtcclxuICAgICAgICAgIHZpZXdJZCA9IHJlbGF0ZWRNb2RlbC5saXN0Vmlld0lkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2aWV3SWQgPSBgJHtyZWwucmVsYXRlZEVudGl0eS50b0xvd2VyQ2FzZSgpfV9yZWxhdGVkYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7XHJcbiAgICAgICAgICBuYW1lOiByZWwubmFtZSxcclxuICAgICAgICAgIGVudGl0eU5hbWU6IHJlbC5yZWxhdGVkRW50aXR5LFxyXG4gICAgICAgICAgbGFiZWw6IHJlbC5kaXNwbGF5TmFtZSxcclxuICAgICAgICAgIHZpZXc6IHZpZXdJZCxcclxuICAgICAgICAgIHJlbGF0aW9uc2hpcDogcmVsLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX3JlbGF0ZWRJdGVtc1tpdGVtLm5hbWVdID0gaXRlbTtcclxuICAgICAgICBzZWN0aW9uLmNoaWxkcmVuLnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgX3Byb2Nlc3NSZWxhdGVkSXRlbTogZnVuY3Rpb24gX3Byb2Nlc3NSZWxhdGVkSXRlbShkYXRhLCBjb250ZXh0LCByb3dOb2RlKSB7XHJcbiAgICBjb25zdCBsYWJlbE5vZGUgPSAkKCcucmVsYXRlZC1pdGVtLWxhYmVsJywgcm93Tm9kZSkuZmlyc3QoKTtcclxuICAgIGNvbnN0IHsgcmVsYXRpb25zaGlwIH0gPSBkYXRhO1xyXG4gICAgaWYgKGxhYmVsTm9kZSAmJiByZWxhdGlvbnNoaXApIHtcclxuICAgICAgdGhpcy5fbW9kZWwuZ2V0UmVsYXRlZENvdW50KHJlbGF0aW9uc2hpcCwgdGhpcy5lbnRyeSkudGhlbigoY291bnQpID0+IHtcclxuICAgICAgICAkKCcuYnVzeS14cycsIGxhYmVsTm9kZSkucmVtb3ZlKCk7XHJcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8c3BhbiBjbGFzcz1cImluZm8gYmFkZ2VcIj4ke2NvdW50fTwvc3Bhbj5gO1xyXG4gICAgICAgICQobGFiZWxOb2RlKS5iZWZvcmUoaHRtbCk7XHJcbiAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGdldHRpbmcgcmVsYXRlZCBpdGVtIGNvdW50OiAnICsgZXJyKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKCdNaXNzaW5nIHRoZSBcInJlbGF0ZWQtaXRlbS1sYWJlbFwiIGRvbSBub2RlLicpOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIH1cclxuICB9LFxyXG4gIGFjdGl2YXRlUmVsYXRlZEVudHJ5OiBmdW5jdGlvbiBhY3RpdmF0ZVJlbGF0ZWRFbnRyeShwYXJhbXMpIHtcclxuICAgIGlmIChwYXJhbXMuY29udGV4dCkge1xyXG4gICAgICAvLyB0aGlzLm5hdmlnYXRlVG9SZWxhdGVkVmlldyhwYXJhbXMudmlldywgcGFyc2VJbnQocGFyYW1zLmNvbnRleHQsIDEwKSwgcGFyYW1zLmRlc2NyaXB0b3IpO1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG9SZWxhdGVkRGV0YWlsVmlldyhwYXJhbXMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGVSZWxhdGVkTGlzdDogZnVuY3Rpb24gYWN0aXZhdGVSZWxhdGVkTGlzdChwYXJhbXMpIHtcclxuICAgIGlmIChwYXJhbXMuY29udGV4dCkge1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG9SZWxhdGVkTGlzdFZpZXcocGFyYW1zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9SZWxhdGVkTGlzdFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9SZWxhdGVkTGlzdFZpZXcocGFyYW1zKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLl9yZWxhdGVkSXRlbXNbcGFyYW1zLm5hbWVdO1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdvZmZsaW5lX2xpc3QnKTtcclxuICAgIGNvbnN0IHF1ZXJ5RXhwcmVzc2lvbiA9IHRoaXMuX21vZGVsLmJ1aWxkUmVsYXRlZFF1ZXJ5RXhwcmVzc2lvbihyZWwucmVsYXRpb25zaGlwLCB0aGlzLmVudHJ5KTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHRpdGxlOiByZWwubGFiZWwsXHJcbiAgICAgIG9mZmxpbmVDb250ZXh0OiB7XHJcbiAgICAgICAgcGFyZW50RW50cnk6IHRoaXMuZW50cnksXHJcbiAgICAgICAgcGFyZW50RW50aXR5SWQ6IHRoaXMuX21vZGVsLmdldEVudGl0eUlkKHRoaXMuZW50cnkpLFxyXG4gICAgICAgIGVudGl0eU5hbWU6IHJlbC5lbnRpdHlOYW1lLFxyXG4gICAgICAgIHZpZXdJZDogcmVsLnZpZXcsXHJcbiAgICAgICAgcmVsYXRlZDogcmVsLFxyXG4gICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICBxdWVyeUV4cHJlc3Npb24sXHJcbiAgICAgIH0gfTtcclxuICAgIG9wdGlvbnMuZnJvbUNvbnRleHQgPSB0aGlzO1xyXG4gICAgb3B0aW9ucy5zZWxlY3RlZEVudHJ5ID0gdGhpcy5lbnRyeTtcclxuICAgIGlmICh2aWV3ICYmIG9wdGlvbnMpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb1JlbGF0ZWREZXRhaWxWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvUmVsYXRlZERldGFpbFZpZXcocGFyYW1zKSB7XHJcbiAgICBjb25zdCBzbG90ID0gcGFyc2VJbnQocGFyYW1zLmNvbnRleHQsIDEwKTtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX25hdmlnYXRpb25PcHRpb25zW3Nsb3RdO1xyXG4gICAgY29uc3QgcmVsVmlld0lkID0gcGFyYW1zLnZpZXc7XHJcbiAgICBjb25zdCByZWxWaWV3ID0gQXBwLmdldFZpZXcocmVsVmlld0lkKTtcclxuXHJcbiAgICBpZiAocmVsVmlldykge1xyXG4gICAgICBjb25zdCBtb2RlbCA9IHJlbFZpZXcuZ2V0TW9kZWwoKTtcclxuICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGRlc2NyaXB0b3I6IHBhcmFtcy5kZXNjcmlwdG9yLFxyXG4gICAgICAgICAgdGl0bGU6IHBhcmFtcy5kZXNjcmlwdG9yLFxyXG4gICAgICAgICAga2V5OiByZWwua2V5LFxyXG4gICAgICAgICAgZnJvbUNvbnRleHQ6IHRoaXMsXHJcbiAgICAgICAgICBvZmZsaW5lQ29udGV4dDoge1xyXG4gICAgICAgICAgICBlbnRpdHlJZDogcmVsLmtleSxcclxuICAgICAgICAgICAgZW50aXR5TmFtZTogbW9kZWwuZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgdmlld0lkOiByZWxWaWV3SWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0UmVsYXRlZERldGFpbFZpZXcobW9kZWwuZW50aXR5TmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRSZWxhdGVkRGV0YWlsVmlldzogZnVuY3Rpb24gZ2V0UmVsYXRlZERldGFpbFZpZXcoZW50aXR5TmFtZSkge1xyXG4gICAgY29uc3Qgdmlld0lkID0gYG9mZmxpbmVfZGV0YWlsXyR7ZW50aXR5TmFtZX1gO1xyXG4gICAgbGV0IHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHAucmVnaXN0ZXJWaWV3KG5ldyB0aGlzLmNvbnN0cnVjdG9yKHsgaWQ6IHZpZXdJZCB9KSk7XHJcbiAgICB2aWV3ID0gdGhpcy5hcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG4gICAgcmV0dXJuIHZpZXc7XHJcbiAgfSxcclxuXHJcbn0pO1xyXG4iXX0=