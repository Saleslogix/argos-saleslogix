define("crm/Models/Activity/Offline", ["exports", "dojo/_base/declare", "./Base", "argos/Models/_OfflineModelBase", "argos/Models/Manager", "argos/Models/Types", "../Names", "dojo/Deferred"], function (_exports, _declare, _Base, _OfflineModelBase2, _Manager, _Types, _Names, _Deferred) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Base = _interopRequireDefault(_Base);
  _OfflineModelBase2 = _interopRequireDefault(_OfflineModelBase2);
  _Manager = _interopRequireDefault(_Manager);
  _Types = _interopRequireDefault(_Types);
  _Names = _interopRequireDefault(_Names);
  _Deferred = _interopRequireDefault(_Deferred);

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
  var __class = (0, _declare["default"])('crm.Models.Activity.Offline', [_Base["default"], _OfflineModelBase2["default"]], {
    id: 'activity_offline_model',
    onActivityCompleted: function onActivityCompleted(entry) {
      var def = new _Deferred["default"]();
      var key = entry.$completedBasedOn ? entry.$completedBasedOn.$key : entry.$key;
      this.deleteEntry(key);
      this.removeFromAuxiliaryEntities(key);
      def.resolve();
      return def.promise;
    },
    onEntryUpdated: function onEntryUpdated(entry, orginalEntry) {
      var def = new _Deferred["default"]();

      if (entry && entry.$key && orginalEntry && orginalEntry.$key) {
        if (entry.$key !== orginalEntry.$key) {
          // this happens when occurence is created
          this.deleteEntry(orginalEntry.$key);
          this.removeFromAuxiliaryEntities(orginalEntry.$key);
        }
      }

      def.resolve();
      return def.promise;
    }
  });

  _Manager["default"].register(_Names["default"].ACTIVITY, _Types["default"].OFFLINE, __class);

  var _default = __class;
  _exports["default"] = _default;
});