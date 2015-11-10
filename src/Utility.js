import lang from 'dojo/_base/lang';
import Utility from 'argos/Utility';

/**
 * @class crm.Utility
 *
 * Utility provides functions that are more javascript enhancers than application related code. Mixes in argos.Utility.
 *
 * @requires argos.Utility
 * @singleton
 *
 */
const __class = lang.setObject('crm.Utility', lang.mixin({}, Utility, {
  base64ArrayBuffer: function base64ArrayBuffer(arrayBuffer) {
    let base64 = '';
    let chunk;
    let a;
    let b;
    let c;
    let d;
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const bytes = new Uint8Array(arrayBuffer);
    const byteLength = bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;

    // Main loop deals with bytes in chunks of 3
    for (let i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63; // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
      chunk = bytes[mainLength];

      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4; // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder === 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }

    return base64;
  },

  /** Gets the extension for a file.
   * @param {String} fileName
   * The file name including the extension
   * @returns {String}
   * Returns the file extension, if fileName is null or undefined, returns the string '.'
   */
  getFileExtension: function getFileExtension(fileName) {
    if (!fileName) {
      return '.';
    }
    return fileName.substr(fileName.lastIndexOf('.'));
  },
  /** Parses the activity ID
   * @param {String} activityId
   * A string with the activity id seperated by a semi-colon
   * @returns {String}
   */
  getRealActivityId: function getRealActivityId(activityId) {
    let id = activityId;
    if (activityId) {
      if (activityId.indexOf(';') > 0) {
        id = activityId.substring(0, 12);
      } else {
        id = activityId;
      }
    }
    return id;
  },
  trimText: function trimText(text = '', wordCount = 0) {
    const words = text.split(' ');
    if (words.length > wordCount) {
      const intermediate = words.slice(0, wordCount);
      if (intermediate[wordCount - 1].endsWith('.')) {
        intermediate[wordCount - 1] = intermediate[wordCount - 1].slice(0, -1);
      }
      const value = `${intermediate.join(' ')} ...`;
      return value;
    }
    return text;
  },
  stripQueryArgs: function stripQueryArgs(url = '') {
    const idx = url.indexOf('?');
    if (idx > -1) {
      return url.substr(0, idx);
    }

    return url;
  },
}));

lang.setObject('Mobile.SalesLogix.Utility', __class);
export default __class;
