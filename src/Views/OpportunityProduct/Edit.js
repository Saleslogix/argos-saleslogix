define('Mobile/SalesLogix/Views/OpportunityProduct/Edit', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    validator,
    template,
    utility,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.OpportunityProduct.Edit', [Edit], {
        //Localization
        titleText: 'Opportunity Product',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunityproduct_edit',
        resourceKind: 'opportunityProducts',
        insertSecurity: 'Entities/OpportunityProduct/Add',
        updateSecurity: 'Entities/OpportunityProduct/Edit',
        querySelect: [
        ],
        applyContext: function(templateEntry) {
        },
        createLayout: function() {
            return this.layout || (this.layout = [
            ]);
        }
    });
});
