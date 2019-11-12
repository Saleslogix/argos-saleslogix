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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
      return this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJpZCIsImRldGFpbFZpZXciLCJlbmFibGVTZWFyY2giLCJlbmFibGVBY3Rpb25zIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsInRpdGxlVGV4dCIsIm9mZmxpbmVUZXh0IiwicGFnZVNpemUiLCJpdGVtSW5kaWNhdG9yVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIml0ZW1UZW1wbGF0ZSIsImdldERlc2NyaXB0aW9uIiwiZW50cnkiLCJfbW9kZWwiLCJnZXRFbnRpdHlEZXNjcmlwdGlvbiIsImdldE9mZmxpbmVEYXRlIiwiJG9mZmxpbmVEYXRlIiwicmVsYXRpdmVEYXRlIiwiZ2V0SXRlbUljb25DbGFzcyIsImljb25DbGFzcyIsImdldEljb25DbGFzcyIsInNob3ciLCJvcHRpb25zIiwiX2luaXRPZmZsaW5lVmlldyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIm9mZmxpbmVDb250ZXh0IiwicGFyZW50RW50cnkiLCJwYXJlbnRFbnRpdHlJZCIsImVudGl0eUlkIiwidmlld0lkIiwic291cmNlIiwicmVmcmVzaFJlcXVpcmVkIiwibWl4aW4iLCJBcHAiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIk9GRkxJTkUiLCJfZW50aXR5VmlldyIsImdldEVudGl0eVZpZXciLCJfY2xlYXJHcm91cE1vZGUiLCJncm91cHNNb2RlIiwib25UcmFuc2l0aW9uVG8iLCJzZXRUb29sQmFyTW9kZSIsIl9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnMiLCJxdWVyeU9wdGlvbnMiLCJxdWVyeUV4cHJlc3Npb24iLCJmaWx0ZXIiLCJfaGFzVmFsaWRPcHRpb25zIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzQWRkZWQiLCJ0YmFyIiwiY3JlYXRlSW5kaWNhdG9yTGF5b3V0IiwiaXRlbUluZGljYXRvcnMiLCJzaG93SWNvbiIsImxvY2F0aW9uIiwib25BcHBseSIsInZpZXciLCJpc0VuYWJsZSIsInZhbHVlVGV4dCIsImxhYmVsIiwibmV3Vmlld0lkIiwiZ2V0VmlldyIsImRlc3Ryb3kiLCJWaWV3Q3RvciIsImNvbnN0cnVjdG9yIiwiY3JlYXRlSXRlbVJvd05vZGUiLCJuYXZpZ2F0ZVRvRGV0YWlsVmlldyIsImtleSIsImRlc2NyaXB0b3IiLCJhZGRpdGlvbmFsT3B0aW9ucyIsIm5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldyIsImVudHJpZXMiLCJkZXNjIiwiZ2V0RGV0YWlsVmlldyIsImRlc2NyaXB0aW9uIiwidGl0bGUiLCJmcm9tQ29udGV4dCIsImdldEVudGl0eUlkIiwiZGV0YWlsVmlld0lkIiwib2ZmbGluZURhdGUiLCJtb2RlbERldGFpbFZpZXciLCJpbXBsaWVkRGV0YWlsVmlldyIsInRvTG93ZXJDYXNlIiwiYXBwIiwicmVnaXN0ZXJWaWV3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQixDLENBL0JBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7Ozs7Ozs7b0JBa0JlLHVCQUFRLHdCQUFSLEVBQWtDLG9CQUFsQyxFQUErQztBQUM1REMsUUFBSSxjQUR3RDtBQUU1REMsZ0JBQVksZ0JBRmdEO0FBRzVEQyxrQkFBYyxLQUg4QztBQUk1REMsbUJBQWUsSUFKNkM7QUFLNURDLGtCQUFjLEVBTDhDO0FBTTVEQyxnQkFBWSxFQU5nRDtBQU81REMsZUFBV1AsU0FBU08sU0FQd0M7QUFRNURDLGlCQUFhUixTQUFTUSxXQVJzQztBQVM1REMsY0FBVSxJQVRrRDtBQVU1REMsMkJBQXVCLElBQUlDLFFBQUosQ0FBYSxDQUNsQyw4RkFEa0MsRUFFbEMsbUNBRmtDLEVBR2xDLHFDQUhrQyxFQUlsQyxtREFKa0MsRUFLbEMsMkRBTGtDLEVBTWxDLFNBTmtDLEVBT2xDLFNBUGtDLENBQWIsQ0FWcUM7QUFtQjVEQyxrQkFBYyxJQUFJRCxRQUFKLENBQWEsQ0FDekIsb0NBRHlCLEVBRXpCLHVEQUZ5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YUFBVCxHQUF5QjtBQUN0QyxVQUFNNUMsU0FBWSxLQUFLOUIsVUFBakIsU0FBK0IsS0FBS2EsTUFBTCxDQUFZVCxVQUFqRDtBQUNBLFVBQUlxRCxPQUFPLEtBQUsyQixHQUFMLENBQVN0QixPQUFULENBQWlCaEMsTUFBakIsQ0FBWDs7QUFFQSxVQUFJMkIsSUFBSixFQUFVO0FBQ1IsZUFBT0EsSUFBUDtBQUNEOztBQUVELFdBQUsyQixHQUFMLENBQVNDLFlBQVQsQ0FBc0IscUJBQWtCLEVBQUV0RixJQUFJK0IsTUFBTixFQUFsQixDQUF0QjtBQUNBMkIsYUFBTyxLQUFLMkIsR0FBTCxDQUFTdEIsT0FBVCxDQUFpQmhDLE1BQWpCLENBQVA7QUFDQSxhQUFPMkIsSUFBUDtBQUNEOztBQTNKMkQsR0FBL0MsQyIsImZpbGUiOiJMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT2ZmbGluZS5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLl9MaXN0QmFzZVxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuX0xpc3RCYXNlXHJcbiAqXHJcbiAqXHJcbiAqL1xyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX0xpc3RCYXNlIGZyb20gJ2FyZ29zL19MaXN0QmFzZSc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBPZmZsaW5lRGV0YWlsIGZyb20gJy4vRGV0YWlsJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb2ZmbGluZUxpc3QnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlY2xhcmUoJ2NybS5WaWV3cy5PZmZsaW5lLkxpc3QnLCBbX0xpc3RCYXNlXSwge1xyXG4gIGlkOiAnb2ZmbGluZV9saXN0JyxcclxuICBkZXRhaWxWaWV3OiAnb2ZmbGluZV9kZXRhaWwnLFxyXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICByZXNvdXJjZUtpbmQ6ICcnLFxyXG4gIGVudGl0eU5hbWU6ICcnLFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIG9mZmxpbmVUZXh0OiByZXNvdXJjZS5vZmZsaW5lVGV4dCxcclxuICBwYWdlU2l6ZTogMTAwMCxcclxuICBpdGVtSW5kaWNhdG9yVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHNwYW57JSBpZiAoJC5pY29uQ2xzKSB7ICV9IGNsYXNzPVwieyU9ICQuaWNvbkNscyAlfVwiIHslIH0gJX0gc3R5bGU9XCJjb2xvcjpibGFjazsgbWFyZ2luOjBcIiA+JyxcclxuICAgICd7JSBpZiAoJC5zaG93SWNvbiA9PT0gZmFsc2UpIHsgJX0nLFxyXG4gICAgJ3slOiAkLmxhYmVsICsgXCIgXCIgKyAgJC52YWx1ZVRleHQgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5pbmRpY2F0b3JJY29uICYmICEkLmljb25DbHMpIHsgJX0nLFxyXG4gICAgJzxpbWcgc3JjPVwieyU9ICQuaW5kaWNhdG9ySWNvbiAlfVwiIGFsdD1cInslPSAkLmxhYmVsICV9XCIgLz4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzwvc3Bhbj4nLFxyXG4gIF0pLFxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cD57JTogJCQuZ2V0RGVzY3JpcHRpb24oJCkgJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJCQuZ2V0T2ZmbGluZURhdGUoJCkgJX08L3A+JyxcclxuICBdKSxcclxuICBnZXREZXNjcmlwdGlvbjogZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oZW50cnkpIHtcclxuICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXRFbnRpdHlEZXNjcmlwdGlvbihlbnRyeSk7XHJcbiAgfSxcclxuICBnZXRPZmZsaW5lRGF0ZTogZnVuY3Rpb24gZ2V0T2ZmbGluZURhdGUoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS4kb2ZmbGluZURhdGUpIHtcclxuICAgICAgcmV0dXJuIGZvcm1hdC5yZWxhdGl2ZURhdGUoZW50cnkuJG9mZmxpbmVEYXRlKTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9LFxyXG4gIGdldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIGdldEl0ZW1JY29uQ2xhc3MoZW50cnkpIHtcclxuICAgIGxldCBpY29uQ2xhc3M7XHJcbiAgICBpY29uQ2xhc3MgPSB0aGlzLl9tb2RlbC5nZXRJY29uQ2xhc3MoZW50cnkpO1xyXG4gICAgaWYgKCFpY29uQ2xhc3MpIHtcclxuICAgICAgaWNvbkNsYXNzID0gJ3VybCc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaWNvbkNsYXNzO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9pbml0T2ZmbGluZVZpZXcob3B0aW9ucyk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX2luaXRPZmZsaW5lVmlldzogZnVuY3Rpb24gX2luaXRPZmZsaW5lVmlldyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLm9mZmxpbmVDb250ZXh0ID0ge1xyXG4gICAgICBwYXJlbnRFbnRyeTogbnVsbCxcclxuICAgICAgcGFyZW50RW50aXR5SWQ6IG51bGwsXHJcbiAgICAgIGVudGl0eU5hbWU6IG51bGwsXHJcbiAgICAgIGVudGl0eUlkOiBudWxsLFxyXG4gICAgICB2aWV3SWQ6IG51bGwsXHJcbiAgICAgIHNvdXJjZTogbnVsbCxcclxuICAgIH07XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICBsYW5nLm1peGluKHRoaXMub2ZmbGluZUNvbnRleHQsIG9wdGlvbnMub2ZmbGluZUNvbnRleHQpO1xyXG4gICAgdGhpcy5fbW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKHRoaXMub2ZmbGluZUNvbnRleHQuZW50aXR5TmFtZSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICB0aGlzLl9lbnRpdHlWaWV3ID0gdGhpcy5nZXRFbnRpdHlWaWV3KCk7XHJcbiAgICBpZiAodGhpcy5fZW50aXR5VmlldyAmJiB0aGlzLl9lbnRpdHlWaWV3Ll9jbGVhckdyb3VwTW9kZSAmJiB0aGlzLl9lbnRpdHlWaWV3Lmdyb3Vwc01vZGUpIHtcclxuICAgICAgdGhpcy5fZW50aXR5Vmlldy5fY2xlYXJHcm91cE1vZGUoKTsgLy8gRm9yIGxpc3Qgdmlld3MgdGhhdCBhcmUgbGVmdCBpbiBncm91cCBtb2RlIHdlIG5lZWQgdG8gcmVzZXQgdG8gdXNlIHRoZSBjYXJkIHRlbXBsYXRlLlxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25UcmFuc2l0aW9uVG86IGZ1bmN0aW9uIG9uVHJhbnNpdGlvblRvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIEFwcC5zZXRUb29sQmFyTW9kZShmYWxzZSk7XHJcbiAgfSxcclxuICBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zOiBmdW5jdGlvbiBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zKHF1ZXJ5T3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMub2ZmbGluZUNvbnRleHQgJiYgdGhpcy5vZmZsaW5lQ29udGV4dC5xdWVyeUV4cHJlc3Npb24pIHtcclxuICAgICAgcXVlcnlPcHRpb25zLmZpbHRlciA9IHRoaXMub2ZmbGluZUNvbnRleHQucXVlcnlFeHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBxdWVyeU9wdGlvbnM7XHJcbiAgfSxcclxuICBfaGFzVmFsaWRPcHRpb25zOiBmdW5jdGlvbiBfaGFzVmFsaWRPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHRoaXMudG9vbHNBZGRlZCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHsgdGJhcjogW10gfTtcclxuICB9LFxyXG4gIGNyZWF0ZUluZGljYXRvckxheW91dDogZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9yTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbUluZGljYXRvcnMgfHwgKHRoaXMuaXRlbUluZGljYXRvcnMgPSBbe1xyXG4gICAgICBpZDogJ29mZmxpbmUnLFxyXG4gICAgICBzaG93SWNvbjogZmFsc2UsXHJcbiAgICAgIGxvY2F0aW9uOiAndG9wJyxcclxuICAgICAgb25BcHBseTogZnVuY3Rpb24gb25BcHBseShlbnRyeSwgdmlldykge1xyXG4gICAgICAgIHRoaXMuaXNFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudmFsdWVUZXh0ID0gdmlldy5nZXRPZmZsaW5lRGF0ZShlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IHZpZXcub2ZmbGluZVRleHQ7XHJcbiAgICAgIH0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBnZXRFbnRpdHlWaWV3OiBmdW5jdGlvbiBnZXRFbnRpdHlWaWV3KCkge1xyXG4gICAgY29uc3QgbmV3Vmlld0lkID0gYCR7dGhpcy5pZH1fJHt0aGlzLm9mZmxpbmVDb250ZXh0LnZpZXdJZH1gO1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMub2ZmbGluZUNvbnRleHQudmlld0lkKTtcclxuXHJcbiAgICBpZiAodGhpcy5fZW50aXR5Vmlldykge1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3LmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fZW50aXR5VmlldyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgY29uc3QgVmlld0N0b3IgPSB2aWV3LmNvbnN0cnVjdG9yO1xyXG4gICAgICB0aGlzLl9lbnRpdHlWaWV3ID0gbmV3IFZpZXdDdG9yKHsgaWQ6IG5ld1ZpZXdJZCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9lbnRpdHlWaWV3O1xyXG4gIH0sXHJcbiAgY3JlYXRlSXRlbVJvd05vZGU6IGZ1bmN0aW9uIGNyZWF0ZUl0ZW1Sb3dOb2RlKGVudHJ5KSB7XHJcbiAgICBpZiAodGhpcy5fZW50aXR5Vmlldykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZW50aXR5Vmlldy5jcmVhdGVJdGVtUm93Tm9kZShlbnRyeSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9EZXRhaWxWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvRGV0YWlsVmlldyhrZXksIGRlc2NyaXB0b3IsIGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldyhrZXksIGRlc2NyaXB0b3IsIGFkZGl0aW9uYWxPcHRpb25zKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb09mZmxpbmVEZXRhaWxWaWV3KGtleSwgZGVzY3JpcHRvciwgYWRkaXRpb25hbE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzICYmIHRoaXMuZW50cmllc1trZXldO1xyXG4gICAgY29uc3QgZGVzYyA9IHRoaXMuZ2V0RGVzY3JpcHRpb24oZW50cnkpO1xyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0RGV0YWlsVmlldygpO1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGRlc2NyaXB0b3I6IGVudHJ5LmRlc2NyaXB0aW9uIHx8IGRlc2MsIC8vIGtlZXAgZm9yIGJhY2t3YXJkcyBjb21wYXRcclxuICAgICAgdGl0bGU6IGVudHJ5LmRlc2NyaXB0aW9uIHx8IGRlc2MsXHJcbiAgICAgIGtleSxcclxuICAgICAgZnJvbUNvbnRleHQ6IHRoaXMsXHJcbiAgICAgIG9mZmxpbmVDb250ZXh0OiB7XHJcbiAgICAgICAgZW50aXR5SWQ6IHRoaXMuX21vZGVsLmdldEVudGl0eUlkKGVudHJ5KSxcclxuICAgICAgICBlbnRpdHlOYW1lOiB0aGlzLl9tb2RlbC5lbnRpdHlOYW1lLFxyXG4gICAgICAgIHZpZXdJZDogdGhpcy5fbW9kZWwuZGV0YWlsVmlld0lkLFxyXG4gICAgICAgIG9mZmxpbmVEYXRlOiBlbnRyeS4kb2ZmbGluZURhdGUsXHJcbiAgICAgICAgc291cmNlOiBlbnRyeSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBpZiAoYWRkaXRpb25hbE9wdGlvbnMpIHtcclxuICAgICAgb3B0aW9ucyA9IGxhbmcubWl4aW4ob3B0aW9ucywgYWRkaXRpb25hbE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVuc3VyZSB3ZSBoYXZlIGEgdmFsaWQgb2ZmbGluZSBkZXRhaWwgdmlldyBhbmQgdGhlXHJcbiAgICAvLyBlbnRpdHkgaGFzIGEgZGV0YWlsIHZpZXcgdGhhdCBpdCBjYW4gdXNlIGZvciBsYXlvdXQuXHJcbiAgICBjb25zdCBtb2RlbERldGFpbFZpZXcgPSB0aGlzLl9tb2RlbC5kZXRhaWxWaWV3SWQ7XHJcbiAgICBjb25zdCBpbXBsaWVkRGV0YWlsVmlldyA9IGAke3RoaXMuX21vZGVsLmVudGl0eU5hbWUudG9Mb3dlckNhc2UoKX1fZGV0YWlsYDtcclxuICAgIGlmICh2aWV3ICYmIEFwcC5nZXRWaWV3KG1vZGVsRGV0YWlsVmlldyB8fCBpbXBsaWVkRGV0YWlsVmlldykpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGV0YWlsVmlldzogZnVuY3Rpb24gZ2V0RGV0YWlsVmlldygpIHtcclxuICAgIGNvbnN0IHZpZXdJZCA9IGAke3RoaXMuZGV0YWlsVmlld31fJHt0aGlzLl9tb2RlbC5lbnRpdHlOYW1lfWA7XHJcbiAgICBsZXQgdmlldyA9IHRoaXMuYXBwLmdldFZpZXcodmlld0lkKTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcC5yZWdpc3RlclZpZXcobmV3IE9mZmxpbmVEZXRhaWwoeyBpZDogdmlld0lkIH0pKTtcclxuICAgIHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICByZXR1cm4gdmlldztcclxuICB9LFxyXG5cclxufSk7XHJcbiJdfQ==