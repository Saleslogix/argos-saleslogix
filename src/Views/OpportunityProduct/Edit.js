define('Mobile/SalesLogix/Views/OpportunityProduct/Edit', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
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
        discountText: 'discount',
        adjustedPriceText: 'adjusted price',
        quantityText: 'quantity',
        extendedPriceText: 'extended price',

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
            'Quantity',
            'ExtendedPrice'
        ],
        init: function() {
            this.inherited(arguments);
            this.connect(this.fields['Product'], 'onChange', this.onProductChange);
            this.connect(this.fields['Program'], 'onChange', this.onProgramChange);
            this.connect(this.fields['Discount'], 'onChange', this.onDiscountChange);
            this.connect(this.fields['AdjustedPrice'], 'onChange', this.onAdjustedPriceChange);
            this.connect(this.fields['Quantity'], 'onChange', this.onQuantityChange);
        },
        setValues: function(values) {
            this.inherited(arguments);
            this.fields['Program'].setValue({'$key':'', 'Program': values.Program});

            if (values.Discount > 0) { 
                adjusted = values.Price - (values.Discount * values.Price)
                this.fields['AdjustedPrice'].setValue(adjusted);
                // transform the discount into a whole number .10 to 10%
                this.fields['Discount'].setValue(values.Discount * 100);
            } else {
                this.fields['AdjustedPrice'].setValue(values.Price);
            }
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
            if (o.AdjustedPrice) {
                delete o.AdjustedPrice;
            }

            // transform the discount back into a decimal
            o.Discount = o.Discount / 100;

            return o;
        },
        applyContext: function(templateEntry) {
            var context, view, entry;
            context = App.queryNavigationContext(function(o) {
                return /^(opportunities)$/.test(o.resourceKind) && o.key;
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
                this.fields['ProductId'].setValue(value.key);
                this.fields['Product.Family'].setValue(selection.Family);
                this.fields['Program'].clearValue();

                this.fields['Price'].setValue(selection.Price);
                this.fields['Discount'].clearValue();
                this.fields['AdjustedPrice'].clearValue();
                this.fields['Quantity'].setValue(1);
                this.fields['ExtendedPrice'].setValue(selection.Price);
            }
        },
        onProgramChange: function(value, field) {
            var selection = field && field.currentSelection;
            if (selection) {
                this.fields['Price'].setValue(selection.Price);
                this.fields['Discount'].clearValue();
                this.fields['AdjustedPrice'].clearValue();
                this._updateExtendedPrice();
            }
        },
        onDiscountChange: function(value, field) {
            var price, discount, adjusted, quantity, extended;
            price = parseFloat(this.fields['Price'].getValue(), 10) || 0;
            discount = this.fields['Discount'].getValue();
            quantity = parseFloat(this.fields['Quantity'].getValue(), 10) || 0;

            adjusted = price - ((discount / 100) * price)
            this.fields['AdjustedPrice'].setValue(adjusted);

            adjusted = this.fields['AdjustedPrice'].getValue();
            extended = adjusted * quantity;

            this.fields['ExtendedPrice'].setValue(extended);
        },
        onAdjustedPriceChange: function(value, field) {
            var price, discount, adjusted;
            price = parseFloat(this.fields['Price'].getValue(), 10) || 0;
            adjusted = parseFloat(this.fields['AdjustedPrice'].getValue(), 10) || price;
            quantity = parseFloat(this.fields['Quantity'].getValue(), 10) || 0;

            discount = (1 - (adjusted / price)) * 100;
            this.fields['Discount'].setValue(discount);

            this._updateExtendedPrice();
        },
        onQuantityChange: function(value, field) {
            this._updateExtendedPrice();
        },
        _updateExtendedPrice: function() {
            var price, discount, adjusted, quantity, extended;
            price = parseFloat(this.fields['Price'].getValue(), 10) || 0;
            quantity = parseFloat(this.fields['Quantity'].getValue(), 10) || 0;
            adjusted = parseFloat(this.fields['AdjustedPrice'].getValue(), 10) || price;

            extended = adjusted * quantity;

            this.fields['ExtendedPrice'].setValue(extended);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.opportunityText, 
                    name: 'Opportunity',
                    property: 'Opportunity',
                    type: 'lookup',
                    textProperty: 'Description',
                    view: 'opportunity_related'
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
                    view: 'product_related'
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
                    where: (function(){
                        var val = this.fields['Product'].getValue();
                        return string.substitute('Product.Name eq "${0}"', [val.Name]);
                    }).bindDelegate( this)
                },
                {
                    label: this.priceText,
                    name: 'Price',
                    property: 'Price',
                    type: 'decimal',
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
                    label: this.adjustedPriceText,
                    name: 'AdjustedPrice',
                    property: 'AdjustedPrice',
                    type: 'decimal',
                    notificationTrigger: 'blur'
                },
                {
                    label: this.quantityText,
                    name: 'Quantity',
                    property: 'Quantity',
                    type: 'decimal',
                    notificationTrigger: 'blur'
                },
                {
                    label: this.extendedPriceText,
                    name: 'ExtendedPrice',
                    property: 'ExtendedPrice',
                    type: 'decimal',
                    readonly: true
                }
            ]);
        }
    });
});
