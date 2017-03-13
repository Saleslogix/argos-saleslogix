import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import utility from '../../Utility';
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';
import convert from 'argos/Convert';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';

import moment from 'moment';

const resource = getResource('attachmentList');
const hashTagResource = getResource('attachmentListHashTags');
const dtFormatResource = getResource('attachmentListDateTimeFormat');

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
 */
const __class = declare('crm.Views.Attachment.List', [List, _RightDrawerListMixin, _LegacySDataListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '{% if ($.dataType === "R") { %}',
    '{%! $$.fileTemplate %}',
    '{% } else { %}',
    '{%! $$.urlTemplate %}',
    '{% } %}',
  ]),
  fileTemplate: new Simplate([
    '<p class="listview-heading"><span>{%: $.description %}&nbsp;</span></p>',
    '<p class="micro-text"><span>({%: $$.uploadedOnText %} {%: crm.Format.relativeDate($.attachDate) %})&nbsp;</span>',
    '<span>{%: crm.Format.fileSize($.fileSize) %} </span></p>',
    '<p class="micro-text"><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></p>',
    '{% if($.user) { %}',
    '<p class="micro-text"><span>{%: $.user.$descriptor  %}</span></p>',
    '{% } %}',
  ]),
  urlTemplate: new Simplate([
    '<p class="micro-text"><span>{%: $.description %} &nbsp;</span></p>',
    '{% if ($.attachDate) { %}',
    '<p class="micro-text"><span>({%: $$.uploadedOnText %} {%: crm.Format.relativeDate($.attachDate) %})&nbsp;</span></p>',
    '{% } %}',
    '<p class="micro-text"><span>{%: $.url %}&nbsp;</span></p>',
    '{% if($.user) { %}',
    '<p class="micro-text"><span>{%: $.user.$descriptor  %}</span></p>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  attachmentDateFormatText: dtFormatResource.attachmentDateFormatText,
  attachmentDateFormatText24: dtFormatResource.attachmentDateFormatText24,
  uploadedOnText: resource.uploadedOnText, // Uploaded 10 days ago

  // View Properties
  id: 'attachment_list',
  security: null,
  enableActions: true,
  detailView: 'view_attachment',
  insertView: 'attachment_Add',
  iconClass: 'fa fa-paperclip fa-lg',
  queryOrderBy: 'attachDate desc',
  querySelect: [
    'description',
    'user',
    'createUser',
    'attachDate',
    'fileSize',
    'fileName',
    'url',
    'fileExists',
    'remoteStatus',
    'dataType',
    'ModifyDate',
  ],
  resourceKind: 'attachments',
  contractName: 'system',
  queryInclude: [
    '$descriptors',
    '$permissions',
  ],

  hashTagQueries: {
    url: "(fileName like '%.URL')",
    binary: "(fileName not like '%.URL')",
  },
  hashTagQueriesText: {
    url: hashTagResource.hashTagUrlText,
    binary: hashTagResource.hashTagBinaryText,
  },
  createToolLayout: function createToolLayout() {
    if (!App.supportsFileAPI()) {
      this.insertView = null;
    } else {
      return this.inherited(arguments);
    }
  },
  createRequest: function createRequest() {
    const request = this.inherited(arguments);
    request.setQueryArg('_includeFile', 'false');
    return request;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
  getLink: function getLink(attachment) {
    let toReturn;
    if (attachment.url) {
      let href = attachment.url || '';
      href = (href.indexOf('http') < 0) ? `http://${href}` : href;
      toReturn = string.substitute('<a class="hyperlink" href="${0}" target="_blank" title="${1}">${2}</a>', [href, attachment.url, attachment.$descriptor]);
    } else {
      if (attachment.fileExists) {
        toReturn = string.substitute('<a class="hyperlink" href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${0}\');" title="${1}">${1}</a>', [attachment.$key, attachment.$descriptor]);
      } else {
        toReturn = attachment.$descriptor;
      }
    }
    return toReturn;
  },
  itemIconClass: 'fa-file-o',
  fileIconByType: {
    xls: 'fa-file-excel-o',
    xlsx: 'fa-file-excel-o',
    doc: 'fa-file-word-o',
    docx: 'fa-file-word-o',
    ppt: 'fa-file-powerpoint-o',
    pptx: 'fa-file-powerpoint-o',
    txt: 'fa-file-text-o',
    rtf: 'fa-file-text-o',
    csv: 'fa-file-text-o',
    pdf: 'fa-file-pdf-o',
    zip: 'fa-file-zip-o',
    png: 'fa-file-image-o',
    jpg: 'fa-file-image-o',
    gif: 'fa-file-image-o',
    bmp: 'fa-file-image-o',
  },
  getItemIconClass: function getItemIconClass(entry) {
    const fileName = entry && entry.fileName;
    let type = utility.getFileExtension(fileName);
    let cls = this.itemIconClass;
    if (type) {
      type = type.substr(1); // Remove the '.' from the ext.
      const typeCls = this.fileIconByType[type];
      if (typeCls) {
        cls = typeCls;
      }
    }
    if (cls) {
      cls = `fa ${cls} fa-2x`;
    }
    return cls;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return this.itemIndicators || (this.itemIndicators = [{
      id: 'touched',
      cls: 'fa fa-hand-o-up fa-lg',
      label: 'Touched',
      onApply: function onApply(entry, parent) {
        this.isEnabled = parent.hasBeenTouched(entry);
      },
    }]);
  },
  hasBeenTouched: function hasBeenTouched(entry) {
    if (entry.modifyDate) {
      const modifiedDate = moment(convert.toDateFromString(entry.modifyDate));
      const currentDate = moment().endOf('day');
      const weekAgo = moment().subtract(1, 'weeks');

      return modifiedDate.isAfter(weekAgo) &&
        modifiedDate.isBefore(currentDate);
    }
    return false;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Attachment.List', __class);
export default __class;
