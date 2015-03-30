/*
 * See copyright file.
 */

/**
 * @class crm.Views.Opportunity.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Utility
 *
 * @requires crm.Validator
 * @requires crm.Template
 */
define('crm/Views/Opportunity/QuickEdit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    '../../Validator',
    '../../Template',
    'argos/Utility',
    'argos/Edit'
], function(
    declare,
    lang,
    string,
    validator,
    template,
    utility,
    Edit
) {

    var __class = declare('crm.Views.Opportunity.QuickEdit', [Edit], {
        //Localization
        accountText: 'acct',
        estCloseText: 'est close',
        detailsText: 'Details',
        opportunityStatusTitleText: 'Opportunity Status',
        opportunityStageTitleText: 'Opportunity Stage',
        opportunityText: 'opportunity',
        potentialText: 'sales potential',
        probabilityText: 'close prob',
        probabilityTitleText: 'Opportunity Probability',
        statusText: 'status',
        stageText: 'stage',
        titleText: 'Opportunity',
        multiCurrencyText: 'Multi Currency',
        multiCurrencyRateText: 'exchange rate',
        multiCurrencyCodeText: 'code',
        multiCurrencyDateText: 'rate date',
        multiCurrencyLockedText: 'rate locked',
        exchangeRateDateFormatText: 'M/D/YYYY h:mm A',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunity_quick_edit',
        resourceKind: 'opportunities',
        insertSecurity: 'Entities/Opportunity/Add',
        updateSecurity: 'Entities/Opportunity/Edit',
        querySelect: [
            'Account/AccountName',
            'CloseProbability',
            'EstimatedClose',
            'ExchangeRate',
            'ExchangeRateCode',
            'ExchangeRateDate',
            'ExchangeRateLocked',
            'SalesPotential',
            'Stage',
            'Status',
            'Weighted'
        ],
        init: function() {
            this.inherited(arguments);
            ///this.connect(this.fields['Account'], 'onChange', this.onAccountChange);

            if (App.hasMultiCurrency()) {
                this.connect(this.fields['ExchangeRateCode'], 'onChange', this.onExchangeRateCodeChange);
                this.connect(this.fields['ExchangeRateLocked'], 'onChange', this.onExchangeRateLockedChange);
            }
        },
        applyContext: function(templateEntry) {
            var found,
                lookup;

            found = App.queryNavigationContext(function(o) {
                return (/^(accounts|contacts)$/).test(o.resourceKind) && o.key;
            });

            lookup = {
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
        onExchangeRateCodeChange: function(value, field) {
            var selection = field.getSelection();
            if (selection && selection.Rate) {
                this.fields['ExchangeRate'].setValue(selection.Rate);
                this.fields['ExchangeRateDate'].setValue(new Date(Date.now()));
            }
        },
        onExchangeRateLockedChange: function(value) {
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
        createLayout: function() {
            var layout, details, multiCurrency;

            details = {
                title: this.detailsText,
                name: 'OpportunityDetailsEdit',
                children: [{
                       relatedView: {
                        widgetType: 'relatedContext',
                        id: 'opp_related_context_quickEdit',
                       }
                    },
                    {
                       label: this.stageText,
                        name: 'Stage',
                        property: 'Stage',
                        picklist: 'Opportunity Stage',
                        requireSelection: true,
                        title: this.opportunityStageTitleText,
                        type: 'picklist'
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
                        label: this.statusText,
                        name: 'Status',
                        property: 'Status',
                        picklist: 'Opportunity Status',
                        requireSelection: true,
                        title: this.opportunityStatusTitleText,
                        type: 'picklist'
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

    return __class;
});

