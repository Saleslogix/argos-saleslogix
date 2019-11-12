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

  /**
   * @class crm.Views.Attachments.List
   *
   * @extends argos.List
   * @mixins argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins argos._LegacySDataListMixin
   *
   * @requires argos.List
   * @requires argos._LegacySDataListMixin
   * @requires argos.Convert
   *
   * @requires crm.Format
   * @requires crm.Views._RightDrawerListMixin
   *
   * @requires moment
   *
   * @requires string
   */
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
        return this.inherited(arguments);
      }
    },
    createRequest: function createRequest() {
      var request = this.inherited(arguments);
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
        label: this.touchedText,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BdHRhY2htZW50L0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJoYXNoVGFnUmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwiZmlsZVRlbXBsYXRlIiwidXJsVGVtcGxhdGUiLCJ0aXRsZVRleHQiLCJhdHRhY2htZW50VGltZUZvcm1hdFRleHQiLCJhdHRhY2htZW50VGltZUZvcm1hdFRleHQyNCIsInVwbG9hZGVkT25UZXh0IiwidG91Y2hlZFRleHQiLCJpZCIsInNlY3VyaXR5IiwiZW5hYmxlQWN0aW9ucyIsImRldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwiaWNvbkNsYXNzIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJxdWVyeUluY2x1ZGUiLCJoYXNoVGFnUXVlcmllcyIsInVybCIsImJpbmFyeSIsImhhc2hUYWdRdWVyaWVzVGV4dCIsImhhc2hUYWdVcmxUZXh0IiwiaGFzaFRhZ0JpbmFyeVRleHQiLCJjcmVhdGVUb29sTGF5b3V0IiwiQXBwIiwic3VwcG9ydHNGaWxlQVBJIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY3JlYXRlUmVxdWVzdCIsInJlcXVlc3QiLCJzZXRRdWVyeUFyZyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJlc2NhcGVTZWFyY2hRdWVyeSIsInRvVXBwZXJDYXNlIiwiZ2V0TGluayIsImF0dGFjaG1lbnQiLCJ0b1JldHVybiIsImhyZWYiLCJpbmRleE9mIiwiJGRlc2NyaXB0b3IiLCJmaWxlRXhpc3RzIiwiJGtleSIsIml0ZW1JY29uQ2xhc3MiLCJmaWxlSWNvbkJ5VHlwZSIsInhscyIsInhsc3giLCJkb2MiLCJkb2N4IiwicHB0IiwicHB0eCIsInR4dCIsInJ0ZiIsImNzdiIsInBkZiIsInppcCIsInBuZyIsImpwZyIsImdpZiIsImJtcCIsImdldEl0ZW1JY29uQ2xhc3MiLCJlbnRyeSIsImZpbGVOYW1lIiwidHlwZSIsImdldEZpbGVFeHRlbnNpb24iLCJjbHMiLCJzdWJzdHIiLCJ0eXBlQ2xzIiwiY3JlYXRlSW5kaWNhdG9yTGF5b3V0IiwiaXRlbUluZGljYXRvcnMiLCJsYWJlbCIsIm9uQXBwbHkiLCJwYXJlbnQiLCJpc0VuYWJsZWQiLCJoYXNCZWVuVG91Y2hlZCIsIm1vZGlmeURhdGUiLCJtb2RpZmllZERhdGUiLCJtb21lbnQiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiY3VycmVudERhdGUiLCJlbmRPZiIsIndlZWtBZ28iLCJzdWJ0cmFjdCIsImlzQWZ0ZXIiLCJpc0JlZm9yZSIsImJ1aWxkVXBsb2FkZWRUZXh0IiwiZGF0ZSIsInRvRGF0ZSIsInN1YnN0aXR1dGUiLCJpczI0SG91ckNsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxXQUFXLG9CQUFZLGdCQUFaLENBQWpCLEMsQ0ExQkE7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQyxrQkFBa0Isb0JBQVksd0JBQVosQ0FBeEI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksOEJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUMsVUFBVSx1QkFBUSwyQkFBUixFQUFxQyxnRkFBckMsRUFBMkY7QUFDekc7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLGlDQUR5QixFQUV6Qix3QkFGeUIsRUFHekIsZ0JBSHlCLEVBSXpCLHVCQUp5QixFQUt6QixTQUx5QixDQUFiLENBRjJGO0FBU3pHQyxrQkFBYyxJQUFJRCxRQUFKLENBQWEsQ0FDekIsMkJBRHlCLEVBRXpCLG9GQUZ5QixFQUd6QixTQUh5QixFQUl6QiwrRUFKeUIsRUFLekIseUZBTHlCLEVBTXpCLG9CQU55QixFQU96QixtRUFQeUIsRUFRekIsU0FSeUIsQ0FBYixDQVQyRjtBQW1CekdFLGlCQUFhLElBQUlGLFFBQUosQ0FBYSxDQUN4QiwyQkFEd0IsRUFFeEIsMEZBRndCLEVBR3hCLFNBSHdCLEVBSXhCLDJEQUp3QixFQUt4QixvQkFMd0IsRUFNeEIsbUVBTndCLEVBT3hCLFNBUHdCLENBQWIsQ0FuQjRGOztBQTZCekc7QUFDQUcsZUFBV1IsU0FBU1EsU0E5QnFGO0FBK0J6R0MsOEJBQTBCUCxpQkFBaUJPLHdCQS9COEQ7QUFnQ3pHQyxnQ0FBNEJSLGlCQUFpQlEsMEJBaEM0RDtBQWlDekdDLG9CQUFnQlgsU0FBU1csY0FqQ2dGLEVBaUNoRTtBQUN6Q0MsaUJBQWFaLFNBQVNZLFdBbENtRjs7QUFvQ3pHO0FBQ0FDLFFBQUksaUJBckNxRztBQXNDekdDLGNBQVUsSUF0QytGO0FBdUN6R0MsbUJBQWUsSUF2QzBGO0FBd0N6R0MsZ0JBQVksaUJBeEM2RjtBQXlDekdDLGdCQUFZLGdCQXpDNkY7QUEwQ3pHQyxlQUFXLFFBMUM4RjtBQTJDekdDLGtCQUFjLGlCQTNDMkY7QUE0Q3pHQyxpQkFBYSxDQUNYLGFBRFcsRUFFWCxNQUZXLEVBR1gsWUFIVyxFQUlYLFlBSlcsRUFLWCxVQUxXLEVBTVgsVUFOVyxFQU9YLEtBUFcsRUFRWCxZQVJXLEVBU1gsY0FUVyxFQVVYLFVBVlcsRUFXWCxZQVhXLENBNUM0RjtBQXlEekdDLGtCQUFjLGFBekQyRjtBQTBEekdDLGtCQUFjLFFBMUQyRjtBQTJEekdDLGtCQUFjLENBQ1osY0FEWSxFQUVaLGNBRlksQ0EzRDJGOztBQWdFekdDLG9CQUFnQjtBQUNkQyxXQUFLLHlCQURTO0FBRWRDLGNBQVE7QUFGTSxLQWhFeUY7QUFvRXpHQyx3QkFBb0I7QUFDbEJGLFdBQUt4QixnQkFBZ0IyQixjQURIO0FBRWxCRixjQUFRekIsZ0JBQWdCNEI7QUFGTixLQXBFcUY7QUF3RXpHQyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsVUFBSSxDQUFDQyxJQUFJQyxlQUFKLEVBQUwsRUFBNEI7QUFDMUIsYUFBS2YsVUFBTCxHQUFrQixJQUFsQjtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sS0FBS2dCLFNBQUwsQ0FBZUMsU0FBZixDQUFQO0FBQ0Q7QUFDRixLQTlFd0c7QUErRXpHQyxtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQU1DLFVBQVUsS0FBS0gsU0FBTCxDQUFlQyxTQUFmLENBQWhCO0FBQ0FFLGNBQVFDLFdBQVIsQ0FBb0IsY0FBcEIsRUFBb0MsT0FBcEM7QUFDQSxhQUFPRCxPQUFQO0FBQ0QsS0FuRndHO0FBb0Z6R0UsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCw0Q0FBb0MsS0FBS0MsaUJBQUwsQ0FBdUJELFlBQVlFLFdBQVosRUFBdkIsQ0FBcEM7QUFDRCxLQXRGd0c7QUF1RnpHQyxhQUFTLFNBQVNBLE9BQVQsQ0FBaUJDLFVBQWpCLEVBQTZCO0FBQ3BDLFVBQUlDLGlCQUFKO0FBQ0EsVUFBSUQsV0FBV2xCLEdBQWYsRUFBb0I7QUFDbEIsWUFBSW9CLE9BQU9GLFdBQVdsQixHQUFYLElBQWtCLEVBQTdCO0FBQ0FvQixlQUFRQSxLQUFLQyxPQUFMLENBQWEsTUFBYixJQUF1QixDQUF4QixlQUF1Q0QsSUFBdkMsR0FBZ0RBLElBQXZEO0FBQ0FELG1EQUF5Q0MsSUFBekMsaUNBQXlFRixXQUFXbEIsR0FBcEYsVUFBNEZrQixXQUFXSSxXQUF2RztBQUNELE9BSkQsTUFJTztBQUNMLFlBQUlKLFdBQVdLLFVBQWYsRUFBMkI7QUFDekJKLDhHQUFpR0QsV0FBV00sSUFBNUcscUJBQStITixXQUFXSSxXQUExSSxVQUEwSkosV0FBV0ksV0FBcks7QUFDRCxTQUZELE1BRU87QUFDTEgscUJBQVdELFdBQVdJLFdBQXRCO0FBQ0Q7QUFDRjtBQUNELGFBQU9ILFFBQVA7QUFDRCxLQXJHd0c7QUFzR3pHTSxtQkFBZSxVQXRHMEY7QUF1R3pHQyxvQkFBZ0I7QUFDZEMsV0FBSyxhQURTO0FBRWRDLFlBQU0sYUFGUTtBQUdkQyxXQUFLLGNBSFM7QUFJZEMsWUFBTSxjQUpRO0FBS2RDLFdBQUssU0FMUztBQU1kQyxZQUFNLFNBTlE7QUFPZEMsV0FBSyxXQVBTO0FBUWRDLFdBQUssV0FSUztBQVNkQyxXQUFLLFdBVFM7QUFVZEMsV0FBSyxVQVZTO0FBV2RDLFdBQUssVUFYUyxFQVdHO0FBQ2pCQyxXQUFLLGNBWlM7QUFhZEMsV0FBSyxjQWJTO0FBY2RDLFdBQUssY0FkUztBQWVkQyxXQUFLO0FBZlMsS0F2R3lGO0FBd0h6R0Msc0JBQWtCLFNBQVNBLGdCQUFULENBQTBCQyxLQUExQixFQUFpQztBQUNqRCxVQUFNQyxXQUFXRCxTQUFTQSxNQUFNQyxRQUFoQztBQUNBLFVBQUlDLE9BQU8sa0JBQVFDLGdCQUFSLENBQXlCRixRQUF6QixDQUFYO0FBQ0EsVUFBSUcsTUFBTSxLQUFLdEIsYUFBZjtBQUNBLFVBQUlvQixJQUFKLEVBQVU7QUFDUkEsZUFBT0EsS0FBS0csTUFBTCxDQUFZLENBQVosQ0FBUCxDQURRLENBQ2U7QUFDdkIsWUFBTUMsVUFBVSxLQUFLdkIsY0FBTCxDQUFvQm1CLElBQXBCLENBQWhCO0FBQ0EsWUFBSUksT0FBSixFQUFhO0FBQ1hGLGdCQUFNRSxPQUFOO0FBQ0Q7QUFDRjtBQUNELGFBQU9GLEdBQVA7QUFDRCxLQXBJd0c7QUFxSXpHRywyQkFBdUIsU0FBU0EscUJBQVQsR0FBaUM7QUFDdEQsYUFBTyxLQUFLQyxjQUFMLEtBQXdCLEtBQUtBLGNBQUwsR0FBc0IsQ0FBQztBQUNwRC9ELFlBQUksU0FEZ0Q7QUFFcEQyRCxhQUFLLE1BRitDO0FBR3BESyxlQUFPLEtBQUtqRSxXQUh3QztBQUlwRGtFLGlCQUFTLFNBQVNBLE9BQVQsQ0FBaUJWLEtBQWpCLEVBQXdCVyxNQUF4QixFQUFnQztBQUN2QyxlQUFLQyxTQUFMLEdBQWlCRCxPQUFPRSxjQUFQLENBQXNCYixLQUF0QixDQUFqQjtBQUNEO0FBTm1ELE9BQUQsQ0FBOUMsQ0FBUDtBQVFELEtBOUl3RztBQStJekdhLG9CQUFnQixTQUFTQSxjQUFULENBQXdCYixLQUF4QixFQUErQjtBQUM3QyxVQUFJQSxNQUFNYyxVQUFWLEVBQXNCO0FBQ3BCLFlBQU1DLGVBQWVDLE9BQU8sa0JBQVFDLGdCQUFSLENBQXlCakIsTUFBTWMsVUFBL0IsQ0FBUCxDQUFyQjtBQUNBLFlBQU1JLGNBQWNGLFNBQVNHLEtBQVQsQ0FBZSxLQUFmLENBQXBCO0FBQ0EsWUFBTUMsVUFBVUosU0FBU0ssUUFBVCxDQUFrQixDQUFsQixFQUFxQixPQUFyQixDQUFoQjs7QUFFQSxlQUFPTixhQUFhTyxPQUFiLENBQXFCRixPQUFyQixLQUNMTCxhQUFhUSxRQUFiLENBQXNCTCxXQUF0QixDQURGO0FBRUQ7QUFDRCxhQUFPLEtBQVA7QUFDRCxLQXpKd0c7QUEwSnpHTSx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJDLElBQTNCLEVBQWlDO0FBQ2xELFVBQU1WLGVBQWVDLE9BQU9TLElBQVAsRUFBYUMsTUFBYixFQUFyQjtBQUNBLGFBQU8saUJBQU9DLFVBQVAsQ0FBa0IsS0FBS3BGLGNBQXZCLEVBQXVDLENBQUMsaUJBQU9rRixJQUFQLENBQVlWLFlBQVosQ0FBRCxFQUM1QyxpQkFBT1UsSUFBUCxDQUFZVixZQUFaLEVBQTBCcEQsSUFBSWlFLGFBQUosS0FBc0IsS0FBS3RGLDBCQUEzQixHQUF3RCxLQUFLRCx3QkFBdkYsQ0FENEMsQ0FBdkMsQ0FBUDtBQUVEO0FBOUp3RyxHQUEzRixDQUFoQjs7b0JBaUtlTixPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfTGVnYWN5U0RhdGFMaXN0TWl4aW4gZnJvbSAnYXJnb3MvX0xlZ2FjeVNEYXRhTGlzdE1peGluJztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBfUmlnaHREcmF3ZXJMaXN0TWl4aW4gZnJvbSAnLi4vX1JpZ2h0RHJhd2VyTGlzdE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2F0dGFjaG1lbnRMaXN0Jyk7XHJcbmNvbnN0IGhhc2hUYWdSZXNvdXJjZSA9IGdldFJlc291cmNlKCdhdHRhY2htZW50TGlzdEhhc2hUYWdzJyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYXR0YWNobWVudExpc3REYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQXR0YWNobWVudHMuTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGNybS5WaWV3cy5fUmlnaHREcmF3ZXJMaXN0TWl4aW5cclxuICogQG1peGlucyBhcmdvcy5fTGVnYWN5U0RhdGFMaXN0TWl4aW5cclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkxpc3RcclxuICogQHJlcXVpcmVzIGFyZ29zLl9MZWdhY3lTRGF0YUxpc3RNaXhpblxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZpZXdzLl9SaWdodERyYXdlckxpc3RNaXhpblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBzdHJpbmdcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQXR0YWNobWVudC5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX0xlZ2FjeVNEYXRhTGlzdE1peGluXSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5kYXRhVHlwZSA9PT0gXCJSXCIpIHsgJX0nLFxyXG4gICAgJ3slISAkJC5maWxlVGVtcGxhdGUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JSEgJCQudXJsVGVtcGxhdGUgJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIGZpbGVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5hdHRhY2hEYXRlKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj48c3Bhbj4oeyU6ICQkLmJ1aWxkVXBsb2FkZWRUZXh0KCQuYXR0YWNoRGF0ZSkgJX0pPC9zcGFuPjwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuPnslOiBjcm0uRm9ybWF0LmZpbGVTaXplKCQuZmlsZVNpemUpICV9PC9zcGFuPjwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuPnslOiBjcm0uVXRpbGl0eS5nZXRGaWxlRXh0ZW5zaW9uKCQuZmlsZU5hbWUpICV9IDwvc3Bhbj48L3A+JyxcclxuICAgICd7JSBpZigkLnVzZXIpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuPnslOiAkLnVzZXIuJGRlc2NyaXB0b3IgICV9PC9zcGFuPjwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIHVybFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLmF0dGFjaERhdGUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuPih7JTogJCQuYnVpbGRVcGxvYWRlZFRleHQoJC5hdHRhY2hEYXRlKSAlfSkmbmJzcDs8L3NwYW4+PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PHNwYW4+eyU6ICQudXJsICV9Jm5ic3A7PC9zcGFuPjwvcD4nLFxyXG4gICAgJ3slIGlmKCQudXNlcikgeyAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+PHNwYW4+eyU6ICQudXNlci4kZGVzY3JpcHRvciAgJX08L3NwYW4+PC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGF0dGFjaG1lbnRUaW1lRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5hdHRhY2htZW50VGltZUZvcm1hdFRleHQsXHJcbiAgYXR0YWNobWVudFRpbWVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2UuYXR0YWNobWVudFRpbWVGb3JtYXRUZXh0MjQsXHJcbiAgdXBsb2FkZWRPblRleHQ6IHJlc291cmNlLnVwbG9hZGVkT25UZXh0LCAvLyBVcGxvYWRlZCAxMCBkYXlzIGFnb1xyXG4gIHRvdWNoZWRUZXh0OiByZXNvdXJjZS50b3VjaGVkVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdhdHRhY2htZW50X2xpc3QnLFxyXG4gIHNlY3VyaXR5OiBudWxsLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgZGV0YWlsVmlldzogJ3ZpZXdfYXR0YWNobWVudCcsXHJcbiAgaW5zZXJ0VmlldzogJ2F0dGFjaG1lbnRfQWRkJyxcclxuICBpY29uQ2xhc3M6ICdhdHRhY2gnLFxyXG4gIHF1ZXJ5T3JkZXJCeTogJ2F0dGFjaERhdGUgZGVzYycsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAndXNlcicsXHJcbiAgICAnY3JlYXRlVXNlcicsXHJcbiAgICAnYXR0YWNoRGF0ZScsXHJcbiAgICAnZmlsZVNpemUnLFxyXG4gICAgJ2ZpbGVOYW1lJyxcclxuICAgICd1cmwnLFxyXG4gICAgJ2ZpbGVFeGlzdHMnLFxyXG4gICAgJ3JlbW90ZVN0YXR1cycsXHJcbiAgICAnZGF0YVR5cGUnLFxyXG4gICAgJ01vZGlmeURhdGUnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnYXR0YWNobWVudHMnLFxyXG4gIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJGRlc2NyaXB0b3JzJyxcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcblxyXG4gIGhhc2hUYWdRdWVyaWVzOiB7XHJcbiAgICB1cmw6IFwiKGZpbGVOYW1lIGxpa2UgJyUuVVJMJylcIixcclxuICAgIGJpbmFyeTogXCIoZmlsZU5hbWUgbm90IGxpa2UgJyUuVVJMJylcIixcclxuICB9LFxyXG4gIGhhc2hUYWdRdWVyaWVzVGV4dDoge1xyXG4gICAgdXJsOiBoYXNoVGFnUmVzb3VyY2UuaGFzaFRhZ1VybFRleHQsXHJcbiAgICBiaW5hcnk6IGhhc2hUYWdSZXNvdXJjZS5oYXNoVGFnQmluYXJ5VGV4dCxcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICBpZiAoIUFwcC5zdXBwb3J0c0ZpbGVBUEkoKSkge1xyXG4gICAgICB0aGlzLmluc2VydFZpZXcgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVSZXF1ZXN0KCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICByZXF1ZXN0LnNldFF1ZXJ5QXJnKCdfaW5jbHVkZUZpbGUnLCAnZmFsc2UnKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gYHVwcGVyKGRlc2NyaXB0aW9uKSBsaWtlIFwiJSR7dGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKX0lXCJgO1xyXG4gIH0sXHJcbiAgZ2V0TGluazogZnVuY3Rpb24gZ2V0TGluayhhdHRhY2htZW50KSB7XHJcbiAgICBsZXQgdG9SZXR1cm47XHJcbiAgICBpZiAoYXR0YWNobWVudC51cmwpIHtcclxuICAgICAgbGV0IGhyZWYgPSBhdHRhY2htZW50LnVybCB8fCAnJztcclxuICAgICAgaHJlZiA9IChocmVmLmluZGV4T2YoJ2h0dHAnKSA8IDApID8gYGh0dHA6Ly8ke2hyZWZ9YCA6IGhyZWY7XHJcbiAgICAgIHRvUmV0dXJuID0gYDxhIGNsYXNzPVwiaHlwZXJsaW5rXCIgaHJlZj1cIiR7aHJlZn1cIiB0YXJnZXQ9XCJfYmxhbmtcIiB0aXRsZT1cIiR7YXR0YWNobWVudC51cmx9XCI+JHthdHRhY2htZW50LiRkZXNjcmlwdG9yfTwvYT5gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGF0dGFjaG1lbnQuZmlsZUV4aXN0cykge1xyXG4gICAgICAgIHRvUmV0dXJuID0gYDxhIGNsYXNzPVwiaHlwZXJsaW5rXCIgaHJlZj1cImphdmFzY3JpcHQ6IFNhZ2UuVXRpbGl0eS5GaWxlLkF0dGFjaG1lbnQuZ2V0QXR0YWNobWVudCgnJHthdHRhY2htZW50LiRrZXl9Jyk7XCIgdGl0bGU9XCIke2F0dGFjaG1lbnQuJGRlc2NyaXB0b3J9XCI+JHthdHRhY2htZW50LiRkZXNjcmlwdG9yfTwvYT5gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvUmV0dXJuID0gYXR0YWNobWVudC4kZGVzY3JpcHRvcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xyXG4gIH0sXHJcbiAgaXRlbUljb25DbGFzczogJ2RvY3VtZW50JyxcclxuICBmaWxlSWNvbkJ5VHlwZToge1xyXG4gICAgeGxzOiAnc3ByZWFkc2hlZXQnLFxyXG4gICAgeGxzeDogJ3NwcmVhZHNoZWV0JyxcclxuICAgIGRvYzogJ3NwZWNpYWwtaXRlbScsXHJcbiAgICBkb2N4OiAnc3BlY2lhbC1pdGVtJyxcclxuICAgIHBwdDogJ2Rpc3BsYXknLFxyXG4gICAgcHB0eDogJ2Rpc3BsYXknLFxyXG4gICAgdHh0OiAnZG9jdW1lbnQyJyxcclxuICAgIHJ0ZjogJ2RvY3VtZW50MicsXHJcbiAgICBjc3Y6ICdkb2N1bWVudDInLFxyXG4gICAgcGRmOiAncGRmLWZpbGUnLFxyXG4gICAgemlwOiAnZG9jdW1lbnQnLCAvLyBUT0RPOiBjb252ZXJ0IHRvIHNvaG8gaWNvblxyXG4gICAgcG5nOiAnb3ZlcmxheS1saW5lJyxcclxuICAgIGpwZzogJ292ZXJsYXktbGluZScsXHJcbiAgICBnaWY6ICdvdmVybGF5LWxpbmUnLFxyXG4gICAgYm1wOiAnb3ZlcmxheS1saW5lJyxcclxuICB9LFxyXG4gIGdldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIGdldEl0ZW1JY29uQ2xhc3MoZW50cnkpIHtcclxuICAgIGNvbnN0IGZpbGVOYW1lID0gZW50cnkgJiYgZW50cnkuZmlsZU5hbWU7XHJcbiAgICBsZXQgdHlwZSA9IHV0aWxpdHkuZ2V0RmlsZUV4dGVuc2lvbihmaWxlTmFtZSk7XHJcbiAgICBsZXQgY2xzID0gdGhpcy5pdGVtSWNvbkNsYXNzO1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgdHlwZSA9IHR5cGUuc3Vic3RyKDEpOyAvLyBSZW1vdmUgdGhlICcuJyBmcm9tIHRoZSBleHQuXHJcbiAgICAgIGNvbnN0IHR5cGVDbHMgPSB0aGlzLmZpbGVJY29uQnlUeXBlW3R5cGVdO1xyXG4gICAgICBpZiAodHlwZUNscykge1xyXG4gICAgICAgIGNscyA9IHR5cGVDbHM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbHM7XHJcbiAgfSxcclxuICBjcmVhdGVJbmRpY2F0b3JMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvckxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLml0ZW1JbmRpY2F0b3JzIHx8ICh0aGlzLml0ZW1JbmRpY2F0b3JzID0gW3tcclxuICAgICAgaWQ6ICd0b3VjaGVkJyxcclxuICAgICAgY2xzOiAnZmxhZycsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnRvdWNoZWRUZXh0LFxyXG4gICAgICBvbkFwcGx5OiBmdW5jdGlvbiBvbkFwcGx5KGVudHJ5LCBwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHBhcmVudC5oYXNCZWVuVG91Y2hlZChlbnRyeSk7XHJcbiAgICAgIH0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBoYXNCZWVuVG91Y2hlZDogZnVuY3Rpb24gaGFzQmVlblRvdWNoZWQoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS5tb2RpZnlEYXRlKSB7XHJcbiAgICAgIGNvbnN0IG1vZGlmaWVkRGF0ZSA9IG1vbWVudChjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoZW50cnkubW9kaWZ5RGF0ZSkpO1xyXG4gICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG1vbWVudCgpLmVuZE9mKCdkYXknKTtcclxuICAgICAgY29uc3Qgd2Vla0FnbyA9IG1vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrcycpO1xyXG5cclxuICAgICAgcmV0dXJuIG1vZGlmaWVkRGF0ZS5pc0FmdGVyKHdlZWtBZ28pICYmXHJcbiAgICAgICAgbW9kaWZpZWREYXRlLmlzQmVmb3JlKGN1cnJlbnREYXRlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGJ1aWxkVXBsb2FkZWRUZXh0OiBmdW5jdGlvbiBidWlsZFVwbG9hZGVkVGV4dChkYXRlKSB7XHJcbiAgICBjb25zdCBtb2RpZmllZERhdGUgPSBtb21lbnQoZGF0ZSkudG9EYXRlKCk7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUodGhpcy51cGxvYWRlZE9uVGV4dCwgW2Zvcm1hdC5kYXRlKG1vZGlmaWVkRGF0ZSksXHJcbiAgICAgIGZvcm1hdC5kYXRlKG1vZGlmaWVkRGF0ZSwgQXBwLmlzMjRIb3VyQ2xvY2soKSA/IHRoaXMuYXR0YWNobWVudFRpbWVGb3JtYXRUZXh0MjQgOiB0aGlzLmF0dGFjaG1lbnRUaW1lRm9ybWF0VGV4dCldKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==