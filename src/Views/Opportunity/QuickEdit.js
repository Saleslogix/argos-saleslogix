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
    '../../SalesProcessUtility',
    'argos/Utility',
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
    salesProcessUtility,
    utility,
    Edit
) {

    var __class = declare('crm.Views.Opportunity.QuickEdit', [Edit], {
        //Localization
        estCloseText: 'est close',
        detailsText: 'Details',
        opportunityStageTitleText: 'Opportunity Stage',
        opportunityText: 'opportunity',
        stageText: 'stage',
        statusOpenText: 'Open',
        statusClosedLostText:'Closed - Lost',
        statusClosedWonText:'Closed - Won',
        salesProcessText: 'stage locked by sales process:',
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
            'Stage',
            'status'
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
            this.enableProbability(values);
            this.fields['SalesPotential'].setCurrencyCode(App.getBaseExchangeRate().code);
        },
        enableStage: function(opportunityId) {
            var field, label;
            field = this.fields['Stage'];
            label = this.stageText;

            if (!field) {
                return;
            }

            field.disable();
            salesProcessUtility.getSalesProcessByEntityId(opportunityId).then(function(salesProcess) {
                if (salesProcess) {
                    field.disable();
                    label = this.salesProcessText + salesProcess.$descriptor;
                    this.setStageLabel(label);
                } else {
                    field.enable();
                }
            }.bind(this));
            this.setStageLabel(label);
        },
        setStageLabel: function(label) {
            var field, node;
            field = this.fields['Stage'];
            if (field && field.domNode) {
                node = query('[for="Stage"]', field.domNode);
                if (node && node.length > 0) {
                    domAttr.set(node[0], 'innerHTML', label); // TODO: SDK's _Field should provide a label setter
                }
            }
        },
        enableProbability: function(entry) {
            var field;
            field = this.fields['CloseProbability'];
            if (!field) {
                return;
            }
            field.enable();
            if (this.isClosed(entry)) {
                field.disable();
            }
        },
        isClosed: function(entry) {
            var status;
            status = entry['Status'];
            if ((status === this.statusClosedWonText) || (status === this.statusClosedLostText)) {
                return true;
            }
            return false;
        }
    });

    return __class;
});

