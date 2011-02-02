describe("Base View", function() {
    it("must call render and initEvents on init", function() {
        var view = new Sage.Platform.Mobile.View();

        spyOn(view, 'initEvents');
        spyOn(view, 'render');

        view.init();

        expect(view.initEvents).toHaveBeenCalled();
        expect(view.render).toHaveBeenCalled();
    });

    it("must check for 'data-action' attribute of an element on click", function() {
        var view = new Sage.Platform.Mobile.View(),
            el = new Ext.Element('<div></div>'),
            evt = {}, getAttSpy;

        getAttSpy = spyOn(el, 'getAttribute').andReturn(null);
        spyOn(view, 'hasAction');

        view._initiateActionFromClick(evt, el);

        expect(view.hasAction).toHaveBeenCalled();
        expect(getAttSpy.mostRecentCall.args).toEqual(["data-action"]);
    });

    it("hasAction checks for an instance method with same name", function() {
        var view = new Sage.Platform.Mobile.View(),
            el = new Ext.Element('<div></div>'),
            evt = {};

        view.action1 = function() {};
        view.action2 = 'action';

        expect(view.hasAction('action1', evt, el)).toBeTruthy();
        expect(view.hasAction('action2', evt, el)).toBeFalsy();
        expect(view.hasAction('action3', evt, el)).toBeFalsy();
    });

    it("invokeAction calls an instance method with passed name and arguments", function() {
      var view = new Sage.Platform.Mobile.View(),
          el = new Ext.Element('<div></div>'),
          evt = {};
  
      view.action1 = function(a) { return a; };

      expect(view.invokeAction('action1', 123, evt, el)).toEqual(123);
    });
});