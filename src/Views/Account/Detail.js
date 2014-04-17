/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Account.Detail
 *
 *
 * @extends Sage.Platform.Mobile.Detail
 * @requires Sage.Platform.Mobile.Detail
 * @requires Mobile.SalesLogix.Format
 * @requires Mobile.SalesLogix.Template
 * @requires Mobile.SalesLogix._MetricDetailMixin
 *
 */
define('Mobile/SalesLogix/Views/Account/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/lang',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Detail',
    'Mobile/SalesLogix/Views/Activity/RelatedView',
    'Mobile/SalesLogix/Views/Attachment/RelatedView',
    'Mobile/SalesLogix/Views/History/RelatedView',
    'Mobile/SalesLogix/Views/Address/RelatedView',
    '../_MetricDetailMixin'
], function(
    declare,
    string,
    lang,
    format,
    template,
    Detail,
    ActvityRelatedView,
    AttachmentRelatedView,
    HistoryRelatedView,
    AddressRelatedView,
    _MetricDetailMixin
) {

    return declare('Mobile.SalesLogix.Views.Account.Detail', [Detail], {
        //Localization
        accountText: 'account',
        acctMgrText: 'acct mgr',
        addressText: 'address',
        businessDescriptionText: 'bus desc',
        createDateText: 'create date',
        createUserText: 'create user',
        faxText: 'fax',
        importSourceText: 'lead source',
        industryText: 'industry',
        notesText: 'notes',
        ownerText: 'owner',
        phoneCallHistoryTitle: 'Phone Call',
        phoneText: 'phone',
        activityTypeText: {
            'atPhoneCall': 'Phone Call'
        },
        actionsText: 'Actions',
        relatedActivitiesText: 'Activities',
        relatedContactsText: 'Contacts',
        relatedHistoriesText: 'Notes/History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        relatedOpportunitiesText: 'Opportunities',
        relatedTicketsText: 'Tickets',
        relatedAddressesText: 'Addresses',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'Account Attachments',
        statusText: 'status',
        subTypeText: 'subtype',
        titleText: 'Account',
        typeText: 'type',
        webText: 'web',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        moreDetailsText: 'More Details',
        calledText: 'Called ${0}',

        //View Properties
        id: 'account_detail',
        editView: 'account_edit',
        historyEditView: 'history_edit',
        noteEditView: 'history_edit',
        security: 'Entities/Account/View',
        querySelect: [
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountName',
            'Address/*',
            'BusinessDescription',
            'CreateDate',
            'CreateUser',
            'Description',
            'Fax',
            'GlobalSyncID',
            'ImportSource',
            'Industry',
            'LeadSource/Description',
            'MainPhone',
            'Notes',
            'Owner/OwnerDescription',
            'Status',
            'SubType',
            'Type',
            'WebAddress'
        ],
        resourceKind: 'accounts',

        navigateToHistoryInsert: function(type, entry, complete) {
            var view = App.getView(this.historyEditView);
            if (view) {
                this.refreshRequired = true;

                App.goRoute(view.id + '/' + entry[this.idProperty], {
                        title: this.activityTypeText[type],
                        template: {},
                        entry: entry,
                        insert: true
                    }, {
                        complete: complete
                    });
            }
        },
        recordCallToHistory: function(complete) {
            var entry = {
                'Type': 'atPhoneCall',
                'AccountId': this.entry['$key'],
                'AccountName': this.entry['AccountName'],
                'Description': string.substitute(this.calledText, [this.entry['AccountName']]),
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': (new Date())
            };

            this.navigateToHistoryInsert('atPhoneCall', entry, complete);
        },
        callMainPhone: function() {
            this.recordCallToHistory(lang.hitch(this, function() {
                App.initiateCall(this.entry['MainPhone']);
            }));
        },
        scheduleActivity: function() {
            App.navigateToActivityInsertView();
        },
        addNote: function() {
            var view = App.getView(this.noteEditView);
            if (view) {
                App.goRoute(view.id, {
                    template: {},
                    insert: true
                });
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'AccountName',
                            property: 'AccountName',
                            label: this.accountText
                        }, {
                            name: 'WebAddress',
                            property: 'WebAddress',
                            label: this.webText,
                            renderer: format.link
                        }, {
                            name: 'MainPhone',
                            property: 'MainPhone',
                            label: this.phoneText,
                            renderer: format.phone.bindDelegate(this, false),
                            action: 'callMainPhone'
                        }, {
                            name: 'Address',
                            property: 'Address',
                            label: this.addressText,
                            renderer: format.address.bindDelegate(this, false)
                        }, {
                            name: 'Fax',
                            property: 'Fax',
                            label: this.faxText,
                            renderer: format.phone.bindDelegate(this, true)
                        }, {
                            name: 'Type',
                            property: 'Type',
                            label: this.typeText
                        }, {
                            name: 'SubType',
                            property: 'SubType',
                            label: this.subTypeText
                        }, {
                            name: 'Status',
                            property: 'Status',
                            label: this.statusText
                        }, {
                            name: 'Industry',
                            property: 'Industry',
                            label: this.industryText,
                            type: 'text'
                        }, {
                            name: 'BusinessDescription',
                            property: 'BusinessDescription',
                            label: this.businessDescriptionText,
                            type: 'text'
                        }, {
                            name: 'AccountManager.UserInfo',
                            property: 'AccountManager.UserInfo',
                            label: this.acctMgrText,
                            tpl: template.nameLF
                        }, {
                            name: 'Owner.OwnerDescription',
                            property: 'Owner.OwnerDescription',
                            label: this.ownerText
                        }, {
                            name: 'LeadSource.Description',
                            property: 'LeadSource.Description',
                            label: this.importSourceText
                        }]
                }, {
                    title: this.actionsText,
                    list: true,
                    cls: 'action-list',
                    name: 'QuickActionsSection',
                    children: [{
                            name: 'ScheduleActivityAction',
                            property: 'AccountName',
                            label: this.scheduleActivityText,
                            icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                            action: 'scheduleActivity'
                        }, {
                            name: 'AddNoteAction',
                            property: 'AccountName',
                            label: this.addNoteText,
                            icon: 'content/images/icons/New_Note_24x24.png',
                            action: 'addNote'
                        }]
                }, {
                    title: this.relatedItemsText,
                    list: true,
                    name: 'RelatedItemsSection',
                    children: [{
                        name: 'ContactRelated',
                        relatedView: {
                            id: 'account_contact_related_view',
                            icon: 'content/images/icons/Contacts_24x24.png',
                            resourceKind: 'contacts',
                            title: this.relatedContactsText,
                            detailViewId: 'contact_detail',
                            listViewId: 'contact_related',
                            insertViewId: 'contact_edit',
                            showAdd: true,
                            enabled: true,
                            relatedProperty: 'Account.$key',
                            where: function(entry) { return "Account.id eq '" + entry.$key + "'"; }
                        }
                    }, {
                        name: 'OpportunityRelated',
                        relatedView: {
                            id: 'account_opp_related_view',
                            icon: 'content/images/icons/opportunity_24.png',
                            title: this.relatedOpportunitiesText,
                            resourceKind: 'opportunities',
                            detailViewId: 'opprtunity_detail',
                            listViewId: 'opportunity_related',
                            insertViewId: 'opportunity_edit',
                            showAdd: true,
                            enabled: true,
                            relatedProperty: 'Account.$key',
                            where: function(entry) { return "Account.id eq '" + entry.$key + "'"; }
                        }
                    }, {
                        name: 'TicketRelated',
                        relatedView: {
                            id: 'account_ticket_related_view',
                            icon: 'content/images/icons/Ticket_24x24.png',
                            title: this.relatedTicketsText,
                            resourceKind: 'tickets',
                            detailViewId: 'ticket_detail',
                            listViewId: 'ticket_related',
                            insertViewId: 'ticket_edit',
                            showAdd: true,
                            enabled: true,
                            relatedProperty: 'Account.$key',
                            where: function(entry) { return "Account.id eq '" + entry.$key + "'"; }
                        }
                    }, {
                        name: 'ActvitiyRelated',
                        relatedView: {
                            widgetType: ActvityRelatedView,
                            id: 'account_activity_realted_view',
                            enabled: true,
                            relatedProperty: 'AccountId',
                            where: function(entry) { return "AccountId eq '" + entry.$key + "'"; }
                        }
                    }, {
                        name: 'AttatchementRelated',
                        relatedView: {
                            widgetType: AttachmentRelatedView,
                            id: 'account_attachmnets_realted_view',
                            listViewId: 'account_attachment_related',
                            relatedProperty: 'accountId',
                            enabled: true,
                            where: function(entry) { return "accountId eq '" + entry.$key + "'"; }
                        }
                    }, {
                        name: 'HistoryRelated',
                        relatedView: {
                            widgetType: HistoryRelatedView,
                            id: 'account_history_realted_view',
                            listViewId: 'history_related',
                            enabled: true,
                            relatedProperty: 'AccountId',
                            where: function(entry) { return "AccountId eq '" + entry.$key + "' and Type ne 'atDatabaseChange'"; }
                        }
                    }, {
                        name: 'AddressesRelated',
                        relatedView: {
                            widgetType: AddressRelatedView,
                            id: 'account_addresses_related_view',
                            llistViewId: 'address_related',
                            enabled: true,
                            showAdd: false,
                            relatedProperty: 'EntityId',
                            where: function(entry) { return "EntityId eq '" + entry.$key + "'"; }
                        }
                    }]
                }]);
        }
    });
});

