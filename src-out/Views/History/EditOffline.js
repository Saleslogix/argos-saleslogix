define("crm/Views/History/EditOffline", ["exports", "dojo/_base/declare", "argos/_EditBase", "argos/Models/Types", "argos/I18n", "../../Models/Names"], function (_exports, _declare, _EditBase2, _Types, _I18n, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _EditBase2 = _interopRequireDefault(_EditBase2);
  _Types = _interopRequireDefault(_Types);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('historyEditOffline');

  var __class = (0, _declare["default"])('crm.Views.History.EditOffline', [_EditBase2["default"]], {
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'history_edit_offline',
    entityName: 'History',
    resourceKind: 'history',
    getModel: function getModel() {
      var model = App.ModelManager.getModel(_Names["default"].HISTORY, _Types["default"].OFFLINE);
      return model;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: resource.notesSectionText,
        name: 'NotesSection',
        children: [{
          name: 'Text',
          property: 'Text',
          label: resource.notesLabelText,
          cls: 'row-edit-text',
          type: 'textarea',
          autoFocus: true
        }, {
          name: 'UID',
          property: 'UID',
          type: 'hidden'
        }]
      }]);
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(beforeTransitionTo, arguments);
      $(this.domNode).removeClass('panel-loading');
    },
    onTransitionTo: function onTransitionTo() {
      this.inherited(onTransitionTo, arguments);

      if (this.options.insert) {
        var now = Date.now();
        this.fields.UID.setValue(now);
      }
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});