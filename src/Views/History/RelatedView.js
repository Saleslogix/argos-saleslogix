/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.History.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/History/RelatedView', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'moment',
    'Sage/Platform/Mobile/FieldManager',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/_base/lang',
], function(
    declare,
    format,
    convert,
    RelatedViewWidget,
    moment,
    FieldManager,
    domConstruct,
    domClass,
    lang
) {
    return declare('Mobile.SalesLogix.Views.History.RelatedView', [RelatedViewWidget], {
        regardingText: 'Regarding',
        byText: 'wrote ',
        id: 'relatedNotes',
        icon: 'content/images/icons/journal_24.png',
        itemIcon: 'content/images/icons/journal_24.png',
        title: 'Notes',
        detailViewId: 'history_detail',
        editViewId: 'history_edit',
        insertViewId: 'history_edit',
        listViewId: 'history_related',
        listViewWhere: null,
        enabled: true,
        showAdd: true,
        //showTab: false,
        //enableActions: false,
        //showTotalInTab: false,
        //hideWhenNoData: true,
        resourceKind: 'history',
        select: ['Type','ModifyDate', 'CompleteDate', 'UserName', 'Description', 'Notes', 'AccountName'],
        where:null ,
        sort: 'ModifyDate desc',
        pageSize: 3,

        relatedViewHeaderTemplate: new Simplate([
            '<div  data-dojo-attach-point="quicNoteNode" class="hidden" style="width:100%">',
               '<div>',
               '<button  class="action-item-with-button "  data-dojo-attach-event="onclick:onCancelQuickNote" >',
                      '<img src="content/images/icons/cancl_24.png" />',
                '</button>',
                '<button  class="action-item-with-button " data-dojo-attach-event="onclick:onAddQuickNote" >',
                      '<img src="content/images/icons/OK_24.png" />',
                '</button>',
              '</div>',
              '</div>',
             '<div class="line-bar"></div>'
        ]),

        relatedItemIconTemplate: new Simplate([
            '<div class="user-icon">{%: Mobile.SalesLogix.Format.formatUserInitial($.UserName) %}</div>'
        ]),
        relatedItemHeaderTemplate: new Simplate([
           '<h4 ><strong>{%: $$.getDescription($) %} </strong></h4>',
           '<h4>{%: Mobile.SalesLogix.Format.formatByUser($.UserName) %} {%: $$.byText %}  {%: Mobile.SalesLogix.Format.relativeDate($.ModifyDate, false) %}</h4>'
        ]),
        relatedItemDetailTemplate: new Simplate([
               '<div class="note-text-wrap">',
                '<h4>{%: $.Notes %} ... </h4>',
              '</div>'
        ]),
        getDescription: function(entry) {
            return (entry.Description)? entry.Description : entry.$descriptor;
        },
        createActionLayout: function() {

            if (!this.actions) {
                this.actions = [];
            }
            this.actions.push({
                id: 'add_quick_note',
                icon: 'content/images/icons/quick_note_24.png',
                label: this.addQuickNoteText,
                action: 'onShowQuickNote',
                isEnabled: true,
                fn: this.onShowQuickNote.bindDelegate(this)
            });
           return this.actions;
        },
        onShowQuickNote: function(evt) {
            var ctor;
            if (!this.fieldNote) {

                ctor = FieldManager.get('note'),
                this.fieldNote = new ctor(lang.mixin({
                          owner: this
                }, { name: 'QuickNote', label: 'Quick Note', rows: 5 }));

                this.fieldNote.placeAt(this.quicNoteNode, 'first');
            }
            domClass.toggle(this.quicNoteNode, 'hidden');
        },
        onAddQuickNote: function(evt) {
           
           alert (this.fieldNote.getValue());
           var updateEntry = {
               Type: 'atNote',
               AccountId: this.parentEntry.$key,
               LongNotes: this.fieldNote.getValue()
               //Note: this.fieldNote.getValue()
           };
           //this..UpdateItem(updateEntry, { onSuccess: this.onAddNoteComplete, onFailed: this.onAddNoteFailed });

            domClass.toggle(this.quicNoteNode, 'hidden');
        },
        onCancelQuickNote: function(evt) {
           
            domClass.toggle(this.quicNoteNode, 'hidden');
        },
        onAddNoteComplete: function(result, entry) {
            this._onRefreshView();
        },
        onAddNoteFailed: function(result, entry) {
            console.log("failed adding note");
        },

    });
});
