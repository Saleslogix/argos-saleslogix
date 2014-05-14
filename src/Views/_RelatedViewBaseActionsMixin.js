/* Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.*/

/**
 * @class Mobile.SalesLogix.Views._RelatedViewBaseActionsMixin
 *
 * Mixin for card list layouts.
 *
 * @since 3.0
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 */
define('Mobile/SalesLogix/Views/_RelatedViewBaseActionsMixin', [
    'dojo/_base/declare',    
     'Mobile/SalesLogix/Action'
], function(
    declare,
    actionHelper
){

    return declare('Mobile.SalesLogix.Views._RelatedViewBaseActionsMixin', null, {
        postMixInProperties: function() {
            this.inherited(arguments);
            this.setBaseItemActions();
        },
        setBaseItemActions: function() {

            if (!this.itemActions) {
                this.itemActions = [];
            }
            
            this.getActionsForResourceKind(this.resourceKind, this.itemActions);

            return this.itemActions;
        },
        getActionsForResourceKind: function(resourceKind, itemActions) {
            
            switch(resourceKind){
                case 'accounts':
                case 'contacts':
                case 'opportunities':
                case 'leads':
                case 'tickets':
                    itemActions.push({
                        id: 'callPhone',
                        icon: 'content/images/icons/Dial_24x24.png',
                        label: this.callPhoneText,
                        property:'WorkPhone',
                        action: 'callPhone'
                    });
                    itemActions.push({
                        id: 'sendEmail',
                        icon: 'content/images/icons/Send_Write_email_24x24.png',
                        label: this.sendEmailActionText,
                        action: 'sendEmail',
                        property: 'Email'
                        //enabled: action.hasProperty.bindDelegate(this, 'Email'),
                        //fn: action.sendEmail.bindDelegate(this, 'Email')
                    });

                    itemActions.push({
                        id: 'addNote',
                        icon: 'content/images/icons/New_Note_24x24.png',
                        label: this.addNoteActionText,
                        action: 'addNote'
                        //fn: action.addNote.bindDelegate(this)
                    });
                    itemActions.push({
                        id: 'addActivity',
                        icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                        label: this.addActivityActionText,
                        action: 'addActivity'
                        //fn: action.addActivity.bindDelegate(this)
                    });
                    itemActions.push({
                        id: 'addAttachment',
                        icon: 'content/images/icons/Attachment_24.png',
                        label: this.addAttachmentActionText,
                        action: 'addAttachmnet'
                        //fn: action.addAttachment.bindDelegate(this)
                    });
                    break;
                case 'attachments':
                case 'history':
                case 'activities':
                    break;
                default:
            }






        },
        callPhone: function(action, entryKey, entry) {
            var method, selection = {}, contextOptions = {};
            selection.data = entry;
            this.applyRelatedContext(contextOptions, entry);
            selection.options = contextOptions;
            method = actionHelper.callPhone.bindDelegate(this, action.property);
            method.call(this, action, selection);
        },
        sendEmail: function(action, entryKey, entry) {
            var method, selection = {}, contextOptions = {};
            selection.data = entry;
            this.applyRelatedContext(contextOptions, entry);
            selection.options = contextOptions;
            method = actionHelper.sendEmail.bindDelegate(this, action.property);
            method.call(this, action, selection);
        },
        addNote: function(action, entryKey, entry) {
            var method, selection = {}, contextOptions = {};
            selection.data = entry;
            this.applyRelatedContext(contextOptions, entry);
            selection.options = contextOptions;
            method = actionHelper.addNote.bindDelegate(this);
            method.call(this, action, selection);
        },
        addActivity: function(action, entryKey, entry) {
            var method, selection = {}, contextOptions = {};
            selection.data = entry;
            this.applyRelatedContext(contextOptions, entry);
            selection.options = contextOptions;
            method = actionHelper.addActivity.bindDelegate(this);
            method.call(this, action, selection);
        },
        addAttachment: function(action, entryKey, entry) {
            var method, selection = {}, contextOptions = {};
            selection.data = entry;
            this.applyRelatedContext(contextOptions, entry);
            selection.options = contextOptions;
            method = actionHelper.addAttachment.bindDelegate(this);
            method.call(this, action, selection);
        }

    });
});

