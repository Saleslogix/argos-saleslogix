var homeListSize;

module("Configure", {
    setup: function() {
        //Clear Preferences for testing. Just to control our test environment.
        window.localStorage.removeItem('preferences');
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL);
        Saleslogix.Common.Login(function(){
            S('#home').visible(navigateToConfigureScreen);
        });
    }
});

var navigateToConfigureScreen = function(callback) {
    //Register callback.
    callback = typeof callback == "function" ? callback : function() {};
    
    //Selector click on <a> didn't work. FuncUnit is replacing href with javascript://.
    //This is just a work around. We have to find a fix for this.
    //S("ul#home li:nth-child(2) a").click(function(){});
    var win = FuncUnit._window;
    homeListSize = S('#home li').size();
    win.App.getView('home').navigateToConfigure();
};



test('On Configure screen', function() {
    expect(7);
    S('#configure li .list-selector').visible(function(){
        equal(S('#configure li .list-selector').css('display'), 'block', 'Checkboxes must be visible');
        equal(S('#configure li .moveup').css('display'), 'block', 'Move up buttons must be present');
        equal(S('#configure li .movedown').css('display'), 'block', 'Move down buttons must be present');
        equal(S('#configure li:first-child .moveup').css('visibility'), 'hidden', 'First Move up button must be hidden');
        equal(S('#configure li:last-child .movedown').css('visibility'), 'hidden', 'Last Move down button must be hidden');
        
        // Just form a closure.
        S.wait(100, function(){
            var firstItem = S('#configure li:nth-child(1) .resource').attr('data-resource');
            S('#configure li:nth-child(1) .movedown').click(function(){
                S.wait(100, function() {
                    var newSecondItem = S('#configure li:nth-child(2) .resource').attr('data-resource');
                    
                    equal(firstItem, newSecondItem, 'Clicking move down must push the element one step down');
                });
            });
        });
        
        // Just form a closure.
        S.wait(100, function(){
            var firstItem = S('#configure li:nth-child(1) .resource').attr('data-resource');
            S('#configure li:nth-child(2) .moveup').click(function(){
                S.wait(100, function() {
                    var newSecondItem = S('#configure li:nth-child(2) .resource').attr('data-resource');
                    
                    equal(firstItem, newSecondItem, 'Clicking move up must push the element one step up');
                });
            });
        });
    });
});

test("On configure screen save", function(){
    S.wait(100, function(){

        S('#configure li:nth-child(1) .list-selector').click();
        S('#configure li:nth-child(2) .list-selector').click(function(){
            S('.save.button').click(function(){
                S.wait(1000, function(){
                    equal(S('#home li').size(), (homeListSize - 2), 'Home screen shows only configured lists');
                });
            });
        })
    });
});
