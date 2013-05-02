/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Utility provides functions that are more javascript enhancers than application related code.
 * @alternateClassName utility
 * @singleton
 */
define('Mobile/SalesLogix/Utility', [
    'dojo/_base/lang',
    'dojo/string',
    'Mobile/SalesLogix/AttachmentManager'
], function(
    lang,
    string,
    AttachmentManager
) {
    return lang.setObject('Mobile.SalesLogix.Utility', {
        getAttachmentRef: function(attachment) {
            if (attachment['url']) {
                var href = attachment['url'] || '';
                href = (href.indexOf('http') < 0) ? 'http://' + href : href;
                return href;
            } else {
                if (attachment['fileExists']) {
                    return string.substitute('javascript: Mobile.SalesLogix.Utility.openAttachmentFile(\'${0}\');',
                        [attachment['$key'], attachment['$descriptor']]);
                } else {
                    return attachment['$descriptor'];
                }
            }
        },
        openAttachmentFile: function(attachmentId) {
            if (attachmentId && attachmentId.length === 12) {
                var am = new AttachmentManager();
                am.getAttachmentFile(attachmentId, function(responseInfo) {
                    var blob, url, a;

                    blob = new Blob([responseInfo.response], { type: responseInfo.contentType });

                    // Use the URL object to create a temporary URL
                    url = (window.webkitURL || window.URL).createObjectURL(blob);
                    myWindow = window.open();
                    myWindow.location = url;

                    //create html element to assign file name.
                   // a = document.createElement('a');
                  //  a.href = url;
                  //  a.download = responseInfo.fileName;
                  //  a.style.display = 'none';
                  //  document.body.appendChild(a);
                 //   a.click();
                });
            }
        }
    });
});
