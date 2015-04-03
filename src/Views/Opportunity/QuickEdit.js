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
    'dojo/query',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/string',
    '../../Validator',
    '../../Template',
    'argos/Utility',
    'crm/SalesProcessUtility',
    'argos/Edit'
], function(
    declare,
    lang,
    query,
    domConstruct,
    domAttr,
    string,
    validator,
    template,
    utility,
    salesProcessUtility,
    Edit
) {

    var __class = declare('crm.Views.Opportunity.QuickEdit', [Edit], {
        //Localization
        estCloseText: 'est close',
        detailsText: 'Details',
        opportunityStageTitleText: 'Opportunity Stage',
        opportunityText: 'opportunity',
        stageText: 'stage',
        salesProcessText: 'locked by sales process',
        probabilityText: 'close prob',
        probabilityTitleText: 'Opportunity Probability',
        potentialText: 'sales potential',

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
            'Stage'
        ],
        init: function() {
            this.inherited(arguments);
        },
        applyContext: function(templateEntry) {
            this.fields['EstimatedClose'].setValue(templateEntry.EstimatedClose);
        },
        createLayout: function() {
            var layout, details;

            details = {
                title: this.detailsText,
                name: 'OpportunityDetailsEdit',
                children: [{
                    relatedView: {
                        widgetType: 'relatedContext',
                        id: 'opp_related_context_quickEdit'
                    }
                },
                    {
                        label: this.stageText,
                        name: 'Stage',
                        property: 'Stage',
                        picklist: 'Opportunity Stage',
                        requireSelection: true,
                        enabled: false,
                        title: this.opportunityStageTitleText,
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
                    }, {
                        label: this.potentialText,
                        name: 'SalesPotential',
                        property: 'SalesPotential',
                        precision: 2,
                        type: 'multiCurrency',
                        validationTrigger: 'keyup',
                        validator: validator.isCurrency
                    },
                    {
                        label: this.estCloseText,
                        name: 'EstimatedClose',
                        property: 'EstimatedClose',
                        type: 'date',
                        timeless: true,
                        validator: validator.exists
                    }
                ]
            };

            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

            layout.push(details);
            return layout;
        },
        setValues: function(values) {
            this.inherited(arguments);
            this.enableStage(values['$key']);
            this.fields['SalesPotential'].setCurrencyCode(App.getBaseExchangeRate().code);

        },
        enableStage: function(opportunityId) {
            var promise, field, label;
            field = this.fields['Stage'];
            label = this.stageText;
            if (!field) {
                return;
            }
            field.disable();
            promise = salesProcessUtility.getSalesProcessByEntityId(opportunityId);
            promise.then(function(salesProcess) {
                    if (salesProcess) {
                        field.disable();
                        label = this.stageText + ' ' + this.salesProcessText + ':' + salesProcess.$descriptor;
                        this.setStageLable(label);
                    } else {
                        field.enable();
                    }
                }.bind(this));
            this.setStageLable(label);
        },
        setStageLable: function(label) {
            var field, node;
            field = this.fields['Stage'];
            if (field && field.domNode) {
                node = query('[for="Stage"]', field.domNode);
                if (node && node.length > 0) {
                    domAttr.set(node[0], 'innerHTML', label);
                }
            }
        }
    });

    return __class;
});

