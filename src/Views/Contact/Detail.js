/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Contact/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    string,
    format,
    template,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Contact.Detail', [Detail], {
        //Localization
        activityTypeText: {
            'atPhoneCall': 'Phone Call',
            'atEMail': 'E-mail'
        },
        accountText: 'account',
        acctMgrText: 'acct mgr',
        addressText: 'address',
        contactTitleText: 'title',
        createDateText: 'create date',
        createUserText: 'create user',
        emailText: 'email',
        faxText: 'fax',
        homeText: 'home phone',
        nameText: 'contact',
        ownerText: 'owner',
        actionsText: 'Quick Actions',
        relatedAccountsText: 'Accounts',
        relatedActivitiesText: 'Activities',
        relatedHistoriesText: 'Notes/History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        relatedOpportunitiesText: 'Opportunities',
        relatedTicketsText: 'Tickets',
        relatedAddressesText: 'Addresses',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'Contact Attachments',
        titleText: 'Contact',
        webText: 'web',
        workText: 'phone',
        cuisinePreferenceText: 'cuisine',
        callMobileNumberText: 'Call mobile',
        callWorkNumberText: 'Call main number',
        calledText: 'Called',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        sendEmailText: 'Send email',
        viewAddressText: 'View address',
        moreDetailsText: 'More Details',

        //View Properties
        id: 'contact_detail',
        editView: 'contact_edit',
        historyEditView: 'history_edit',
        noteEditView: 'history_edit',
        security: 'Entities/Contact/View',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountName',
            'Address/*',
            'CuisinePreference',
            'CreateDate',
            'CreateUser',
            'Email',
            'Fax',
            'FirstName',
            'HomePhone',
            'LastName',
            'MiddleName',
            'Mobile',
            'Name',
            'NameLF',
            'Owner/OwnerDescription',
            'Prefix',
            'Suffix',
            'Title',
            'WebAddress',
            'WorkPhone'
        ],
        resourceKind: 'contacts',

        navigateToHistoryInsert: function(type, entry, complete) {
            var view = App.getView(this.historyEditView);
            if (view) {
                this.refreshRequired = true;

                view.show({
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
                '$name': 'History',
                'Type': 'atPhoneCall',
                'ContactName': this.entry['NameLF'],
                'ContactId': this.entry['$key'],
                'AccountName': this.entry['AccountName'],
                'AccountId': this.entry['Account']['$key'],
                'Description': string.substitute("${0} ${1}", [this.calledText, this.entry['NameLF']]),
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': (new Date())
            };

            this.navigateToHistoryInsert('atPhoneCall', entry, complete);
        },
        recordEmailToHistory: function(complete) {
            var entry = {
                '$name': 'History',
                'Type': 'atEMail',
                'ContactName': this.entry['NameLF'],
                'ContactId': this.entry['$key'],
                'AccountName': this.entry['AccountName'],
                'AccountId': this.entry['Account']['$key'],
                'Description': string.substitute("Emailed ${0}", [this.entry['NameLF']]),
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': (new Date())
            };

            this.navigateToHistoryInsert('atEMail', entry, complete);
        },
        callWorkPhone: function() {
            this.recordCallToHistory(function() {
                App.initiateCall(this.entry['WorkPhone']);
            }.bindDelegate(this));
        },
        callMobilePhone: function() {
            this.recordCallToHistory(function() {
                App.initiateCall(this.entry['Mobile']);
            }.bindDelegate(this));
        },
        sendEmail: function() {
            this.recordEmailToHistory(function() {
                App.initiateEmail(this.entry['Email']);
            }.bindDelegate(this));
        },
        checkValueExists: function(entry, value) {
            return !value;
        },
        viewAddress: function() {
            App.showMapForAddress(format.address(this.entry['Address'], true, ' '));
        },
        checkAddress: function(entry, value) {
            return !format.address(value, true, '');
        },
        scheduleActivity: function() {
            App.navigateToActivityInsertView();
        },
        addNote: function() {
            var view = App.getView(this.noteEditView);
            if (view) {
                view.show({
                    template: {},
                    insert: true
                });
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    list: true,
                    title: this.actionsText,
                    cls: 'action-list',
                    name: 'QuickActionsSection',
                    children: [{
                            name: 'CallWorkPhoneAction',
                            property: 'WorkPhone',
                            label: this.callWorkNumberText,
                            icon: 'content/images/icons/Dial_24x24.png',
                            action: 'callWorkPhone',
                            disabled: this.checkValueExists,
                            renderer: format.phone.bindDelegate(this, false)
                        }, {
                            name: 'CallMobilePhoneAction',
                            property: 'Mobile',
                            label: this.callMobileNumberText,
                            icon: 'content/images/icons/mobile_24.png',
                            action: 'callMobilePhone',
                            disabled: this.checkValueExists,
                            renderer: format.phone.bindDelegate(this, false)
                        }, {
                            name: 'SendEmailAction',
                            property: 'Email',
                            label: this.sendEmailText,
                            icon: 'content/images/icons/Send_Write_email_24x24.png',
                            action: 'sendEmail',
                            disabled: this.checkValueExists
                        }, {
                            name: 'ScheduleActivityAction',
                            label: this.scheduleActivityText,
                            icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                            action: 'scheduleActivity',
                            tpl: new Simplate([
                                '{%: $.AccountName %} / {%: $.NameLF %}'
                            ])
                        }, {
                            name: 'AddNoteAction',
                            property: 'NameLF',
                            label: this.addNoteText,
                            icon: 'content/images/icons/New_Note_24x24.png',
                            action: 'addNote'
                        }, {
                            name: 'ViewAddressAction',
                            property: 'Address',
                            label: this.viewAddressText,
                            icon: 'content/images/icons/Map_24.png',
                            action: 'viewAddress',
                            disabled: this.checkAddress,
                            renderer: format.address.bindDelegate(this, true, ' ')
                        }]
                }, {
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'NameLF',
                            property: 'NameLF',
                            label: this.nameText
                        }, {
                            name: 'AccountName',
                            property: 'AccountName',
                            descriptor: 'AccountName',
                            label: this.accountText,
                            view: 'account_detail',
                            key: 'Account.$key'
                        }, {
                            name: 'WebAddress',
                            property: 'WebAddress',
                            label: this.webText,
                            renderer: format.link
                        }, {
                            name: 'Title',
                            property: 'Title',
                            label: this.contactTitleText
                        }]
                }, {
                    title: this.moreDetailsText,
                    name: 'MoreDetailsSection',
                    collapsed: true,
                    children: [{
                            name: 'HomePhone',
                            property: 'HomePhone',
                            label: this.homeText,
                            renderer: format.phone
                        }, {
                            name: 'Fax',
                            property: 'Fax',
                            label: this.faxText,
                            renderer: format.phone
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
                            name: 'CuisinePreference',
                            property: 'CuisinePreference',
                            label: this.cuisinePreferenceText
                        }]
                }, {
                    title: this.relatedItemsText,
                    name: 'RelatedItemsSection',
                    list: true,
                    children: [{
                            name: 'ActivityRelated',
                            icon: 'content/images/icons/To_Do_24x24.png',
                            label: this.relatedActivitiesText,
                            view: 'activity_related',
                            where: this.formatRelatedQuery.bindDelegate(this, 'ContactId eq "${0}"')
                        }, {
                            name: 'OpportunityRelated',
                            icon: 'content/images/icons/opportunity_24.png',
                            label: this.relatedOpportunitiesText,
                            view: 'opportunity_related',
                            where: this.formatRelatedQuery.bindDelegate(this, 'Contacts.Contact.Id eq "${0}"')
                        }, {
                            name: 'TicketRelated',
                            icon: 'content/images/icons/Ticket_24x24.png',
                            label: this.relatedTicketsText,
                            view: 'ticket_related',
                            where: this.formatRelatedQuery.bindDelegate(this, 'Contact.Id eq "${0}"')
                        }, {
                            name: 'HistoryRelated',
                            icon: 'content/images/icons/journal_24.png',
                            label: this.relatedHistoriesText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'ContactId eq "${0}" and Type ne "atDatabaseChange"'),
                            view: 'history_related'
                        }, {
                            name: 'AddressesRelated',
                            icon: 'content/images/icons/Map_24.png',
                            label: this.relatedAddressesText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'EntityId eq "${0}"', 'Address.EntityId'),
                            view: 'address_related'
                        }, {
                            name: 'AttachmentRelated',
                            icon: 'content/images/icons/Attachment_24.png',
                            label: this.relatedAttachmentText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'contactId eq "${0}"'),// must be lower case because of feed
                            view: 'contact_attachment_related',
                            title: this.relatedAttachmentTitleText
                        }]
                }]);
        }
    });
});

