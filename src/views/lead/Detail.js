/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    id: 'lead_detail',
    editView: 'lead_edit',
    accountText: 'company',
    addressText: 'address',
    businessDescriptionText: 'bus desc',
    createDateText: 'create date',
    createUserText: 'create user',
    eMailText: 'email',
    fbarHomeTitleText: 'home',
    fbarScheduleTitleText: 'schedule',
    leadsourceText: 'lead source',
    industryText: 'industry',
    interestsText: 'interests',
    leadTitleText: 'title',
    nameText: 'name',
    notesText: 'comments',
    ownerText: 'owner',
    relatedActivitiesText: 'Activities',
    relatedItemsText: 'Related Items',
    relatedNotesText: 'Notes',
    sicCodeText: 'sic code',
    titleText: 'Lead', 
    tollFreeText: 'toll free',
    webText: 'web',
    workText: 'phone',
    resourceKind: 'leads',
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
        'Notes',
        'Owner/OwnerDescription',
        'Prefix',
        'SICCode ',
        'Suffix',
        'Title',
        'TollFree',
        'WebAddress',
        'WorkPhone'
    ],   
    init: function() {     
        Mobile.SalesLogix.Lead.Detail.superclass.init.call(this);

        this.tools.fbar = [{
            name: 'home',
            title: this.fbarHomeTitleText,
            cls: 'tool-note',
            icon: 'content/images/welcome_32x32.gif',
            fn: App.navigateToHomeView,
            scope: this
        },
        {
            name: 'schedule',
            title: this.fbarScheduleTitleText,
            cls: 'tool-note',
            icon: 'content/images/Schdedule_To_Do_32x32.gif',
            fn: App.navigateToActivityInsertView,
            scope: this
        }];
    },
    createLayout: function() {
        return this.layout || (this.layout = [
            {
                name: 'LeadNameLastFirst',
                label: this.nameText
            },
            {
                name: 'Company',
                label: this.accountText
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
                label: this.eMailText,
                renderer: Mobile.SalesLogix.Format.mail
            },
            {
                name: 'Title',
                label: this.leadTitleText
            },
            {
                name: 'Address',
                label: this.addressText,
                renderer: Mobile.SalesLogix.Format.address
            },
            {
                name: 'TollFree',
                label: this.tollFreeText,
                renderer: Mobile.SalesLogix.Format.phone
            },
            {
                name: 'LeadSource',
                label: this.leadsourceText,
                tpl: new Simplate(['{%= $.Description %}'])
            },
            {
                name: 'Interests',
                label: this.interestsText
            },
            {
                name: 'Industry',
                label: this.industryText
            },
            {
                name: 'SICCode',
                label: this.sicCodeText
            },
            {
                name: 'BusinessDescription',
                label: this.businessDescriptionText
            },
            {
                name: 'Notes',
                label: this.notesText
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
                as: [{
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(
                                this,
                                ['LeadId eq "{0}"'],
                                true
                            ),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
                },
                {
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(
                                this,
                                ['LeadId eq "{0}" and Type eq "atNote"'],
                                true
                            ),
                    label: this.relatedNotesText,
                    icon: 'content/images/Note_24x24.gif'
                }]
            }
        ]); 
    }
});
