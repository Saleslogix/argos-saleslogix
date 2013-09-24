/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
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
        basePriceText: 'base price',
        discountText: 'discount',
        quantityText: 'quantity',
        baseExtendedPriceText: 'base',
        extendedPriceText: 'extended price',
        extendedPriceSectionText: 'Extended Price',
        adjustedPriceSectionText: 'Adjusted Price',
        baseAdjustedPriceText: 'base',
        adjustedPriceText: 'adjusted price',
        myAdjustedPriceText: 'user',
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
                        id: 'removeOpportunityProduct',
                        icon: 'content/images/icons/del_24.png',
                        action: 'removeOpportunityProduct',
                        title: this.removeOppProductTitleText
                    }]
            });
        },
        createLayout: function() {
            var layout, details, multiCurrency, extendedPrice, adjustedPrice;
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
                        label: App.hasMultiCurrency() ? this.basePriceText : this.priceText,
                        name: 'Price',
                        property: 'Price',
                        renderer: (function(val) {
                            var exhangeRate, convertedValue;
                            if (App.hasMultiCurrency()) {
                                exhangeRate = App.getBaseExchangeRate();
                                convertedValue = val * exhangeRate.rate;
                                return format.multiCurrency.call(null, convertedValue, exhangeRate.code);
                            }

                            return format.currency.call(null, val);
                        }).bindDelegate(this)
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
                    }
                ]
            };

            if (!App.hasMultiCurrency()) {

                details.children.push({
                    label: this.adjustedPriceText,
                    name: 'CalculatedPrice',
                    property: 'CalculatedPrice',
                    renderer: format.currency
                });
                details.children.push({
                    label: this.extendedPriceText,
                    name: 'ExtendedPrice',
                    property: 'ExtendedPrice',
                    renderer: format.currency
                });
            }
            extendedPrice = {
                title: this.extendedPriceSectionText,
                name: 'OpportunityProductExtendedPriceDetail',
                children: [
                    {
                        label: this.baseExtendedPriceText,
                        name: 'ExtendedPrice',
                        property: 'ExtendedPrice',
                        renderer: (function(val) {
                            var exchangeRate, convertedValue;
                            if (App.hasMultiCurrency()) {
                                exchangeRate = App.getBaseExchangeRate();
                                convertedValue = val * exchangeRate.rate;
                                return format.multiCurrency.call(null, convertedValue, exchangeRate.code);
                            }

                            return format.currency.call(null, val);
                        }).bindDelegate(this)
                    }
                ]
            };
            adjustedPrice = {
                title: this.adjustedPriceSectionText,
                name: 'OpportunityProductAdjustedPriceDetail',
                children: [
                    {
                        label: this.baseAdjustedPriceText,
                        name: 'CalculatedPrice',
                        property: 'CalculatedPrice',
                        renderer: (function(val) {
                            var exhangeRate, convertedValue;
                            if (App.hasMultiCurrency()) {
                                exhangeRate = App.getBaseExchangeRate();
                                convertedValue = val * exhangeRate.rate;
                                return format.multiCurrency.call(null, convertedValue, exhangeRate.code);
                            }

                            return format.currency.call(null, val);
                        }).bindDelegate(this)
                    },
                    {
                        label: this.myAdjustedPriceText,
                        name: 'CalculatedPriceMine',
                        property: 'CalculatedPrice',
                        renderer: (function(val) {
                            var exhangeRate, convertedValue;
                            exhangeRate = App.getMyExchangeRate();
                            convertedValue = val * exhangeRate.rate;
                            return format.multiCurrency.call(null, convertedValue, exhangeRate.code);
                        }).bindDelegate(this)
                    }
                ]
            };

            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

            layout.push(details);

            if (App.hasMultiCurrency()) {
                layout.push(adjustedPrice);
                layout.push(extendedPrice);
            }
            return layout;
        }
    });
});

