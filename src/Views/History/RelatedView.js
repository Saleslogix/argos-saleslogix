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
    'Sage/Platform/Mobile/Utility'
], function(
    declare,
    format,
    convert,
    RelatedViewWidget,
    moment,
    FieldManager,
    domConstruct,
    domClass,
    lang,
    utility
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
            '<div  data-dojo-attach-point="quicNoteNode" class="hidden quick-note">',
               '<div class= "action-items">',
                '<span class="action-item" data-dojo-attach-event="onclick:onCancelQuickNote" >',
                      '<img src="content/images/icons/cancl_24.png" />',
                '</span>',
                 '<span class="action-item" data-dojo-attach-event="onclick:onAddQuickNote" >',
                      '<img src="content/images/icons/OK_24.png" />',
                '</span>',
                '</div>',
              '</div>',
             '<div  class="line-bar"></div>'
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
                icon: 'content/images/icons/note_24.png',
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
            var insertEntry, currentUserId, currentUserName, notes;
            currentUserId = App.context['user'].$key;
            currentUserName = App.context['user'].$descriptor,
            notes = this.fieldNote.getValue();
            if (!notes == '') {
                insertEntry = {
                    Type: 'atNote',
                    UserName: currentUserName,
                    UserId: currentUserId,
                  //  Description: 'Quick Note',
                    LongNotes: this.fieldNote.getValue()
                };
                this.setParentContext(insertEntry);
                this.insertItem(insertEntry, { onSuccess: this.onAddNoteComplete, onFailed: this.onAddNoteFailed });
            } else {
                domClass.toggle(this.quicNoteNode, 'hidden');
            }
        },
        onCancelQuickNote: function(evt) {
           
            domClass.toggle(this.quicNoteNode, 'hidden');
        },
        onAddNoteComplete: function(result, entry) {
            domClass.toggle(this.quicNoteNode, 'hidden');
            this.fieldNote.setValue('');
            this._onRefreshView();
        },
        onAddNoteFailed: function(result, entry) {
            console.log("failed adding note");
        },
        setParentContext: function(entry) {
            var resourceKind, context;
            resourceKind = this.owner.resourceKind;
            context = {};
            switch (resourceKind) {
                case 'accounts':
                    context = {
                        'AccountId': this.parentEntry['$key'],
                        'AccountName': this.parentEntry['$descriptor']
                    };
                    break;
                case 'contacts':
                    context = {
                        'ContactId': this.parentEntry['$key'],
                        'ContactName': this.parentEntry['$descriptor'],
                        'AccountId': utility.getValue(this.parentEntry, 'Account.$key'),
                        'AccountName': utility.getValue(this.parentEntry, 'Account.AccountName')
                    };
                    break;
                case 'leads':
                    context = {
                        'LeadId': this.parentEntry['$key'],
                        'LeadName': this.parentEntry['$descriptor'],
                        'AccountName': this.parentEntry['Company']
                    };
                    break;
                case 'ticktes':
                    context = {
                        'TicketId': this.parentEntry['$key'],
                        'TicketNumber': this.parentEntry['$descriptor'],
                        'AccountId': utility.getValue(this.parentEntry, 'Account.$key'),
                        'AccountName': utility.getValue(this.parentEntry, 'Account.AccountName'),
                        'ContactId': utility.getValue(this.parentEntry, 'Contact.$key'),
                        'ContactName': utility.getValue(this.parentEntry, 'Contact.NameLF')
                    };
                    break;
                case 'opportunities':
                    context = {
                        'OpportunityId': entry['$key'],
                        'OpportunityName': entry['$descriptor'],
                        'AccountId': utility.getValue(this.parentEntry, 'Account.$key'),
                        'AccountName': utility.getValue(this.parentEntry, 'Account.AccountName'),
                    };
                    break;
            }
            
            lang.mixin(entry, context);


        }


    });
});
