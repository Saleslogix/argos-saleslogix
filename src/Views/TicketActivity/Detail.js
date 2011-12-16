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
        id: 'ticketactivity_detail',
        security: 'Entities/Account/View',
        editView: 'ticketactivity_edit',

        querySelect: [
            'ActivityDescription',
            'ActivityTypeCode',
            'AssignedDate',
            'CompletedDate',
            'ElapsedUnits',
            'FollowUp',
            'PublicAccessCode',
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

        requestPickList: function(predicate) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
                .setResourceKind('picklists')
                .setContractName('system');
            var uri = request.getUri();

            uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
            uri.setCollectionPredicate(predicate);

            request.allowCacheUse = true;

            return request;
        },
        processCodeFeed: function(feed, currentValue, options) {
            var keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
            var textProperty = options && options.textProperty ? options.textProperty : 'text';
            for (var i = 0; i < feed.$resources.length; i++)
            {
                if (feed.$resources[i][keyProperty] === currentValue)
                    return feed.$resources[i][textProperty];
            }
            return currentValue;
        },
        createCodeRequest: function(o, predicate) {
            var request = this.requestPickList(predicate);
            request.read({
                success: function(data) {this.onCodeRequestSuccess(data, o);},
                failure: this.onCodeRequestFailure,
                scope: this
            });
        },
        onCodeRequestSuccess: function(data, o){
            var value = this.processCodeFeed(data, o.entry[o.row.property]);
            this.setNodeText(o.rowNode, value);
            this.entry[o.row.name] = value;
        },
        onCodeRequestFailure: function(response, o) {
            Sage.Platform.Mobile.ErrorManager.addError(response, o, this.options, 'failure');
        },
        setNodeText: function(node, value){
            var contentNode = dojo.query('span', node)[0];

            dojo.removeClass(node, 'content-loading');

            if (contentNode)
                contentNode.innerHTML = value;
        },

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
                    name: 'ActivityTypeCode',
                    property: 'ActivityTypeCode',
                    onInsert: this.createCodeRequest.bindDelegate(this, 'name eq "Ticket Activity"')
                },{
                    label: this.publicAccessText,
                    name: 'PublicAccessCode',
                    property: 'PublicAccessCode',
                    onInsert: this.createCodeRequest.bindDelegate(this, 'name eq "Ticket Activity Public Access"')
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
                    view: 'ticketactivityitem_related'
                }]
            }]);
        }
    });
});