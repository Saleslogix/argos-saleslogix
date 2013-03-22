define('Mobile/SalesLogix/Views/OpportunityProduct/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/connect',
    'dojo/_base/array',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    string,
    connect,
    array,
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
        confirmDeleteText: 'Remove ${0} from the opportunity products?',
        removeOppProductTitleText: 'remove opportunity product',

        //View Properties
        id: 'opportunityproduct_detail',
        editView: 'opportunityproduct_edit',

        security: 'Entities/Opportunity/View',
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

        createEntryForDelete: function(e) {
           var entry = {
                '$key': e['$key'],
                '$etag': e['$etag'],
                '$name': e['$name']
            };
            return entry;
        },
        removeOpportunityProduct: function() {
            var confirmMessage = string.substitute(this.confirmDeleteText, [this.entry.Product.Name]);

            if (!confirm(confirmMessage)) {
                return;
            }

            var entry = this.createEntryForDelete(this.entry),
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
            var views = [
                App.getView('opportunityproduct_related'),
                App.getView('opportunity_detail'),
                App.getView('opportunity_list')
            ];

            array.forEach(views, function(view) {
                if (view) {
                    view.refreshRequired = true;
                }
            }, this);

            connect.publish('/app/refresh',[{
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
                },{
                    id: 'removeOpportunityProduct',
                    icon: 'content/images/icons/del_24.png',
                    action: 'removeOpportunityProduct',
                    title:  this.removeOppProductTitleText
                }]
            });
        },
        createLayout: function() {
            var layout, details, multiCurrency;
            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

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
                        property: 'Discount',
                        renderer: format.percent
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
                        renderer: (function(val) {
                        var baseCode, baseRate, convertedValue;
                            if (App.hasMultiCurrency()) {
                                baseCode = App.context['systemOptions']['BaseCurrency'];
                                // Should we assume the base rate is going to be 1 and not bother with the conversion?
                                baseRate = App.context['exchangeRates'][baseCode];
                                convertedValue = val * baseRate;
                                return format.multiCurrency.call(null, convertedValue, baseCode);
                            }

                            return format.currency.call(null, val);
                        }).bindDelegate(this)
                    }
                ]
            };

            if (App.hasMultiCurrency()) {
                details.children.push({
                    label: this.extendedPriceText,
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
                    label: this.extendedPriceText,
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
                            if (!isNaN(convertedValue) && code) {
                                return format.multiCurrency.call(null, convertedValue, code);
                            }
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
