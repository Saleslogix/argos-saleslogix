/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/TicketActivity/Detail', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Format',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Detail',
    'dojo/NodeList-manipulate'
], function(
    declare,
    lang,
    query,
    domClass,
    format,
    pltFormat,
    template,
    ErrorManager,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.TicketActivity.Detail', [Detail], {
        //Localization
        titleText: 'Ticket Activity',

        accountText: 'account',
        contactText: 'contact',
        typeText: 'type',
        publicAccessText: 'public access',
        assignedDateText: 'start date',
        completedDateText: 'end date',
        followUpText: 'follow up',
        unitsText: 'time units',
        elapsedUnitsText: 'elapsed hours',
        rateTypeDescriptionText: 'charge type',
        rateText: 'rate',
        totalLaborText: 'total labor',
        totalPartsText: 'total parts',
        totalFeeText: 'total fee',
        activityDescriptionText: 'comments',
        ticketNumberText: 'ticket number',
        userText: 'user',

        completeTicketText: 'Complete Ticket Activity',
        moreDetailsText: 'More Details',
        relatedItemsText: 'Related Items',
        relatedTicketActivityItemText: 'Ticket Activity Parts',

        //View Properties
        id: 'ticketactivity_detail',
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
            'Ticket/TicketNumber',
            'Ticket/Contact/Name',
            'User/UserInfo/LastName',
            'User/UserInfo/FirstName'
        ],
        resourceKind: 'ticketActivities',

        createPicklistRequest: function(predicate) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
                .setResourceKind('picklists')
                .setContractName('system');
            var uri = request.getUri();

            uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
            uri.setCollectionPredicate(predicate);

            request.allowCacheUse = true;

            return request;
        },

        requestCodeData: function(row, node, value, entry, predicate) {
            var request = this.createPicklistRequest(predicate);
            request.read({
                success: lang.hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
                failure: this.onRequestCodeDataFailure,
                scope: this
            });
        },

        onRequestCodeDataSuccess: function(row, node, value, entry, data) {
            var codeText = this.processCodeDataFeed(data, entry[row.property]);
            if (codeText) {
                this.setNodeText(node, codeText);
                this.entry[row.name] = codeText;
            }
        },

        onRequestCodeDataFailure: function(response, o) {
            ErrorManager.addError(response, o, this.options, 'failure');
        },

        processCodeDataFeed: function(feed, currentValue, options) {
            var keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
            var textProperty = options && options.textProperty ? options.textProperty : 'text';

            for (var i = 0; i < feed.$resources.length; i++) {
                if (feed.$resources[i][keyProperty] === currentValue) {
                    return feed.$resources[i][textProperty];
                }
            }

            return currentValue;
        },
        setNodeText: function(node, value) {
            domClass.remove(node, 'content-loading');

            query('span', node).text(value);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            label: this.ticketNumberText,
                            name: 'Ticket.TicketNumber',
                            property: 'Ticket.TicketNumber',
                            view: 'ticket_detail',
                            key: 'Ticket.$key'
                        }, {
                            name: 'Ticket.Account.AccountName',
                            property: 'Ticket.Account.AccountName',
                            descriptor: 'Ticket.Account.AccountName',
                            label: this.accountText,
                            view: 'account_detail',
                            key: 'Ticket.Account.$key'
                        }, {
                            name: 'Ticket.Contact',
                            property: 'Ticket.Contact.Name',
                            descriptor: 'Ticket.Contact.Name',
                            label: this.contactText,
                            view: 'contact_detail',
                            key: 'Ticket.Contact.$key'
                        }, {
                            name: 'User.UserInfo',
                            property: 'User.UserInfo',
                            label: this.userText,
                            tpl: template.nameLF
                        }, {
                            label: this.typeText,
                            name: 'ActivityTypeCode',
                            property: 'ActivityTypeCode',
                            onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Ticket Activity"')
                        }, {
                            label: this.publicAccessText,
                            name: 'PublicAccessCode',
                            property: 'PublicAccessCode',
                            onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Ticket Activity Public Access"')
                        }, {
                            label: this.assignedDateText,
                            name: 'AssignedDate',
                            property: 'AssignedDate',
                            renderer: format.date
                        }, {
                            label: this.completedDateText,
                            name: 'CompletedDate',
                            property: 'CompletedDate',
                            renderer: format.date
                        }, {
                            label: this.followUpText,
                            name: 'FollowUp',
                            property: 'FollowUp',
                            renderer: format.yesNo
                        }, {
                            label: this.activityDescriptionText,
                            name: 'ActivityDescription',
                            property: 'ActivityDescription'
                        }]
                }, {
                    title: this.moreDetailsText,
                    collapsed: true,
                    name: 'MoreDetailsTextSection',
                    children: [{
                            label: this.unitsText,
                            name: 'Units',
                            property: 'Units'
                        }, {
                            label: this.elapsedUnitsText,
                            name: 'ElapsedUnits',
                            property: 'ElapsedUnits',
                            renderer: pltFormat.fixed
                        }, {
                            label: this.rateTypeDescriptionText,
                            name: 'RateTypeDescription.RateTypeCode',
                            property: 'RateTypeDescription.RateTypeCode'
                        }, {
                            label: this.rateText,
                            name: 'Rate',
                            property: 'Rate',
                            renderer: format.currency
                        }, {
                            label: this.totalLaborText,
                            name: 'TotalLabor',
                            property: 'TotalLabor',
                            renderer: format.currency
                        }, {
                            label: this.totalPartsText,
                            name: 'TotalParts',
                            property: 'TotalParts',
                            renderer: format.currency
                        }, {
                            label: this.totalFeeText,
                            name: 'TotalFee',
                            property: 'TotalFee',
                            renderer: format.currency
                        }]
                }, {
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

