define('crm/Views/Offline/List', ['module', 'exports', 'dojo/_base/declare', 'argos/_ListBase', '../../Format', 'dojo/_base/lang', 'argos/Models/Types', './Detail', 'argos/I18n'], function (module, exports, _declare, _ListBase2, _Format, _lang, _Types, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ListBase3 = _interopRequireDefault(_ListBase2);

  var _Format2 = _interopRequireDefault(_Format);

  var _lang2 = _interopRequireDefault(_lang);

  var _Types2 = _interopRequireDefault(_Types);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('offlineList'); /* Copyright 2017 Infor
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
   * @class crm.Views.Offline.List
   *
   * @extends argos._ListBase
   * @requires argos._ListBase
   *
   *
   */
  exports.default = (0, _declare2.default)('crm.Views.Offline.List', [_ListBase3.default], {
    id: 'offline_list',
    detailView: 'offline_detail',
    enableSearch: false,
    enableActions: true,
    resourceKind: '',
    entityName: '',
    titleText: resource.titleText,
    offlineText: resource.offlineText,
    pageSize: 1000,
    itemIndicatorTemplate: new Simplate(['<span{% if ($.iconCls) { %} class="{%= $.iconCls %}" {% } %} style="color:black; margin:0" >', '{% if ($.showIcon === false) { %}', '{%: $.label + " " +  $.valueText %}', '{% } else if ($.indicatorIcon && !$.iconCls) { %}', '<img src="{%= $.indicatorIcon %}" alt="{%= $.label %}" />', '{% } %}', '</span>']),
    itemTemplate: new Simplate(['<p>{%: $$.getDescription($) %}</p>', '<p class="micro-text">{%: $$.getOfflineDate($) %}</p>']),
    getDescription: function getDescription(entry) {
      return this._model.getEntityDescription(entry);
    },
    getOfflineDate: function getOfflineDate(entry) {
      if (entry && entry.$offlineDate) {
        return _Format2.default.relativeDate(entry.$offlineDate);
      }
      return '';
    },
    getItemIconClass: function getItemIconClass(entry) {
      var iconClass = void 0;
      iconClass = this._model.getIconClass(entry);
      if (!iconClass) {
        iconClass = 'url';
      }
      return iconClass;
    },
    show: function show(options) {
      this._initOfflineView(options);
      this.inherited(show, arguments);
    },
    _initOfflineView: function _initOfflineView(options) {
      this.offlineContext = {
        parentEntry: null,
        parentEntityId: null,
        entityName: null,
        entityId: null,
        viewId: null,
        source: null
      };
      this.refreshRequired = true;
      _lang2.default.mixin(this.offlineContext, options.offlineContext);
      this._model = App.ModelManager.getModel(this.offlineContext.entityName, _Types2.default.OFFLINE);
      this._entityView = this.getEntityView();
      if (this._entityView && this._entityView._clearGroupMode && this._entityView.groupsMode) {
        this._entityView._clearGroupMode(); // For list views that are left in group mode we need to reset to use the card template.
      }
    },
    onTransitionTo: function onTransitionTo() {
      this.inherited(onTransitionTo, arguments);
      App.setToolBarMode(false);
    },
    _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
      if (this.offlineContext && this.offlineContext.queryExpression) {
        queryOptions.filter = this.offlineContext.queryExpression;
      }

      return queryOptions;
    },
    _hasValidOptions: function _hasValidOptions(options) {
      return options;
    },
    createToolLayout: function createToolLayout() {
      this.toolsAdded = false;
      return { tbar: [] };
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'offline',
        showIcon: false,
        location: 'top',
        onApply: function onApply(entry, view) {
          this.isEnable = true;
          this.valueText = view.getOfflineDate(entry);
          this.label = view.offlineText;
        }
      }]);
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
    createItemRowNode: function createItemRowNode(entry) {
      if (this._entityView) {
        return this._entityView.createItemRowNode(entry);
      }
      return this.inherited(createItemRowNode, arguments);
    },
    navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
      this.navigateToOfflineDetailView(key, descriptor, additionalOptions);
    },
    navigateToOfflineDetailView: function navigateToOfflineDetailView(key, descriptor, additionalOptions) {
      var entry = this.entries && this.entries[key];
      var desc = this.getDescription(entry);
      var view = this.getDetailView();
      var options = {
        descriptor: entry.description || desc, // keep for backwards compat
        title: entry.description || desc,
        key: key,
        fromContext: this,
        offlineContext: {
          entityId: this._model.getEntityId(entry),
          entityName: this._model.entityName,
          viewId: this._model.detailViewId,
          offlineDate: entry.$offlineDate,
          source: entry
        }
      };
      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      // Ensure we have a valid offline detail view and the
      // entity has a detail view that it can use for layout.
      var modelDetailView = this._model.detailViewId;
      var impliedDetailView = this._model.entityName.toLowerCase() + '_detail';
      if (view && App.getView(modelDetailView || impliedDetailView)) {
        view.show(options);
      }
    },
    getDetailView: function getDetailView() {
      var viewId = this.detailView + '_' + this._model.entityName;
      var view = this.app.getView(viewId);

      if (view) {
        return view;
      }

      this.app.registerView(new _Detail2.default({ id: viewId }));
      view = this.app.getView(viewId);
      return view;
    }

  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJpZCIsImRldGFpbFZpZXciLCJlbmFibGVTZWFyY2giLCJlbmFibGVBY3Rpb25zIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsInRpdGxlVGV4dCIsIm9mZmxpbmVUZXh0IiwicGFnZVNpemUiLCJpdGVtSW5kaWNhdG9yVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIml0ZW1UZW1wbGF0ZSIsImdldERlc2NyaXB0aW9uIiwiZW50cnkiLCJfbW9kZWwiLCJnZXRFbnRpdHlEZXNjcmlwdGlvbiIsImdldE9mZmxpbmVEYXRlIiwiJG9mZmxpbmVEYXRlIiwicmVsYXRpdmVEYXRlIiwiZ2V0SXRlbUljb25DbGFzcyIsImljb25DbGFzcyIsImdldEljb25DbGFzcyIsInNob3ciLCJvcHRpb25zIiwiX2luaXRPZmZsaW5lVmlldyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIm9mZmxpbmVDb250ZXh0IiwicGFyZW50RW50cnkiLCJwYXJlbnRFbnRpdHlJZCIsImVudGl0eUlkIiwidmlld0lkIiwic291cmNlIiwicmVmcmVzaFJlcXVpcmVkIiwibWl4aW4iLCJBcHAiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIk9GRkxJTkUiLCJfZW50aXR5VmlldyIsImdldEVudGl0eVZpZXciLCJfY2xlYXJHcm91cE1vZGUiLCJncm91cHNNb2RlIiwib25UcmFuc2l0aW9uVG8iLCJzZXRUb29sQmFyTW9kZSIsIl9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnMiLCJxdWVyeU9wdGlvbnMiLCJxdWVyeUV4cHJlc3Npb24iLCJmaWx0ZXIiLCJfaGFzVmFsaWRPcHRpb25zIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzQWRkZWQiLCJ0YmFyIiwiY3JlYXRlSW5kaWNhdG9yTGF5b3V0IiwiaXRlbUluZGljYXRvcnMiLCJzaG93SWNvbiIsImxvY2F0aW9uIiwib25BcHBseSIsInZpZXciLCJpc0VuYWJsZSIsInZhbHVlVGV4dCIsImxhYmVsIiwibmV3Vmlld0lkIiwiZ2V0VmlldyIsImRlc3Ryb3kiLCJWaWV3Q3RvciIsImNvbnN0cnVjdG9yIiwiY3JlYXRlSXRlbVJvd05vZGUiLCJuYXZpZ2F0ZVRvRGV0YWlsVmlldyIsImtleSIsImRlc2NyaXB0b3IiLCJhZGRpdGlvbmFsT3B0aW9ucyIsIm5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldyIsImVudHJpZXMiLCJkZXNjIiwiZ2V0RGV0YWlsVmlldyIsImRlc2NyaXB0aW9uIiwidGl0bGUiLCJmcm9tQ29udGV4dCIsImdldEVudGl0eUlkIiwiZGV0YWlsVmlld0lkIiwib2ZmbGluZURhdGUiLCJtb2RlbERldGFpbFZpZXciLCJpbXBsaWVkRGV0YWlsVmlldyIsInRvTG93ZXJDYXNlIiwiYXBwIiwicmVnaXN0ZXJWaWV3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQixDLENBL0JBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7Ozs7Ozs7b0JBa0JlLHVCQUFRLHdCQUFSLEVBQWtDLG9CQUFsQyxFQUErQztBQUM1REMsUUFBSSxjQUR3RDtBQUU1REMsZ0JBQVksZ0JBRmdEO0FBRzVEQyxrQkFBYyxLQUg4QztBQUk1REMsbUJBQWUsSUFKNkM7QUFLNURDLGtCQUFjLEVBTDhDO0FBTTVEQyxnQkFBWSxFQU5nRDtBQU81REMsZUFBV1AsU0FBU08sU0FQd0M7QUFRNURDLGlCQUFhUixTQUFTUSxXQVJzQztBQVM1REMsY0FBVSxJQVRrRDtBQVU1REMsMkJBQXVCLElBQUlDLFFBQUosQ0FBYSxDQUNsQyw4RkFEa0MsRUFFbEMsbUNBRmtDLEVBR2xDLHFDQUhrQyxFQUlsQyxtREFKa0MsRUFLbEMsMkRBTGtDLEVBTWxDLFNBTmtDLEVBT2xDLFNBUGtDLENBQWIsQ0FWcUM7QUFtQjVEQyxrQkFBYyxJQUFJRCxRQUFKLENBQWEsQ0FDekIsb0NBRHlCLEVBRXpCLHVEQUZ5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LE9BQVY7QUFDRDtBQUNGLEtBL0kyRDtBQWdKNURvRCxtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQU01QyxTQUFZLEtBQUs5QixVQUFqQixTQUErQixLQUFLYSxNQUFMLENBQVlULFVBQWpEO0FBQ0EsVUFBSXFELE9BQU8sS0FBSzJCLEdBQUwsQ0FBU3RCLE9BQVQsQ0FBaUJoQyxNQUFqQixDQUFYOztBQUVBLFVBQUkyQixJQUFKLEVBQVU7QUFDUixlQUFPQSxJQUFQO0FBQ0Q7O0FBRUQsV0FBSzJCLEdBQUwsQ0FBU0MsWUFBVCxDQUFzQixxQkFBa0IsRUFBRXRGLElBQUkrQixNQUFOLEVBQWxCLENBQXRCO0FBQ0EyQixhQUFPLEtBQUsyQixHQUFMLENBQVN0QixPQUFULENBQWlCaEMsTUFBakIsQ0FBUDtBQUNBLGFBQU8yQixJQUFQO0FBQ0Q7O0FBM0oyRCxHQUEvQyxDIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5PZmZsaW5lLkxpc3RcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuX0xpc3RCYXNlXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5fTGlzdEJhc2VcclxuICpcclxuICpcclxuICovXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBfTGlzdEJhc2UgZnJvbSAnYXJnb3MvX0xpc3RCYXNlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE9mZmxpbmVEZXRhaWwgZnJvbSAnLi9EZXRhaWwnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvZmZsaW5lTGlzdCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVjbGFyZSgnY3JtLlZpZXdzLk9mZmxpbmUuTGlzdCcsIFtfTGlzdEJhc2VdLCB7XHJcbiAgaWQ6ICdvZmZsaW5lX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdvZmZsaW5lX2RldGFpbCcsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIHJlc291cmNlS2luZDogJycsXHJcbiAgZW50aXR5TmFtZTogJycsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgb2ZmbGluZVRleHQ6IHJlc291cmNlLm9mZmxpbmVUZXh0LFxyXG4gIHBhZ2VTaXplOiAxMDAwLFxyXG4gIGl0ZW1JbmRpY2F0b3JUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8c3BhbnslIGlmICgkLmljb25DbHMpIHsgJX0gY2xhc3M9XCJ7JT0gJC5pY29uQ2xzICV9XCIgeyUgfSAlfSBzdHlsZT1cImNvbG9yOmJsYWNrOyBtYXJnaW46MFwiID4nLFxyXG4gICAgJ3slIGlmICgkLnNob3dJY29uID09PSBmYWxzZSkgeyAlfScsXHJcbiAgICAneyU6ICQubGFiZWwgKyBcIiBcIiArICAkLnZhbHVlVGV4dCAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkLmluZGljYXRvckljb24gJiYgISQuaWNvbkNscykgeyAlfScsXHJcbiAgICAnPGltZyBzcmM9XCJ7JT0gJC5pbmRpY2F0b3JJY29uICV9XCIgYWx0PVwieyU9ICQubGFiZWwgJX1cIiAvPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC9zcGFuPicsXHJcbiAgXSksXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwPnslOiAkJC5nZXREZXNjcmlwdGlvbigkKSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslOiAkJC5nZXRPZmZsaW5lRGF0ZSgkKSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIGdldERlc2NyaXB0aW9uOiBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbihlbnRyeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldEVudGl0eURlc2NyaXB0aW9uKGVudHJ5KTtcclxuICB9LFxyXG4gIGdldE9mZmxpbmVEYXRlOiBmdW5jdGlvbiBnZXRPZmZsaW5lRGF0ZShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LiRvZmZsaW5lRGF0ZSkge1xyXG4gICAgICByZXR1cm4gZm9ybWF0LnJlbGF0aXZlRGF0ZShlbnRyeS4kb2ZmbGluZURhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gZ2V0SXRlbUljb25DbGFzcyhlbnRyeSkge1xyXG4gICAgbGV0IGljb25DbGFzcztcclxuICAgIGljb25DbGFzcyA9IHRoaXMuX21vZGVsLmdldEljb25DbGFzcyhlbnRyeSk7XHJcbiAgICBpZiAoIWljb25DbGFzcykge1xyXG4gICAgICBpY29uQ2xhc3MgPSAndXJsJztcclxuICAgIH1cclxuICAgIHJldHVybiBpY29uQ2xhc3M7XHJcbiAgfSxcclxuICBzaG93OiBmdW5jdGlvbiBzaG93KG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2luaXRPZmZsaW5lVmlldyhvcHRpb25zKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3csIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfaW5pdE9mZmxpbmVWaWV3OiBmdW5jdGlvbiBfaW5pdE9mZmxpbmVWaWV3KG9wdGlvbnMpIHtcclxuICAgIHRoaXMub2ZmbGluZUNvbnRleHQgPSB7XHJcbiAgICAgIHBhcmVudEVudHJ5OiBudWxsLFxyXG4gICAgICBwYXJlbnRFbnRpdHlJZDogbnVsbCxcclxuICAgICAgZW50aXR5TmFtZTogbnVsbCxcclxuICAgICAgZW50aXR5SWQ6IG51bGwsXHJcbiAgICAgIHZpZXdJZDogbnVsbCxcclxuICAgICAgc291cmNlOiBudWxsLFxyXG4gICAgfTtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIGxhbmcubWl4aW4odGhpcy5vZmZsaW5lQ29udGV4dCwgb3B0aW9ucy5vZmZsaW5lQ29udGV4dCk7XHJcbiAgICB0aGlzLl9tb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwodGhpcy5vZmZsaW5lQ29udGV4dC5lbnRpdHlOYW1lLCBNT0RFTF9UWVBFUy5PRkZMSU5FKTtcclxuICAgIHRoaXMuX2VudGl0eVZpZXcgPSB0aGlzLmdldEVudGl0eVZpZXcoKTtcclxuICAgIGlmICh0aGlzLl9lbnRpdHlWaWV3ICYmIHRoaXMuX2VudGl0eVZpZXcuX2NsZWFyR3JvdXBNb2RlICYmIHRoaXMuX2VudGl0eVZpZXcuZ3JvdXBzTW9kZSkge1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3Ll9jbGVhckdyb3VwTW9kZSgpOyAvLyBGb3IgbGlzdCB2aWV3cyB0aGF0IGFyZSBsZWZ0IGluIGdyb3VwIG1vZGUgd2UgbmVlZCB0byByZXNldCB0byB1c2UgdGhlIGNhcmQgdGVtcGxhdGUuXHJcbiAgICB9XHJcbiAgfSxcclxuICBvblRyYW5zaXRpb25UbzogZnVuY3Rpb24gb25UcmFuc2l0aW9uVG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblRyYW5zaXRpb25UbywgYXJndW1lbnRzKTtcclxuICAgIEFwcC5zZXRUb29sQmFyTW9kZShmYWxzZSk7XHJcbiAgfSxcclxuICBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zOiBmdW5jdGlvbiBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zKHF1ZXJ5T3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMub2ZmbGluZUNvbnRleHQgJiYgdGhpcy5vZmZsaW5lQ29udGV4dC5xdWVyeUV4cHJlc3Npb24pIHtcclxuICAgICAgcXVlcnlPcHRpb25zLmZpbHRlciA9IHRoaXMub2ZmbGluZUNvbnRleHQucXVlcnlFeHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBxdWVyeU9wdGlvbnM7XHJcbiAgfSxcclxuICBfaGFzVmFsaWRPcHRpb25zOiBmdW5jdGlvbiBfaGFzVmFsaWRPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHRoaXMudG9vbHNBZGRlZCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHsgdGJhcjogW10gfTtcclxuICB9LFxyXG4gIGNyZWF0ZUluZGljYXRvckxheW91dDogZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9yTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbUluZGljYXRvcnMgfHwgKHRoaXMuaXRlbUluZGljYXRvcnMgPSBbe1xyXG4gICAgICBpZDogJ29mZmxpbmUnLFxyXG4gICAgICBzaG93SWNvbjogZmFsc2UsXHJcbiAgICAgIGxvY2F0aW9uOiAndG9wJyxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgdmlldykge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmFsdWVUZXh0ID0gdmlldy5nZXRPZmZsaW5lRGF0ZShlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IHZpZXcub2ZmbGluZVRleHQ7XHJcbiAgICAgIH0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBnZXRFbnRpdHlWaWV3OiBmdW5jdGlvbiBnZXRFbnRpdHlWaWV3KCkge1xyXG4gICAgY29uc3QgbmV3Vmlld0lkID0gYCR7dGhpcy5pZH1fJHt0aGlzLm9mZmxpbmVDb250ZXh0LnZpZXdJZH1gO1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMub2ZmbGluZUNvbnRleHQudmlld0lkKTtcclxuXHJcbiAgICBpZiAodGhpcy5fZW50aXR5Vmlldykge1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3LmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fZW50aXR5VmlldyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgY29uc3QgVmlld0N0b3IgPSB2aWV3LmNvbnN0cnVjdG9yO1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3ID0gbmV3IFZpZXdDdG9yKHsgaWQ6IG5ld1ZpZXdJZCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9lbnRpdHlWaWV3O1xyXG4gIH0sXHJcbiAgY3JlYXRlSXRlbVJvd05vZGU6IGZ1bmN0aW9uIGNyZWF0ZUl0ZW1Sb3dOb2RlKGVudHJ5KSB7XHJcbiAgICBpZiAodGhpcy5fZW50aXR5Vmlldykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZW50aXR5Vmlldy5jcmVhdGVJdGVtUm93Tm9kZShlbnRyeSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5pbmhlcml0ZWQoY3JlYXRlSXRlbVJvd05vZGUsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RldGFpbFZpZXcoa2V5LCBkZXNjcmlwdG9yLCBhZGRpdGlvbmFsT3B0aW9ucykge1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvT2ZmbGluZURldGFpbFZpZXcoa2V5LCBkZXNjcmlwdG9yLCBhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvT2ZmbGluZURldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldyhrZXksIGRlc2NyaXB0b3IsIGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllcyAmJiB0aGlzLmVudHJpZXNba2V5XTtcclxuICAgIGNvbnN0IGRlc2MgPSB0aGlzLmdldERlc2NyaXB0aW9uKGVudHJ5KTtcclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldERldGFpbFZpZXcoKTtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBkZXNjcmlwdG9yOiBlbnRyeS5kZXNjcmlwdGlvbiB8fCBkZXNjLCAvLyBrZWVwIGZvciBiYWNrd2FyZHMgY29tcGF0XHJcbiAgICAgIHRpdGxlOiBlbnRyeS5kZXNjcmlwdGlvbiB8fCBkZXNjLFxyXG4gICAgICBrZXksXHJcbiAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgICBvZmZsaW5lQ29udGV4dDoge1xyXG4gICAgICAgIGVudGl0eUlkOiB0aGlzLl9tb2RlbC5nZXRFbnRpdHlJZChlbnRyeSksXHJcbiAgICAgICAgZW50aXR5TmFtZTogdGhpcy5fbW9kZWwuZW50aXR5TmFtZSxcclxuICAgICAgICB2aWV3SWQ6IHRoaXMuX21vZGVsLmRldGFpbFZpZXdJZCxcclxuICAgICAgICBvZmZsaW5lRGF0ZTogZW50cnkuJG9mZmxpbmVEYXRlLFxyXG4gICAgICAgIHNvdXJjZTogZW50cnksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICAgIG9wdGlvbnMgPSBsYW5nLm1peGluKG9wdGlvbnMsIGFkZGl0aW9uYWxPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFbnN1cmUgd2UgaGF2ZSBhIHZhbGlkIG9mZmxpbmUgZGV0YWlsIHZpZXcgYW5kIHRoZVxyXG4gICAgLy8gZW50aXR5IGhhcyBhIGRldGFpbCB2aWV3IHRoYXQgaXQgY2FuIHVzZSBmb3IgbGF5b3V0LlxyXG4gICAgY29uc3QgbW9kZWxEZXRhaWxWaWV3ID0gdGhpcy5fbW9kZWwuZGV0YWlsVmlld0lkO1xyXG4gICAgY29uc3QgaW1wbGllZERldGFpbFZpZXcgPSBgJHt0aGlzLl9tb2RlbC5lbnRpdHlOYW1lLnRvTG93ZXJDYXNlKCl9X2RldGFpbGA7XHJcbiAgICBpZiAodmlldyAmJiBBcHAuZ2V0Vmlldyhtb2RlbERldGFpbFZpZXcgfHwgaW1wbGllZERldGFpbFZpZXcpKSB7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldERldGFpbFZpZXc6IGZ1bmN0aW9uIGdldERldGFpbFZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3SWQgPSBgJHt0aGlzLmRldGFpbFZpZXd9XyR7dGhpcy5fbW9kZWwuZW50aXR5TmFtZX1gO1xyXG4gICAgbGV0IHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHAucmVnaXN0ZXJWaWV3KG5ldyBPZmZsaW5lRGV0YWlsKHsgaWQ6IHZpZXdJZCB9KSk7XHJcbiAgICB2aWV3ID0gdGhpcy5hcHAuZ2V0Vmlldyh2aWV3SWQpO1xyXG4gICAgcmV0dXJuIHZpZXc7XHJcbiAgfSxcclxuXHJcbn0pO1xyXG4iXX0=