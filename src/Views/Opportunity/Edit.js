/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Opportunity/Edit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    lang,
    string,
    validator,
    template,
    utility,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.Opportunity.Edit', [Edit], {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        importSourceText: 'lead source',
        detailsText: 'Details',
        opportunityStatusTitleText: 'Opportunity Status',
        opportunityText: 'opportunity',
        opportunityTypeTitleText: 'Opportunity Type',
        ownerText: 'owner',
        potentialText: 'sales potential',
        probabilityText: 'close prob',
        probabilityTitleText: 'Opportunity Probability',
        resellerText: 'reseller',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',
        multiCurrencyText: 'Multi Currency',
        multiCurrencyRateText: 'exchange rate',
        multiCurrencyCodeText: 'code',
        multiCurrencyDateText: 'rate date',
        multiCurrencyLockedText: 'rate locked',
        exchangeRateDateFormatText: 'M/D/YYYY h:mm A',
        subTypePickListResellerText: 'RESELLER',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunity_edit',
        resourceKind: 'opportunities',
        insertSecurity: 'Entities/Opportunity/Add',
        updateSecurity: 'Entities/Opportunity/Edit',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'CloseProbability',
            'Contacts',
            'Description',
            'EstimatedClose',
            'ExchangeRate',
            'ExchangeRateCode',
            'ExchangeRateDate',
            'ExchangeRateLocked',
            'LeadSource/Description',
            'Owner/OwnerDescription',
            'Reseller/AccountName',
            'SalesPotential',
            'Stage',
            'Status',
            'Type',
            'Weighted'
        ],
        init: function() {
            this.inherited(arguments);
            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);

            if (App.hasMultiCurrency()) {
                this.connect(this.fields['ExchangeRateCode'], 'onChange', this.onExchangeRateCodeChange);
                this.connect(this.fields['ExchangeRateLocked'], 'onChange', this.onExchangeRateLockedChange);
            }
        },
        applyContext: function(templateEntry) {
            var found = App.queryNavigationContext(function(o) {
                return (/^(accounts|contacts)$/).test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext
            };

            if (found && lookup[found.resourceKind]) {
                lookup[found.resourceKind].call(this, found);
            } else {
                this.applyDefaultContext(templateEntry);
            }

            this.fields['Status'].setValue(templateEntry.Status);
            this.fields['CloseProbability'].setValue(templateEntry.CloseProbability);
            this.fields['EstimatedClose'].setValue(templateEntry.EstimatedClose);

            if (App.hasMultiCurrency() && templateEntry) {

                if (templateEntry.ExchangeRateCode) {
                    this.fields['ExchangeRateCode'].setValue({'$key': templateEntry.ExchangeRateCode, '$descriptor': templateEntry.ExchangeRateCode});
                }

                if (templateEntry.ExchangeRate) {
                    this.fields['ExchangeRate'].setValue(templateEntry.ExchangeRate);
                }

                if (templateEntry.ExchangeRateDate) {
                    this.fields['ExchangeRateDate'].setValue(templateEntry.ExchangeRateDate);
                }
            }

        },
        setValues: function(values) {
            this.inherited(arguments);
            var nodes;
            if (App.hasMultiCurrency()) {

                if (values && values.ExchangeRateCode) {
                    this.fields['ExchangeRateCode'].setValue({'$key': values.ExchangeRateCode, '$descriptor': values.ExchangeRateCode});
                }

                if (!App.canLockOpportunityRate()) {
                    this.fields['ExchangeRateLocked'].disable();
                }

                if (!App.canChangeOpportunityRate()) {
                    this.fields['ExchangeRate'].disable();
                    this.fields['ExchangeRateCode'].disable();
                }

                this.fields['ExchangeRateDate'].disable();
            }

            this.fields['SalesPotential'].setCurrencyCode(App.getBaseExchangeRate().code);
        },
        getValues: function() {
            var values, code;
            values = this.inherited(arguments);

            if (values) {
                code = values.ExchangeRateCode;
                values.ExchangeRateCode = code && code.$key;
            }

            return values;
        },
        applyDefaultContext: function(templateEntry) {
            this.fields['AccountManager'].setValue(App.context.user);
            this.fields['Owner'].setValue(App.context['defaultOwner']);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(entry);
            this.fields['AccountManager'].setValue(utility.getValue(entry, 'AccountManager'));
            this.fields['Owner'].setValue(utility.getValue(entry, 'Owner'));
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(utility.getValue(entry, 'Account'));
            this.fields['AccountManager'].setValue(utility.getValue(entry, 'AccountManager'));
            this.fields['Owner'].setValue(utility.getValue(entry, 'Owner'));
            this.fields['Contacts.$resources[0].Contact.$key'].setValue(entry.$key);
        },
        onExchangeRateCodeChange: function(value, field) {
            var selection = field.getSelection();
            if (selection && selection.Rate) {
                this.fields['ExchangeRate'].setValue(selection.Rate);
                this.fields['ExchangeRateDate'].setValue(new Date(Date.now()));
            }
        },
        onExchangeRateLockedChange: function(value, field) {
            if (value === true) {
                this.fields['ExchangeRate'].disable();
                this.fields['ExchangeRateCode'].disable();
            } else {

                if (!App.canChangeOpportunityRate()) {
                    this.fields['ExchangeRate'].disable();
                    this.fields['ExchangeRateCode'].disable();
                } else {
                    this.fields['ExchangeRate'].enable();
                    this.fields['ExchangeRateCode'].enable();
                }
            }

            this.fields['ExchangeRateDate'].setValue(new Date(Date.now()));
        },
        onAccountChange: function(value, field) {
            var selection = field.getSelection();

            // todo: match behavior in web client; if the account manager (AM) is explicitly set, it should stay, otherwise
            // it should be set to the AM for the selected account (and change each time).
            if (selection && this.insert) {
                this.fields['AccountManager'].setValue(utility.getValue(selection, 'AccountManager'));
            }
        },
        createLayout: function() {
            var layout, details, multiCurrency;

            details = {
                title: this.detailsText,
                name: 'OpportunityDetailsEdit',
                children: [
                    {
                        label: this.opportunityText,
                        name: 'Description',
                        property: 'Description',
                        type: 'text',
                        maxTextLength: 64,
                        validator: [
                            validator.notEmpty,
                            validator.exceedsMaxTextLength
                        ]
                    },
                    {
                        label: this.accountText,
                        name: 'Account',
                        property: 'Account',
                        textProperty: 'AccountName',
                        type: 'lookup',
                        validator: validator.exists,
                        view: 'account_related'
                    },
                    {
                        label: this.acctMgrText,
                        name: 'AccountManager',
                        property: 'AccountManager',
                        textProperty: 'UserInfo',
                        textTemplate: template.nameLF,
                        type: 'lookup',
                        view: 'user_list'
                    },
                    {
                        label: this.resellerText,
                        name: 'Reseller',
                        property: 'Reseller',
                        textProperty: 'AccountName',
                        type: 'lookup',
                        view: 'account_related',
                        where: string.substitute('upper(SubType) eq "${0}"', [this.subTypePickListResellerText]),
                        viewMixin: {
                            onTransitionTo: function(self) {
                                // Clear the initial where clause, allowing the user to search for others if they want
                                self.options.where = '';
                            }
                        }
                    },
                    {
                        label: this.estCloseText,
                        name: 'EstimatedClose',
                        property: 'EstimatedClose',
                        type: 'date',
                        timeless: true,
                        validator: validator.exists
                    },
                    {
                        label: this.potentialText,
                        name: 'SalesPotential',
                        property: 'SalesPotential',
                        precision: 2,
                        type: 'multiCurrency',
                        validationTrigger: 'keyup',
                        validator: validator.isCurrency
                    },
                    {
                        label: this.typeText,
                        name: 'Type',
                        property: 'Type',
                        picklist: 'Opportunity Type',
                        title: this.opportunityTypeTitleText,
                        type: 'picklist',
                        maxTextLength: 64,
                        validator: validator.exceedsMaxTextLength
                    },
                    {
                        label: this.statusText,
                        name: 'Status',
                        property: 'Status',
                        picklist: 'Opportunity Status',
                        requireSelection: true,
                        title: this.opportunityStatusTitleText,
                        type: 'picklist'
                    },
                    {
                        label: this.importSourceText,
                        name: 'LeadSource',
                        property: 'LeadSource',
                        textProperty: 'Description',
                        type: 'lookup',
                        view: 'leadsource_list'
                    },
                    {
                        label: this.ownerText,
                        name: 'Owner',
                        property: 'Owner',
                        keyProperty: '$key',
                        textProperty: 'OwnerDescription',
                        type: 'lookup',
                        validator: validator.exists,
                        view: 'owner_list'
                    },
                    {
                        label: this.probabilityText,
                        name: 'CloseProbability',
                        property: 'CloseProbability',
                        picklist: 'Opportunity Probability',
                        title: this.probabilityTitleText,
                        type: 'picklist',
                        validator: [
                            validator.isInt32,
                            validator.isInteger
                        ]
                    },
                    {
                        name: 'Contacts.$resources[0].Contact.$key',
                        property: 'Contacts.$resources[0].Contact.$key',
                        type: 'hidden'
                    }
                ]
            };

            multiCurrency = {
                title: this.multiCurrencyText,
                name: 'OpportunityMultiCurrencyEdit',
                children: [
                    {
                        label: this.multiCurrencyRateText,
                        name: 'ExchangeRate',
                        property: 'ExchangeRate',
                        type: 'text',
                        validator: validator.isDecimal
                    },
                    {
                        label: this.multiCurrencyCodeText,
                        name: 'ExchangeRateCode',
                        property: 'ExchangeRateCode',
                        textProperty: '$key',
                        type: 'lookup',
                        view: 'exchangerate_lookup'
                    },
                    {
                        label: this.multiCurrencyLockedText,
                        name: 'ExchangeRateLocked',
                        property: 'ExchangeRateLocked',
                        type: 'boolean'
                    },
                    {
                        label: this.multiCurrencyDateText,
                        name: 'ExchangeRateDate',
                        property: 'ExchangeRateDate',
                        type: 'date',
                        timeless: false,
                        dateFormatText: this.exchangeRateDateFormatText,
                        disabled: true // TODO: Create an SDK issue for this (NOT WORKING!!!)
                    }
                ]
            };

            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

            layout.push(details);

            if (App.hasMultiCurrency()) {
                layout.push(multiCurrency);
            }

            return layout;
        }
    });
});

