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