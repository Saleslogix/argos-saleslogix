/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/TicketActivity/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TicketActivity.Detail', [Sage.Platform.Mobile.Detail], {
        //Localization
        titleText: 'Ticket Activity',

        accountText: 'account',
        contactText: 'user',
        typeText: 'type',
        publicAccessText: 'public access',
        assignedDateText: 'start date',
        completedDateText: 'end date',
        followUpText: 'follow up',
        unitsText: 'time units',
        elapsedUnitsText: 'elapsed units',
        rateTypeDescriptionText: 'charge type',
        rateText: 'rate',
        totalLaborText: 'total labor',
        totalPartsText: 'total parts',
        totalFeeText: 'total fee',
        activityDescriptionText: 'comment',

        completeTicketText: 'Complete Ticket Activity',
        moreDetailsText: 'More Details',
        relatedItemsText: 'Related Items',
        relatedTicketActivityPartsText: 'Ticket Activity Parts',

        //View Properties
        id: 'ticket-activity_detail',
        editView: 'ticket-activity_edit',

        querySelect: [
            'ActivityDescription',
            'ActivityType',
            'AssignedDate',
            'CompletedDate',
            'ElapsedUnits',
            'FollowUp',
            'PublicAccess',
            'Rate',
            'RateTypeDescription/Amount',
            'RateTypeDescription/RateTypeCode',
            'RateTypeDescription/TypeDescription',
            'TotalFee',
            'TotalLabor',
            'TotalParts',
            'Units',
            'Ticket/Account/AccountName',
            'User/UserName',
            'User/UserInfo/FirstName',
            'User/UserInfo/LastName'
        ],
        resourceKind: 'ticketActivities',
        createLayout: function() {
            return this.layout || (this.layout = [{
                options: {
                    title: this.detailsText
                },
                as: [{
                    name: 'Ticket.Account.AccountName',
                    descriptor: 'Ticket.Account.AccountName',
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'Ticket.Account.$key',
                    property: true
                },{
                    label: this.typeText,
                    name: 'ActivityType'
                },{
                    label: this.publicAccessText,
                    name: 'PublicAccess'
                },{
                    name: 'User.UserName',
                    descriptor: 'User.UserName',
                    label: this.contactText,
                    view: 'contact_detail',
                    key: 'User.$key',
                    property: true
                },{
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    renderer: Mobile.SalesLogix.Format.date
                },{
                    label: this.completedDateText,
                    name: 'CompletedDate',
                    renderer: Mobile.SalesLogix.Format.date
                },{
                    label: this.followUpText,
                    name: 'FollowUp'
                },{
                    label: this.activityDescriptionText,
                    name: 'ActivityDescription'
                }]
            },{
                options: {
                    title: this.moreDetailsText,
                    collapsed: true
                },
                as: [{
                    label: this.unitsText,
                    name: 'Units'
                },{
                    label: this.elapsedUnitsText,
                    name: 'ElapsedUnits'
                },{
                    label: this.rateTypeDescriptionText,
                    name: 'RateTypeDescription.RateTypeCode'
                },{
                    label: this.rateText,
                    name: 'Rate'
                },{
                    label: this.totalLaborText,
                    name: 'TotalLabor'
                },{
                    label: this.totalPartsText,
                    name: 'TotalParts'
                },{
                    label: this.totalFeeText,
                    name: 'TotalFee'
                }]
            },{
                options: {
                    list: true,
                    title: this.relatedItemsText
                },
                as: [{
                    icon: 'content/images/icons/product_24.png',
                    label: this.relatedTicketActivityPartsText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'ContactId eq "${0}"'),
                    view: 'ticket-activity-parts_related'
                }]
            }]);
        }
    });
});