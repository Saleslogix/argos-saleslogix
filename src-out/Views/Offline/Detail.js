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
    }

  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lL0RldGFpbC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImlkIiwidGl0bGVUZXh0Iiwib2ZmbGluZVRleHQiLCJpZFByb3BlcnR5Iiwib2ZmbGluZURvYyIsImRldGFpbEhlYWRlclRlbXBsYXRlIiwiU2ltcGxhdGUiLCJyZWxhdGVkVGVtcGxhdGUiLCJzaG93Iiwib3B0aW9ucyIsIl9pbml0T2ZmbGluZVZpZXciLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvZmZsaW5lQ29udGV4dCIsImVudGl0eU5hbWUiLCJlbnRpdHlJZCIsInZpZXdJZCIsIm9mZmxpbmVEYXRlIiwic291cmNlIiwicmVmcmVzaFJlcXVpcmVkIiwibWl4aW4iLCJfbW9kZWwiLCJBcHAiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIk9GRkxJTkUiLCJkZXRhaWxWaWV3SWQiLCJ0b0xvd2VyQ2FzZSIsIl9lbnRpdHlWaWV3IiwiZ2V0RW50aXR5VmlldyIsIm9uVHJhbnNpdGlvblRvIiwic2V0VG9vbEJhck1vZGUiLCJuZXdWaWV3SWQiLCJ2aWV3IiwiZ2V0VmlldyIsImRlc3Ryb3kiLCJWaWV3Q3RvciIsImNvbnN0cnVjdG9yIiwiX2FwcGx5U3RhdGVUb0dldE9wdGlvbnMiLCJfYnVpbGRHZXRFeHByZXNzaW9uIiwia2V5IiwicGxhY2VEZXRhaWxIZWFkZXIiLCJ2YWx1ZSIsImVudGl0eURpc3BsYXlOYW1lIiwic3Vic3RpdHV0ZSIsImluZm9ybWF0aW9uVGV4dCIsImVudGl0eVRleHQiLCJlbnRyeSIsIiRvZmZsaW5lRGF0ZSIsInJlbGF0aXZlRGF0ZSIsIiQiLCJ0YWJDb250YWluZXIiLCJiZWZvcmUiLCJhcHBseSIsImNyZWF0ZUxheW91dCIsIm9yaWdpbmFsIiwibGF5b3V0IiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJmaWx0ZXIiLCJlbmFibGVPZmZsaW5lIiwiZGlzYWJsZVNlY3Rpb25zIiwiYXBwbHlSZWxhdGVkU2VjdGlvbnMiLCJzZWN0aW9ucyIsImZvckVhY2giLCJzZWN0aW9uIiwiZGlzYWJsZVNlY3Rpb24iLCJjaGlsZHJlbiIsInByb3BlcnR5IiwiZGlzYWJsZVByb3BlcnR5IiwiZGlzYWJsZWQiLCJfcmVsYXRlZEl0ZW1zIiwibmFtZSIsImFkZFJlbGF0ZWRMYXlvdXQiLCJyZWxzIiwicmVsYXRpb25zaGlwcyIsInJlbCIsInJlbGF0ZWRFbnRpdHkiLCJyZWxhdGVkTW9kZWwiLCJsaXN0Vmlld0lkIiwiaXRlbSIsImxhYmVsIiwiZGlzcGxheU5hbWUiLCJyZWxhdGlvbnNoaXAiLCJwdXNoIiwiX3Byb2Nlc3NSZWxhdGVkSXRlbSIsImRhdGEiLCJjb250ZXh0Iiwicm93Tm9kZSIsImxhYmVsTm9kZSIsImZpcnN0IiwiZ2V0UmVsYXRlZENvdW50IiwidGhlbiIsImNvdW50IiwicmVtb3ZlIiwiaHRtbCIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiYWN0aXZhdGVSZWxhdGVkRW50cnkiLCJwYXJhbXMiLCJuYXZpZ2F0ZVRvUmVsYXRlZERldGFpbFZpZXciLCJhY3RpdmF0ZVJlbGF0ZWRMaXN0IiwibmF2aWdhdGVUb1JlbGF0ZWRMaXN0VmlldyIsInF1ZXJ5RXhwcmVzc2lvbiIsImJ1aWxkUmVsYXRlZFF1ZXJ5RXhwcmVzc2lvbiIsInRpdGxlIiwicGFyZW50RW50cnkiLCJwYXJlbnRFbnRpdHlJZCIsImdldEVudGl0eUlkIiwicmVsYXRlZCIsImZyb21Db250ZXh0Iiwic2VsZWN0ZWRFbnRyeSIsInNsb3QiLCJwYXJzZUludCIsIl9uYXZpZ2F0aW9uT3B0aW9ucyIsInJlbFZpZXdJZCIsInJlbFZpZXciLCJtb2RlbCIsImRlc2NyaXB0b3IiLCJnZXRSZWxhdGVkRGV0YWlsVmlldyIsImFwcCIsInJlZ2lzdGVyVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7Ozs7OztBQWtCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7b0JB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LENBQVN0RixPQUFULENBQWlCbEIsTUFBakIsQ0FBUDtBQUNBLGFBQU9pQixJQUFQO0FBQ0Q7O0FBcFEwRixHQUE5RSxDIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9mZmxpbmUuRGV0YWlsXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLl9EZXRhaWxCYXNlXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5fRGV0YWlsQmFzZVxyXG4gKlxyXG4gKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9EZXRhaWxCYXNlIGZyb20gJ2FyZ29zL19EZXRhaWxCYXNlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgX1JlbGF0ZWRXaWRnZXREZXRhaWxNaXhpbiBmcm9tICdhcmdvcy9fUmVsYXRlZFZpZXdXaWRnZXREZXRhaWxNaXhpbic7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29mZmxpbmVEZXRhaWwnKTtcclxuZXhwb3J0IGRlZmF1bHQgZGVjbGFyZSgnY3JtLlZpZXdzLk9mZmxpbmUuRGV0YWlsJywgW19EZXRhaWxCYXNlLCBfUmVsYXRlZFdpZGdldERldGFpbE1peGluXSwge1xyXG4gIGlkOiAnb2ZmbGluZV9kZXRhaWwnLFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIG9mZmxpbmVUZXh0OiByZXNvdXJjZS5vZmZsaW5lVGV4dCxcclxuICBpZFByb3BlcnR5OiAnaWQnLFxyXG4gIG9mZmxpbmVEb2M6IG51bGwsXHJcbiAgZGV0YWlsSGVhZGVyVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImRldGFpbC1oZWFkZXJcIj4nLFxyXG4gICAgJ3slOiAkLnZhbHVlICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJkZXRhaWwtc3ViLWhlYWRlclwiPicsXHJcbiAgICAneyU6ICQub2ZmbGluZURhdGUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgcmVsYXRlZFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBjbGFzcz1cInJlbGF0ZWR2aWV3aXRlbSB7JT0gJC5jbHMgJX1cIj4nLFxyXG4gICAgJzxhIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVSZWxhdGVkTGlzdFwiIGRhdGEtdmlldz1cInslPSAkLnZpZXcgJX1cIiBkYXRhLW5hbWU9XCJ7JTogJC5uYW1lICV9XCIgZGF0YS1jb250ZXh0PVwieyU6ICQuY29udGV4dCAlfVwiIHslIGlmICgkLmRpc2FibGVkKSB7ICV9ZGF0YS1kaXNhYmxlLWFjdGlvbj1cInRydWVcInslIH0gJX0gY2xhc3M9XCJ7JSBpZiAoJC5kaXNhYmxlZCkgeyAlfWRpc2FibGVkeyUgfSAlfVwiPicsXHJcbiAgICAneyUgaWYgKCQuaWNvbikgeyAlfScsXHJcbiAgICAnPGltZyBzcmM9XCJ7JT0gJC5pY29uICV9XCIgYWx0PVwiaWNvblwiIGNsYXNzPVwiaWNvblwiIC8+JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuaWNvbkNsYXNzKSB7ICV9JyxcclxuICAgICc8ZGl2IGNsYXNzPVwieyU9ICQuaWNvbkNsYXNzICV9XCIgYWx0PVwiaWNvblwiPjwvZGl2PicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJyZWxhdGVkLWl0ZW0tbGFiZWxcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJidXN5LXhzIGJhZGdlXCInLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJidXN5LWluZGljYXRvci1jb250YWluZXJcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJidXN5LWluZGljYXRvciBhY3RpdmVcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJiYXIgb25lXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYmFyIHR3b1wiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJhciB0aHJlZVwiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImJhciBmb3VyXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiYmFyIGZpdmVcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJ3slOiAkLmxhYmVsICV9PC9zcGFuPicsXHJcbiAgICAnPC9hPicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgdGhpcy5faW5pdE9mZmxpbmVWaWV3KG9wdGlvbnMpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoc2hvdywgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9pbml0T2ZmbGluZVZpZXc6IGZ1bmN0aW9uIF9pbml0T2ZmbGluZVZpZXcob3B0aW9ucykge1xyXG4gICAgdGhpcy5vZmZsaW5lQ29udGV4dCA9IHtcclxuICAgICAgZW50aXR5TmFtZTogbnVsbCxcclxuICAgICAgZW50aXR5SWQ6IG51bGwsXHJcbiAgICAgIHZpZXdJZDogbnVsbCxcclxuICAgICAgb2ZmbGluZURhdGU6IG51bGwsXHJcbiAgICAgIHNvdXJjZTogbnVsbCxcclxuICAgIH07XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICBsYW5nLm1peGluKHRoaXMub2ZmbGluZUNvbnRleHQsIG9wdGlvbnMub2ZmbGluZUNvbnRleHQpO1xyXG4gICAgdGhpcy5fbW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKHRoaXMub2ZmbGluZUNvbnRleHQuZW50aXR5TmFtZSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLm9mZmxpbmVDb250ZXh0LnZpZXdJZCkge1xyXG4gICAgICB0aGlzLm9mZmxpbmVDb250ZXh0LnZpZXdJZCA9ICh0aGlzLl9tb2RlbC5kZXRhaWxWaWV3SWQpID8gdGhpcy5fbW9kZWwuZGV0YWlsVmlld0lkIDogYCR7dGhpcy5fbW9kZWwuZW50aXR5TmFtZS50b0xvd2VyQ2FzZSgpfV9kZXRhaWxgO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2VudGl0eVZpZXcgPSB0aGlzLmdldEVudGl0eVZpZXcoKTtcclxuICB9LFxyXG4gIG9uVHJhbnNpdGlvblRvOiBmdW5jdGlvbiBvblRyYW5zaXRpb25UbygpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uVHJhbnNpdGlvblRvLCBhcmd1bWVudHMpO1xyXG4gICAgQXBwLnNldFRvb2xCYXJNb2RlKGZhbHNlKTtcclxuICB9LFxyXG4gIGdldEVudGl0eVZpZXc6IGZ1bmN0aW9uIGdldEVudGl0eVZpZXcoKSB7XHJcbiAgICBjb25zdCBuZXdWaWV3SWQgPSBgJHt0aGlzLmlkfV8ke3RoaXMub2ZmbGluZUNvbnRleHQudmlld0lkfWA7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5vZmZsaW5lQ29udGV4dC52aWV3SWQpO1xyXG5cclxuICAgIGlmICh0aGlzLl9lbnRpdHlWaWV3KSB7XHJcbiAgICAgIHRoaXMuX2VudGl0eVZpZXcuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICBjb25zdCBWaWV3Q3RvciA9IHZpZXcuY29uc3RydWN0b3I7XHJcbiAgICAgIHRoaXMuX2VudGl0eVZpZXcgPSBuZXcgVmlld0N0b3IoeyBpZDogbmV3Vmlld0lkIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2VudGl0eVZpZXc7XHJcbiAgfSxcclxuICBfYXBwbHlTdGF0ZVRvR2V0T3B0aW9uczogZnVuY3Rpb24gX2FwcGx5U3RhdGVUb0dldE9wdGlvbnMoKSB7fSxcclxuICBfYnVpbGRHZXRFeHByZXNzaW9uOiBmdW5jdGlvbiBfYnVpbGRHZXRFeHByZXNzaW9uKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgIHJldHVybiBvcHRpb25zICYmIChvcHRpb25zLmlkIHx8IG9wdGlvbnMua2V5KTtcclxuICB9LFxyXG4gIHBsYWNlRGV0YWlsSGVhZGVyOiBmdW5jdGlvbiBwbGFjZURldGFpbEhlYWRlcigpIHtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIGxldCBvZmZsaW5lRGF0ZSA9ICcnO1xyXG4gICAgaWYgKHRoaXMuX21vZGVsICYmIHRoaXMuX21vZGVsLmVudGl0eURpc3BsYXlOYW1lKSB7XHJcbiAgICAgIHZhbHVlID0gc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5pbmZvcm1hdGlvblRleHQsIFt0aGlzLl9tb2RlbC5lbnRpdHlEaXNwbGF5TmFtZV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmluZm9ybWF0aW9uVGV4dCwgW3RoaXMuZW50aXR5VGV4dF0pO1xyXG4gICAgfVxyXG4gICAgdmFsdWUgPSBgJHt2YWx1ZX0gLSAke3RoaXMub2ZmbGluZVRleHR9YDtcclxuICAgIGlmICh0aGlzLmVudHJ5LiRvZmZsaW5lRGF0ZSkge1xyXG4gICAgICBvZmZsaW5lRGF0ZSA9IGZvcm1hdC5yZWxhdGl2ZURhdGUodGhpcy5lbnRyeS4kb2ZmbGluZURhdGUpO1xyXG4gICAgfVxyXG4gICAgJCh0aGlzLnRhYkNvbnRhaW5lcikuYmVmb3JlKHRoaXMuZGV0YWlsSGVhZGVyVGVtcGxhdGUuYXBwbHkoeyB2YWx1ZSwgb2ZmbGluZURhdGUgfSwgdGhpcykpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5fZW50aXR5VmlldztcclxuICAgIGNvbnN0IG9yaWdpbmFsID0gQXBwLmdldFZpZXcodGhpcy5vZmZsaW5lQ29udGV4dC52aWV3SWQpO1xyXG4gICAgbGV0IGxheW91dCA9IFtdO1xyXG4gICAgaWYgKHZpZXcgJiYgb3JpZ2luYWwpIHtcclxuICAgICAgdmlldy5lbnRyeSA9IHRoaXMuZW50cnk7XHJcbiAgICAgIG9yaWdpbmFsLmVudHJ5ID0gdGhpcy5lbnRyeTtcclxuICAgICAgbGF5b3V0ID0gb3JpZ2luYWwuX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQuYXBwbHkob3JpZ2luYWwsIFtvcmlnaW5hbC5jcmVhdGVMYXlvdXQuYXBwbHkob3JpZ2luYWwpXSk7XHJcbiAgICAgIG9yaWdpbmFsLmxheW91dCA9IG51bGw7XHJcbiAgICAgIG9yaWdpbmFsLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGF5b3V0ID0gbGF5b3V0LmZpbHRlcigoeyBlbmFibGVPZmZsaW5lIH0pID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBlbmFibGVPZmZsaW5lID09PSAndW5kZWZpbmVkJyB8fCBlbmFibGVPZmZsaW5lID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBlbmFibGVPZmZsaW5lO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5kaXNhYmxlU2VjdGlvbnMobGF5b3V0KTtcclxuICAgIHRoaXMuYXBwbHlSZWxhdGVkU2VjdGlvbnMobGF5b3V0KTtcclxuICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgfSxcclxuICBkaXNhYmxlU2VjdGlvbnM6IGZ1bmN0aW9uIGRpc2FibGVTZWN0aW9ucyhzZWN0aW9ucyA9IFtdKSB7XHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZVNlY3Rpb24oc2VjdGlvbik7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGRpc2FibGVTZWN0aW9uOiBmdW5jdGlvbiBkaXNhYmxlU2VjdGlvbihzZWN0aW9uID0gW10pIHtcclxuICAgIHNlY3Rpb24uY2hpbGRyZW4uZm9yRWFjaCgocHJvcGVydHkpID0+IHtcclxuICAgICAgdGhpcy5kaXNhYmxlUHJvcGVydHkoc2VjdGlvbiwgcHJvcGVydHkpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBkaXNhYmxlUHJvcGVydHk6IGZ1bmN0aW9uIGRpc2FibGVQcm9wZXJ0eShzZWN0aW9uLCBwcm9wZXJ0eSkge1xyXG4gICAgaWYgKHByb3BlcnR5LmVuYWJsZU9mZmxpbmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHJvcGVydHkuZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH0sXHJcbiAgYXBwbHlSZWxhdGVkU2VjdGlvbnM6IGZ1bmN0aW9uIGFwcGx5UmVsYXRlZFNlY3Rpb25zKHNlY3Rpb25zID0gW10pIHtcclxuICAgIHRoaXMuX3JlbGF0ZWRJdGVtcyA9IHt9O1xyXG4gICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG4gICAgICBpZiAoc2VjdGlvbi5uYW1lID09PSAnUmVsYXRlZEl0ZW1zU2VjdGlvbicpIHtcclxuICAgICAgICBzZWN0aW9uLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5hZGRSZWxhdGVkTGF5b3V0KHNlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGFkZFJlbGF0ZWRMYXlvdXQ6IGZ1bmN0aW9uIGFkZFJlbGF0ZWRMYXlvdXQoc2VjdGlvbikge1xyXG4gICAgY29uc3QgcmVscyA9IHRoaXMuX21vZGVsLnJlbGF0aW9uc2hpcHMgfHwgW107XHJcbiAgICByZWxzLmZvckVhY2goKHJlbCkgPT4ge1xyXG4gICAgICBpZiAocmVsICYmIHJlbC5yZWxhdGVkRW50aXR5KSB7XHJcbiAgICAgICAgY29uc3QgcmVsYXRlZE1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbChyZWwucmVsYXRlZEVudGl0eSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICAgICAgbGV0IHZpZXdJZDtcclxuICAgICAgICBpZiAocmVsLnZpZXdJZCkge1xyXG4gICAgICAgICAgdmlld0lkID0gcmVsLnZpZXdJZDtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlbGF0ZWRNb2RlbCAmJiByZWxhdGVkTW9kZWwubGlzdFZpZXdJZCkge1xyXG4gICAgICAgICAgdmlld0lkID0gcmVsYXRlZE1vZGVsLmxpc3RWaWV3SWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZpZXdJZCA9IGAke3JlbC5yZWxhdGVkRW50aXR5LnRvTG93ZXJDYXNlKCl9X3JlbGF0ZWRgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHtcclxuICAgICAgICAgIG5hbWU6IHJlbC5uYW1lLFxyXG4gICAgICAgICAgZW50aXR5TmFtZTogcmVsLnJlbGF0ZWRFbnRpdHksXHJcbiAgICAgICAgICBsYWJlbDogcmVsLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgdmlldzogdmlld0lkLFxyXG4gICAgICAgICAgcmVsYXRpb25zaGlwOiByZWwsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVsYXRlZEl0ZW1zW2l0ZW0ubmFtZV0gPSBpdGVtO1xyXG4gICAgICAgIHNlY3Rpb24uY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBfcHJvY2Vzc1JlbGF0ZWRJdGVtOiBmdW5jdGlvbiBfcHJvY2Vzc1JlbGF0ZWRJdGVtKGRhdGEsIGNvbnRleHQsIHJvd05vZGUpIHtcclxuICAgIGNvbnN0IGxhYmVsTm9kZSA9ICQoJy5yZWxhdGVkLWl0ZW0tbGFiZWwnLCByb3dOb2RlKS5maXJzdCgpO1xyXG4gICAgY29uc3QgeyByZWxhdGlvbnNoaXAgfSA9IGRhdGE7XHJcbiAgICBpZiAobGFiZWxOb2RlICYmIHJlbGF0aW9uc2hpcCkge1xyXG4gICAgICB0aGlzLl9tb2RlbC5nZXRSZWxhdGVkQ291bnQocmVsYXRpb25zaGlwLCB0aGlzLmVudHJ5KS50aGVuKChjb3VudCkgPT4ge1xyXG4gICAgICAgICQoJy5idXN5LXhzJywgbGFiZWxOb2RlKS5yZW1vdmUoKTtcclxuICAgICAgICBjb25zdCBodG1sID0gYDxzcGFuIGNsYXNzPVwiaW5mbyBiYWRnZVwiPiR7Y291bnR9PC9zcGFuPmA7XHJcbiAgICAgICAgJChsYWJlbE5vZGUpLmJlZm9yZShodG1sKTtcclxuICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZ2V0dGluZyByZWxhdGVkIGl0ZW0gY291bnQ6ICcgKyBlcnIpOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ01pc3NpbmcgdGhlIFwicmVsYXRlZC1pdGVtLWxhYmVsXCIgZG9tIG5vZGUuJyk7IC8vZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGVSZWxhdGVkRW50cnk6IGZ1bmN0aW9uIGFjdGl2YXRlUmVsYXRlZEVudHJ5KHBhcmFtcykge1xyXG4gICAgaWYgKHBhcmFtcy5jb250ZXh0KSB7XHJcbiAgICAgIC8vIHRoaXMubmF2aWdhdGVUb1JlbGF0ZWRWaWV3KHBhcmFtcy52aWV3LCBwYXJzZUludChwYXJhbXMuY29udGV4dCwgMTApLCBwYXJhbXMuZGVzY3JpcHRvcik7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb1JlbGF0ZWREZXRhaWxWaWV3KHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhY3RpdmF0ZVJlbGF0ZWRMaXN0OiBmdW5jdGlvbiBhY3RpdmF0ZVJlbGF0ZWRMaXN0KHBhcmFtcykge1xyXG4gICAgaWYgKHBhcmFtcy5jb250ZXh0KSB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb1JlbGF0ZWRMaXN0VmlldyhwYXJhbXMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb1JlbGF0ZWRMaXN0VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb1JlbGF0ZWRMaXN0VmlldyhwYXJhbXMpIHtcclxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX3JlbGF0ZWRJdGVtc1twYXJhbXMubmFtZV07XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ29mZmxpbmVfbGlzdCcpO1xyXG4gICAgY29uc3QgcXVlcnlFeHByZXNzaW9uID0gdGhpcy5fbW9kZWwuYnVpbGRSZWxhdGVkUXVlcnlFeHByZXNzaW9uKHJlbC5yZWxhdGlvbnNoaXAsIHRoaXMuZW50cnkpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgdGl0bGU6IHJlbC5sYWJlbCxcclxuICAgICAgb2ZmbGluZUNvbnRleHQ6IHtcclxuICAgICAgICBwYXJlbnRFbnRyeTogdGhpcy5lbnRyeSxcclxuICAgICAgICBwYXJlbnRFbnRpdHlJZDogdGhpcy5fbW9kZWwuZ2V0RW50aXR5SWQodGhpcy5lbnRyeSksXHJcbiAgICAgICAgZW50aXR5TmFtZTogcmVsLmVudGl0eU5hbWUsXHJcbiAgICAgICAgdmlld0lkOiByZWwudmlldyxcclxuICAgICAgICByZWxhdGVkOiByZWwsXHJcbiAgICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICAgIHF1ZXJ5RXhwcmVzc2lvbixcclxuICAgICAgfSB9O1xyXG4gICAgb3B0aW9ucy5mcm9tQ29udGV4dCA9IHRoaXM7XHJcbiAgICBvcHRpb25zLnNlbGVjdGVkRW50cnkgPSB0aGlzLmVudHJ5O1xyXG4gICAgaWYgKHZpZXcgJiYgb3B0aW9ucykge1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvUmVsYXRlZERldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9SZWxhdGVkRGV0YWlsVmlldyhwYXJhbXMpIHtcclxuICAgIGNvbnN0IHNsb3QgPSBwYXJzZUludChwYXJhbXMuY29udGV4dCwgMTApO1xyXG4gICAgY29uc3QgcmVsID0gdGhpcy5fbmF2aWdhdGlvbk9wdGlvbnNbc2xvdF07XHJcbiAgICBjb25zdCByZWxWaWV3SWQgPSBwYXJhbXMudmlldztcclxuICAgIGNvbnN0IHJlbFZpZXcgPSBBcHAuZ2V0VmlldyhyZWxWaWV3SWQpO1xyXG5cclxuICAgIGlmIChyZWxWaWV3KSB7XHJcbiAgICAgIGNvbnN0IG1vZGVsID0gcmVsVmlldy5nZXRNb2RlbCgpO1xyXG4gICAgICBpZiAobW9kZWwpIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgZGVzY3JpcHRvcjogcGFyYW1zLmRlc2NyaXB0b3IsXHJcbiAgICAgICAgICB0aXRsZTogcGFyYW1zLmRlc2NyaXB0b3IsXHJcbiAgICAgICAgICBrZXk6IHJlbC5rZXksXHJcbiAgICAgICAgICBmcm9tQ29udGV4dDogdGhpcyxcclxuICAgICAgICAgIG9mZmxpbmVDb250ZXh0OiB7XHJcbiAgICAgICAgICAgIGVudGl0eUlkOiByZWwua2V5LFxyXG4gICAgICAgICAgICBlbnRpdHlOYW1lOiBtb2RlbC5lbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICB2aWV3SWQ6IHJlbFZpZXdJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRSZWxhdGVkRGV0YWlsVmlldyhtb2RlbC5lbnRpdHlOYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldFJlbGF0ZWREZXRhaWxWaWV3OiBmdW5jdGlvbiBnZXRSZWxhdGVkRGV0YWlsVmlldyhlbnRpdHlOYW1lKSB7XHJcbiAgICBjb25zdCB2aWV3SWQgPSBgb2ZmbGluZV9kZXRhaWxfJHtlbnRpdHlOYW1lfWA7XHJcbiAgICBsZXQgdmlldyA9IHRoaXMuYXBwLmdldFZpZXcodmlld0lkKTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcC5yZWdpc3RlclZpZXcobmV3IHRoaXMuY29uc3RydWN0b3IoeyBpZDogdmlld0lkIH0pKTtcclxuICAgIHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICByZXR1cm4gdmlldztcclxuICB9LFxyXG5cclxufSk7XHJcbiJdfQ==