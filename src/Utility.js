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
    'dojo/has',
    'dojo/_base/sniff',
    'dojox/mobile/sniff',
    'Mobile/SalesLogix/AttachmentManager'
], function(
    lang,
    string,
    has,
    baseSniff,
    mobileSniff,
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

                if (!has('android')) {
                    // temp solution to IOS problems below (window.open on an sdata url will issue a 401 challenge)
                    window.open(am.getAttachmentUrl(attachmentId));
                } else {
                    am.getAttachmentFile(attachmentId,'blob', function(responseInfo) {
                        var blob, url, a, blobURL, event, reader;

                        blob = responseInfo.response;
                        url = window.URL || window.webkitURL;

                        /*
                         * TODO: Why is this not working on IOS??????
                        alert('pre');
                        reader = new FileReader(blob);
                        for(var p in reader) {
                            //alert(p);
                        }
                        reader.addEventListener('load', function(e) {
                            // not hitting on IOS
                            alert('HIT');
                            var reader = e.target;
                            window.open(reader.result);
                        });
                        reader.readAsDataURL(blob);
                        */

                        blobURL = url.createObjectURL(blob);
                        window.open(blobURL);

                        // create html element to assign file name.
                        /*a = document.createElement('a');
                        a.href = blobURL;
                        a.download = responseInfo.fileName;
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        
                        event = window.document.createEvent("MouseEvents");
                        event.initMouseEvent(
                            "click", true, false, window, 0, 0, 0, 0, 0
                            , false, false, false, false, 0, null
                        );
                        a.dispatchEvent(event);*/
                    });
                }
            }
        },
        getFileExtension: function(fileName) {
            if (!fileName){
                return '.';
            }
            return fileName.substr(fileName.lastIndexOf('.'));
        }
    });
});

