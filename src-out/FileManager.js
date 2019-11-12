define('crm/FileManager', ['module', 'exports', 'dojo/_base/lang', 'dojo/_base/declare', 'dojo/number', 'argos/I18n'], function (module, exports, _lang, _declare, _number, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _declare2 = _interopRequireDefault(_declare);

  var _number2 = _interopRequireDefault(_number);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('fileManager');

  /**
   * @class crm.FileManager
   */
  var __class = (0, _declare2.default)('crm.FileManager', null, /** @lends crm.FileManager# */{
    unableToUploadText: resource.unableToUploadText,
    unknownSizeText: resource.unknownSizeText,
    unknownErrorText: resource.unknownErrorText,
    largeFileWarningText: resource.largeFileWarningText,
    largeFileWarningTitle: resource.largeFileWarningTitle,
    percentCompleteText: resource.percentCompleteText,
    fileUploadOptions: {
      maxFileSize: 4000000
    },
    _store: false,
    _totalProgress: 0,
    _files: null,
    _fileCount: 0,
    _filesUploadedCount: 0,
    _isUploading: false,

    /**
     * @constructs
     */
    constructor: function constructor() {
      this._files = [];
      this.fileUploadOptions.maxFileSize = App.maxUploadFileSize;
    },
    /**
     * Checks the {@link crm.Application}'s maxFileSize to determine
     * if the file size being added exeeds this limit.
     * @param {Array}
     * @returns {Boolean}
     */
    isFileSizeAllowed: function isFileSizeAllowed(files) {
      var len = 0;
      var maxfileSize = this.fileUploadOptions.maxFileSize;

      for (var i = 0; i < files.length; i++) {
        if (files[i].size === 0) {// eslint-disable-line
          // do nothing.
        } else {
          len += files[i].size || files[i].blob.length;
        }
      }

      if (len > maxfileSize) {
        return false;
      }

      return true;
    },
    /**
     * Uploads a file to a URL.
     * @param {File} file
     * @param {String} url
     * @param {Function} progress Progress callback
     * @param {Event} progress.e
     * @param {Function} complete Complete callback
     * @param {Object} complete.request
     * @param {Function} error Error callback
     * @param {Function} error.errorText
     * @param {Object} scope
     * @param {Boolean} asPut
     */
    uploadFile: function uploadFile(file, url, progress, complete, error, scope, asPut) {
      this.uploadFileHTML5(file, url, progress, complete, error, scope, asPut);
    },
    uploadFileHTML5: function uploadFileHTML5(file, url, progress, complete, error, scope, asPut) {
      if (!this.isFileSizeAllowed([file])) {
        this._onUnableToUploadError(this.largeFileWarningText, error);
        return;
      }
      if (App.supportsFileAPI()) {
        this._uploadFileHTML5_asBinary(file, url, progress, complete, error, scope, asPut);
      } else {
        this._onUnableToUploadError(this.unableToUploadText, error);
      }
    },
    _uploadFileHTML5_asBinary: function _uploadFileHTML5_asBinary(file, _url, progress, complete, error, scope, asPut) {
      // eslint-disable-line
      var url = _url;
      var request = new XMLHttpRequest();
      var service = App.getService();
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      if (!url) {
        // assume Attachment SData url
        url = 'slxdata.ashx/slx/system/-/attachments/file'; // TODO: Remove this assumption from SDK
      }

      request.open(asPut ? 'PUT' : 'POST', url);
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      if (service) {
        request.setRequestHeader('Authorization', service.createBasicAuthToken());
        request.setRequestHeader('X-Authorization', service.createBasicAuthToken());
        request.setRequestHeader('X-Authorization-Mode', 'no-challenge');

        if (App.isMingleEnabled()) {
          var accessToken = App.mingleAuthResults.access_token;
          request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          request.setRequestHeader('X-Authorization', 'Bearer ' + accessToken);
        }
      }

      var reader = new FileReader();
      reader.onload = _lang2.default.hitch(this, function readerOnLoad(evt) {
        var unknownErrorText = this.unknownErrorText;
        var blobReader = new FileReader(); // read the blob as an ArrayBuffer to work around this android issue: https://code.google.com/p/android/issues/detail?id=39882
        var bb = void 0;
        var usingBlobBuilder = void 0;
        var blobData = void 0;

        try {
          bb = new Blob(); // This will throw an exception if it is not supported (android)
          bb = [];
        } catch (e) {
          bb = new window.BlobBuilder();
          usingBlobBuilder = true;
        }

        var binary = evt.target.result;
        var boundary = '---------------------------' + new Date().getTime();
        var dashdash = '--';
        var crlf = '\r\n';

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
          request.onreadystatechange = function onReadyStateChange() {
            if (request.readyState === 4) {
              if (Math.floor(request.status / 100) !== 2) {
                if (error) {
                  error.call(scope || this, unknownErrorText);
                  console.warn(unknownErrorText + ' ' + request.responseText); // eslint-disable-line
                }
              } else {
                complete.call(scope || this, request);
              }
            }
          };
        }

        if (progress) {
          request.upload.addEventListener('progress', function uploadProgress(e) {
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
        blobReader.onload = function blobReaderOnLoad(e) {
          request.send(e.target.result);
        };

        blobReader.readAsArrayBuffer(blobData);
      });

      reader.readAsArrayBuffer(file);
    },
    _append: function _append(arrayOrBlobBuilder, data) {
      if (arrayOrBlobBuilder && arrayOrBlobBuilder.constructor === Array) {
        arrayOrBlobBuilder.push(data);
      } else {
        arrayOrBlobBuilder.append(data);
      }
    },
    _onUnableToUploadError: function _onUnableToUploadError(_msg, onError) {
      var msg = _msg;
      if (!msg) {
        msg = this.unableToUploadText;
      }
      if (onError) {
        onError([msg]);
      } else {
        console.warn([msg]); // eslint-disable-line
      }
    },
    /**
     * Formats the file size formatted in KB.
     * @param {Number} size
     * @returns {String}
     */
    formatFileSize: function formatFileSize(_size) {
      var size = _size;
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
      return _number2.default.format(Math.round(size / 1024)) + ' KB';
    },
    /**
     * Loads a remote file.
     * @param {String} fileUrl
     * @param {String} responseType
     * @param {Function} onSuccess
     * @param {Object} onSuccess.responseInfo
     */
    getFile: function getFile(fileUrl, responseType, onSuccess) {
      var request = new XMLHttpRequest();
      var service = App.getService();
      request.open('GET', fileUrl, true);

      if (responseType) {
        request.responseType = responseType;
      }
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      if (service) {
        request.setRequestHeader('Authorization', service.createBasicAuthToken());
        request.setRequestHeader('X-Authorization', service.createBasicAuthToken());
        request.setRequestHeader('X-Authorization-Mode', 'no-challenge');

        if (App.isMingleEnabled()) {
          var accessToken = App.mingleAuthResults.access_token;
          request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          request.setRequestHeader('X-Authorization', 'Bearer ' + accessToken);
        }
      }

      request.addEventListener('load', function load() {
        var contentType = this.getResponseHeader('Content-Type');
        var contentInfo = this.getResponseHeader('Content-Disposition');
        var fileName = contentInfo.split('=')[1];
        var responseInfo = {
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9GaWxlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ1bmFibGVUb1VwbG9hZFRleHQiLCJ1bmtub3duU2l6ZVRleHQiLCJ1bmtub3duRXJyb3JUZXh0IiwibGFyZ2VGaWxlV2FybmluZ1RleHQiLCJsYXJnZUZpbGVXYXJuaW5nVGl0bGUiLCJwZXJjZW50Q29tcGxldGVUZXh0IiwiZmlsZVVwbG9hZE9wdGlvbnMiLCJtYXhGaWxlU2l6ZSIsIl9zdG9yZSIsIl90b3RhbFByb2dyZXNzIiwiX2ZpbGVzIiwiX2ZpbGVDb3VudCIsIl9maWxlc1VwbG9hZGVkQ291bnQiLCJfaXNVcGxvYWRpbmciLCJjb25zdHJ1Y3RvciIsIkFwcCIsIm1heFVwbG9hZEZpbGVTaXplIiwiaXNGaWxlU2l6ZUFsbG93ZWQiLCJmaWxlcyIsImxlbiIsIm1heGZpbGVTaXplIiwiaSIsImxlbmd0aCIsInNpemUiLCJibG9iIiwidXBsb2FkRmlsZSIsImZpbGUiLCJ1cmwiLCJwcm9ncmVzcyIsImNvbXBsZXRlIiwiZXJyb3IiLCJzY29wZSIsImFzUHV0IiwidXBsb2FkRmlsZUhUTUw1IiwiX29uVW5hYmxlVG9VcGxvYWRFcnJvciIsInN1cHBvcnRzRmlsZUFQSSIsIl91cGxvYWRGaWxlSFRNTDVfYXNCaW5hcnkiLCJfdXJsIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwic2VydmljZSIsImdldFNlcnZpY2UiLCJ3aW5kb3ciLCJCbG9iQnVpbGRlciIsIldlYktpdEJsb2JCdWlsZGVyIiwiTW96QmxvYkJ1aWxkZXIiLCJNU0Jsb2JCdWlsZGVyIiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJjcmVhdGVCYXNpY0F1dGhUb2tlbiIsImlzTWluZ2xlRW5hYmxlZCIsImFjY2Vzc1Rva2VuIiwibWluZ2xlQXV0aFJlc3VsdHMiLCJhY2Nlc3NfdG9rZW4iLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiaGl0Y2giLCJyZWFkZXJPbkxvYWQiLCJldnQiLCJibG9iUmVhZGVyIiwiYmIiLCJ1c2luZ0Jsb2JCdWlsZGVyIiwiYmxvYkRhdGEiLCJCbG9iIiwiZSIsImJpbmFyeSIsInRhcmdldCIsInJlc3VsdCIsImJvdW5kYXJ5IiwiRGF0ZSIsImdldFRpbWUiLCJkYXNoZGFzaCIsImNybGYiLCJfYXBwZW5kIiwiZW5jb2RlVVJJIiwibmFtZSIsInR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJvblJlYWR5U3RhdGVDaGFuZ2UiLCJyZWFkeVN0YXRlIiwiTWF0aCIsImZsb29yIiwic3RhdHVzIiwiY2FsbCIsImNvbnNvbGUiLCJ3YXJuIiwicmVzcG9uc2VUZXh0IiwidXBsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInVwbG9hZFByb2dyZXNzIiwiZ2V0QmxvYiIsImJsb2JSZWFkZXJPbkxvYWQiLCJzZW5kIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJhcnJheU9yQmxvYkJ1aWxkZXIiLCJkYXRhIiwiQXJyYXkiLCJwdXNoIiwiYXBwZW5kIiwiX21zZyIsIm9uRXJyb3IiLCJtc2ciLCJmb3JtYXRGaWxlU2l6ZSIsIl9zaXplIiwicGFyc2VJbnQiLCJmb3JtYXQiLCJyb3VuZCIsImdldEZpbGUiLCJmaWxlVXJsIiwicmVzcG9uc2VUeXBlIiwib25TdWNjZXNzIiwibG9hZCIsImNvbnRlbnRUeXBlIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJjb250ZW50SW5mbyIsImZpbGVOYW1lIiwic3BsaXQiLCJyZXNwb25zZUluZm8iLCJyZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxhQUFaLENBQWpCOztBQUVBOzs7QUFHQSxNQUFNQyxVQUFVLHVCQUFRLGlCQUFSLEVBQTJCLElBQTNCLEVBQWlDLDhCQUE4QjtBQUM3RUMsd0JBQW9CRixTQUFTRSxrQkFEZ0Q7QUFFN0VDLHFCQUFpQkgsU0FBU0csZUFGbUQ7QUFHN0VDLHNCQUFrQkosU0FBU0ksZ0JBSGtE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S0FkSDtBQWVBaEYsY0FBUXVELElBQVIsQ0FBYSxJQUFiO0FBQ0Q7QUFqUTRFLEdBQS9ELENBQWhCOztvQkFvUWU5RixPIiwiZmlsZSI6IkZpbGVNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGROdW1iZXIgZnJvbSAnZG9qby9udW1iZXInO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdmaWxlTWFuYWdlcicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uRmlsZU1hbmFnZXJcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uRmlsZU1hbmFnZXInLCBudWxsLCAvKiogQGxlbmRzIGNybS5GaWxlTWFuYWdlciMgKi97XHJcbiAgdW5hYmxlVG9VcGxvYWRUZXh0OiByZXNvdXJjZS51bmFibGVUb1VwbG9hZFRleHQsXHJcbiAgdW5rbm93blNpemVUZXh0OiByZXNvdXJjZS51bmtub3duU2l6ZVRleHQsXHJcbiAgdW5rbm93bkVycm9yVGV4dDogcmVzb3VyY2UudW5rbm93bkVycm9yVGV4dCxcclxuICBsYXJnZUZpbGVXYXJuaW5nVGV4dDogcmVzb3VyY2UubGFyZ2VGaWxlV2FybmluZ1RleHQsXHJcbiAgbGFyZ2VGaWxlV2FybmluZ1RpdGxlOiByZXNvdXJjZS5sYXJnZUZpbGVXYXJuaW5nVGl0bGUsXHJcbiAgcGVyY2VudENvbXBsZXRlVGV4dDogcmVzb3VyY2UucGVyY2VudENvbXBsZXRlVGV4dCxcclxuICBmaWxlVXBsb2FkT3B0aW9uczoge1xyXG4gICAgbWF4RmlsZVNpemU6IDQwMDAwMDAsXHJcbiAgfSxcclxuICBfc3RvcmU6IGZhbHNlLFxyXG4gIF90b3RhbFByb2dyZXNzOiAwLFxyXG4gIF9maWxlczogbnVsbCxcclxuICBfZmlsZUNvdW50OiAwLFxyXG4gIF9maWxlc1VwbG9hZGVkQ291bnQ6IDAsXHJcbiAgX2lzVXBsb2FkaW5nOiBmYWxzZSxcclxuXHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdHNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9maWxlcyA9IFtdO1xyXG4gICAgdGhpcy5maWxlVXBsb2FkT3B0aW9ucy5tYXhGaWxlU2l6ZSA9IEFwcC5tYXhVcGxvYWRGaWxlU2l6ZTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB0aGUge0BsaW5rIGNybS5BcHBsaWNhdGlvbn0ncyBtYXhGaWxlU2l6ZSB0byBkZXRlcm1pbmVcclxuICAgKiBpZiB0aGUgZmlsZSBzaXplIGJlaW5nIGFkZGVkIGV4ZWVkcyB0aGlzIGxpbWl0LlxyXG4gICAqIEBwYXJhbSB7QXJyYXl9XHJcbiAgICogQHJldHVybnMge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNGaWxlU2l6ZUFsbG93ZWQ6IGZ1bmN0aW9uIGlzRmlsZVNpemVBbGxvd2VkKGZpbGVzKSB7XHJcbiAgICBsZXQgbGVuID0gMDtcclxuICAgIGNvbnN0IG1heGZpbGVTaXplID0gdGhpcy5maWxlVXBsb2FkT3B0aW9ucy5tYXhGaWxlU2l6ZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChmaWxlc1tpXS5zaXplID09PSAwKSB7Ly8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIC8vIGRvIG5vdGhpbmcuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGVuICs9IGZpbGVzW2ldLnNpemUgfHwgZmlsZXNbaV0uYmxvYi5sZW5ndGg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAobGVuID4gKG1heGZpbGVTaXplKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBVcGxvYWRzIGEgZmlsZSB0byBhIFVSTC5cclxuICAgKiBAcGFyYW0ge0ZpbGV9IGZpbGVcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvZ3Jlc3MgUHJvZ3Jlc3MgY2FsbGJhY2tcclxuICAgKiBAcGFyYW0ge0V2ZW50fSBwcm9ncmVzcy5lXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGUgQ29tcGxldGUgY2FsbGJhY2tcclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29tcGxldGUucmVxdWVzdFxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yIEVycm9yIGNhbGxiYWNrXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3IuZXJyb3JUZXh0XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXHJcbiAgICogQHBhcmFtIHtCb29sZWFufSBhc1B1dFxyXG4gICAqL1xyXG4gIHVwbG9hZEZpbGU6IGZ1bmN0aW9uIHVwbG9hZEZpbGUoZmlsZSwgdXJsLCBwcm9ncmVzcywgY29tcGxldGUsIGVycm9yLCBzY29wZSwgYXNQdXQpIHtcclxuICAgIHRoaXMudXBsb2FkRmlsZUhUTUw1KGZpbGUsIHVybCwgcHJvZ3Jlc3MsIGNvbXBsZXRlLCBlcnJvciwgc2NvcGUsIGFzUHV0KTtcclxuICB9LFxyXG4gIHVwbG9hZEZpbGVIVE1MNTogZnVuY3Rpb24gdXBsb2FkRmlsZUhUTUw1KGZpbGUsIHVybCwgcHJvZ3Jlc3MsIGNvbXBsZXRlLCBlcnJvciwgc2NvcGUsIGFzUHV0KSB7XHJcbiAgICBpZiAoIXRoaXMuaXNGaWxlU2l6ZUFsbG93ZWQoW2ZpbGVdKSkge1xyXG4gICAgICB0aGlzLl9vblVuYWJsZVRvVXBsb2FkRXJyb3IodGhpcy5sYXJnZUZpbGVXYXJuaW5nVGV4dCwgZXJyb3IpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoQXBwLnN1cHBvcnRzRmlsZUFQSSgpKSB7XHJcbiAgICAgIHRoaXMuX3VwbG9hZEZpbGVIVE1MNV9hc0JpbmFyeShmaWxlLCB1cmwsIHByb2dyZXNzLCBjb21wbGV0ZSwgZXJyb3IsIHNjb3BlLCBhc1B1dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9vblVuYWJsZVRvVXBsb2FkRXJyb3IodGhpcy51bmFibGVUb1VwbG9hZFRleHQsIGVycm9yKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF91cGxvYWRGaWxlSFRNTDVfYXNCaW5hcnk6IGZ1bmN0aW9uIF91cGxvYWRGaWxlSFRNTDVfYXNCaW5hcnkoZmlsZSwgX3VybCwgcHJvZ3Jlc3MsIGNvbXBsZXRlLCBlcnJvciwgc2NvcGUsIGFzUHV0KSB7Ly8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgbGV0IHVybCA9IF91cmw7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBwLmdldFNlcnZpY2UoKTtcclxuICAgIHdpbmRvdy5CbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fFxyXG4gICAgICB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHxcclxuICAgICAgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8XHJcbiAgICAgIHdpbmRvdy5NU0Jsb2JCdWlsZGVyO1xyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgLy8gYXNzdW1lIEF0dGFjaG1lbnQgU0RhdGEgdXJsXHJcbiAgICAgIHVybCA9ICdzbHhkYXRhLmFzaHgvc2x4L3N5c3RlbS8tL2F0dGFjaG1lbnRzL2ZpbGUnOyAvLyBUT0RPOiBSZW1vdmUgdGhpcyBhc3N1bXB0aW9uIGZyb20gU0RLXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdC5vcGVuKChhc1B1dCkgPyAnUFVUJyA6ICdQT1NUJywgdXJsKTtcclxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xyXG5cclxuICAgIGlmIChzZXJ2aWNlKSB7XHJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIHNlcnZpY2UuY3JlYXRlQmFzaWNBdXRoVG9rZW4oKSk7XHJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1BdXRob3JpemF0aW9uJywgc2VydmljZS5jcmVhdGVCYXNpY0F1dGhUb2tlbigpKTtcclxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGhvcml6YXRpb24tTW9kZScsICduby1jaGFsbGVuZ2UnKTtcclxuXHJcbiAgICAgIGlmIChBcHAuaXNNaW5nbGVFbmFibGVkKCkpIHtcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IEFwcC5taW5nbGVBdXRoUmVzdWx0cy5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke2FjY2Vzc1Rva2VufWApO1xyXG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1BdXRob3JpemF0aW9uJywgYEJlYXJlciAke2FjY2Vzc1Rva2VufWApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIHJlYWRlci5vbmxvYWQgPSBsYW5nLmhpdGNoKHRoaXMsIGZ1bmN0aW9uIHJlYWRlck9uTG9hZChldnQpIHtcclxuICAgICAgY29uc3QgdW5rbm93bkVycm9yVGV4dCA9IHRoaXMudW5rbm93bkVycm9yVGV4dDtcclxuICAgICAgY29uc3QgYmxvYlJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7IC8vIHJlYWQgdGhlIGJsb2IgYXMgYW4gQXJyYXlCdWZmZXIgdG8gd29yayBhcm91bmQgdGhpcyBhbmRyb2lkIGlzc3VlOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2FuZHJvaWQvaXNzdWVzL2RldGFpbD9pZD0zOTg4MlxyXG4gICAgICBsZXQgYmI7XHJcbiAgICAgIGxldCB1c2luZ0Jsb2JCdWlsZGVyO1xyXG4gICAgICBsZXQgYmxvYkRhdGE7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGJiID0gbmV3IEJsb2IoKTsgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBpdCBpcyBub3Qgc3VwcG9ydGVkIChhbmRyb2lkKVxyXG4gICAgICAgIGJiID0gW107XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBiYiA9IG5ldyB3aW5kb3cuQmxvYkJ1aWxkZXIoKTtcclxuICAgICAgICB1c2luZ0Jsb2JCdWlsZGVyID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYmluYXJ5ID0gZXZ0LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgIGNvbnN0IGJvdW5kYXJ5ID0gYC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSR7KG5ldyBEYXRlKCkpLmdldFRpbWUoKX1gO1xyXG4gICAgICBjb25zdCBkYXNoZGFzaCA9ICctLSc7XHJcbiAgICAgIGNvbnN0IGNybGYgPSAnXFxyXFxuJztcclxuXHJcbiAgICAgIHRoaXMuX2FwcGVuZChiYiwgZGFzaGRhc2ggKyBib3VuZGFyeSArIGNybGYpO1xyXG4gICAgICB0aGlzLl9hcHBlbmQoYmIsICdDb250ZW50LURpc3Bvc2l0aW9uOiBhdHRhY2htZW50OyAnKTtcclxuICAgICAgdGhpcy5fYXBwZW5kKGJiLCAnbmFtZT1cImZpbGVfXCI7ICcpO1xyXG4gICAgICB0aGlzLl9hcHBlbmQoYmIsIGBmaWxlbmFtZSo9XCIke2VuY29kZVVSSShmaWxlLm5hbWUpfVwiIGApO1xyXG4gICAgICB0aGlzLl9hcHBlbmQoYmIsIGNybGYpO1xyXG4gICAgICB0aGlzLl9hcHBlbmQoYmIsIGBDb250ZW50LVR5cGU6ICR7ZmlsZS50eXBlfWApO1xyXG4gICAgICB0aGlzLl9hcHBlbmQoYmIsIGNybGYgKyBjcmxmKTtcclxuICAgICAgdGhpcy5fYXBwZW5kKGJiLCBiaW5hcnkpO1xyXG4gICAgICB0aGlzLl9hcHBlbmQoYmIsIGNybGYpO1xyXG4gICAgICB0aGlzLl9hcHBlbmQoYmIsIGRhc2hkYXNoICsgYm91bmRhcnkgKyBkYXNoZGFzaCArIGNybGYpO1xyXG5cclxuICAgICAgaWYgKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBvblJlYWR5U3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHJlcXVlc3Quc3RhdHVzIC8gMTAwKSAhPT0gMikge1xyXG4gICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuY2FsbChzY29wZSB8fCB0aGlzLCB1bmtub3duRXJyb3JUZXh0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybih1bmtub3duRXJyb3JUZXh0ICsgJyAnICsgcmVxdWVzdC5yZXNwb25zZVRleHQpOy8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29tcGxldGUuY2FsbChzY29wZSB8fCB0aGlzLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9ncmVzcykge1xyXG4gICAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24gdXBsb2FkUHJvZ3Jlc3MoZSkge1xyXG4gICAgICAgICAgcHJvZ3Jlc3MuY2FsbChzY29wZSB8fCB0aGlzLCBlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBgbXVsdGlwYXJ0L2F0dGFjaG1lbnQ7IGJvdW5kYXJ5PSR7Ym91bmRhcnl9YCk7XHJcblxyXG4gICAgICBpZiAodXNpbmdCbG9iQnVpbGRlcikge1xyXG4gICAgICAgIGJsb2JEYXRhID0gYmIuZ2V0QmxvYihmaWxlLnR5cGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJsb2JEYXRhID0gbmV3IEJsb2IoYmIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZWFkIHRoZSBibG9iIGJhY2sgYXMgYW4gQXJyYXlCdWZmZXIgdG8gd29yayBhcm91bmQgdGhpcyBhbmRyb2lkIGlzc3VlOlxyXG4gICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2FuZHJvaWQvaXNzdWVzL2RldGFpbD9pZD0zOTg4MlxyXG4gICAgICBibG9iUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIGJsb2JSZWFkZXJPbkxvYWQoZSkge1xyXG4gICAgICAgIHJlcXVlc3Quc2VuZChlLnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgYmxvYlJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iRGF0YSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XHJcbiAgfSxcclxuICBfYXBwZW5kOiBmdW5jdGlvbiBfYXBwZW5kKGFycmF5T3JCbG9iQnVpbGRlciwgZGF0YSkge1xyXG4gICAgaWYgKGFycmF5T3JCbG9iQnVpbGRlciAmJiBhcnJheU9yQmxvYkJ1aWxkZXIuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcbiAgICAgIGFycmF5T3JCbG9iQnVpbGRlci5wdXNoKGRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyYXlPckJsb2JCdWlsZGVyLmFwcGVuZChkYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vblVuYWJsZVRvVXBsb2FkRXJyb3I6IGZ1bmN0aW9uIF9vblVuYWJsZVRvVXBsb2FkRXJyb3IoX21zZywgb25FcnJvcikge1xyXG4gICAgbGV0IG1zZyA9IF9tc2c7XHJcbiAgICBpZiAoIW1zZykge1xyXG4gICAgICBtc2cgPSB0aGlzLnVuYWJsZVRvVXBsb2FkVGV4dDtcclxuICAgIH1cclxuICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgIG9uRXJyb3IoW21zZ10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKFttc2ddKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyB0aGUgZmlsZSBzaXplIGZvcm1hdHRlZCBpbiBLQi5cclxuICAgKiBAcGFyYW0ge051bWJlcn0gc2l6ZVxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICovXHJcbiAgZm9ybWF0RmlsZVNpemU6IGZ1bmN0aW9uIGZvcm1hdEZpbGVTaXplKF9zaXplKSB7XHJcbiAgICBsZXQgc2l6ZSA9IF9zaXplO1xyXG4gICAgc2l6ZSA9IHBhcnNlSW50KHNpemUsIDEwKTtcclxuICAgIGlmIChzaXplID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAnMCBLQic7XHJcbiAgICB9XHJcbiAgICBpZiAoIXNpemUgfHwgc2l6ZSA8IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMudW5rbm93blNpemVUZXh0O1xyXG4gICAgfVxyXG4gICAgaWYgKHNpemUgPCAxMDI0KSB7XHJcbiAgICAgIHJldHVybiAnMSBLQic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYCR7ZE51bWJlci5mb3JtYXQoTWF0aC5yb3VuZChzaXplIC8gMTAyNCkpfSBLQmA7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBMb2FkcyBhIHJlbW90ZSBmaWxlLlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlVXJsXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlc3BvbnNlVHlwZVxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uU3VjY2Vzc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvblN1Y2Nlc3MucmVzcG9uc2VJbmZvXHJcbiAgICovXHJcbiAgZ2V0RmlsZTogZnVuY3Rpb24gZ2V0RmlsZShmaWxlVXJsLCByZXNwb25zZVR5cGUsIG9uU3VjY2Vzcykge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwcC5nZXRTZXJ2aWNlKCk7XHJcbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIGZpbGVVcmwsIHRydWUpO1xyXG5cclxuICAgIGlmIChyZXNwb25zZVR5cGUpIHtcclxuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcclxuXHJcbiAgICBpZiAoc2VydmljZSkge1xyXG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBzZXJ2aWNlLmNyZWF0ZUJhc2ljQXV0aFRva2VuKCkpO1xyXG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aG9yaXphdGlvbicsIHNlcnZpY2UuY3JlYXRlQmFzaWNBdXRoVG9rZW4oKSk7XHJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1BdXRob3JpemF0aW9uLU1vZGUnLCAnbm8tY2hhbGxlbmdlJyk7XHJcblxyXG4gICAgICBpZiAoQXBwLmlzTWluZ2xlRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBBcHAubWluZ2xlQXV0aFJlc3VsdHMuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gKTtcclxuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ1gtQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIGxvYWQoKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gdGhpcy5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRJbmZvID0gdGhpcy5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1EaXNwb3NpdGlvbicpO1xyXG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGNvbnRlbnRJbmZvLnNwbGl0KCc9JylbMV07XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlSW5mbyA9IHtcclxuICAgICAgICByZXF1ZXN0OiB0aGlzLFxyXG4gICAgICAgIHJlc3BvbnNlVHlwZSxcclxuICAgICAgICByZXNwb25zZTogdGhpcy5yZXNwb25zZSxcclxuICAgICAgICBjb250ZW50VHlwZSxcclxuICAgICAgICBmaWxlTmFtZSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKG9uU3VjY2Vzcykge1xyXG4gICAgICAgIG9uU3VjY2VzcyhyZXNwb25zZUluZm8pO1xyXG4gICAgICB9XHJcbiAgICB9LCBmYWxzZSk7XHJcbiAgICByZXF1ZXN0LnNlbmQobnVsbCk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=