/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Attachments.List
 *
 * @extends Sage.Platform.Mobile.List
 * @mixins Sage.Platform.Mobile.List
 * @mixins Mobile.SalesLogix.Views._RightDrawerListMixin
 * @mixins Mobile.SalesLogix.Views._CardLayoutListMixin
 * @mixins Sage.Platform.Mobile._LegacySDataListMixin
 *
 * @requires Sage.Platform.Mobile.List
 * @requires Sage.Platform.Mobile._LegacySDataListMixin
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 * @requires Mobile.SalesLogix.Views._RightDrawerListMixin
 * @requires Mobile.SalesLogix.Views._CardLayoutListMixin
 *
 * @requires moment
 *
 */
define('Mobile/SalesLogix/Views/Attachment/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/has',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Utility',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/_LegacySDataListMixin',
    'Sage/Platform/Mobile/Convert',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin',
    'moment'
], function(
    declare,
    string,
    has,
    format,
    utility,
    List,
    _LegacySDataListMixin,
    convert,
    _RightDrawerListMixin,
    _CardLayoutListMixin,
    moment
) {

    return declare('Mobile.SalesLogix.Views.Attachment.List', [List, _RightDrawerListMixin, _CardLayoutListMixin, _LegacySDataListMixin], {
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
             '<h4><span>({%: $$.uploadedOnText %} {%: Mobile.SalesLogix.Format.relativeDate($.attachDate) %})&nbsp;</span>',
            '<span>{%: Mobile.SalesLogix.Format.fileSize($.fileSize) %} </span></h4>',
            '<h4><span>{%: Mobile.SalesLogix.Utility.getFileExtension($.fileName) %} </span></h4>',
            '{% if($.user) { %}',
                '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
            '{% } %}'
        ]),
        urlTemplate: new Simplate([
            '<h3><span>{%: $.description %} &nbsp;</span></h3>',
            '{% if ($.attachDate) { %}',
                '<h4><span>({%: $$.uploadedOnText %} {%: Mobile.SalesLogix.Format.relativeDate($.attachDate) %})&nbsp;</span></h4>',
            '{% } %}',
            '<h4><span>{%: $.url %}&nbsp;</span></h4>',
            '{% if($.user) { %}',
            '<h4><span>{%: $.user.$descriptor  %}</span></h4>',
            '{% } %}'
        ]),

        //Localization
        titleText: 'Attachments',
        attachmentDateFormatText: 'ddd M/D/YYYY hh:mm:ss',
        uploadedOnText: 'Uploaded ',// Uploaded 10 days ago

        //View Properties       
        id: 'attachment_list',
        security: null,
        enableActions: true,
        detailView: 'view_attachment',
        insertView: 'attachment_Add',
        iconClass: 'fa fa-paperclip fa-lg',
        queryOrderBy: 'attachDate desc',
        querySelect:  [
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
        createToolLayout: function() {
            if (!has('html5-file-api')) {
                this.insertView = null;
            } else {
                return this.inherited(arguments);
            }
        },
        createRequest: function() {
            var request = this.inherited(arguments);
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        getLink: function(attachment) {
            if (attachment['url']) {
                var href = attachment['url'] || '';
                href = (href.indexOf('http') < 0) ? 'http://' + href : href;
                return string.substitute('<a href="${0}" target="_blank" title="${1}">${2}</a>', [href, attachment['url'], attachment['$descriptor']]);
            } else {
                if (attachment['fileExists']) {
                    return string.substitute('<a href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${0}\');" title="${1}">${1}</a>',
                        [attachment['$key'], attachment['$descriptor']]);
                } else {
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
        getItemIconClass: function(entry) {
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
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'touched',
                cls: 'fa fa-hand-o-up',
                label: 'Touched',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.hasBeenTouched(entry);
                }
            }]
            );
        },
        hasBeenTouched: function(entry) {
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
});

