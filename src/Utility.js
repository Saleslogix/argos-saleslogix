import lang from 'dojo/_base/lang';
import Utility from 'argos/Utility';

const commonutil = ICRMCommonSDK.utility;
/**
 * @class crm.Utility
 *
 * @classdesc Utility provides functions that are more javascript enhancers than application related code. Mixes in argos.Utility.
 *
 * @requires argos.Utility
 * @singleton
 *
 */
const __class = lang.setObject('crm.Utility', lang.mixin({}, Utility, /** @lends crm.Utility */{
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

lang.setObject('Mobile.SalesLogix.Utility', __class);
export default __class;
