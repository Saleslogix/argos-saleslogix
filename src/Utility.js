/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Utility
 *
 * Utility provides functions that are more javascript enhancers than application related code. Mixes in argos.Utility.
 *
 * @requires argos.Utility
 * @singleton
 *
 */
define('crm/Utility', [
    'dojo/_base/lang',
    'dojo/string',
    'argos/Utility'
], function(
    lang,
    string,
    Utility
) {
    var __class = lang.setObject('crm.Utility', lang.mixin({}, Utility, {
        base64ArrayBuffer: function(arrayBuffer) {
            var base64,
                encodings,
                bytes,
                byteLength,
                mainLength,
                byteRemainder,
                a,
                b,
                c,
                d,
                chunk,
                i;

            base64    = '';
            encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

            bytes = new Uint8Array(arrayBuffer);
            byteLength = bytes.byteLength;
            byteRemainder = byteLength % 3;
            mainLength = byteLength - byteRemainder;

            // Main loop deals with bytes in chunks of 3
            for (i = 0; i < mainLength; i = i + 3) {
                // Combine the three bytes into a single integer
                chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

                // Use bitmasks to extract 6-bit segments from the triplet
                a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
                b = (chunk & 258048)   >> 12; // 258048   = (2^6 - 1) << 12
                c = (chunk & 4032)     >>  6; // 4032     = (2^6 - 1) << 6
                d = chunk & 63;               // 63       = 2^6 - 1

                // Convert the raw binary segments to the appropriate ASCII encoding
                base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
            }

            // Deal with the remaining bytes and padding
            if (byteRemainder === 1) {
                chunk = bytes[mainLength];

                a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

                // Set the 4 least significant bits to zero
                b = (chunk & 3)   << 4; // 3   = 2^2 - 1

                base64 += encodings[a] + encodings[b] + '==';
            } else if (byteRemainder === 2) {
                chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

                a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
                b = (chunk & 1008)  >>  4; // 1008  = (2^6 - 1) << 4

                // Set the 2 least significant bits to zero
                c = (chunk & 15)    <<  2; // 15    = 2^4 - 1

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
        getFileExtension: function(fileName) {
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
        getRealActivityId: function(activityId) {
            var Id = activityId;
            if (activityId) {
                if (activityId.indexOf(';') > 0) {
                    Id = activityId.substring(0, 12);
                } else {
                    Id = activityId;
                }
            }
            return Id;
        }
    }));

    lang.setObject('Mobile.SalesLogix.Utility', __class);
    return __class;
});

