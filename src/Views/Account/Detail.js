/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Account/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Detail',
    '../_MetricDetailMixin'
], function(
    declare,
    string,
    format,
    template,
    Detail,
    _MetricDetailMixin
) {

    return declare('Mobile.SalesLogix.Views.Account.Detail', [Detail /*, _MetricDetailMixin*/], {
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
        actionsText: 'Quick Actions',
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
        callMainNumberText: 'Call main number',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        viewAddressText: 'View address',
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
            this.recordCallToHistory(function() {
                App.initiateCall(this.entry['MainPhone']);
            }.bindDelegate(this));
        },
        checkMainPhone: function(entry, value) {
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
        createMetricWidgetsLayout: function (entry) {
            return [{
                    chartType: 'bar',
                    formatter: 'bigNumber',
                    title: 'Sales Potential',
                    queryArgs: {
                        _activeFilter: 'Account.Id eq "' + entry.$key + '" and Status eq "Open"',
                        _filterName: 'Stage',
                        _metricName: 'SumSalesPotential'
                    },
                    queryName: 'executeMetric',
                    resourceKind: 'opportunities',
                    aggregate: 'sum',
                    valueType: 'Mobile/SalesLogix/Aggregate'
                }, {
                    chartType: 'bar',
                    formatter: 'bigNumber',
                    title: 'Total Opportunties',
                    queryArgs: {
                        _activeFilter: 'Account.Id eq "' + entry.$key + '"',
                        _filterName: 'Stage',
                        _metricName: 'CountOpportunities'
                    },
                    queryName: 'executeMetric',
                    resourceKind: 'opportunities',
                    aggregate: 'sum',
                    valueType: 'Mobile/SalesLogix/Aggregate'
                }, {
                    chartType: 'bar',
                    formatter: 'bigNumber',
                    title: 'Total Tickets',
                    queryArgs: {
                        _activeFilter: 'Account.Id eq "' + entry.$key + '"',
                        _filterName: 'AssignedTo',
                        _metricName: 'TicketCount'
                    },
                    queryName: 'executeMetric',
                    resourceKind: 'tickets',
                    aggregate: 'sum',
                    valueType: 'Mobile/SalesLogix/Aggregate'
                }
            ];
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    title: this.actionsText,
                    list: true,
                    cls: 'action-list',
                    name: 'QuickActionsSection',
                    children: [{
                            name: 'CallMainPhoneAction',
                            property: 'MainPhone',
                            label: this.callMainNumberText,
                            icon: 'content/images/icons/Dial_24x24.png',
                            action: 'callMainPhone',
                            disabled: this.checkMainPhone,
                            renderer: format.phone.bindDelegate(this, false)
                        }, {
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
                            name: 'AccountName',
                            property: 'AccountName',
                            label: this.accountText
                        }, {
                            name: 'WebAddress',
                            property: 'WebAddress',
                            label: this.webText,
                            renderer: format.link
                        }, {
                            name: 'Fax',
                            property: 'Fax',
                            label: this.faxText,
                            renderer: format.phone
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
                        }]
                }, {
                    title: this.moreDetailsText,
                    collapsed: true,
                    name: 'MoreDetailsSection',
                    children: [{
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
                    title: this.relatedItemsText,
                    list: true,
                    name: 'RelatedItemsSection',
                    children: [{
                            name: 'ActivityRelated',
                            icon: 'content/images/icons/To_Do_24x24.png',
                            label: this.relatedActivitiesText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'AccountId eq "${0}"'),
                            view: 'activity_related'
                        }, {
                            name: 'ContactRelated',
                            icon: 'content/images/icons/Contacts_24x24.png',
                            label: this.relatedContactsText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
                            view: 'contact_related'
                        }, {
                            name: 'OpportunityRelated',
                            icon: 'content/images/icons/opportunity_24.png',
                            label: this.relatedOpportunitiesText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
                            view: 'opportunity_related'
                        }, {
                            name: 'TicketRelated',
                            icon: 'content/images/icons/Ticket_24x24.png',
                            label: this.relatedTicketsText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'Account.id eq "${0}"'),
                            view: 'ticket_related'
                        }, {
                            name: 'HistoryRelated',
                            icon: 'content/images/icons/journal_24.png',
                            label: this.relatedHistoriesText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'AccountId eq "${0}" and Type ne "atDatabaseChange"'),
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
                            where: this.formatRelatedQuery.bindDelegate(this, 'accountId eq "${0}"'), // must be lower case because of feed
                            view: 'account_attachment_related',
                            title:  this.relatedAttachmentTitleText
                        }]
                }]);
        }
    });
});

