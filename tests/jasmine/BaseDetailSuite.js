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

        /// Defects: #1-78928
        it("must be mapped to 'action' property", function() {
            detailView.processLayout(layout, {}, {});

            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);
        });

        /// Defects: #1-78928
        it("must not have 'data-disable-action' property when 'disabled' is false", function() {
            fieldProps['value'] = 123;
            fieldProps['disabled'] = function(entry, val){return !val;}

            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);
            expect(DOMSpy.mostRecentCall.args[1]).not.toMatch(/data-disable-action/);

            ///disabled as boolean
            fieldProps['disabled'] = false;
            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);
            expect(DOMSpy.mostRecentCall.args[1]).not.toMatch(/data-disable-action/);
        });

        /// Defects: #1-78928
        it("must have 'data-disable-action' property as 'true' when 'disabled' is true", function() {
            fieldProps['value'] = false;
            fieldProps['disabled'] = function(entry, val){return !val;}

            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-disable-action="true"/);

            ///disabled as boolean
            fieldProps['disabled'] = true;
            detailView.processLayout(layout, {}, {});
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-action="callWorkPhone"/);
            expect(DOMSpy.mostRecentCall.args[1]).toMatch(/data-disable-action="true"/);
        });
    });
});