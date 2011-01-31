describe("Base Detail", function() {

    describe("on processLayout 'data-action' attribute", function(){
        var detailView, DOMSpy, fieldProps, layout;

        beforeEach(function(){
            detailView = new Sage.Platform.Mobile.Detail();
            DOMSpy = spyOn(Ext.DomHelper, 'append');
            fieldProps = {
                name: 'WorkPhone',
                action: 'callWorkPhone',
            },
            layout = [fieldProps];
        });


        it("must be mapped to 'action' property", function() {
            detailView.processLayout(layout, {}, {});

            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);
        });

        it("must be mapped to 'action' property when 'disabled' is false", function() {
            fieldProps['value'] = 123;
            fieldProps['disabled'] = {
                fn: function(val){return !val;}
            };

            ///disabled function in standard validator format
            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);

            ///disabled as a straight forward function
            fieldProps['disabled'] = function(val){return !val;}

            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);

            ///disabled as boolean
            fieldProps['disabled'] = false;
            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);
        });

        it("must not be mapped to 'action' property when 'disabled' is true", function() {
            //fieldProps['value'] = null;
            fieldProps['disabled'] = {
                fn: function(val){return !val;}
            };

            ///disabled function in standard validator format
            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).not.toMatch(/data-action="callWorkPhone"/);

            ///disabled as a straight forward function
            fieldProps['disabled'] = function(val){return !val;}

            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).not.toMatch(/data-action="callWorkPhone"/);

            ///disabled as boolean
            fieldProps['disabled'] = true;
            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).not.toMatch(/data-action="callWorkPhone"/);
        });
    });
});