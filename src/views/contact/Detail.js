/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    id: 'contact_detail',
    editView: 'contact_edit',
    titleText: 'Contact',
    nameText: 'contact',
    accountText: 'account',
    workText: 'phone',
    homeText: 'home phone',
    mobileText: 'mobile',
    emailText: 'email',
    addressText: 'address',
    webText: 'web',
    acctMgrText: 'acct mgr',
    ownerText: 'owner',
    contactTitleText: 'title',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedActivitiesText: 'Activities',
    relatedNotesText: 'Notes',
    relatedAccountsText: 'Accounts',
    relatedOpportunitiesText: 'Opportunities',
    relatedTicketsText: 'Tickets',
    faxText: 'fax',
    resourceKind: 'contacts',
    queryInclude: [
        'Account',
        'Address',
        'AccountManager',
        'AccountManager/UserInfo',
        'Owner'
    ],
    querySelect: [
        'Account/AccountName',
        'Name',
        'NameLF',
        'FirstName',
        'LastName',
        'AccountName',
        'WorkPhone',
        'Mobile',
        'Email',
        'Address/*',
        'WebAddress',
        'AccountManager/UserInfo/FirstName',
        'AccountManager/UserInfo/LastName',
        'Owner/OwnerDescription',
        'CreateDate',
        'CreateUser',
        'Title',
        'HomePhone',
        'Mobile',
        'Fax'

    ],
    init: function() {
        Mobile.SalesLogix.Contact.Detail.superclass.init.call(this);

        this.tools.fbar = [{
            name: 'home',
            title: 'home',
            cls: 'tool-note',
            icon: 'content/images/welcome_32x32.gif',
            fn: App.goHome,
            scope: this
        },{
            name: 'schedule',
            title: 'schedule',
            cls: 'tool-note',
            icon: 'content/images/Schdedule_To_Do_32x32.gif',
            fn: App.navigateToNewActivity,
            scope: this
        }];
    },    
    createLayout: function() {
        return this.layout || (this.layout = [
            {name: 'NameLF', label: this.nameText},
            {name: 'AccountName', descriptor: 'AccountName', label: this.accountText, view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link},
            {name: 'WorkPhone', label: this.workText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Email', label: this.emailText, renderer: Mobile.SalesLogix.Format.mail},
            {name: 'Title', label: this.contactTitleText},
            {name: 'Address', label: this.addressText, renderer: Mobile.SalesLogix.Format.address},
            {name: 'HomePhone', label: this.homeText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Mobile', label: this.mobileText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Fax', label: this.faxText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'AccountManager.UserInfo', label: this.acctMgrText, tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'Owner.OwnerDescription', label: this.ownerText},
            {options: {title: this.relatedItemsText, list: true}, as: [

                {
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['ContactId eq "{0}"'], true),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
                },
                {
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['ContactId eq "{0}" and Type eq "atNote"'], true),
                    label: this.relatedNotesText,
                    icon: 'content/images/Note_24x24.gif'
                },
                {
                    view: 'account_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Contact.Id eq "{0}"'], true),
                    label: this.relatedAccountsText,
                    icon: 'content/images/Accounts_24x24.gif'
                },
                {
                    view: 'opportunity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['ContactId eq "{0}"'], true),
                    label: this.relatedOpportunitiesText,
                    icon: 'content/images/Opportunity_List_24x24.gif'
                },
                {
                    view: 'ticket_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Contact.Id eq "{0}"'], true),
                    label: this.relatedTicketsText,
                    icon: 'content/images/Ticket_List_3D_32x32.gif'
                }
            ]}
        ]);
    }    
});
