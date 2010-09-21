/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
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
    titlText: 'title',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedActivitiesText: 'Activities',
    relatedNotesText: 'Notes',
    relatedAccountsText: 'Accounts',
    relatedOpportunitiesText: 'Opportunities',
    relatedTicketsText: 'Tickets',
    faxText: 'fax',
    constructor: function(o) {
        Mobile.SalesLogix.Contact.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'contact_detail',
            title: this.titleText,
            editor: 'contact_edit',
            resourceKind: 'contacts'
        });

        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'copy',
                title: 'copy',                        
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: function() { this.copyContact(); },
                scope: this
            },{
                name: 'home',
                title: 'home',                        
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            },{
                name: 'new',
                title: 'new',                        
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: function(){
                  App.getView('contact_list').navigateToInsert.call({editor:'contact_edit'});
                },
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',                        
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToNewActivity,
                scope: this
            }]
        });
        
        this.layout = [
            {name: 'NameLF', label: this.nameText},
            {name: 'AccountName', descriptor: 'AccountName', label: this.accountText, view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link},
            {name: 'WorkPhone', label: this.workText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Email', label: this.emailText, renderer: Mobile.SalesLogix.Format.mail},
            {name: 'Title', label: this.titlText},
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
                },
            ]}
        ];
    },

    init: function() {
        Mobile.SalesLogix.Contact.Detail.superclass.init.call(this);
    },
    copyContact: function() {
      var props = ["FirstName", "LastName", "Name", "NameLF", "Email", "HomePhone", "Mobile", "WorkPhone", "Fax"]
      //Clone entry
      var entry = Ext.decode(Ext.encode(this.entry));
      props.forEach(function(prop){
        entry[prop] = "";
      });
      
      var view = App.getView(this.editor);
      if (view)
          view.show({entry: entry});
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Contact.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo,Owner',
                'select': [
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
                    
                ].join(',')
            });

        return request;
    }
});
