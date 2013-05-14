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
 * File Manager 
 */
define('Mobile/SalesLogix/FileManager', [
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/number',
    'dojo/has',
    'dojo/_base/sniff'
], function(
    lang,
    declare,
    dNumber,
    has,
    sniff
) {
    return declare('Mobile.SalesLogix.FileManager', null, {
        unableToUploadText: 'Browser does not support HTML5 File API.',
        unknownSizeText: 'unknown',
        largeFileWarningText: 'Warning: This request exceed the size limit set by your administrator and fail to upload.',
        largeFileWarningTitle: 'Warning',
        percentCompleteText: 'Uploading, please wait...',
        fileUploadOptions: { maxFileSize: 4000000 },
        _store: false,
        _totalProgress: 0,
        _files: [],
        _fileCount: 0,
        _filesUploadedCount: 0,
        _isUploading: false,

        constructor: function() {
        },
        isHTML5Supported:function(){
            var results = has('html5-file-api');
            return results;
        },
        isFileSizeAllowed: function(files) {
            var len = 0, maxfileSize, title, msg;
            maxfileSize = this.fileUploadOptions.maxFileSize;
            title = this.largeFileWarningTitle;
            msg = this.largeFileWarningText;

            for (var i = 0; i < files.length; i++) {
                if (files[i].size === 0) {
                    // do nothing.
                } else {
                    len += files[i].size || files[i].blob.length;
                }
            }

            if (len > (maxfileSize)) {
                return false;
            }

            return true;
        },
        uploadFile: function(file, url, progress, complete, error, scope, asPut) {
            this.uploadFileHTML5(file, url, progress, complete, error, scope, asPut);
        },
        uploadFileHTML5: function(file, url, progress, complete, error, scope, asPut) {
            if (!this.isFileSizeAllowed([file])) {
                return;
            }
            if (this.isHTML5Supported()) {
                this._uploadFileHTML5_asBinary(file, url, progress, complete, error, scope, asPut);
            } else {
                this._showUnableToUploadError();
            }
        },
        _uploadFileHTML5_asBinary: function(file, url, progress, complete, error, scope, asPut) {
            if (!url) {
                //assume Attachment SData url
                url = 'slxdata.ashx/slx/system/-/attachments/file';// TODO: Remove this assumption from SDK
            }

            var request = new XMLHttpRequest(), service = App.getService(), reader;
            request.open((asPut) ? 'PUT' : 'POST', url);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            if (service) {
                request.setRequestHeader('Authorization', service.createBasicAuthToken());
                request.setRequestHeader('X-Authorization', service.createBasicAuthToken());
                request.setRequestHeader('X-Authorization-Mode', 'no-challenge');
            }

            reader = new FileReader();
            reader.onload = lang.hitch(this, function(evt) {
                var binary, boundary, dashdash, crlf, bb;

                bb = [];
                binary = evt.target.result;
                boundary = "---------------------------" + (new Date()).getTime();
                dashdash = '--';
                crlf = '\r\n';

                bb.push(dashdash + boundary + crlf);
                bb.push('Content-Disposition: attachment; ');
                bb.push('name="file_"; ');
                bb.push('filename*="' + encodeURI(file.name) + '" ');
                bb.push(crlf);
                bb.push('Content-Type: ' + file.type);
                bb.push(crlf + crlf);
                bb.push(binary);
                bb.push(crlf);
                bb.push(dashdash + boundary + dashdash + crlf);

                if (complete) {
                    request.onreadystatechange = function() {
                        if (request.readyState === 4) {
                            if (Math.floor(request.status / 100) !== 2) {
                                if (error) {
                                    error.call(scope || this, request);
                                }
                            } else {
                                complete.call(scope || this, request);
                            }
                        }
                    };
                }

                if (progress) {
                    request.upload.addEventListener('progress', function(e) {
                        progress.call(scope || this, e);
                    });
                }
                request.setRequestHeader('Content-Type', 'multipart/attachment; boundary=' + boundary);
                request.send(new Blob(bb));
            });

            reader.readAsArrayBuffer(file);
        },
        _showUnableToUploadError: function() {
            window.alert(this.unableToUploadText);
        },
        formatFileSize: function(size) {
            size = parseInt(size, 10);
            if (size === 0) {
                return '0 KB';
            }
            if (!size || size < 0) {
                return this.unknownSizeText;
            }
            if (size < 1024) {
                return '1 KB';
            }
            return dNumber.format(Math.round(size / 1024)) + ' KB';
        },
        getFile: function(fileUrl, responseType , onSuccess) {
            var request, service, self;

            request = new XMLHttpRequest();
            service = App.getService();
            self = this;

            request.open("GET", fileUrl, true);

            if (responseType) {
                request.responseType = responseType;
            }
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            if (service) {
                request.setRequestHeader('Authorization', service.createBasicAuthToken());
                request.setRequestHeader('X-Authorization', service.createBasicAuthToken());
                request.setRequestHeader('X-Authorization-Mode', 'no-challenge');
            }
            request.addEventListener("load", function() {
                var data, contentType, contentInfo, responseInfo, fileName;

                data = this.response;
                contentType = this.getResponseHeader("Content-Type");
                contentInfo = this.getResponseHeader("Content-Disposition");
                responseInfo = {};
                fileName = contentInfo.split('=')[1];

                responseInfo = {
                    request: this,
                    responseTye: responseType,
                    response: this.response,
                    contentType: contentType,
                    fileName: fileName
                };                
                if (onSuccess) {
                    onSuccess(responseInfo);
                }
            }, false);
            request.send(null);
        }
    });
});
