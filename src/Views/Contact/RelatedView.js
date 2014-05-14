/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Contact.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/Contact/RelatedView', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'Mobile/SalesLogix/Views/_RelatedViewBaseActionsMixin',
    'Mobile/SalesLogix/Action'
], function(
    declare,
    format,
    convert,
    RelatedViewWidget,
    _RelatedViewBaseActionsMixin,
    actionHelper
) {
    return declare('Mobile.SalesLogix.Views.Contact.RelatedView', [RelatedViewWidget,_RelatedViewBaseActionsMixin], {
        
        id: 'contact_relateView',
        icon: 'content/images/icons/Contacts_24x24.png',
        itemIcon: 'content/images/icons/ContactProfile_48x48.png',
        titleText: 'Contacts',
        phoneAbbreviationText: 'phone',
        callPhoneText:'call',
        detailViewId: 'contact_detail',
        editViewId: 'contact_edit',
        insertViewId: 'contact_edit',
        listViewId: 'contact_related',
        listViewWhere: null,
        resourceKind: 'contacts',
        showAdd:true,
        select: ['Type', 'ModifyDate', 'FirstName', 'LastName', 'WorkPhone', 'Email', 'Title', 'IsPrimary', 'Account', 'Account/AccountName'],
        sort: 'LastName asc',
        relatedItemHeaderTemplate: new Simplate([
           '<h3 ><strong>{%: $$.getDescription($) %} </strong></h3>',
           '<h3 >{%: $.Title %} </h3>',
        ]),
        relatedItemDetailTemplate: new Simplate([
               '<div >',
              '{% if ($.WorkPhone) { %}',
                '<h3>',
                    '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callPhone" data-key="{%: $.$key %}">{%: Sage.Platform.Mobile.Format.phone($.WorkPhone) %}</span>',
                '</h3>',
            '{% } %}',
             '<h3>{%: $.Email %}</h3>',
             '</div>'
        ]),
        getDescription: function(entry) {
            return (entry.LastName) ? entry.LastName + ", " + entry.FirstName : entry.$descriptor;
        },
        createItemActionLayout: function() {

            if (!this.itemActions) {
                this.itemActions = [];
            }
            /*
            this.itemActions.push({
                id: 'callPhone',
                icon: 'content/images/icons/Dial_24x24.png',
                label: this.callPhoneText,
                action: 'callPhone'
            });
            this.itemActions.push({
                id: 'sendEmail',
                icon: 'content/images/icons/Send_Write_email_24x24.png',
                label: this.sendEmailActionText,
                enabled: action.hasProperty.bindDelegate(this, 'Email'),
                fn: action.sendEmail.bindDelegate(this, 'Email')
            });
            
            this.itemActions.push({
                id: 'addNote',
                icon: 'content/images/icons/New_Note_24x24.png',
                label: this.addNoteActionText,
                fn: action.addNote.bindDelegate(this)
            });
            this.itemActions.push({
                id: 'addActivity',
                icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                label: this.addActivityActionText,
                fn: action.addActivity.bindDelegate(this)
            });
            this.itemActions.push({
                id: 'addAttachment',
                icon: 'content/images/icons/Attachment_24.png',
                label: this.addAttachmentActionText,
                fn: action.addAttachment.bindDelegate(this)
            });

            */

            return this.itemActions;
        }
        
    });
});
