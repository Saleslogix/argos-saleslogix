/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

(function() {
    Mobile.SalesLogix.Account.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        accountText: 'account',
        acctMgrText: 'acct mgr',
        addressText: 'address',
        businessDescriptionText: 'bus desc',
        createDateText: 'create date',
        createUserText: 'create user',
        editView: 'account_edit',
        faxText: 'fax',
        fbarHomeText: 'home',
        fbarScheduleText: 'schedule',
        importSourceText: 'lead source',
        industryText: 'industry',
        notesText: 'notes',
        ownerText: 'owner',
        phoneText: 'phone',
        relatedActivitiesText: 'Activities',
        relatedContactsText: 'Contacts',
        relatedHistoriesText: 'History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        relatedOpportunitiesText: 'Opportunities',
        relatedTicketsText: 'Tickets',
        statusText: 'status',
        subTypeText: 'subtype',
        titleText: 'Account',
        typeText: 'type',
        webText: 'web',

        //View Properties
        id: 'account_detail',
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

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'AccountName',
                    label: this.accountText
                },
                {
                    name: 'WebAddress',
                    label: this.webText,
                    renderer: Mobile.SalesLogix.Format.link
                },
                {
                    name: 'MainPhone',
                    label: this.phoneText,
                    renderer: Mobile.SalesLogix.Format.phone
                },
                {
                    name: 'Address',
                    label: this.addressText,
                    renderer: Mobile.SalesLogix.Format.address
                },
                {
                    name: 'Fax',
                    label: this.faxText,
                    renderer: Mobile.SalesLogix.Format.phone
                },
                {
                    name: 'Type',
                    label: this.typeText
                },
                {
                    name: 'SubType',
                    label: this.subTypeText
                },
                {
                    name: 'Status',
                    label: this.statusText
                },
                {
                    name: 'Industry',
                    label: this.industryText,
                    type: 'text'
                },
                {
                    name: 'BusinessDescription',
                    label: this.businessDescriptionText,
                    type: 'text'
                },
                {
                    name: 'AccountManager.UserInfo',
                    label: this.acctMgrText,
                    tpl: Mobile.SalesLogix.Template.nameLF
                },
                {
                    name: 'Owner.OwnerDescription',
                    label: this.ownerText
                },
                {
                    name: 'LeadSource.Description',
                    label: this.importSourceText
                },
                {
                    options: {
                        list: true,
                        title: this.relatedItemsText
                    },
                    as: [
                        {
                            icon: 'content/images/Task_List_3D_24x24.gif',
                            label: this.relatedActivitiesText,
                            where: this.formatRelatedQuery.createDelegate(
                                this, ['AccountId eq "{0}"'], true
                            ),
                            view: 'activity_related'
                        },
                        {
                            icon: 'content/images/Note_24x24.gif',
                            label: this.relatedNotesText,
                            where: this.formatRelatedQuery.createDelegate(
                                this, ['AccountId eq "{0}" and Type eq "atNote"'], true
                            ),
                            view: 'note_related'
                        },
                        {
                            icon: 'content/images/Contacts_24x24.gif',
                            label: this.relatedContactsText,
                            where: this.formatRelatedQuery.createDelegate(
                                this, ['Account.id eq "{0}"'], true
                            ),
                            view: 'contact_related'
                        },
                        {
                            icon: 'content/images/Opportunity_List_24x24.gif',
                            label: this.relatedOpportunitiesText,
                            where: this.formatRelatedQuery.createDelegate(
                                this, ['Account.id eq "{0}"'], true
                            ),
                            view: 'opportunity_related'
                        },
                        {
                            icon: 'content/images/Ticket_List_3D_32x32.gif',
                            label: this.relatedTicketsText,
                            where: this.formatRelatedQuery.createDelegate(
                                this, ['Account.id eq "{0}"'], true
                            ),
                            view: 'ticket_related'
                        },
                        {
                            icon: 'content/images/Task_List_3D_24x24.gif',
                            label: this.relatedHistoriesText,
                            where: this.formatRelatedQuery.createDelegate(
                                this, ['AccountId eq "{0}" and Type ne "atNote" and Type ne "atDatabaseChange"'], true
                            ),
                            view: 'history_related'
                        }
                    ]
                }
            ]);
        }
    });
})();