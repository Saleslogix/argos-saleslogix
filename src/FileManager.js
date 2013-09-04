/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
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
        unableToUploadText: 'This browser does not support HTML5 File API.',
        unknownSizeText: 'unknown',
        unknownErrorText: 'Warning: An error occured and the file failed to upload.',
        largeFileWarningText: 'Warning: This request exceeds the size limit set by your administrator and failed to upload.',
        largeFileWarningTitle: 'Warning',
        percentCompleteText: 'Uploading, please wait...',
        fileUploadOptions: { maxFileSize: 4000000 },
        _store: false,
        _totalProgress: 0,
        _files: null,
        _fileCount: 0,
        _filesUploadedCount: 0,
        _isUploading: false,

        constructor: function() {
            this._files = [];
            this.fileUploadOptions.maxFileSize = App.maxUploadFileSize;
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
                this._onUnableToUploadError(this.largeFileWarningText, error);
                return;
            }
            if (this.isHTML5Supported()) {
                this._uploadFileHTML5_asBinary(file, url, progress, complete, error, scope, asPut);
            } else {
                this._onUnableToUploadError(this.unableToUploadText, error);
            }
        },
        _uploadFileHTML5_asBinary: function(file, url, progress, complete, error, scope, asPut) {
            window.BlobBuilder = window.BlobBuilder || 
                         window.WebKitBlobBuilder || 
                         window.MozBlobBuilder || 
                         window.MSBlobBuilder;
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
                var binary, boundary, dashdash, crlf, bb, unknownErrorText, usingBlobBuilder, blobReader, blobData;
                unknownErrorText = this.unknownErrorText;
                blobReader = new FileReader();// read the blob as an ArrayBuffer to work around this android issue: https://code.google.com/p/android/issues/detail?id=39882
                
                try {
                    new Blob();// This will throw an exception if it is no supported (android)
                    bb = [];
                } catch(e) {
                    bb = new window.BlobBuilder();
                    usingBlobBuilder = true;
                }

                binary = evt.target.result;
                boundary = "---------------------------" + (new Date()).getTime();
                dashdash = '--';
                crlf = '\r\n';

                this._append(bb, dashdash + boundary + crlf);
                this._append(bb, 'Content-Disposition: attachment; ');
                this._append(bb, 'name="file_"; ');
                this._append(bb, 'filename*="' + encodeURI(file.name) + '" ');
                this._append(bb, crlf);
                this._append(bb, 'Content-Type: ' + file.type);
                this._append(bb, crlf + crlf);
                this._append(bb, binary);
                this._append(bb, crlf);
                this._append(bb, dashdash + boundary + dashdash + crlf);

                if (complete) {
                    request.onreadystatechange = function() {
                        if (request.readyState === 4) {
                            if (Math.floor(request.status / 100) !== 2) {
                                if (error) {
                                    error.call(scope || this, unknownErrorText);
                                    console.warn(unknownErrorText + " "+ request.responseText);
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

                if (usingBlobBuilder) {
                    blobData = bb.getBlob(file.type);
                } else {
                    blobData = new Blob(bb);
                }

                // Read the blob back as an ArrayBuffer to work around this android issue:
                // https://code.google.com/p/android/issues/detail?id=39882
                blobReader.onload = function(e) {
                    request.send(e.target.result);
                };

                blobReader.readAsArrayBuffer(blobData);
            });

            reader.readAsArrayBuffer(file);
        },
        _append: function(arrayOrBlobBuilder, data) {
            if (arrayOrBlobBuilder && arrayOrBlobBuilder.constructor === Array) {
                arrayOrBlobBuilder.push(data);
            } else {
                arrayOrBlobBuilder.append(data);
            }
        },
        _onUnableToUploadError: function(msg, onError) {
            if (!msg) {
                msg = this.unableToUploadText;
            }
            if (onError) {
                onError([msg]);
            } else {
                console.warn([msg]);
            }
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
                    responseType: responseType,
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
