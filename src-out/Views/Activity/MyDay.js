define('crm/Views/Activity/MyDay', ['module', 'exports', 'dojo/_base/declare', '../_RightDrawerListMixin', '../_MetricListMixin', '../../Models/Names', './MyList', './MyDayOffline', 'argos/I18n'], function (module, exports, _declare, _RightDrawerListMixin2, _MetricListMixin2, _Names, _MyList, _MyDayOffline, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

  var _MyList2 = _interopRequireDefault(_MyList);

  var _MyDayOffline2 = _interopRequireDefault(_MyDayOffline);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityMyDay');

  /**
   * @class crm.Views.Activity.MyDay
   *
   * @requires argos._ListBase
   * @requires argos.Format
   * @requires argos.Utility
   * @requires argos.Convert
   * @requires argos.ErrorManager
   *
   * @requires crm.Format
   * @requires crm.Environment
   * @requires crm.Views.Activity.List
   * @requires crm.Action
   */
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

  var __class = (0, _declare2.default)('crm.Views.Activity.MyDay', [_MyList2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default], {

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'myday_list',
    resourceKind: 'userActivities',
    modelName: _Names2.default.USERACTIVITY,
    enableSearch: false,
    pageSize: 105,
    queryModelName: 'myday',
    enableOfflineSupport: true,

    _onRefresh: function _onRefresh(options) {
      this.inherited(arguments);
      if (options.resourceKind === 'activities') {
        this.refreshRequired = true;
      }
    },

    show: function show(options) {
      if (!App.onLine) {
        this._showOfflineView(options);
        return;
      }
      this.inherited(arguments);
    },
    _showOfflineView: function _showOfflineView(options) {
      var view = App.getView('myday_offline_list');
      if (!view) {
        view = new _MyDayOffline2.default();
        App.registerView(view);
      }

      view = App.getView('myday_offline_list');
      if (view) {
        view.show(options);
      }
    },
    createToolLayout: function createToolLayout() {
      this.inherited(arguments);
      if (this.tools && this.tools.tbar && !this._refreshAdded && !window.App.supportsTouch()) {
        this.tools.tbar.push({
          id: 'refresh',
          svg: 'refresh',
          action: '_refreshClicked'
        });

        this._refreshAdded = true;
      }

      return this.tools;
    },
    _refreshAdded: false,
    _refreshClicked: function _refreshClicked() {
      this.clear();
      this.refreshRequired = true;
      this.refresh();

      // Hook for customizers
      this.onRefreshClicked();
    },
    onRefreshClicked: function onRefreshClicked() {},
    _getCurrentQuery: function _getCurrentQuery(options) {
      var myDayQuery = this._model.getMyDayQuery();
      var optionsQuery = options && options.queryArgs && options.queryArgs.activeFilter;
      return [myDayQuery, optionsQuery].filter(function (item) {
        return !!item;
      }).join(' and ');
    },
    allowSelection: true,
    enableActions: true,
    hashTagQueriesText: {}
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9NeURheS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJpZCIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIlVTRVJBQ1RJVklUWSIsImVuYWJsZVNlYXJjaCIsInBhZ2VTaXplIiwicXVlcnlNb2RlbE5hbWUiLCJlbmFibGVPZmZsaW5lU3VwcG9ydCIsIl9vblJlZnJlc2giLCJvcHRpb25zIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicmVmcmVzaFJlcXVpcmVkIiwic2hvdyIsIkFwcCIsIm9uTGluZSIsIl9zaG93T2ZmbGluZVZpZXciLCJ2aWV3IiwiZ2V0VmlldyIsInJlZ2lzdGVyVmlldyIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsInRiYXIiLCJfcmVmcmVzaEFkZGVkIiwid2luZG93Iiwic3VwcG9ydHNUb3VjaCIsInB1c2giLCJzdmciLCJhY3Rpb24iLCJfcmVmcmVzaENsaWNrZWQiLCJjbGVhciIsInJlZnJlc2giLCJvblJlZnJlc2hDbGlja2VkIiwiX2dldEN1cnJlbnRRdWVyeSIsIm15RGF5UXVlcnkiLCJfbW9kZWwiLCJnZXRNeURheVF1ZXJ5Iiwib3B0aW9uc1F1ZXJ5IiwicXVlcnlBcmdzIiwiYWN0aXZlRmlsdGVyIiwiZmlsdGVyIiwiaXRlbSIsImpvaW4iLCJhbGxvd1NlbGVjdGlvbiIsImVuYWJsZUFjdGlvbnMiLCJoYXNoVGFnUXVlcmllc1RleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsV0FBVyxvQkFBWSxlQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQXpCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUNBLE1BQU1DLFVBQVUsdUJBQVEsMEJBQVIsRUFBb0MsNkVBQXBDLEVBQXVGOztBQUVyRztBQUNBQyxlQUFXRixTQUFTRSxTQUhpRjs7QUFLckc7QUFDQUMsUUFBSSxZQU5pRztBQU9yR0Msa0JBQWMsZ0JBUHVGO0FBUXJHQyxlQUFXLGdCQUFZQyxZQVI4RTtBQVNyR0Msa0JBQWMsS0FUdUY7QUFVckdDLGNBQVUsR0FWMkY7QUFXckdDLG9CQUFnQixPQVhxRjtBQVlyR0MsMEJBQXNCLElBWitFOztBQWNyR0MsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsT0FBcEIsRUFBNkI7QUFDdkMsV0FBS0MsU0FBTCxDQUFlQyxTQUFmO0FBQ0EsVUFBSUYsUUFBUVIsWUFBUixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxhQUFLVyxlQUFMLEdBQXVCLElBQXZCO0FBQ0Q7QUFDRixLQW5Cb0c7O0FBcUJyR0MsVUFBTSxTQUFTQSxJQUFULENBQWNKLE9BQWQsRUFBdUI7QUFDM0IsVUFBSSxDQUFDSyxJQUFJQyxNQUFULEVBQWlCO0FBQ2YsYUFBS0MsZ0JBQUwsQ0FBc0JQLE9BQXRCO0FBQ0E7QUFDRDtBQUNELFdBQUtDLFNBQUwsQ0FBZUMsU0FBZjtBQUNELEtBM0JvRztBQTRCckdLLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQlAsT0FBMUIsRUFBbUM7QUFDbkQsVUFBSVEsT0FBT0gsSUFBSUksT0FBSixDQUFZLG9CQUFaLENBQVg7QUFDQSxVQUFJLENBQUNELElBQUwsRUFBVztBQUNUQSxlQUFPLDRCQUFQO0FBQ0FILFlBQUlLLFlBQUosQ0FBaUJGLElBQWpCO0FBQ0Q7O0FBRURBLGFBQU9ILElBQUlJLE9BQUosQ0FBWSxvQkFBWixDQUFQO0FBQ0EsVUFBSUQsSUFBSixFQUFVO0FBQ1JBLGFBQUtKLElBQUwsQ0FBVUosT0FBVjtBQUNEO0FBQ0YsS0F2Q29HO0FBd0NyR1csc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLFdBQUtWLFNBQUwsQ0FBZUMsU0FBZjtBQUNBLFVBQUksS0FBS1UsS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV0MsSUFBekIsSUFBaUMsQ0FBQyxLQUFLQyxhQUF2QyxJQUF3RCxDQUFDQyxPQUFPVixHQUFQLENBQVdXLGFBQVgsRUFBN0QsRUFBeUY7QUFDdkYsYUFBS0osS0FBTCxDQUFXQyxJQUFYLENBQWdCSSxJQUFoQixDQUFxQjtBQUNuQjFCLGNBQUksU0FEZTtBQUVuQjJCLGVBQUssU0FGYztBQUduQkMsa0JBQVE7QUFIVyxTQUFyQjs7QUFNQSxhQUFLTCxhQUFMLEdBQXFCLElBQXJCO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLRixLQUFaO0FBQ0QsS0FyRG9HO0FBc0RyR0UsbUJBQWUsS0F0RHNGO0FBdURyR00scUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsV0FBS0MsS0FBTDtBQUNBLFdBQUtsQixlQUFMLEdBQXVCLElBQXZCO0FBQ0EsV0FBS21CLE9BQUw7O0FBRUE7QUFDQSxXQUFLQyxnQkFBTDtBQUNELEtBOURvRztBQStEckdBLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QixDQUFFLENBL0RxRDtBQWdFckdDLHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQnhCLE9BQTFCLEVBQW1DO0FBQ25ELFVBQU15QixhQUFhLEtBQUtDLE1BQUwsQ0FBWUMsYUFBWixFQUFuQjtBQUNBLFVBQU1DLGVBQWU1QixXQUFXQSxRQUFRNkIsU0FBbkIsSUFBZ0M3QixRQUFRNkIsU0FBUixDQUFrQkMsWUFBdkU7QUFDQSxhQUFPLENBQUNMLFVBQUQsRUFBYUcsWUFBYixFQUEyQkcsTUFBM0IsQ0FBa0MsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pELGVBQU8sQ0FBQyxDQUFDQSxJQUFUO0FBQ0QsT0FGTSxFQUdKQyxJQUhJLENBR0MsT0FIRCxDQUFQO0FBSUQsS0F2RW9HO0FBd0VyR0Msb0JBQWdCLElBeEVxRjtBQXlFckdDLG1CQUFlLElBekVzRjtBQTBFckdDLHdCQUFvQjtBQTFFaUYsR0FBdkYsQ0FBaEI7O29CQTZFZS9DLE8iLCJmaWxlIjoiTXlEYXkuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJy4uL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJy4uL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IE15TGlzdCBmcm9tICcuL015TGlzdCc7XHJcbmltcG9ydCBNeURheU9mZmxpbmUgZnJvbSAnLi9NeURheU9mZmxpbmUnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eU15RGF5Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5BY3Rpdml0eS5NeURheVxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuX0xpc3RCYXNlXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICogQHJlcXVpcmVzIGFyZ29zLkNvbnZlcnRcclxuICogQHJlcXVpcmVzIGFyZ29zLkVycm9yTWFuYWdlclxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLkVudmlyb25tZW50XHJcbiAqIEByZXF1aXJlcyBjcm0uVmlld3MuQWN0aXZpdHkuTGlzdFxyXG4gKiBAcmVxdWlyZXMgY3JtLkFjdGlvblxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY3Rpdml0eS5NeURheScsIFtNeUxpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbl0sIHtcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnbXlkYXlfbGlzdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAndXNlckFjdGl2aXRpZXMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuVVNFUkFDVElWSVRZLFxyXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgcGFnZVNpemU6IDEwNSxcclxuICBxdWVyeU1vZGVsTmFtZTogJ215ZGF5JyxcclxuICBlbmFibGVPZmZsaW5lU3VwcG9ydDogdHJ1ZSxcclxuXHJcbiAgX29uUmVmcmVzaDogZnVuY3Rpb24gX29uUmVmcmVzaChvcHRpb25zKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKG9wdGlvbnMucmVzb3VyY2VLaW5kID09PSAnYWN0aXZpdGllcycpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgaWYgKCFBcHAub25MaW5lKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dPZmZsaW5lVmlldyhvcHRpb25zKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9zaG93T2ZmbGluZVZpZXc6IGZ1bmN0aW9uIF9zaG93T2ZmbGluZVZpZXcob3B0aW9ucykge1xyXG4gICAgbGV0IHZpZXcgPSBBcHAuZ2V0VmlldygnbXlkYXlfb2ZmbGluZV9saXN0Jyk7XHJcbiAgICBpZiAoIXZpZXcpIHtcclxuICAgICAgdmlldyA9IG5ldyBNeURheU9mZmxpbmUoKTtcclxuICAgICAgQXBwLnJlZ2lzdGVyVmlldyh2aWV3KTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3ID0gQXBwLmdldFZpZXcoJ215ZGF5X29mZmxpbmVfbGlzdCcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy50b29scyAmJiB0aGlzLnRvb2xzLnRiYXIgJiYgIXRoaXMuX3JlZnJlc2hBZGRlZCAmJiAhd2luZG93LkFwcC5zdXBwb3J0c1RvdWNoKCkpIHtcclxuICAgICAgdGhpcy50b29scy50YmFyLnB1c2goe1xyXG4gICAgICAgIGlkOiAncmVmcmVzaCcsXHJcbiAgICAgICAgc3ZnOiAncmVmcmVzaCcsXHJcbiAgICAgICAgYWN0aW9uOiAnX3JlZnJlc2hDbGlja2VkJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLl9yZWZyZXNoQWRkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gIH0sXHJcbiAgX3JlZnJlc2hBZGRlZDogZmFsc2UsXHJcbiAgX3JlZnJlc2hDbGlja2VkOiBmdW5jdGlvbiBfcmVmcmVzaENsaWNrZWQoKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuXHJcbiAgICAvLyBIb29rIGZvciBjdXN0b21pemVyc1xyXG4gICAgdGhpcy5vblJlZnJlc2hDbGlja2VkKCk7XHJcbiAgfSxcclxuICBvblJlZnJlc2hDbGlja2VkOiBmdW5jdGlvbiBvblJlZnJlc2hDbGlja2VkKCkge30sXHJcbiAgX2dldEN1cnJlbnRRdWVyeTogZnVuY3Rpb24gX2dldEN1cnJlbnRRdWVyeShvcHRpb25zKSB7XHJcbiAgICBjb25zdCBteURheVF1ZXJ5ID0gdGhpcy5fbW9kZWwuZ2V0TXlEYXlRdWVyeSgpO1xyXG4gICAgY29uc3Qgb3B0aW9uc1F1ZXJ5ID0gb3B0aW9ucyAmJiBvcHRpb25zLnF1ZXJ5QXJncyAmJiBvcHRpb25zLnF1ZXJ5QXJncy5hY3RpdmVGaWx0ZXI7XHJcbiAgICByZXR1cm4gW215RGF5UXVlcnksIG9wdGlvbnNRdWVyeV0uZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiAhIWl0ZW07XHJcbiAgICB9KVxyXG4gICAgICAuam9pbignIGFuZCAnKTtcclxuICB9LFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgaGFzaFRhZ1F1ZXJpZXNUZXh0OiB7fSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=