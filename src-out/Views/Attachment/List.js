/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Attachments.List
 *
 * @extends argos.List
 * @mixins argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._CardLayoutListMixin
 * @mixins argos._LegacySDataListMixin
 *
 * @requires argos.List
 * @requires argos._LegacySDataListMixin
 * @requires argos.Convert
 *
 * @requires crm.Format
 * @requires crm.Views._RightDrawerListMixin
 * @requires crm.Views._CardLayoutListMixin
 *
 * @requires moment
 *
 */
define('crm/Views/Attachment/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/has',
    '../../Format',
    '../../Utility',
    'argos/List',
    'argos/_LegacySDataListMixin',
    'argos/Convert',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin',
    'moment'
], function (declare, lang, string, has, format, utility, List, _LegacySDataListMixin, convert, _RightDrawerListMixin, _CardLayoutListMixin, moment) {
    var __class = declare('crm.Views.Attachment.List', [List, _RightDrawerListMixin, _CardLayoutListMixin, _LegacySDataListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '{% if ($.dataType === "R") { %}',
            '{%! $$.fileTemplate %}',
            '{% } else { %}',
            '{%! $$.urlTemplate %}',
            '{% } %}'
        ]),
        fileTemplate: new Simplate([
            '<h3><span>{%: $.description %}&nbsp;</span></h3>',
            '<h4><span>({%: $$.uploadedOnText %} {%: crm.Format.relativeDate($.attachDate) %})&nbsp;</span>',
            '<span>{%: crm.Format.fileSize($.fileSize) %} </span></h4>',
            '<h4><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></h4>',
            '{% if($.user) { %}',
            '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
            '{% } %}'
        ]),
        urlTemplate: new Simplate([
            '<h3><span>{%: $.description %} &nbsp;</span></h3>',
            '{% if ($.attachDate) { %}',
            '<h4><span>({%: $$.uploadedOnText %} {%: crm.Format.relativeDate($.attachDate) %})&nbsp;</span></h4>',
            '{% } %}',
            '<h4><span>{%: $.url %}&nbsp;</span></h4>',
            '{% if($.user) { %}',
            '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
            '{% } %}'
        ]),
        //Localization
        titleText: 'Attachments',
        attachmentDateFormatText: 'ddd M/D/YYYY hh:mm:ss',
        uploadedOnText: 'Uploaded ',
        //View Properties
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
            'ModifyDate'
        ],
        resourceKind: 'attachments',
        contractName: 'system',
        queryInclude: ['$descriptors'],
        hashTagQueries: {
            'url': 'url ne null',
            'binary': 'url eq null'
        },
        hashTagQueriesText: {
            'url': 'url',
            'binary': 'binary'
        },
        createToolLayout: function () {
            if (!has('html5-file-api')) {
                this.insertView = null;
            }
            else {
                return this.inherited(arguments);
            }
        },
        createRequest: function () {
            var request = this.inherited(arguments);
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        formatSearchQuery: function (searchQuery) {
            return string.substitute('upper(description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        getLink: function (attachment) {
            if (attachment['url']) {
                var href = attachment['url'] || '';
                href = (href.indexOf('http') < 0) ? 'http://' + href : href;
                return string.substitute('<a href="${0}" target="_blank" title="${1}">${2}</a>', [href, attachment['url'], attachment['$descriptor']]);
            }
            else {
                if (attachment['fileExists']) {
                    return string.substitute('<a href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${0}\');" title="${1}">${1}</a>', [attachment['$key'], attachment['$descriptor']]);
                }
                else {
                    return attachment['$descriptor'];
                }
            }
        },
        itemIconClass: 'fa-file-o',
        fileIconByType: {
            'xls': 'fa-file-excel-o',
            'xlsx': 'fa-file-excel-o',
            'doc': 'fa-file-word-o',
            'docx': 'fa-file-word-o',
            'ppt': 'fa-file-powerpoint-o',
            'pptx': 'fa-file-powerpoint-o',
            'txt': 'fa-file-text-o',
            'rtf': 'fa-file-text-o',
            'csv': 'fa-file-text-o',
            'pdf': 'fa-file-pdf-o',
            'zip': 'fa-file-zip-o',
            'png': 'fa-file-image-o',
            'jpg': 'fa-file-image-o',
            'gif': 'fa-file-image-o',
            'bmp': 'fa-file-image-o'
        },
        getItemIconClass: function (entry) {
            var cls, typeCls, type, fileName = entry && entry.fileName;
            type = utility.getFileExtension(fileName);
            cls = this.itemIconClass;
            if (type) {
                type = type.substr(1); //Remove the '.' from the ext.
                typeCls = this.fileIconByType[type];
                if (typeCls) {
                    cls = typeCls;
                }
            }
            if (cls) {
                cls = 'fa ' + cls + ' fa-2x';
            }
            return cls;
        },
        createIndicatorLayout: function () {
            return this.itemIndicators || (this.itemIndicators = [{
                    id: 'touched',
                    cls: 'fa fa-hand-o-up fa-lg',
                    label: 'Touched',
                    onApply: function (entry, parent) {
                        this.isEnabled = parent.hasBeenTouched(entry);
                    }
                }]);
        },
        hasBeenTouched: function (entry) {
            var modifiedDate, currentDate, weekAgo;
            if (entry['modifyDate']) {
                modifiedDate = moment(convert.toDateFromString(entry['modifyDate']));
                currentDate = moment().endOf('day');
                weekAgo = moment().subtract(1, 'weeks');
                return modifiedDate.isAfter(weekAgo) &&
                    modifiedDate.isBefore(currentDate);
            }
            return false;
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Attachment.List', __class);
    return __class;
});
