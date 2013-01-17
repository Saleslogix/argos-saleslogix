define('Mobile/SalesLogix/Views/OpportunityProduct/Detail', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    format,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.OpportunityProduct.Detail', [Detail], {
        //Localization
        detailsText: 'Details',
        opportunityText: 'opportunity',
        productText: 'product',
        productFamilyText: 'product family',
        priceLevelText: 'price level',
        priceText: 'price',
        discountText: 'discount',
        adjustedPriceText: 'adjusted price',
        quantityText: 'quantity',
        extendedPriceText: 'extended price',

        //View Properties
        id: 'opportunityproduct_detail',
        editView: 'opportunityproduct_edit',

        security: 'Entities/OpportunityProduct/View',
        querySelect: [
            'Opportunity/Description',
            'Product/Description',
            'Product/Family',
            'Product/Name',
            'Product/Price',
            'Product/Program',
            'Product/FixedCost',
            'AdjustedPrice',
            'CalculatedPrice',
            'Discount',
            'ExtendedPrice',
            'Price',
            'Program',
            'Quantity'
        ],
        resourceKind: 'opportunityProducts',

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [
                    {
                        label: this.opportunityText, 
                        name: 'Opportunity.Description',
                        property: 'Opportunity.Description'
                    },
                    {
                        label: this.productText,
                        name: 'Product.Name',
                        property: 'Product.Name'
                    },
                    {
                        label: this.productFamilyText,
                        name: 'Product.Family',
                        property: 'Product.Family'
                    },
                    {
                        label: this.priceLevelText,
                        name: 'Program',
                        property: 'Program'
                    },
                    {
                        label: this.priceText,
                        name: 'Price',
                        property: 'Price',
                        renderer: format.currency
                    },
                    {
                        label: this.discountText,
                        name: 'Discount',
                        property: 'Discount'
                    },
                    {
                        label: this.adjustedPriceText,
                        name: 'AdjustedPrice',
                        property: 'AdjustedPrice',
                        renderer: format.currency
                    },
                    {
                        label: this.quantityText,
                        name: 'Quantity',
                        property: 'Quantity'
                    },
                    {
                        label: this.extendedPriceText,
                        name: 'ExtendedPrice',
                        property: 'ExtendedPrice',
                        renderer: format.currency
                    }
                ]
            }]);
        }        
    });
});
