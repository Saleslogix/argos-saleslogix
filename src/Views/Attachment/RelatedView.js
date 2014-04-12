/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Attachmnet.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/Attachment/RelatedView', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/connect',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'moment',
    'Sage/Platform/Mobile/FieldManager'
], function(
    declare,
    lang,
    connect,
    format,
    convert,
    RelatedViewWidget,
    moment,
    FieldManager
) {
    return declare('Mobile.SalesLogix.Views.Attachment.RelatedView', [RelatedViewWidget], {
        fileText: 'file',
        urlText: 'url',


        id: 'relatedView_attachment',
        icon: 'content/images/icons/Attachment_24.png',
        itemIcon: 'content/images/icons/Attachment_24.png',
        title: "Attatchments",
        detailViewId: 'view_attachment',
        editViewId: '',
        insertViewId: 'attachment_Add',
        listViewId: 'attachment_list',
        listViewWhere: null,
        enabled: true,
        showTab: true,
        enableActions: true,
        enableItemActions: false,
        showItemDetail: true,
        showItemFooter: false,
        showTotalInTab: true,
        hideWhenNoData: false,
        showSelectMore: true,
        autoLoad: false,
        pageSize: 3,
        resourceKind: 'attachments',
        contractName: 'system',
        include: ['$descriptors'],
        select: [
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
        where:null ,
        sort: 'attachDate desc',
        relatedItemIconTemplate: new Simplate([
           // '<div class="user-icon">{%: Mobile.SalesLogix.Format.formatUserInitial($.datatype) %}</div>',
             '{% if ($.dataType === "R") { %}',
                    '<img src="content/images/icons/Attachment_24.png" alt="{%= $$.fileText %}" />',
             '{% } else { %}',
                    '<img src="content/images/icons/Attachment_URL_24.png" alt="{%= $$.urlText %}" />',
             '{% } %}',
        ]),
        relatedItemHeaderTemplate: new Simplate([
            '<h3><strong>{%: $$.getItemDescriptor($) %} </h3>',
        ]),
       relatedItemDetailTemplate: new Simplate([
           '{% if ($.dataType === "R") { %}',
              '{%! $$.fileTemplate %}',
          '{% } else { %}',
             '{%! $$.urlTemplate %}',
          '{% } %}'
       ]),
       fileTemplate: new Simplate([
            //'<h3><span>{%: $.description %}&nbsp;</span></h3>',
            '<h3><span>({%: $$.uploadedOnText %} {%: Mobile.SalesLogix.Format.relativeDate($.attachDate) %})&nbsp;</span>',
           '<span>{%: Mobile.SalesLogix.Format.fileSize($.fileSize) %} </span></h3>',
           '<h3><span>{%: Mobile.SalesLogix.Utility.getFileExtension($.fileName) %} </span></h3>',
           '{% if($.user) { %}',
               '<h3><span>{%: $.user.$descriptor  %}</span></h3>',
           '{% } %}'
       ]),
       urlTemplate: new Simplate([
          // '<h3><span>{%: $.description %} &nbsp;</span></h3>',
           '{% if ($.attachDate) { %}',
               '<h3><span>({%: $$.uploadedOnText %} {%: Mobile.SalesLogix.Format.relativeDate($.attachDate) %})&nbsp;</span></h3>',
           '{% } %}',
           '<h3><span>{%: $.url %}&nbsp;</span></h3>',
           '{% if($.user) { %}',
           '<h3><span>{%: $.user.$descriptor  %}</span></34>',
           '{% } %}'
       ]),
       
        getItemDescriptor: function(entry) {
            if (entry) {
                entry['$descriptor'] = (entry.description) ? entry.description : entry.$descriptor;
                return  entry.$descriptor;
            }
            return '';
        },
        onAddContact: function(evt) {
            var ctor, options;

            if (!this.luContact) {
                ctor = FieldManager.get('lookup'),
                options = lang.mixin({
                    owner: this
                }, {
                    name: 'Contact',
                    property: 'Contact',
                    textProperty: 'Contct',
                    singleSelect: false,
                    view: 'contact_related'
                });
                this.luContact = new ctor(options);
                this.connect(this.luContact, 'onChange', this._processContactLookupResults);
            }

            this.luContact.buttonClick();

        },
        onItemEdit: function(action, entryKey, entry) {
            var view = App.getView(this.editViewId);
            if (view) {
                view.show({title:this.getItemDescriptor(entry), key: entryKey });
               
            }
        }
    });
});
