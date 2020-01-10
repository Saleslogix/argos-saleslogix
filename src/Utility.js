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
import lang from 'dojo/_base/lang';
import Utility from 'argos/Utility';

const commonutil = ICRMCommonSDK.utility;
/**
 * @class
 * @alias module:crm/Utility
 * @classdesc Utility provides functions that are more javascript enhancers than application related code. Mixes in argos.Utility.
 * @static
 *
 */
const __class = lang.setObject('crm.Utility', lang.mixin({}, Utility, /** @lends module:crm/Utility */{
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
  stripQueryArgs: commonutil.stripQueryArgs,
}));

export default __class;
