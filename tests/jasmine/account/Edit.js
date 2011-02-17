describe("Account", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });

            view = App.getView('account_edit');
        });

        /// #1-79322
        it("must validate industry field's text for 64 char length", function() {
            var industry = view.fields['Industry'];

            industry.setValue('Advertising');
            expect(industry.validate()).toBeFalsy();

            industry.setValue('12345678901234567890123456789012345678901234567890123456789012345');
            expect(industry.validate()).not.toBeFalsy();
        });

        /// #1-79359
        it("must validate web field's text for 128 char length", function() {
            var web = view.fields['WebAddress'],
                url = (function(){
                    var str = [];
                    for (var i=0; i<129; i++)
                        str[i] = 'a';
                    return str.join('');
                })(),
                errors;

            web.setValue('www.charlength128.com');
            errors = web.validate();
            expect(errors).toBeFalsy();

            web.setValue(url);
            errors = web.validate();
            expect(errors).not.toBeFalsy();
            expect(errors).toEqual("The field 'web' value exceeds the allowed limit in length.");
        });
    });
});