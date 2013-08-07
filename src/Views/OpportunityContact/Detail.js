/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/OpportunityContact/Detail', [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/string',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    connect,
    string,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.OpportunityContact.Detail', [Detail], {
        //Localization
        titleText: 'Opportunity Contact',
        accountText: 'account',
        contactTitleText: 'title',
        nameText: 'contact',
        moreDetailsText: 'More Details',
        salesRoleText: 'role',
        strategyText: 'strategy',
        personalBenefitsText: 'personal ben',
        standingText: 'standing',
        issuesText: 'issues',
        competitorNameText: 'competitor pref',
        removeContactTitleText: 'Remove Contact',
        confirmDeleteText: 'Remove "${0}" from the opportunity?',
        contactText: 'Contact',

        //View Properties
        id: 'opportunitycontact_detail',
        editView: 'opportunitycontact_edit',
        security: 'Entities/Contact/View',
        querySelect: [
            'Opportunity/Description',
            'Contact/Account/AccountName',
            'Contact/AccountName',
            'SalesRole',
            'Contact/NameLF',
            'Contact/Title',
            'IsPrimary',
            'Competitors/CompetitorName',
            'Issues',
            'PersonalBenefits',
            'Standing',
            'Strategy'
        ],
        resourceKind: 'opportunityContacts',

        createEntryForDelete: function() {
            var entry = {
                '$key': this.entry['$key'],
                '$etag': this.entry['$etag'],
                '$name': this.entry['$name']
            };
            return entry;
        },
        removeContact: function() {
            var confirmMessage = string.substitute(this.confirmDeleteText, [this.entry.Contact.NameLF]);
            if (!confirm(confirmMessage)) {
                return;
            }

            var entry = this.createEntryForDelete(),
                request = this.createRequest();
            if (request) {
                request['delete'](entry, {
                    success: this.onDeleteSuccess,
                    failure: this.onRequestDataFailure,
                    scope: this
                });
            }
        },
        onDeleteSuccess: function() {
            connect.publish('/app/refresh', [{
                resourceKind: this.resourceKind
            }]);
            ReUI.back();
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': [{
                        id: 'edit',
                        action: 'navigateToEditView',
                        security: App.getViewSecurity(this.editView, 'update')
                    }, {
                        id: 'removeContact',
                        icon: 'content/images/icons/del_24.png',
                        action: 'removeContact',
                        title: this.removeContactTitleText
                    }]
            });
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    title: this.contactText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'NameLF',
                            property: 'Contact.NameLF',
                            label: this.nameText,
                            view: 'contact_detail',
                            key: 'Contact.$key',
                            descriptor: 'Contact.NameLF'
                        }, {
                            name: 'AccountName',
                            property: 'Contact.AccountName',
                            descriptor: 'AccountName',
                            label: this.accountText,
                            view: 'account_detail',
                            key: 'Contact.Account.$key'
                        }, {
                            name: 'Title',
                            property: 'Contact.Title',
                            label: this.contactTitleText
                        }]
                }, {
                    title: this.detailsText,
                    name: 'MoreDetailsSection',
                    children: [{
                            name: 'SalesRole',
                            property: 'SalesRole',
                            label: this.salesRoleText
                        }, {
                            name: 'Standing',
                            property: 'Standing',
                            label: this.standingText
                        }, {
                            name: 'PersonalBenefits',
                            property: 'PersonalBenefits',
                            label: this.personalBenefitsText
                        }, {
                            name: 'CompetitorName',
                            property: 'Competitors.CompetitorName',
                            label: this.competitorNameText
                        }, {
                            name: 'Strategy',
                            property: 'Strategy',
                            label: this.strategyText
                        }, {
                            name: 'Issues',
                            property: 'Issues',
                            label: this.issuesText
                        }]
                }]);
        }
    });
});

