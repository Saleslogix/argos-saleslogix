module("Search", {
    setup: function() {
        //Clear Preferences for testing. Just to control our test environment.
        window.localStorage.removeItem('preferences');
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL);
        Saleslogix.Common.Login();
    }
});

var navigateToAccountsList = function(callback) {
    //Register callback.
    callback = typeof callback == "function" ? callback : function() {};
    S('#account_list').visible(function(){
      //Give it some time to load. Search bar is visible only after it loads the list.
      S.wait(5000, callback);
    });
    //Selector click on <a> didn't work. FuncUnit is replacing href with javascript://.
    //This is just a work around. We have to find a fix for this.
    //S("ul#home li:nth-child(2) a").click(function(){});
    var win = FuncUnit._window;
    var acc_list_link = win.Ext.get(win.Ext.DomQuery.select("ul#home li:nth-child(1) a")[0]);
    win.App.getView('home').navigateToView(acc_list_link);
};

test('Search box default properties', function() {
    expect(7);
    
    S('#home').visible(function(){
        navigateToAccountsList(function(){            
            S('#account_list .search .query')
                .visible(function(){
                    equals(
                        S('#account_list .search .dismissButton').css('visibility'), 
                        'hidden', 
                        'Dismiss Button must not be visible if search box is empty'
                    );
                    
                    equals(
                        S('#account_list .search label').css('visibility'), 
                        'visible', 
                        'Search label must be visible if search box is empty'
                    );
                    
                    S('#account_list .search .query').type("search", function(){
                        equals(
                            S('#account_list .search .dismissButton').css('visibility'), 
                            'visible', 
                            'Dismiss Button must be visible if search box is not empty'
                        );
                        
                        equals(
                            S('#account_list .search label').css('visibility'), 
                            'hidden', 
                            'Search label must be visible if search box is not empty'
                        );
                    });
                
                //Clear the search box
                S('#account_list .search .query').type("\b\b\b\b\b\bAbbot", function(){
                    S('#account_list .search .searchButton').click(function(){
                        //Wait for results to load
                        S.wait(5000, function(){
                            equals(
                                S('#account_list .search .query').css('display'), 
                                'inline', 
                                'Search box must be visible after search is performed'
                            );
                        });
                    });
                });
            });
        });
        
        S('#account_list .search .dismissButton').click(function(){
            equals(
                S('#account_list .search .query').text(), 
                '', 
                'Clicking dismiss button must clear search box'
            );
            
            equals(
                S('#account_list .search .dismissButton').css('visibility'), 
                'hidden', 
                'Clicking dismiss button must hide itself'
            );
        });
    });
});
