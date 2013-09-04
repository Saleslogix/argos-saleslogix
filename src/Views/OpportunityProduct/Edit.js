/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/OpportunityProduct/Edit', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    array,
    string,
    validator,
    template,
    utility,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.OpportunityProduct.Edit', [Edit], {
        //Localization
        titleText: 'Opportunity Product',
        detailsText: 'Details',
        opportunityText: 'opportunity',
        productText: 'product',
        productFamilyText: 'product family',
        priceLevelText: 'price level',
        priceText: 'price',
        basePriceText: 'base price',
        discountText: 'discount %',
        adjustedPriceText: 'adjusted price',
        myAdjustedPriceText: 'user',
        baseAdjustedPriceText: 'base',
        quantityText: 'quantity',
        baseExtendedPriceText: 'base',
        extendedPriceText: 'extended price',
        extendedPriceSectionText: 'Extended Price',
        adjustedPriceSectionText: 'Adjusted Price',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunityproduct_edit',
        resourceKind: 'opportunityProducts',
        insertSecurity: 'Entities/Opportunity/Add',
        updateSecurity: 'Entities/Opportunity/Edit',
        querySelect: [
            'Opportunity/Description',
            'Product/Name',
            'Product/Family',
            'Program',
            'Price',
            'Discount',
            'AdjustedPrice',
            'CalculatedPrice',
            'Quantity',
            'ExtendedPrice'
        ],
        init: function() {
            this.inherited(arguments);
            this.connect(this.fields['Product'], 'onChange', this.onProductChange);
            this.connect(this.fields['Program'], 'onChange', this.onProgramChange);
            this.connect(this.fields['Discount'], 'onChange', this.onDiscountChange);
            this.connect(this.fields['CalculatedPrice'], 'onChange', this.onAdjustedPriceChange);
            this.connect(this.fields['CalculatedPriceMine'], 'onChange', this.onAdjustedPriceMineChange);
            this.connect(this.fields['Quantity'], 'onChange', this.onQuantityChange);
        },
        setValues: function(values) {
            this.inherited(arguments);
            var adjusted, myCode, oppCode, baseCode;
            this.fields['Program'].setValue({'$key': '', 'Program': values.Program});

            if (values.Discount > 0) {
                adjusted = values.Price - (values.Discount * values.Price);
                // transform the discount into a percentage number 0.10 to 10.00% 
                this.fields['Discount'].setValue(values.Discount * 100);
            } else {
                adjusted = values.Price;
            }

            myCode = App.getMyExchangeRate().code;
            baseCode = App.getBaseExchangeRate().code;
            this.fields['Price'].setCurrencyCode(baseCode);
            this.fields['CalculatedPrice'].setCurrencyCode(baseCode);

            if (App.hasMultiCurrency()) {
                this.fields['CalculatedPriceMine'].setValueNoTrigger(this._getMyRate() * values.CalculatedPrice);
                this.fields['CalculatedPriceMine'].setCurrencyCode(myCode);
            }

            this.fields['ExtendedPrice'].setCurrencyCode(baseCode);
            this._updateExtendedPrice();

            if ((values.Product.Family !== null) && (values.Price !== null)) {
                this._enableUI(true);
            } else {
                this._enableUI(false);
            }
        },
        _enableUI: function(enable) {
            if (enable) {
                this.fields['Discount'].enable();
                this.fields['Quantity'].enable();
                this.fields['CalculatedPrice'].enable();
                if (App.hasMultiCurrency()) {
                    this.fields['CalculatedPriceMine'].enable();
                }
            } else {
                this.fields['Discount'].disable();
                this.fields['Quantity'].disable();
                this.fields['CalculatedPrice'].disable();
                if (App.hasMultiCurrency()) {
                    this.fields['CalculatedPriceMine'].disable();
                }
            }
        },
        _getMyRate: function() {
            return App.getMyExchangeRate().rate;
        },
        getValues: function() {
            var o = this.inherited(arguments);
            o.Program = o.Program.Program;

            /*
             * 'AdjustedPrice' is a lie. The underlying database field is actually PRICEADJUSTED and
             * is a boolean, not a price that has been adjusted. Since we use the adjusted price to calculate
             * the discount %, we will remove it from getValues so we aren't trying to save the wrong data type when sending
             * the sdata request.
             */
            delete o.AdjustedPrice;
            delete o.CalculatedPriceMine;
            // transform the discount back into a decimal
            o.Discount = o.Discount / 100;

            return o;
        },
        applyContext: function(templateEntry) {
            var context, view, entry;
            context = App.queryNavigationContext(function(o) {
                return (/^(opportunities)$/).test(o.resourceKind) && o.key;
            });

            view = App.getView(context && context.id);
            entry = view && view.entry;
            if (entry) {
                this.fields['Opportunity'].setValue(entry);
            }
        },
        onProductChange: function(value, field) {
            var selection = field && field.currentSelection;
            if (selection) {
                this.fields['ProductId'].setValueNoTrigger(value.key);
                this.fields['Product.Family'].setValueNoTrigger(selection.Family);
                this.fields['Program'].clearValue();

                this.fields['Price'].setValueNoTrigger(selection.Price);
                this.fields['Discount'].clearValue();
                this.fields['CalculatedPrice'].setValueNoTrigger(selection.Price);

                if (App.hasMultiCurrency()) {
                    this.fields['CalculatedPriceMine'].setValueNoTrigger(this._getMyRate() * selection.Price);
                }
                this.fields['Quantity'].setValueNoTrigger(1);
                this._updateExtendedPrice();
            }
        },
        onProgramChange: function(value, field) {
            var selection = field && field.currentSelection;
            if (selection) {
                this.fields['Price'].setValueNoTrigger(selection.Price);
                this.fields['Discount'].clearValue();
                this.fields['CalculatedPrice'].setValueNoTrigger(selection.Price);
                if (App.hasMultiCurrency()) {
                    this.fields['CalculatedPriceMine'].setValueNoTrigger(this._getMyRate() * selection.Price);
                }
                this._updateExtendedPrice();
                this._enableUI(true);
            }
        },
        onDiscountChange: function(value, field) {
            var price, discount, adjusted, quantity, extended;
            price = parseFloat(this.fields['Price'].getValue(), 10) || 0;
            discount = this.fields['Discount'].getValue();
            quantity = parseFloat(this.fields['Quantity'].getValue(), 10) || 0;

            adjusted = this._calculateAdjustedPrice(price, discount);
            this.fields['CalculatedPrice'].setValueNoTrigger(adjusted);

            this._updateAdjustedPrices(adjusted);
            this._updateExtendedPrice();
        },
        onAdjustedPriceChange: function(value, field) {
            var price, discount, adjusted, myadjusted;
            price = parseFloat(this.fields['Price'].getValue(), 10) || 0;
            adjusted = parseFloat(this.fields['CalculatedPrice'].getValue(), 10) || 0;

            discount = this._calculateDiscount(price, adjusted);
            this.fields['Discount'].setValueNoTrigger(discount);

            if (App.hasMultiCurrency()) {
                myadjusted = this._getMyRate() * adjusted;
                this.fields['CalculatedPriceMine'].setValueNoTrigger(myadjusted);
            }
            this._updateExtendedPrice();
        },
        onAdjustedPriceMineChange: function(value, field) {
            var price, myprice, discount, myadjusted, adjusted, myrate;
            myadjusted = this.fields['CalculatedPriceMine'].getValue();
            price = this.fields['Price'].getValue() || 0;

            myrate = this._getMyRate();
            myprice = price * myrate; // get the price in the users exchange rate

            discount = this._calculateDiscount(myprice, myadjusted);
            this.fields['Discount'].setValueNoTrigger(discount);

            adjusted = this._calculateAdjustedPrice(price, discount);
            this.fields['CalculatedPrice'].setValueNoTrigger(adjusted);

            this._updateExtendedPrice();
        },
        onQuantityChange: function(value, field) {
            if (isNaN(value)) {
                this.fields['Quantity'].setValueNoTrigger(0);
            }
            this._updateExtendedPrice();
        },
        _calculateDiscount: function(price, adjusted) {
            var discount;
            if (price === 0) {
                discount = 0.0;
            } else {
                discount = (1 - (adjusted / price)) * 100;
            }
            return discount;
        },
        _calculateAdjustedPrice: function(price, discount) {
            var adjusted;
            if (discount === 0) {
                adjusted = price;
            } else {
                adjusted = price - (price * (discount / 100));
            }
            return adjusted;
        },
        _updateAdjustedPrices: function(adjusted) {
            var myadjusted;
            this.fields['CalculatedPrice'].setValueNoTrigger(adjusted);
            if (App.hasMultiCurrency()) {
                myadjusted = this._getMyRate() * adjusted;
                this.fields['CalculatedPriceMine'].setValueNoTrigger(myadjusted);
            }
        },
        _updateExtendedPrice: function() {
            var adjusted, quantity, extended;
            quantity = parseFloat(this.fields['Quantity'].getValue(), 10) || 0;
            adjusted = parseFloat(this.fields['CalculatedPrice'].getValue(), 10) || 0;
            extended = adjusted * quantity;
            this.fields['ExtendedPrice'].setValueNoTrigger(extended);
        },
        onUpdateCompleted: function(entry) {
            this._refreshOpportunityViews();
            this.inherited(arguments);
        },
        onInsertCompleted: function(entry) {
            this._refreshOpportunityViews();
            this.inherited(arguments);
        },
        _refreshOpportunityViews: function() {
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
        },
        createLayout: function() {
            var layout, details, extendedPrice, adjustedPrice;

            details = {
                title: this.detailsText,
                name: 'OpportunityProductDetailsEdit',
                children: [
                    {
                        label: this.opportunityText,
                        name: 'Opportunity',
                        property: 'Opportunity',
                        type: 'lookup',
                        textProperty: 'Description',
                        view: 'opportunity_related',
                        validator: validator.exists
                    },
                    {
                        name: 'ProductId',
                        property: 'ProductId',
                        type: 'hidden'
                    },
                    {
                        label: this.productText,
                        name: 'Product',
                        property: 'Product',
                        type: 'lookup',
                        textProperty: 'Name',
                        view: 'product_related',
                        validator: validator.exists
                    },
                    {
                        label: this.productFamilyText,
                        name: 'Product.Family',
                        property: 'Product.Family',
                        type: 'text',
                        readonly: true
                    },
                    {
                        label: this.priceLevelText,
                        name: 'Program',
                        property: 'Program',
                        textProperty: 'Program',
                        type: 'lookup',
                        view: 'productprogram_related',
                        validator: validator.exists,
                        where: (function() {
                            var val = this.fields['Product'].getValue();
                            return string.substitute('Product.Name eq "${0}"', [val.Name]);
                        }).bindDelegate(this)
                    },
                    {
                        label: App.hasMultiCurrency() ? this.basePriceText : this.priceText,
                        name: 'Price',
                        property: 'Price',
                        type: 'multiCurrency',
                        readonly: true
                    },
                    {
                        label: this.discountText,
                        name: 'Discount',
                        property: 'Discount',
                        type: 'decimal',
                        notificationTrigger: 'blur'
                    },
                    {
                        label: this.quantityText,
                        name: 'Quantity',
                        property: 'Quantity',
                        type: 'decimal',
                        notificationTrigger: 'blur'
                    }
                ]
            };

            if (!App.hasMultiCurrency()) {
                details.children.push({
                    label: this.adjustedPriceText,
                    name: 'CalculatedPrice',
                    property: 'CalculatedPrice',
                    type: 'multiCurrency',
                    notificationTrigger: 'blur'
                });
                details.children.push({
                    label: this.extendedPriceText,
                    name: 'ExtendedPrice',
                    property: 'ExtendedPrice',
                    type: 'multiCurrency',
                    readonly: true
                });
            }

            extendedPrice = {
                title: this.extendedPriceSectionText,
                name: 'OpportunityProductExtendedPriceEdit',
                children: [
                    {
                        label: this.baseExtendedPriceText,
                        name: 'ExtendedPrice',
                        property: 'ExtendedPrice',
                        type: 'multiCurrency',
                        readonly: true
                    }
                ]
            };

            adjustedPrice = {
                title: this.adjustedPriceSectionText,
                name: 'OpportunityProductAdjustedPriceEdit',
                children: [
                    {
                        label: this.baseAdjustedPriceText,
                        name: 'CalculatedPrice',
                        property: 'CalculatedPrice',
                        type: 'multiCurrency',
                        notificationTrigger: 'blur'
                    },
                    {
                        label: this.myAdjustedPriceText,
                        name: 'CalculatedPriceMine',
                        property: 'CalculatedPriceMine',
                        type: App.hasMultiCurrency() ? 'multiCurrency' : 'hidden',
                        notificationTrigger: 'blur'
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

