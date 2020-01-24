define('crm/Views/Attachment/List', ['module', 'exports', 'dojo/_base/declare', '../../Utility', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/Convert', '../_RightDrawerListMixin', 'argos/I18n', 'dojo/string', '../../Format'], function (module, exports, _declare, _Utility, _List, _LegacySDataListMixin2, _Convert, _RightDrawerListMixin2, _I18n, _string, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _List2 = _interopRequireDefault(_List);

  var _LegacySDataListMixin3 = _interopRequireDefault(_LegacySDataListMixin2);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _string2 = _interopRequireDefault(_string);

  var _Format2 = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('attachmentList'); /* Copyright 2017 Infor
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

  var hashTagResource = (0, _I18n2.default)('attachmentListHashTags');
  var dtFormatResource = (0, _I18n2.default)('attachmentListDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.Attachment.List', [_List2.default, _RightDrawerListMixin3.default, _LegacySDataListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['{% if ($.dataType === "R") { %}', '{%! $$.fileTemplate %}', '{% } else { %}', '{%! $$.urlTemplate %}', '{% } %}']),
    fileTemplate: new Simplate(['{% if ($.attachDate) { %}', '<p class="micro-text"><span>({%: $$.buildUploadedText($.attachDate) %})</span></p>', '{% } %}', '<p class="micro-text"><span>{%: crm.Format.fileSize($.fileSize) %}</span></p>', '<p class="micro-text"><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></p>', '{% if($.user) { %}', '<p class="micro-text"><span>{%: $.user.$descriptor  %}</span></p>', '{% } %}']),
    urlTemplate: new Simplate(['{% if ($.attachDate) { %}', '<p class="micro-text"><span>({%: $$.buildUploadedText($.attachDate) %})&nbsp;</span></p>', '{% } %}', '<p class="micro-text"><span>{%: $.url %}&nbsp;</span></p>', '{% if($.user) { %}', '<p class="micro-text"><span>{%: $.user.$descriptor  %}</span></p>', '{% } %}']),

    // Localization
    titleText: resource.titleText,
    attachmentTimeFormatText: dtFormatResource.attachmentTimeFormatText,
    attachmentTimeFormatText24: dtFormatResource.attachmentTimeFormatText24,
    uploadedOnText: resource.uploadedOnText, // Uploaded 10 days ago
    touchedText: resource.touchedText,

    // View Properties
    id: 'attachment_list',
    security: null,
    enableActions: true,
    detailView: 'view_attachment',
    insertView: 'attachment_Add',
    iconClass: 'attach',
    queryOrderBy: 'attachDate desc',
    querySelect: ['description', 'user', 'createUser', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType', 'ModifyDate'],
    resourceKind: 'attachments',
    contractName: 'system',
    queryInclude: ['$descriptors', '$permissions'],

    hashTagQueries: {
      url: "(fileName like '%.URL')",
      binary: "(fileName not like '%.URL')"
    },
    hashTagQueriesText: {
      url: hashTagResource.hashTagUrlText,
      binary: hashTagResource.hashTagBinaryText
    },
    createToolLayout: function createToolLayout() {
      if (!App.supportsFileAPI()) {
        this.insertView = null;
      } else {
        return this.inherited(createToolLayout, arguments);
      }
    },
    createRequest: function createRequest() {
      var request = this.inherited(createRequest, arguments);
      request.setQueryArg('_includeFile', 'false');
      return request;
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(description) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    },
    getLink: function getLink(attachment) {
      var toReturn = void 0;
      if (attachment.url) {
        var href = attachment.url || '';
        href = href.indexOf('http') < 0 ? 'http://' + href : href;
        toReturn = '<a class="hyperlink" href="' + href + '" target="_blank" title="' + attachment.url + '">' + attachment.$descriptor + '</a>';
      } else {
        if (attachment.fileExists) {
          toReturn = '<a class="hyperlink" href="javascript: Sage.Utility.File.Attachment.getAttachment(\'' + attachment.$key + '\');" title="' + attachment.$descriptor + '">' + attachment.$descriptor + '</a>';
        } else {
          toReturn = attachment.$descriptor;
        }
      }
      return toReturn;
    },
    itemIconClass: 'document',
    fileIconByType: {
      xls: 'spreadsheet',
      xlsx: 'spreadsheet',
      doc: 'special-item',
      docx: 'special-item',
      ppt: 'display',
      pptx: 'display',
      txt: 'document2',
      rtf: 'document2',
      csv: 'document2',
      pdf: 'pdf-file',
      zip: 'document', // TODO: convert to soho icon
      png: 'overlay-line',
      jpg: 'overlay-line',
      gif: 'overlay-line',
      bmp: 'overlay-line'
    },
    getItemIconClass: function getItemIconClass(entry) {
      var fileName = entry && entry.fileName;
      var type = _Utility2.default.getFileExtension(fileName);
      var cls = this.itemIconClass;
      if (type) {
        type = type.substr(1); // Remove the '.' from the ext.
        var typeCls = this.fileIconByType[type];
        if (typeCls) {
          cls = typeCls;
        }
      }
      return cls;
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'touched',
        cls: 'flag',
        title: this.touchedText,
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasBeenTouched(entry);
        }
      }]);
    },
    hasBeenTouched: function hasBeenTouched(entry) {
      if (entry.modifyDate) {
        var modifiedDate = moment(_Convert2.default.toDateFromString(entry.modifyDate));
        var currentDate = moment().endOf('day');
        var weekAgo = moment().subtract(1, 'weeks');

        return modifiedDate.isAfter(weekAgo) && modifiedDate.isBefore(currentDate);
      }
      return false;
    },
    buildUploadedText: function buildUploadedText(date) {
      var modifiedDate = moment(date).toDate();
      return _string2.default.substitute(this.uploadedOnText, [_Format2.default.date(modifiedDate), _Format2.default.date(modifiedDate, App.is24HourClock() ? this.attachmentTimeFormatText24 : this.attachmentTimeFormatText)]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});