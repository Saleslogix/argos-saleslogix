/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    //Localization
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

    //View Properties
    editView: 'lead_edit',
    id: 'lead_detail',
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
    resourceKind: 'leads',

    createLayout: function() {
        return this.layout || (this.layout = [
            {
                label: this.nameText,
                name: 'LeadNameLastFirst',
            },
            {
                label: this.accountText,
                name: 'Company',
            },
            {
                label: this.webText,
                name: 'WebAddress',
                renderer: Mobile.SalesLogix.Format.link
            },
            {
                label: this.workText,
                name: 'WorkPhone',
                renderer: Mobile.SalesLogix.Format.phone
            },
            {
                label: this.eMailText,
                name: 'Email',
                renderer: Mobile.SalesLogix.Format.mail
            },
            {
                label: this.leadTitleText,
                name: 'Title'
            },
            {
                label: this.addressText,
                name: 'Address',
                renderer: Mobile.SalesLogix.Format.address
            },
            {
                label: this.tollFreeText,
                name: 'TollFree',
                renderer: Mobile.SalesLogix.Format.phone
            },
            {
                label: this.leadsourceText,
                name: 'LeadSource',
                tpl: new Simplate(['{%= $.Description %}'])
            },
            {
                label: this.interestsText,
                name: 'Interests'
            },
            {
                label: this.industryText,
                name: 'Industry'
            },
            {
                label: this.sicCodeText,
                name: 'SICCode'
            },
            {
                label: this.businessDescriptionText,
                name: 'BusinessDescription'
            },
            {
                label: this.notesText,
                name: 'Notes'
            },
            {
                label: this.ownerText,
                name: 'Owner.OwnerDescription'
            },
            {
                options: {
                    list: true,
                    title: this.relatedItemsText
                },
                as: [{
                    icon: 'content/images/Task_List_3D_24x24.gif',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['LeadId eq "{0}"'], true
                    )
                },
                {
                    icon: 'content/images/Note_24x24.gif',
                    label: this.relatedNotesText,
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['LeadId eq "{0}" and Type eq "atNote"'], true
                    )
                }]
            }
        ]); 
    }
});