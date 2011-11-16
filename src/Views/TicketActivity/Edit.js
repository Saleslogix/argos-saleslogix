/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/TicketActivity/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TicketActivity.Edit', [Sage.Platform.Mobile.Edit], {

        //Localization
        activityTypeText: 'type',
        activityTypeTitleText: 'Type',
        publicAccessText: 'public access',
        publicAccessTitleText: 'Public Access',
        userText: 'user',
        startDateText: 'start date',
        endDateText: 'end date',
        chargeTypeText: 'charge type',
        commentsText: 'comments',

        //View Properties
        entityName: 'TicketActivity',
        id: 'ticket_activity_edit',
        insertSecurity: 'Entities/TicketActivity/Add',
        updateSecurity: 'Entities/TicketActivity/Edit',
        querySelect: [
            'ActivityDescription',
            'ActivityType',
            'AssignedDate',
            'CompletedDate',
            'PublicAccess',
            'RateTypeDescription/Amount',
            'RateTypeDescription/RateTypeCode',
            'RateTypeDescription/TypeDescription',
            'User/UserName',
            'User/UserInfo/FirstName',
            'User/UserInfo/LastName'
        ],
        resourceKind: 'ticketActivities',

        createLayout: function() {
            return this.layout || (this.layout = [                
                {
                    label: this.activityTypeText,
                    name: 'ActivityType',
                    property: 'ActivityType',
                    requireSelection: true,
                    title: this.activityTypeTitleText,
                    picklist: 'Ticket Activity',
                    type: 'picklist'
                },{
                    label: this.publicAccessText,
                    name: 'PublicAccess',
                    property: 'PublicAccess',
                    title: this.publicAcccessTitleText,
                    picklist: 'Ticket Activity Public Access',
                    type: 'picklist'
                },{
                    label: this.userText,
                    name: 'User',
                    property: 'User',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },{
                    label: this.startDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    type: 'date'
                },{
                    label: this.endDateText,
                    name: 'CompletedDate',
                    property: 'CompletedDate',
                    type: 'date'
                },{
                    label: this.chargeTypeText,
                    name: 'RateTypeDescription',
                    property: 'RateTypeDescription',
                    textProperty: 'RateTypeCode',
                    type: 'lookup',
                    view: 'ticket_activity_ratelookup'
                },{
                    label: this.commentsText,
                    name: 'ActivityDescription',
                    property: 'ActivityDescription',
                    rows: 6,
                    type: 'textarea'
                }
            ]);
        }
    });
});