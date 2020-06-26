define("crm/Action", ["exports", "dojo/_base/lang", "dojo/string", "argos/Utility", "argos/I18n"], function (_exports, _lang, _string, _Utility, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _lang = _interopRequireDefault(_lang);
  _string = _interopRequireDefault(_string);
  _Utility = _interopRequireDefault(_Utility);
  _I18n = _interopRequireDefault(_I18n);

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

  /**
   * @module crm/Action
   */
  var resource = (0, _I18n["default"])('action');
  /**
   * @class
   * @alias module:crm/Action
   * @static
   */

  var __class = _lang["default"].setObject('crm.Action',
  /** @lends module:crm/Action */
  {
    calledText: resource.calledText,
    emailedText: resource.emailedText,
    navigateToHistoryInsert: function navigateToHistoryInsert(entry, complete, title) {
      var view = App.getView('history_edit');

      if (view) {
        view.show({
          title: title,
          template: {},
          entry: entry,
          insert: true
        }, {
          complete: complete
        });
      }
    },
    recordToHistory: function recordToHistory(complete, o, title) {
      var entry = {
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.$descriptor,
        Duration: 15,
        CompletedDate: new Date()
      };

      _lang["default"].mixin(entry, o);

      this.navigateToHistoryInsert(entry, complete, title);
    },
    callPhone: function callPhone(action, selection, phoneProperty, title) {
      if (!selection || !selection.data) {
        return;
      }

      var actionInitiated = false;
      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });

      _lang["default"].mixin(selection.data, {
        Type: 'atPhoneCall',
        Description: _string["default"].substitute(crm.Action.calledText, [selection.data.$descriptor])
      });

      var value = _Utility["default"].getValue(selection.data, phoneProperty, '');

      crm.Action.recordToHistory(function () {
        if (!actionInitiated) {
          App.initiateCall(value);
          actionInitiated = true;
        }
      }, selection.data, title);
    },
    sendEmail: function sendEmail(action, selection, emailProperty) {
      if (!selection || !selection.data) {
        return;
      }

      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });

      _lang["default"].mixin(selection.data, {
        Type: 'atEmail',
        Description: _string["default"].substitute(crm.Action.emailedText, [selection.data.$descriptor])
      });

      var value = _Utility["default"].getValue(selection.data, emailProperty, '');

      crm.Action.recordToHistory(function () {
        App.initiateEmail(value);
      }, selection.data);
    },
    addNote: function addNote(action, selection) {
      var entry = selection.data;
      var key = selection.data.$key;
      var desc = selection.data.$descriptor;
      this.setSource({
        entry: entry,
        descriptor: desc,
        key: key
      });
      var view = App.getView('history_edit');

      if (view) {
        view.show({
          insert: true
        });
      }
    },
    addActivity: function addActivity(action, selection) {
      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });
      App.navigateToActivityInsertView();
    },
    navigateToEntity: function navigateToEntity(action, selection, o) {
      var options = {
        key: _Utility["default"].getValue(selection.data, o.keyProperty),
        descriptor: _Utility["default"].getValue(selection.data, o.textProperty)
      };
      var view = App.getView(o.view);

      if (view && options.key) {
        view.show(options);
      }
    },
    hasProperty: function hasProperty(action, selection, property) {
      return _Utility["default"].getValue(selection.data, property);
    },
    addAttachment: function addAttachment(action, selection) {
      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });
      var view = App.getView('attachment_Add');

      if (view) {
        view.show({
          insert: true
        });
      }
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});