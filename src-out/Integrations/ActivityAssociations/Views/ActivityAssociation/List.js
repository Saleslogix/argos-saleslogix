define('crm/Integrations/ActivityAssociations/Views/ActivityAssociation/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', 'argos/List', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _connect, _List, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _connect2 = _interopRequireDefault(_connect);

  var _List2 = _interopRequireDefault(_List);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityAssociationList'); /* Copyright 2020 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.ActivityAssociations.Views.ActivityAssociation.List', [_List2.default], {
    // Localization
    titleText: resource.titleText,
    primaryText: resource.primaryText,
    deleteText: resource.deleteText,
    confirmDeleteText: resource.confirmDeleteText,

    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.EntityType %} | {%: $.EntityName %}</p>', '<p class="micro-text">{%: $$.primaryText %} {%: $.IsPrimary %}</p>']),

    // View Properties
    id: 'activity_association_list',
    security: null,
    detailView: 'activity_association_detail',
    enableActions: true,
    pageSize: 105,
    resourceKind: 'activityAssociations',
    modelName: _Names2.default.ACTIVITYASSOCIATION,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(EntityName) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    },
    getTitle: function getTitle(entry) {
      if (!entry) {
        return '';
      }

      return this._model && this._model.getEntityDescription(entry) || entry.EntityName;
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    deleteAssociation: function deleteAssociation(_, selection) {
      var _this = this;

      App.modal.createSimpleDialog({
        title: 'alert',
        content: this.confirmDeleteText,
        getContent: function getContent() {}
      }).then(function () {
        var entry = selection && selection.data;
        var model = _this.getModel();
        model.deleteEntry(entry.$key).then(function () {
          _connect2.default.publish('/app/refresh', [{
            resourceKind: _this.resourceKind
          }]);
          _this.forceRefresh();
        });
      });
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'deleteAssociation',
        cls: 'delete',
        label: this.deleteText,
        fn: this.deleteAssociation.bind(this)
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});