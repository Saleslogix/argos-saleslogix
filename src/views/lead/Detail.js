/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    id: 'lead_detail',
    editView: 'lead_edit',
    titleText: 'Lead', 
    nameText: 'name',
    accountText: 'company',
    workText: 'phone',
    tollFreeText: 'toll free',
    eMailText: 'email',
    addressText: 'address',
    webText: 'web',
    ownerText: 'owner',
    leadTitleText: 'title',
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
    resourceKind: 'leads',
    queryInclude: [
        'Address',
        'AccountManager',
        'AccountManager/UserInfo',
        'Owner'
    ],
    querySelect: [
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
        'Notes'        
    ],   
    init: function() {     
        Mobile.SalesLogix.Lead.Detail.superclass.init.call(this);

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
            {name: 'LeadNameLastFirst', label: this.nameText },
            {name: 'Company', label: this.accountText},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link},
            {name: 'WorkPhone', label: this.workText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Email', label: this.eMailText, renderer: Mobile.SalesLogix.Format.mail},
            {name: 'Title', label: this.leadTitleText},
            {name: 'Address', label: this.addressText, renderer: Mobile.SalesLogix.Format.address},
            {name: 'TollFree', label: this.tollFreeText, renderer: Mobile.SalesLogix.Format.phone},
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
        ]); 
    }
});
