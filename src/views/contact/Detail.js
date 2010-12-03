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
    emailHistoryTitle: 'E-mail',
    emailText: 'email',
    faxText: 'fax',
    fbarHomeTitleText: 'home',
    fbarScheduleTitleText: 'schedule',
    homeText: 'home phone',
    mobileText: 'mobile',
    nameText: 'contact',
    ownerText: 'owner',
    phoneCallHistoryTitle: 'Phone Call',
    relatedAccountsText: 'Accounts',
    relatedActivitiesText: 'Activities',
    relatedHistoriesText: 'History',
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
            cls: '',
            fn: function() {
                App.navigateToActivityInsertView.call(App, {"id": this.id});
            },
            icon: 'content/images/icons/job_24.png',
            name: 'schedule',
            scope: this,
            title: this.fbarScheduleTitleText
        }];
    },
    createHistory: function(type, title, desc) {
        var entry = {
            '$name': 'History',
            'Type': type,
            'ContactName': this.entry.NameLF,
            'ContactId': this.entry.$key,
            'AccountName': this.entry.AccountName,
            'AccountId': this.entry.Account.$key,
            'Description': desc,
            'UserId': App.context.user.$key,
            'UserName': App.context.user.UserName,
            'Duration': 15,
            'CompletedDate': (new Date())
        };
        var request = new Sage.SData.Client.SDataResourcePropertyRequest(this.getService())
                .setResourceKind('history');

        request.create(entry, {
            success: function(created) {
                var v = App.getView('history_edit');
                if (v)
                {
                    v.setTitle(title);
                    v.show({
                        entry: created
                    });
                }
            },
            failure: function(response, o) {
            },
            scope: this
        });
    },
    recordCallToHistory: function(type) {
        this.createHistory(
            'atPhoneCall', this.phoneCallHistoryTitle, String.format("Called {0}", this.entry.NameLF)
        );
    },
    recordMailToHistory: function() {
        this.createHistory(
            'atEMail', this.emailHistoryTitle, String.format("Emailed {0}", this.entry.NameLF)
        );
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
                        icon: 'content/images/icons/job_24.png',
                        label: this.relatedActivitiesText,
                        view: 'activity_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['ContactId eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/icons/note_24.png',
                        label: this.relatedNotesText,
                        view: 'note_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['ContactId eq "{0}" and Type eq "atNote"'], true
                        )
                    },
                    {
                        icon: 'content/images/icons/opportunity_24.png',
                        label: this.relatedOpportunitiesText,
                        view: 'opportunity_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['Contacts.Contact.Id eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/icons/job_24.png',
                        label: this.relatedTicketsText,
                        view: 'ticket_related',
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['Contact.Id eq "{0}"'], true
                        )
                    },
                    {
                        icon: 'content/images/icons/journal_24.png',
                        label: this.relatedHistoriesText,
                        where: this.formatRelatedQuery.createDelegate(
                            this, ['ContactId eq "{0}" and Type ne "atNote" and Type ne "atDatabaseChange"'], true
                        ),
                        view: 'history_related'
                    }
                ]
            }
        ]);
    }    
});