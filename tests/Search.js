module("Search", {
    setup: function() {
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL);
        Saleslogix.Common.Login();
    }
});

var navigateToAccountsList = function(callback) {
    //Register callback.
    callback = typeof callback == "function" ? callback : function() {};
    S('#account_list').visible(callback);
    //Selector click on <a> didn't work. FuncUnit is replacing href with javascript://.
    //This is just a work around. We have to find a fix for this.
    //S("ul#home li:nth-child(2) a").click(function(){});
    var win = FuncUnit._window;
    var acc_list_link = win.Ext.get(win.Ext.DomQuery.select("ul#home li:nth-child(1) a")[0]);
    win.App.getView('home').navigateToView(acc_list_link);
};

var navigateToAccountDetail = function(callback) {
    //Register callback.
    callback = typeof callback == "function" ? callback : function() {};
    S('#account_detail').visible(callback);
    var win = FuncUnit._window;
    var dom_link = win.Ext.DomQuery.select("#account_list li:nth-child(1) a")[0];
    var acc_link = win.Ext.get(dom_link);
    var key = dom_link.getAttribute('m:key');
    var descriptor = dom_link.getAttribute('m:descriptor');
    win.App.getView('account_list').navigateToDetail('account_detail', key, descriptor)
};

test('Search box default properties', function() {
    expect(9);
    
    S('#home').visible(function(){
        equals(S('#search_dialog').css('display'), 'none', 'Search box must not be visible on Home screen');
        navigateToAccountsList(function(){
            equals(S('#search_dialog').css('display'), 'block', 'Search box must be visible on List Screens');
            S('#search_dialog_query').visible(function(){
                equals(S('#search_dialog .dismissButton').css('visibility'), 'hidden', 'Dismiss Button must not be visible if search box is empty');
                equals(S('#search_dialog label').css('visibility'), 'visible', 'Search label must be visible if search box is empty');
                S('#search_dialog_query').type("search", function(){
                    equals(S('#search_dialog .dismissButton').css('visibility'), 'visible', 'Dismiss Button must be visible if search box is not empty');
                    equals(S('#search_dialog label').css('visibility'), 'hidden', 'Search label must be visible if search box is not empty');
                });
            });
        });
        S('#search_dialog .dismissButton').click(function(){
            equals(S('#search_dialog_query').text(), '', 'Clicking dismiss button must clear search box');
            equals(S('#search_dialog .dismissButton').css('visibility'), 'hidden', 'Clicking dismiss button must hide itself');
        });
        S('#account_list li a[target="_detail"]').visible(function(){
            navigateToAccountDetail(function(){
                equals(S('#search_dialog').css('display'), 'none', 'Search box must not be visible on Detail Screens');
            });
        });
    });
});

test('Search box while using back button', function() {
    expect(1);
    
    //This is really bad. Must to find a way to reduce nesting.
    S('#home').visible(function(){
        navigateToAccountsList(function(){
            S('#search_dialog_query').visible(function(){
                S('#search_dialog_query').type("search", function(){
                    S.wait(1000, function(){
                        FuncUnit._window.App.getView('home').show();
                        S('#home').visible(function(){
                            equals(S('#search_dialog').css('display'), 'none', 'Dismiss button must not be visible on Home Screen');
                        });
                    });
                });
            });
        });
    });
});


