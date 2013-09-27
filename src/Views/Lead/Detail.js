/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Lead/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    string,
    format,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Lead.Detail', [Detail], {
        //Localization
        activityTypeText: {
            'atPhoneCall': 'Phone Call',
            'atEMail': 'E-mail'
        },
        accountText: 'company',
        addressText: 'address',
        businessDescriptionText: 'bus desc',
        createDateText: 'create date',
        createUserText: 'create user',
        eMailText: 'email',
        leadSourceText: 'lead source',
        industryText: 'industry',
        interestsText: 'interests',
        leadTitleText: 'title',
        nameText: 'name',
        notesText: 'comments',
        ownerText: 'owner',
        relatedActivitiesText: 'Activities',
        relatedHistoriesText: 'Notes/History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'Lead Attachments',
        sicCodeText: 'sic code',
        titleText: 'Lead',
        tollFreeText: 'toll free',
        mobileText: 'mobile phone',
        webText: 'web',
        workText: 'work phone',
        actionsText: 'Quick Actions',
        callWorkNumberText: 'Call main number',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        sendEmailText: 'Send email',
        viewAddressText: 'View address',
        moreDetailsText: 'More Details',
        calledText: 'Called ${0}',
        emailedText: 'Emailed ${0}',

        //View Properties
        id: 'lead_detail',
        editView: 'lead_edit',
        historyEditView: 'history_edit',
        noteEditView: 'history_edit',
        security: 'Entities/Lead/View',
        querySelect: [
            'Address/*',
            'BusinessDescription',
            'Company',
            'CreateDate',
            'CreateUser',
            'Email',
            'FirstName',
            'FullAddress',
            'Industry',
            'Interests',
            'LastName',
            'LeadNameLastFirst',
            'LeadSource/Description',
            'MiddleName',
            'Mobile',
            'Notes',
            'Owner/OwnerDescription',
            'Prefix',
            'SICCode',
            'Suffix',
            'Title',
            'TollFree',
            'WebAddress',
            'WorkPhone'
        ],
        resourceKind: 'leads',

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
                'AccountName': this.entry['Company'],
                'LeadId': this.entry['$key'],
                'LeadName': this.entry['LeadNameLastFirst'],
                'Description': string.substitute(this.calledText, [this.entry['LeadNameLastFirst']]),
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
                'AccountName': this.entry['Company'],
                'LeadId': this.entry['$key'],
                'LeadName': this.entry['LeadNameLastFirst'],
                'Description': string.substitute(this.emailedText, [this.entry['LeadNameLastFirst']]),
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
        checkWorkPhone: function(entry, value) {
            return !value;
        },
        sendEmail: function() {
            this.recordEmailToHistory(function() {
                App.initiateEmail(this.entry['Email']);
            }.bindDelegate(this));
        },
        checkEmail: function(entry, value) {
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
                    name: 'QuickActionSection',
                    children: [{
                            name: 'CallWorkPhoneAction',
                            property: 'WorkPhone',
                            label: this.callWorkNumberText,
                            icon: 'content/images/icons/Dial_24x24.png',
                            action: 'callWorkPhone',
                            disabled: this.checkWorkPhone,
                            renderer: format.phone.bindDelegate(this, false)
                        }, {
                            name: 'CheckEmailAction',
                            property: 'Email',
                            label: this.sendEmailText,
                            icon: 'content/images/icons/Send_Write_email_24x24.png',
                            action: 'sendEmail',
                            disabled: this.checkEmail
                        }, {
                            name: 'ScheduleActivityAction',
                            label: this.scheduleActivityText,
                            icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                            action: 'scheduleActivity',
                            tpl: new Simplate([
                                '{%: $.Company %} / {%: $.LeadNameLastFirst %}'
                            ])
                        }, {
                            name: 'AddNoteAction',
                            property: 'LeadNameLastFirst',
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
                            renderer: format.address.bindDelegate(this, [true, ' '])
                        }]
                }, {
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            label: this.nameText,
                            name: 'LeadNameLastFirst',
                            property: 'LeadNameLastFirst'
                        }, {
                            label: this.accountText,
                            name: 'Company',
                            property: 'Company'
                        }, {
                            label: this.webText,
                            name: 'WebAddress',
                            property: 'WebAddress',
                            renderer: format.link
                        }, {
                            label: this.leadTitleText,
                            name: 'Title',
                            property: 'Title'
                        }, {
                            label: this.workText,
                            name: 'WorkPhone',
                            property: 'WorkPhone',
                            renderer: format.phone
                        }, {
                            label: this.mobileText,
                            name: 'Mobile',
                            property: 'Mobile',
                            renderer: format.phone
                        }, {
                            label: this.tollFreeText,
                            name: 'TollFree',
                            property: 'TollFree',
                            renderer: format.phone
                        }, {
                            label: this.leadSourceText,
                            name: 'LeadSource.Description',
                            property: 'LeadSource.Description'
                        }]
                }, {
                    title: this.moreDetailsText,
                    name: 'MoreDetailsSection',
                    collapsed: true,
                    children: [{
                            label: this.interestsText,
                            name: 'Interests',
                            property: 'Interests'
                        }, {
                            label: this.industryText,
                            name: 'Industry',
                            property: 'Industry'
                        }, {
                            label: this.sicCodeText,
                            name: 'SICCode',
                            property: 'SICCode'
                        }, {
                            label: this.businessDescriptionText,
                            name: 'BusinessDescription',
                            property: 'BusinessDescription'
                        }, {
                            label: this.notesText,
                            name: 'Notes',
                            property: 'Notes'
                        }, {
                            label: this.ownerText,
                            name: 'Owner.OwnerDescription',
                            property: 'Owner.OwnerDescription'
                        }]
                }, {
                    list: true,
                    title: this.relatedItemsText,
                    name: 'RelatedItemsSection',
                    children: [{
                            name: 'ActivityRelated',
                            icon: 'content/images/icons/To_Do_24x24.png',
                            label: this.relatedActivitiesText,
                            view: 'activity_related',
                            where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}"')
                        },
                        {
                            name: 'HistoryRelated',
                            icon: 'content/images/icons/journal_24.png',
                            label: this.relatedHistoriesText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}" and Type ne "atDatabaseChange"'),
                            view: 'history_related'
                        }, {
                            name: 'AttachmentRelated',
                            icon: 'content/images/icons/Attachment_24.png',
                            label: this.relatedAttachmentText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'leadId eq "${0}"'),// must be lower case because of feed
                            view: 'lead_attachment_related',
                            title:  this.relatedAttachmentTitleText
                        }]
                }]);
        }
    });
});

