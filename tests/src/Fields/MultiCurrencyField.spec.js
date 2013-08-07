/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('spec/Fields/MultiCurrencyField.spec', [
       'Mobile/SalesLogix/Fields/MultiCurrencyField'
], function(MultiCurrencyField) {
    return describe('Mobile/SalesLogix/Fields/MultiCurrencyField', function() {
        it('can set currency code', function() {
            var field = new MultiCurrencyField();
            field.setCurrencyCode('USD');
            expect(field.currencyCodeNode.innerHTML).toEqual('USD');
        });
    });
});

