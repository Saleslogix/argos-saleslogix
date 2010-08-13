/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {  
    titleText: 'Lead', 
    nameText: 'name',
    accountText: 'account',
    workText: 'work',
    eMailText: 'e-mail',
    addressText: 'address',
    webText: 'web',
    ownerText: 'owner',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedActivitiesText: 'Activities',
    relatedNotesText: 'Notes',
    constructor: function(o) {
        Mobile.SalesLogix.Lead.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'lead_detail',
            title: this.titleText,
            editor: 'lead_edit',
            resourceKind: 'leads'
        });
        this.layout = [
            {name: 'LeadNameFirstLast', label: this.nameText },
            {name: 'Company', label: this.accountText},
            {name: 'WorkPhone', label: this.workText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Email', label: this.eMailText, renderer: Mobile.SalesLogix.Format.mail},
            {name: 'Address', label: this.addressText, renderer: Mobile.SalesLogix.Format.address},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link},
            {name: 'Owner.OwnerDescription', label: this.ownerText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
            {options: {title: this.relatedItemsText, list: true}, as: [
                {
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['LeadId eq "{0}"'], true),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
                },
                {
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['LeadId eq "{0}" and Type eq "atNote"'], true),
                    label: this.relatedNotesText,
                    icon: 'content/images/note_24x24.gif'
                }
            ]}
         ]; 
       },
    init: function() {     
        Mobile.SalesLogix.Lead.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Lead.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'include': 'Address,AccountManager,AccountManager/UserInfo,Owner',
                'select': [
                    'LeadNameFirstLast',
                    'FirstName',
                    'LastName',	
                    'Company',
                    'WorkPhone',
                    'Email',
                    'Address/*',
                    'WebAddress',
                    'Owner/OwnerDescription',
                    'CreateUser',
                    'CreateDate'
                ].join(',')                  
            });     
        
        return request;                   
    } 
});
