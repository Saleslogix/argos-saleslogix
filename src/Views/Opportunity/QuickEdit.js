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
        estCloseText: 'est close',
        detailsText: 'Details',
        opportunityStageTitleText: 'Opportunity Stage',
        opportunityText: 'opportunity',
        stageText: 'stage',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunity_quick_edit',
        resourceKind: 'opportunities',
        insertSecurity: 'Entities/Opportunity/Add',
        updateSecurity: 'Entities/Opportunity/Edit',
        querySelect: [
            'Account/AccountName',
            'EstimatedClose',
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
                    }
                ]
            };

            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

            layout.push(details);
            return layout;
        }
    });

    return __class;
});

