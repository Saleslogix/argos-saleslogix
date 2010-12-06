module("Search", {
    setup: function() {
        //Clear Preferences for testing. Just to control our test environment.
        if (FuncUnit._window.localStorage) FuncUnit._window.localStorage.removeItem('preferences');
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL, function(){
            if (S('#login').css('display') == 'none')
                FuncUnit._window.App.navigateToHomeView();
            else
                Saleslogix.Common.Login(FuncUnit._window.App.navigateToHomeView);
        });
        
    }
});

test('Search box default properties', function() {
    expect(7);
    
    S('#home').visible(function(){
        S('#home [data-key=account_list]').click(function(){            
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