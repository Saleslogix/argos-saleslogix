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
    accountText: 'company',
    workText: 'phone',
    tollfreeText: 'toll free',
    eMailText: 'email',
    addressText: 'address',
    webText: 'web',
    ownerText: 'owner',
    titlText: 'title',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedActivitiesText: 'Activities',
    relatedNotesText: 'Notes',
    importsourceText: 'lead source',
    interestsText: 'interests',
    industryText: 'industry',
    siccodeText: 'sic code',
    businessDescriptionText: 'bus desc',
    notesText: 'comments',
    constructor: function(o) {
        Mobile.SalesLogix.Lead.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'lead_detail',
            title: this.titleText,
            editor: 'lead_edit',
            resourceKind: 'leads'
        });
        
        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'copy',
                title: 'copy',                        
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: function() { alert("two");},
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
                  App.getView('lead_list').navigateToInsert.call({editor:'lead_edit'});
                },
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',                        
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: function() { alert("two");},
                scope: this
            }]
        });
        
        this.layout = [
            {name: 'LeadNameLastFirst', label: this.nameText },
            {name: 'Company', label: this.accountText},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link},
            {name: 'WorkPhone', label: this.workText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Email', label: this.eMailText, renderer: Mobile.SalesLogix.Format.mail},
            {name: 'Title', label: this.titlText},
            {name: 'Address', label: this.addressText, renderer: Mobile.SalesLogix.Format.address},
            {name: 'TollFree', label: this.tollfreeText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'ImportSource', label: this.importsourceText},
            {name: 'Interests', label: this.interestsText},
            {name: 'Industry', label: this.industryText},
            {name: 'SIC Code', label: this.siccodeText},
            {name: 'BusinessDescription', label: this.businessDescriptionText},
            {name: 'Notes', label: this.notesText},
            {name: 'Owner.OwnerDescription', label: this.ownerText},
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
                    icon: 'content/images/Note_24x24.gif'
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
                    'LeadNameLastFirst',
                    'FirstName',
                    'LastName',
                    'Company',
                    'WorkPhone',
                    'Email',
                    'Address/*',
                    'WebAddress',
                    'Owner/OwnerDescription',
                    'CreateUser',
                    'CreateDate',
                    'Title',
                    'FullAddress',
                    'TollFree',
                    'ImportSource',
                    'Interests',
                    'Industry',
                    'SICCode ',
                    'BusinessDescription',
                    'Notes',
                    
                ].join(',')                  
            });     
        
        return request;                   
    } 
});
