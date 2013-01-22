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
        quantityText: 'quantity',
        extendedPriceText: 'extended price',
        extendedPriceBaseText: 'extended price (base rate)',
        extendedPriceMineText: 'extended price (my rate)',
        extendedPriceOpportunityText: 'extended price (opportunity)',

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
            var layout, details, multiCurrency;
            layout = this.layout || (this.layout = []);

            details = {
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
                        label: this.quantityText,
                        name: 'Quantity',
                        property: 'Quantity'
                    },
                    {
                        label: App.hasMultiCurrency() ? this.extendedPriceBaseText : this.extendedPriceText,
                        name: 'ExtendedPrice',
                        property: 'ExtendedPrice',
                        renderer: (function(val) {
                            if (App.hasMultiCurrency()) {
                            return format.multiCurrency.call(null, convertedValue, myCode);
                            }
                            return ;
                        }).bindDelegate(this)
                    }
                ]
            };

            if (App.hasMultiCurrency()) {
                details.children.push({
                    label: this.extendedPriceMineText,
                    name: 'ExtendedPriceMine',
                    property: 'ExtendedPriceMine',
                    renderer: (function(val) {
                        var myCode, myRate, convertedValue;

                        myCode = App.context['userOptions']['General:Currency'];
                        myRate = App.context['exchangeRates'][myCode];
                        convertedValue = val.ExtendedPrice * myRate;
                        return format.multiCurrency.call(null, convertedValue, myCode);

                        return '-';
                    }).bindDelegate(this)
                },{
                    label: this.extendedPriceOpportunityText,
                    name: 'ExtendedPriceOpportunity',
                    property: 'ExtendedPriceOpportunity',
                    renderer: (function(val) {
                        var code, rate, convertedValue, found;

                        found = App.queryNavigationContext(function(o) {
                            return /^(opportunities)$/.test(o.resourceKind) && o.key;
                        });

                        found = found && found.options;

                        if (found) {
                            rate = found.ExchangeRate;
                            code = found.ExchangeRateCode;
                            convertedValue = val.ExtendedPrice * rate;
                            return format.multiCurrency.call(null, convertedValue, code);
                        }

                        return '-';
                    }).bindDelegate(this)
                });
            }

            layout.push(details);
            return layout;
        }        
    });
});
