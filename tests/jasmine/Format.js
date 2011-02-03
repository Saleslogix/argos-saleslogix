describe("Format", function() {
    it("currency must return a number with 2 precision", function() {
        expect(Mobile.SalesLogix.Format.currency('12')).toEqual('$12.00');
        expect(Mobile.SalesLogix.Format.currency('12.0')).toEqual('$12.00');
        expect(Mobile.SalesLogix.Format.currency('12.00')).toEqual('$12.00');
        expect(Mobile.SalesLogix.Format.currency('12.3')).toEqual('$12.30');
        expect(Mobile.SalesLogix.Format.currency('12.34')).toEqual('$12.34');
        expect(Mobile.SalesLogix.Format.currency('12.345')).toEqual('$12.34');
        expect(Mobile.SalesLogix.Format.currency('1234')).toEqual('$1,234.00');
        expect(Mobile.SalesLogix.Format.currency('1234.5')).toEqual('$1,234.50');
        expect(Mobile.SalesLogix.Format.currency('1234.56')).toEqual('$1,234.56');
        expect(Mobile.SalesLogix.Format.currency('1234.567')).toEqual('$1,234.56');
        expect(Mobile.SalesLogix.Format.currency('1234567')).toEqual('$1,234,567.00');
        expect(Mobile.SalesLogix.Format.currency('0.12')).toEqual('$0.12');
        expect(Mobile.SalesLogix.Format.currency('0.1234')).toEqual('$0.12');
    });
});