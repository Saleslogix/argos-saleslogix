/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    //Localization
    accountText: 'account',
    acctMgrText: 'acct mgr',
    addressText: 'address',
    contactTitleText: 'title',
    createDateText: 'create date',
    createUserText: 'create user',
    emailText: 'email',
    faxText: 'fax',
    fbarHomeTitleText: 'home',
    fbarScheduleTitleText: 'schedule',
    homeText: 'home phone',
    mobileText: 'mobile',
    nameText: 'contact',
    ownerText: 'owner',
    relatedAccountsText: 'Accounts',
    relatedActivitiesText: 'Activities',
    relatedItemsText: 'Related Items',
    relatedNotesText: 'Notes',
    relatedOpportunitiesText: 'Opportunities',
    relatedTicketsText: 'Tickets',
    titleText: 'Contact',
    webText: 'web',
    workText: 'phone',

    //View Properties
    editView: 'contact_edit',
    id: 'contact_detail',
    querySelect: [
        'Account/AccountName',
        'AccountManager/UserInfo/FirstName',
        'AccountManager/UserInfo/LastName',
        'AccountName',
        'Address/*',
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

    init: function() {
        Mobile.SalesLogix.Contact.Detail.superclass.init.call(this);

        this.tools.fbar = [{
            cls: 'tool-note',
            fn: App.navigateToHomeView,
            icon: 'content/images/welcome_32x32.gif',
            name: 'home',
            scope: this,
            title: this.fbarHomeTitleText
        },{
            cls: 'tool-note',
            fn: App.navigateToActivityInsertView,
            icon: 'content/images/Schdedule_To_Do_32x32.gif',
            name: 'schedule',
            scope: this,
            title: this.fbarScheduleTitleText
        }];
    },    
    createLayout: function() {
        return this.layout || (this.layout = [
            {
                name: 'NameLF',
                label: this.nameText
            },
            {
                name: 'AccountName',
                descriptor: 'AccountName',
                label: this.accountText,
                view: 'account_detail',
                key: 'Account.$key',
                property: true
            },
            {
                name: 'WebAddress',
                label: this.webText,
                renderer: Mobile.SalesLogix.Format.link
            },
            {
                name: 'WorkPhone',
                label: this.workText,
                renderer: Mobile.SalesLogix.Format.phone
            },
            {
                name: 'Email',
                label: this.emailText,
                renderer: Mobile.SalesLogix.Format.mail
            },
            {
                name: 'Title',
                label: this.contactTitleText
            },
            {
                name: 'Address',
                label: this.addressText,
                renderer: Mobile.SalesLogix.Format.address
            },
            {
                name: 'HomePhone',
                label: this.homeText,
                renderer: Mobile.SalesLogix.Format.phone
            },
            {
                name: 'Mobile',
                label: this.mobileText,
                renderer: Mobile.SalesLogix.Format.phone
            },
            {
                name: 'Fax',
                label: this.faxText,
                renderer: Mobile.SalesLogix.Format.phone
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
                options: {
                    title: this.relatedItemsText,
                    list: true
                },
                as: [
                    {
                        icon: 'content/images/Task_List_3D_24x24.gif',
                        label: this.relatedActivitiesText,
                        view: 'activity_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['ContactId eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/Note_24x24.gif',
                        label: this.relatedNotesText,
                        view: 'note_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['ContactId eq "{0}" and Type eq "atNote"'], true
                        )
                    },
                    {
                        icon: 'content/images/Accounts_24x24.gif',
                        label: this.relatedAccountsText,
                        view: 'account_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['Contact.Id eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/Opportunity_List_24x24.gif',
                        label: this.relatedOpportunitiesText,
                        view: 'opportunity_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['ContactId eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/Ticket_List_3D_32x32.gif',
                        label: this.relatedTicketsText,
                        view: 'ticket_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['Contact.Id eq "{0}"'], true
                        )
                    }
                ]
            }
        ]);
    }    
});