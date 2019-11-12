define('crm/Views/Briefcase/List', ['module', 'exports', 'dojo/_base/declare', 'argos/_ListBase', 'dojo/_base/lang', '../../Format', 'argos/Models/Types', 'argos/Offline/Manager', '../Offline/Detail', 'argos/Offline/_ListOfflineMixin', 'argos/I18n'], function (module, exports, _declare, _ListBase2, _lang, _Format, _Types, _Manager, _Detail, _ListOfflineMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ListBase3 = _interopRequireDefault(_ListBase2);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Types2 = _interopRequireDefault(_Types);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _ListOfflineMixin3 = _interopRequireDefault(_ListOfflineMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('briefcaseList'); /* Copyright 2017 Infor
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
  exports.default = (0, _declare2.default)('crm.Views.Briefcase', [_ListBase3.default, _ListOfflineMixin3.default], {
    id: 'briefcase_list',
    idProperty: 'id',
    detailView: 'offline_detail',
    enableSearch: false,
    enableActions: true,
    enableOfflineSupport: true,
    resourceKind: '',
    entityName: 'Briefcase',
    titleText: resource.titleText,
    resyncTooltipText: resource.resyncTooltipText,
    pageSize: 1000,
    autoNavigateToBriefcase: true,
    itemTemplate: new Simplate(['<p class="micro-text">{%: $$.getOfflineDate($) %}</p>']),
    refreshRequiredFor: function refreshRequiredFor() {
      return true;
    },
    getModel: function getModel() {
      var model = App.ModelManager.getModel('Briefcase', _Types2.default.OFFLINE);
      return model;
    },
    getTitle: function getTitle(entry) {
      return entry && entry.description;
    },
    getOfflineDate: function getOfflineDate(entry) {
      if (entry && entry.modifyDate) {
        return _Format2.default.relativeDate(entry.modifyDate);
      }
      return '';
    },
    _hasValidOptions: function _hasValidOptions(options) {
      return options;
    },
    createToolLayout: function createToolLayout() {
      var tools = {
        tbar: [{
          id: 'resync',
          svg: 'roles',
          title: this.resyncTooltipText,
          action: 'briefCaseList',
          security: ''
        }]
      };
      return tools;
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return [];
    },
    getItemIconClass: function getItemIconClass(entry) {
      var iconClass = void 0;
      iconClass = entry.iconClass;
      if (!iconClass) {
        iconClass = 'url';
      }
      return iconClass;
    },
    navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
      var entry = this.entries && this.entries[key];
      this.navigateToOfflineDetailView(entry, additionalOptions);
    },
    navigateToOnlineDetailView: function navigateToDetailView(entry, additionalOptions) {
      var view = this.app.getView(entry.viewId);

      var options = {
        descriptor: entry.description, // keep for backwards compat
        title: entry.description,
        key: entry.entityId,
        fromContext: this
      };

      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      if (view) {
        view.show(options);
      }
    },
    navigateToOfflineDetailView: function navigateToOfflineDetailView(entry, additionalOptions) {
      var view = this.getDetailView(entry.entityName);
      var options = {
        descriptor: entry.description, // keep for backwards compat
        title: entry.description,
        key: entry.entityId,
        fromContext: this,
        offlineContext: {
          entityId: entry.entityId,
          entityName: entry.entityName,
          viewId: entry.viewId,
          source: entry
        }
      };
      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      if (view) {
        view.show(options);
      }
    },
    getDetailView: function getDetailView(entityName) {
      var viewId = this.detailView + '_' + entityName;
      var view = this.app.getView(viewId);

      if (view) {
        return view;
      }

      this.app.registerView(new _Detail2.default({ id: viewId }));
      view = this.app.getView(viewId);
      return view;
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'remove',
        cls: 'fa fa-remove fa-2x',
        label: resource.removeText,
        action: 'removeItemAction'
      }, {
        id: 'resync',
        cls: 'fa fa-suitcase fa-2x',
        label: resource.reBriefcaseText,
        action: 'reBriefcaseItemAction'
      }, {
        id: 'navToOnline',
        cls: 'fa fa-level-down fa-2x',
        label: resource.goToOnlineText,
        action: 'navToOnlineView'
      }, {
        id: 'navToOffline',
        cls: 'fa fa-level-down fa-2x',
        label: resource.goToOfflineText,
        action: 'navToOfflineView'
      }]);
    },
    navToOnlineView: function navToOnlineVie(action, selection) {
      var briefcaseId = selection.tag.attributes['data-key'].value;
      var briefcase = this.entries[briefcaseId];
      this.navigateToOnlineDetailView(briefcase);
    },
    navToOfflineView: function navToOfflineView(action, selection) {
      var briefcaseId = selection.tag.attributes['data-key'].value;
      var briefcase = this.entries[briefcaseId];
      this.navigateToOfflineDetailView(briefcase);
    },
    removeItemAction: function removeItemAction(action, selection) {
      var _this = this;

      // eslint-disable-line
      var briefcaseId = selection.tag.attributes['data-key'].value;
      _Manager2.default.removeBriefcase(briefcaseId).then(function () {
        _this.clear();
        _this.refreshRequired = true;
        _this.refresh();
      }, function (error) {
        console.error(error); // eslint-disable-line
      });
    },
    reBriefcaseItemAction: function reBriefcase(action, selection) {
      // eslint-disable-line
      var briefcaseId = selection.tag.attributes['data-key'].value;
      var briefcase = this.entries[briefcaseId];
      if (briefcase) {
        this.briefCaseItem(briefcase);
      }
    },
    onListBriefcased: function onListBriefcased() {
      this.clear();
      this.refreshRequired = true;
      this.refresh();
    },
    createBriefcaseEntity: function createBriefcaseEntity(entry) {
      var entity = {
        entityId: entry.entityId,
        entityName: entry.entityName,
        options: {
          includeRelated: true,
          viewId: entry.viewId,
          iconClass: entry.iconClass
        }
      };
      return entity;
    },
    isDisabled: function isDisabled() {
      return !App.enableOfflineSupport;
    }
  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9CcmllZmNhc2UvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsImlkIiwiaWRQcm9wZXJ0eSIsImRldGFpbFZpZXciLCJlbmFibGVTZWFyY2giLCJlbmFibGVBY3Rpb25zIiwiZW5hYmxlT2ZmbGluZVN1cHBvcnQiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwidGl0bGVUZXh0IiwicmVzeW5jVG9vbHRpcFRleHQiLCJwYWdlU2l6ZSIsImF1dG9OYXZpZ2F0ZVRvQnJpZWZjYXNlIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJyZWZyZXNoUmVxdWlyZWRGb3IiLCJnZXRNb2RlbCIsIm1vZGVsIiwiQXBwIiwiTW9kZWxNYW5hZ2VyIiwiT0ZGTElORSIsImdldFRpdGxlIiwiZW50cnkiLCJkZXNjcmlwdGlvbiIsImdldE9mZmxpbmVEYXRlIiwibW9kaWZ5RGF0ZSIsInJlbGF0aXZlRGF0ZSIsIl9oYXNWYWxpZE9wdGlvbnMiLCJvcHRpb25zIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsInN2ZyIsInRpdGxlIiwiYWN0aW9uIiwic2VjdXJpdHkiLCJjcmVhdGVJbmRpY2F0b3JMYXlvdXQiLCJnZXRJdGVtSWNvbkNsYXNzIiwiaWNvbkNsYXNzIiwibmF2aWdhdGVUb0RldGFpbFZpZXciLCJrZXkiLCJkZXNjcmlwdG9yIiwiYWRkaXRpb25hbE9wdGlvbnMiLCJlbnRyaWVzIiwibmF2aWdhdGVUb09mZmxpbmVEZXRhaWxWaWV3IiwibmF2aWdhdGVUb09ubGluZURldGFpbFZpZXciLCJ2aWV3IiwiYXBwIiwiZ2V0VmlldyIsInZpZXdJZCIsImVudGl0eUlkIiwiZnJvbUNvbnRleHQiLCJtaXhpbiIsInNob3ciLCJnZXREZXRhaWxWaWV3Iiwib2ZmbGluZUNvbnRleHQiLCJzb3VyY2UiLCJyZWdpc3RlclZpZXciLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwiY2xzIiwibGFiZWwiLCJyZW1vdmVUZXh0IiwicmVCcmllZmNhc2VUZXh0IiwiZ29Ub09ubGluZVRleHQiLCJnb1RvT2ZmbGluZVRleHQiLCJuYXZUb09ubGluZVZpZXciLCJuYXZUb09ubGluZVZpZSIsInNlbGVjdGlvbiIsImJyaWVmY2FzZUlkIiwidGFnIiwiYXR0cmlidXRlcyIsInZhbHVlIiwiYnJpZWZjYXNlIiwibmF2VG9PZmZsaW5lVmlldyIsInJlbW92ZUl0ZW1BY3Rpb24iLCJyZW1vdmVCcmllZmNhc2UiLCJ0aGVuIiwiY2xlYXIiLCJyZWZyZXNoUmVxdWlyZWQiLCJyZWZyZXNoIiwiZXJyb3IiLCJjb25zb2xlIiwicmVCcmllZmNhc2VJdGVtQWN0aW9uIiwicmVCcmllZmNhc2UiLCJicmllZkNhc2VJdGVtIiwib25MaXN0QnJpZWZjYXNlZCIsImNyZWF0ZUJyaWVmY2FzZUVudGl0eSIsImVudGl0eSIsImluY2x1ZGVSZWxhdGVkIiwiaXNEaXNhYmxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQ0EsTUFBTUEsV0FBVyxvQkFBWSxlQUFaLENBQWpCLEMsQ0FqQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7Ozs7OztvQkFvQmUsdUJBQVEscUJBQVIsRUFBK0IsZ0RBQS9CLEVBQStEO0FBQzVFQyxRQUFJLGdCQUR3RTtBQUU1RUMsZ0JBQVksSUFGZ0U7QUFHNUVDLGdCQUFZLGdCQUhnRTtBQUk1RUMsa0JBQWMsS0FKOEQ7QUFLNUVDLG1CQUFlLElBTDZEO0FBTTVFQywwQkFBc0IsSUFOc0Q7QUFPNUVDLGtCQUFjLEVBUDhEO0FBUTVFQyxnQkFBWSxXQVJnRTtBQVM1RUMsZUFBV1QsU0FBU1MsU0FUd0Q7QUFVNUVDLHVCQUFtQlYsU0FBU1UsaUJBVmdEO0FBVzVFQyxjQUFVLElBWGtFO0FBWTVFQyw2QkFBeUIsSUFabUQ7QUFhNUVDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qix1REFEeUIsQ0FBYixDQWI4RDtBQWdCNUVDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNo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Nko1RUUsMkJBQXVCLFNBQVNDLFdBQVQsQ0FBcUJsRCxNQUFyQixFQUE2QmtDLFNBQTdCLEVBQXdDO0FBQUU7QUFDL0QsVUFBTUMsY0FBY0QsVUFBVUUsR0FBVixDQUFjQyxVQUFkLENBQXlCLFVBQXpCLEVBQXFDQyxLQUF6RDtBQUNBLFVBQU1DLFlBQVksS0FBSzlCLE9BQUwsQ0FBYTBCLFdBQWIsQ0FBbEI7QUFDQSxVQUFJSSxTQUFKLEVBQWU7QUFDYixhQUFLWSxhQUFMLENBQW1CWixTQUFuQjtBQUNEO0FBQ0YsS0FuSzJFO0FBb0s1RWEsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLFdBQUtSLEtBQUw7QUFDQSxXQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsV0FBS0MsT0FBTDtBQUNELEtBeEsyRTtBQXlLNUVPLDJCQUF1QixTQUFTQSxxQkFBVCxDQUErQmpFLEtBQS9CLEVBQXNDO0FBQzNELFVBQU1rRSxTQUFTO0FBQ2J0QyxrQkFBVTVCLE1BQU00QixRQURIO0FBRWIxQyxvQkFBWWMsTUFBTWQsVUFGTDtBQUdib0IsaUJBQVM7QUFDUDZELDBCQUFnQixJQURUO0FBRVB4QyxrQkFBUTNCLE1BQU0yQixNQUZQO0FBR1BYLHFCQUFXaEIsTUFBTWdCO0FBSFY7QUFISSxPQUFmO0FBU0EsYUFBT2tELE1BQVA7QUFDRCxLQXBMMkU7QUFxTDVFRSxnQkFBWSxTQUFTQSxVQUFULEdBQXNCO0FBQ2hDLGFBQU8sQ0FBQ3hFLElBQUlaLG9CQUFaO0FBQ0Q7QUF2TDJFLEdBQS9ELEMiLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9mZmxpbmUuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5fTGlzdEJhc2VcclxuICogQHJlcXVpcmVzIGFyZ29zLl9MaXN0QmFzZVxyXG4gKlxyXG4gKlxyXG4gKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9MaXN0QmFzZSBmcm9tICdhcmdvcy9fTGlzdEJhc2UnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgT2ZmbGluZU1hbmFnZXIgZnJvbSAnYXJnb3MvT2ZmbGluZS9NYW5hZ2VyJztcclxuaW1wb3J0IE9mZmxpbmVEZXRhaWwgZnJvbSAnLi4vT2ZmbGluZS9EZXRhaWwnO1xyXG5pbXBvcnQgX0xpc3RPZmZsaW5lTWl4aW4gZnJvbSAnYXJnb3MvT2ZmbGluZS9fTGlzdE9mZmxpbmVNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2JyaWVmY2FzZUxpc3QnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlY2xhcmUoJ2NybS5WaWV3cy5CcmllZmNhc2UnLCBbX0xpc3RCYXNlLCBfTGlzdE9mZmxpbmVNaXhpbl0sIHtcclxuICBpZDogJ2JyaWVmY2FzZV9saXN0JyxcclxuICBpZFByb3BlcnR5OiAnaWQnLFxyXG4gIGRldGFpbFZpZXc6ICdvZmZsaW5lX2RldGFpbCcsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBlbmFibGVBY3Rpb25zOiB0cnVlLFxyXG4gIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiB0cnVlLFxyXG4gIHJlc291cmNlS2luZDogJycsXHJcbiAgZW50aXR5TmFtZTogJ0JyaWVmY2FzZScsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgcmVzeW5jVG9vbHRpcFRleHQ6IHJlc291cmNlLnJlc3luY1Rvb2x0aXBUZXh0LFxyXG4gIHBhZ2VTaXplOiAxMDAwLFxyXG4gIGF1dG9OYXZpZ2F0ZVRvQnJpZWZjYXNlOiB0cnVlLFxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JTogJCQuZ2V0T2ZmbGluZURhdGUoJCkgJX08L3A+JyxcclxuICBdKSxcclxuICByZWZyZXNoUmVxdWlyZWRGb3I6IGZ1bmN0aW9uIHJlZnJlc2hSZXF1aXJlZEZvcigpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgZ2V0TW9kZWw6IGZ1bmN0aW9uIGdldE1vZGVsKCkge1xyXG4gICAgY29uc3QgbW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKCdCcmllZmNhc2UnLCBNT0RFTF9UWVBFUy5PRkZMSU5FKTtcclxuICAgIHJldHVybiBtb2RlbDtcclxuICB9LFxyXG4gIGdldFRpdGxlOiBmdW5jdGlvbiBnZXRUaXRsZShlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LmRlc2NyaXB0aW9uO1xyXG4gIH0sXHJcbiAgZ2V0T2ZmbGluZURhdGU6IGZ1bmN0aW9uIGdldE9mZmxpbmVEYXRlKGVudHJ5KSB7XHJcbiAgICBpZiAoZW50cnkgJiYgZW50cnkubW9kaWZ5RGF0ZSkge1xyXG4gICAgICByZXR1cm4gZm9ybWF0LnJlbGF0aXZlRGF0ZShlbnRyeS5tb2RpZnlEYXRlKTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9LFxyXG4gIF9oYXNWYWxpZE9wdGlvbnM6IGZ1bmN0aW9uIF9oYXNWYWxpZE9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgY29uc3QgdG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFt7XHJcbiAgICAgICAgaWQ6ICdyZXN5bmMnLFxyXG4gICAgICAgIHN2ZzogJ3JvbGVzJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5yZXN5bmNUb29sdGlwVGV4dCxcclxuICAgICAgICBhY3Rpb246ICdicmllZkNhc2VMaXN0JyxcclxuICAgICAgICBzZWN1cml0eTogJycsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuICAgIHJldHVybiB0b29scztcclxuICB9LFxyXG4gIGNyZWF0ZUluZGljYXRvckxheW91dDogZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9yTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUljb25DbGFzczogZnVuY3Rpb24gZ2V0SXRlbUljb25DbGFzcyhlbnRyeSkge1xyXG4gICAgbGV0IGljb25DbGFzcztcclxuICAgIGljb25DbGFzcyA9IGVudHJ5Lmljb25DbGFzcztcclxuICAgIGlmICghaWNvbkNsYXNzKSB7XHJcbiAgICAgIGljb25DbGFzcyA9ICd1cmwnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGljb25DbGFzcztcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9EZXRhaWxWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvRGV0YWlsVmlldyhrZXksIGRlc2NyaXB0b3IsIGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllcyAmJiB0aGlzLmVudHJpZXNba2V5XTtcclxuICAgIHRoaXMubmF2aWdhdGVUb09mZmxpbmVEZXRhaWxWaWV3KGVudHJ5LCBhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvT25saW5lRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RldGFpbFZpZXcoZW50cnksIGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5hcHAuZ2V0VmlldyhlbnRyeS52aWV3SWQpO1xyXG5cclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBkZXNjcmlwdG9yOiBlbnRyeS5kZXNjcmlwdGlvbiwgLy8ga2VlcCBmb3IgYmFja3dhcmRzIGNvbXBhdFxyXG4gICAgICB0aXRsZTogZW50cnkuZGVzY3JpcHRpb24sXHJcbiAgICAgIGtleTogZW50cnkuZW50aXR5SWQsXHJcbiAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoYWRkaXRpb25hbE9wdGlvbnMpIHtcclxuICAgICAgb3B0aW9ucyA9IGxhbmcubWl4aW4ob3B0aW9ucywgYWRkaXRpb25hbE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb09mZmxpbmVEZXRhaWxWaWV3KGVudHJ5LCBhZGRpdGlvbmFsT3B0aW9ucykge1xyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0RGV0YWlsVmlldyhlbnRyeS5lbnRpdHlOYW1lKTtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBkZXNjcmlwdG9yOiBlbnRyeS5kZXNjcmlwdGlvbiwgLy8ga2VlcCBmb3IgYmFja3dhcmRzIGNvbXBhdFxyXG4gICAgICB0aXRsZTogZW50cnkuZGVzY3JpcHRpb24sXHJcbiAgICAgIGtleTogZW50cnkuZW50aXR5SWQsXHJcbiAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgICBvZmZsaW5lQ29udGV4dDoge1xyXG4gICAgICAgIGVudGl0eUlkOiBlbnRyeS5lbnRpdHlJZCxcclxuICAgICAgICBlbnRpdHlOYW1lOiBlbnRyeS5lbnRpdHlOYW1lLFxyXG4gICAgICAgIHZpZXdJZDogZW50cnkudmlld0lkLFxyXG4gICAgICAgIHNvdXJjZTogZW50cnksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICAgIG9wdGlvbnMgPSBsYW5nLm1peGluKG9wdGlvbnMsIGFkZGl0aW9uYWxPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXREZXRhaWxWaWV3OiBmdW5jdGlvbiBnZXREZXRhaWxWaWV3KGVudGl0eU5hbWUpIHtcclxuICAgIGNvbnN0IHZpZXdJZCA9IGAke3RoaXMuZGV0YWlsVmlld31fJHtlbnRpdHlOYW1lfWA7XHJcbiAgICBsZXQgdmlldyA9IHRoaXMuYXBwLmdldFZpZXcodmlld0lkKTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcC5yZWdpc3RlclZpZXcobmV3IE9mZmxpbmVEZXRhaWwoeyBpZDogdmlld0lkIH0pKTtcclxuICAgIHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHZpZXdJZCk7XHJcbiAgICByZXR1cm4gdmlldztcclxuICB9LFxyXG4gIGNyZWF0ZUFjdGlvbkxheW91dDogZnVuY3Rpb24gY3JlYXRlQWN0aW9uTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucyB8fCAodGhpcy5hY3Rpb25zID0gW3tcclxuICAgICAgaWQ6ICdyZW1vdmUnLFxyXG4gICAgICBjbHM6ICdmYSBmYS1yZW1vdmUgZmEtMngnLFxyXG4gICAgICBsYWJlbDogcmVzb3VyY2UucmVtb3ZlVGV4dCxcclxuICAgICAgYWN0aW9uOiAncmVtb3ZlSXRlbUFjdGlvbicsXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAncmVzeW5jJyxcclxuICAgICAgY2xzOiAnZmEgZmEtc3VpdGNhc2UgZmEtMngnLFxyXG4gICAgICBsYWJlbDogcmVzb3VyY2UucmVCcmllZmNhc2VUZXh0LFxyXG4gICAgICBhY3Rpb246ICdyZUJyaWVmY2FzZUl0ZW1BY3Rpb24nLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ25hdlRvT25saW5lJyxcclxuICAgICAgY2xzOiAnZmEgZmEtbGV2ZWwtZG93biBmYS0yeCcsXHJcbiAgICAgIGxhYmVsOiByZXNvdXJjZS5nb1RvT25saW5lVGV4dCxcclxuICAgICAgYWN0aW9uOiAnbmF2VG9PbmxpbmVWaWV3JyxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICduYXZUb09mZmxpbmUnLFxyXG4gICAgICBjbHM6ICdmYSBmYS1sZXZlbC1kb3duIGZhLTJ4JyxcclxuICAgICAgbGFiZWw6IHJlc291cmNlLmdvVG9PZmZsaW5lVGV4dCxcclxuICAgICAgYWN0aW9uOiAnbmF2VG9PZmZsaW5lVmlldycsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBuYXZUb09ubGluZVZpZXc6IGZ1bmN0aW9uIG5hdlRvT25saW5lVmllKGFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBicmllZmNhc2VJZCA9IHNlbGVjdGlvbi50YWcuYXR0cmlidXRlc1snZGF0YS1rZXknXS52YWx1ZTtcclxuICAgIGNvbnN0IGJyaWVmY2FzZSA9IHRoaXMuZW50cmllc1ticmllZmNhc2VJZF07XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9PbmxpbmVEZXRhaWxWaWV3KGJyaWVmY2FzZSk7XHJcbiAgfSxcclxuICBuYXZUb09mZmxpbmVWaWV3OiBmdW5jdGlvbiBuYXZUb09mZmxpbmVWaWV3KGFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBicmllZmNhc2VJZCA9IHNlbGVjdGlvbi50YWcuYXR0cmlidXRlc1snZGF0YS1rZXknXS52YWx1ZTtcclxuICAgIGNvbnN0IGJyaWVmY2FzZSA9IHRoaXMuZW50cmllc1ticmllZmNhc2VJZF07XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9PZmZsaW5lRGV0YWlsVmlldyhicmllZmNhc2UpO1xyXG4gIH0sXHJcbiAgcmVtb3ZlSXRlbUFjdGlvbjogZnVuY3Rpb24gcmVtb3ZlSXRlbUFjdGlvbihhY3Rpb24sIHNlbGVjdGlvbikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICBjb25zdCBicmllZmNhc2VJZCA9IHNlbGVjdGlvbi50YWcuYXR0cmlidXRlc1snZGF0YS1rZXknXS52YWx1ZTtcclxuICAgIE9mZmxpbmVNYW5hZ2VyLnJlbW92ZUJyaWVmY2FzZShicmllZmNhc2VJZCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlQnJpZWZjYXNlSXRlbUFjdGlvbjogZnVuY3Rpb24gcmVCcmllZmNhc2UoYWN0aW9uLCBzZWxlY3Rpb24pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgY29uc3QgYnJpZWZjYXNlSWQgPSBzZWxlY3Rpb24udGFnLmF0dHJpYnV0ZXNbJ2RhdGEta2V5J10udmFsdWU7XHJcbiAgICBjb25zdCBicmllZmNhc2UgPSB0aGlzLmVudHJpZXNbYnJpZWZjYXNlSWRdO1xyXG4gICAgaWYgKGJyaWVmY2FzZSkge1xyXG4gICAgICB0aGlzLmJyaWVmQ2FzZUl0ZW0oYnJpZWZjYXNlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTGlzdEJyaWVmY2FzZWQ6IGZ1bmN0aW9uIG9uTGlzdEJyaWVmY2FzZWQoKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIGNyZWF0ZUJyaWVmY2FzZUVudGl0eTogZnVuY3Rpb24gY3JlYXRlQnJpZWZjYXNlRW50aXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBlbnRpdHkgPSB7XHJcbiAgICAgIGVudGl0eUlkOiBlbnRyeS5lbnRpdHlJZCxcclxuICAgICAgZW50aXR5TmFtZTogZW50cnkuZW50aXR5TmFtZSxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGluY2x1ZGVSZWxhdGVkOiB0cnVlLFxyXG4gICAgICAgIHZpZXdJZDogZW50cnkudmlld0lkLFxyXG4gICAgICAgIGljb25DbGFzczogZW50cnkuaWNvbkNsYXNzLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBlbnRpdHk7XHJcbiAgfSxcclxuICBpc0Rpc2FibGVkOiBmdW5jdGlvbiBpc0Rpc2FibGVkKCkge1xyXG4gICAgcmV0dXJuICFBcHAuZW5hYmxlT2ZmbGluZVN1cHBvcnQ7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==