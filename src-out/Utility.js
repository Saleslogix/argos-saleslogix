define("crm/Utility", ["exports", "dojo/_base/lang", "argos/Utility"], function (_exports, _lang, _Utility) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _lang = _interopRequireDefault(_lang);
  _Utility = _interopRequireDefault(_Utility);

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
   * @module crm/Utility
   */
  var commonutil = ICRMCommonSDK.utility;
  /**
   * @class
   * @alias module:crm/Utility
   * @classdesc Utility provides functions that are more javascript enhancers than application related code. Mixes in argos.Utility.
   * @static
   *
   */

  var __class = _lang["default"].setObject('crm.Utility', _lang["default"].mixin({}, _Utility["default"],
  /** @lends module:crm/Utility */
  {
    base64ArrayBuffer: commonutil.base64ArrayBuffer,

    /** Gets the extension for a file.
     * @param {String} fileName
     * The file name including the extension
     * @returns {String}
     * Returns the file extension, if fileName is null or undefined, returns the string '.'
     */
    getFileExtension: commonutil.getFileExtension,

    /** Parses the activity ID
     * @param {String} activityId
     * A string with the activity id seperated by a semi-colon
     * @returns {String}
     */
    getRealActivityId: commonutil.getRealActivityId,
    trimText: commonutil.trimText,
    stripQueryArgs: commonutil.stripQueryArgs
  }));

  var _default = __class;
  _exports["default"] = _default;
});