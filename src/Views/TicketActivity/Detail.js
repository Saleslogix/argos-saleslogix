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
        relatedTicketActivityItemText: 'Ticket Activity Parts',

        //View Properties
        id: 'ticket_activity_detail',
        security: 'Entities/Account/View',
        editView: 'ticket_activity_edit',

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
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'Ticket.Account.AccountName',
                    property: 'Ticket.Account.AccountName',
                    descriptor: 'Ticket.Account.AccountName',
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'Ticket.Account.$key'
                },{
                    label: this.typeText,
                    name: 'ActivityType',
                    property: 'ActivityType'
                },{
                    label: this.publicAccessText,
                    name: 'PublicAccess',
                    property: 'PublicAccess'
                },{
                    name: 'User.UserName',
                    property: 'User.UserName',
                    descriptor: 'User.UserName',
                    label: this.contactText,
                    view: 'contact_detail',
                    key: 'User.$key'
                },{
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    renderer: Mobile.SalesLogix.Format.date
                },{
                    label: this.completedDateText,
                    name: 'CompletedDate',
                    property: 'CompletedDate',
                    renderer: Mobile.SalesLogix.Format.date
                },{
                    label: this.followUpText,
                    name: 'FollowUp',
                    property: 'FollowUp'
                },{
                    label: this.activityDescriptionText,
                    name: 'ActivityDescription',
                    property: 'ActivityDescription'
                }]
            },{
                title: this.moreDetailsText,
                collapsed: true,
                name: 'MoreDetailsTextSection',
                children: [{
                    label: this.unitsText,
                    name: 'Units',
                    property: 'Units'
                },{
                    label: this.elapsedUnitsText,
                    name: 'ElapsedUnits',
                    property: 'ElapsedUnits'
                },{
                    label: this.rateTypeDescriptionText,
                    name: 'RateTypeDescription.RateTypeCode',
                    property: 'RateTypeDescription.RateTypeCode'
                },{
                    label: this.rateText,
                    name: 'Rate',
                    property: 'Rate'
                },{
                    label: this.totalLaborText,
                    name: 'TotalLabor',
                    property: 'TotalLabor'
                },{
                    label: this.totalPartsText,
                    name: 'TotalParts',
                    property: 'TotalParts'
                },{
                    label: this.totalFeeText,
                    name: 'TotalFee',
                    property: 'TotalFee'
                }]
            },{
                list: true,
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    name: 'TicketActivityItemRelated',
                    icon: 'content/images/icons/product_24.png',
                    label: this.relatedTicketActivityItemText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'TicketActivity.Id eq "${0}"'),
                    view: 'ticket_activity_item_list_related'
                }]
            }]);
        }
    });
});