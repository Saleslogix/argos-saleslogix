/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Attachment/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/has',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/Convert',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin',
    'moment'
], function(
    declare,
    string,
    has,
    format,
    List,
    convert,
    _RightDrawerListMixin,
    _CardLayoutListMixin,
    moment
) {

    return declare('Mobile.SalesLogix.Views.Attachment.List', [List, _RightDrawerListMixin, _CardLayoutListMixin], {
        //Templates

        //used when card layout is no used used.
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
                '<button data-action="selectEntry" class="list-item-selector button">',
                    '<img src="{%= $$.icon || $$.selectIcon %}" class="icon" />',
                '</button>',
                '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
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
        icon: 'content/images/icons/Attachment_24.png',
        iconurl: 'content/images/icons/Attachment_URL_24.png',
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
        getItemIconSource: function(entry) {
              return "content/images/icons/Attachment_48x48.png";
        },
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'touched',
                icon: 'Touched_24x24.png',
                label: 'Touched',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.hasBeenTouched(entry);
                }
            }, {
                id: 'attachmentIcon',
                icon: '',
                label: 'Activity',
                onApply: function(entry, parent) {
                    parent.applyActivityIndicator(entry, this);
                }
            }]
            );
        },
        applyActivityIndicator: function(entry, indicator) {
            var dataType = entry['dataType'];
            indicator.isEnabled = true;
            indicator.showIcon = true;
            if (dataType === 'R') {
                indicator.icon = "Attachment_24.png";
                indicator.label = "file";
                
            } else {
                indicator.icon = "Attachment_URL_24.png";
                indicator.label = "url";
            }
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

