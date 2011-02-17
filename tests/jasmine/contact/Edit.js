describe("Contact", function() {

    describe("Edit View", function() {
        var view;

        beforeEach(function(){
            this.addMatchers({
                toContainError: JASMINE_SLX_MATCHERS.toContainError
            });

            view = App.getView('contact_edit');
        });

        /// #1-79359
        it("must validate web field's text for 128 char length", function() {
            var url = (function(){
                var str = [];
                for (var i=0; i<129; i++)
                    str[i] = 'a';
                return str.join('');
            })(),
            web = view.fields['WebAddress'],
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