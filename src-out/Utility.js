define('crm/Utility', ['module', 'exports', 'dojo/_base/lang', 'argos/Utility'], function (module, exports, _lang, _Utility) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _Utility2 = _interopRequireDefault(_Utility);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var commonutil = ICRMCommonSDK.utility;
  /**
   * @class crm.Utility
   *
   * @classdesc Utility provides functions that are more javascript enhancers than application related code. Mixes in argos.Utility.
   *
   * @requires argos.Utility
   * @singleton
   *
   */
  var __class = _lang2.default.setObject('crm.Utility', _lang2.default.mixin({}, _Utility2.default, /** @lends crm.Utility */{
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlsaXR5LmpzIl0sIm5hbWVzIjpbImNvbW1vbnV0aWwiLCJJQ1JNQ29tbW9uU0RLIiwidXRpbGl0eSIsIl9fY2xhc3MiLCJzZXRPYmplY3QiLCJtaXhpbiIsImJhc2U2NEFycmF5QnVmZmVyIiwiZ2V0RmlsZUV4dGVuc2lvbiIsImdldFJlYWxBY3Rpdml0eUlkIiwidHJpbVRleHQiLCJzdHJpcFF1ZXJ5QXJncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxNQUFNQSxhQUFhQyxjQUFjQyxPQUFqQztBQUNBOzs7Ozs7Ozs7QUFTQSxNQUFNQyxVQUFVLGVBQUtDLFNBQUwsQ0FBZSxhQUFmLEVBQThCLGVBQUtDLEtBQUwsQ0FBVyxFQUFYLHFCQUF3Qix5QkFBeUI7QUFDN0ZDLHVCQUFtQk4sV0FBV00saUJBRCtEOztBQUc3Rjs7Ozs7O0FBTUFDLHNCQUFrQlAsV0FBV08sZ0JBVGdFO0FBVTdGOzs7OztBQUtBQyx1QkFBbUJSLFdBQVdRLGlCQWYrRDtBQWdCN0ZDLGNBQVVULFdBQVdTLFFBaEJ3RTtBQWlCN0ZDLG9CQUFnQlYsV0FBV1U7QUFqQmtFLEdBQWpELENBQTlCLENBQWhCOztvQkFvQmVQLE8iLCJmaWxlIjoiVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBVdGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5cclxuY29uc3QgY29tbW9udXRpbCA9IElDUk1Db21tb25TREsudXRpbGl0eTtcclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVXRpbGl0eVxyXG4gKlxyXG4gKiBAY2xhc3NkZXNjIFV0aWxpdHkgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgYXJlIG1vcmUgamF2YXNjcmlwdCBlbmhhbmNlcnMgdGhhbiBhcHBsaWNhdGlvbiByZWxhdGVkIGNvZGUuIE1peGVzIGluIGFyZ29zLlV0aWxpdHkuXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqIEBzaW5nbGV0b25cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBsYW5nLnNldE9iamVjdCgnY3JtLlV0aWxpdHknLCBsYW5nLm1peGluKHt9LCBVdGlsaXR5LCAvKiogQGxlbmRzIGNybS5VdGlsaXR5ICove1xyXG4gIGJhc2U2NEFycmF5QnVmZmVyOiBjb21tb251dGlsLmJhc2U2NEFycmF5QnVmZmVyLFxyXG5cclxuICAvKiogR2V0cyB0aGUgZXh0ZW5zaW9uIGZvciBhIGZpbGUuXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVOYW1lXHJcbiAgICogVGhlIGZpbGUgbmFtZSBpbmNsdWRpbmcgdGhlIGV4dGVuc2lvblxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICogUmV0dXJucyB0aGUgZmlsZSBleHRlbnNpb24sIGlmIGZpbGVOYW1lIGlzIG51bGwgb3IgdW5kZWZpbmVkLCByZXR1cm5zIHRoZSBzdHJpbmcgJy4nXHJcbiAgICovXHJcbiAgZ2V0RmlsZUV4dGVuc2lvbjogY29tbW9udXRpbC5nZXRGaWxlRXh0ZW5zaW9uLFxyXG4gIC8qKiBQYXJzZXMgdGhlIGFjdGl2aXR5IElEXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGl2aXR5SWRcclxuICAgKiBBIHN0cmluZyB3aXRoIHRoZSBhY3Rpdml0eSBpZCBzZXBlcmF0ZWQgYnkgYSBzZW1pLWNvbG9uXHJcbiAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgKi9cclxuICBnZXRSZWFsQWN0aXZpdHlJZDogY29tbW9udXRpbC5nZXRSZWFsQWN0aXZpdHlJZCxcclxuICB0cmltVGV4dDogY29tbW9udXRpbC50cmltVGV4dCxcclxuICBzdHJpcFF1ZXJ5QXJnczogY29tbW9udXRpbC5zdHJpcFF1ZXJ5QXJncyxcclxufSkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19