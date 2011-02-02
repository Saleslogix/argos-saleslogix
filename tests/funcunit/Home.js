module("Home", {
    setup: function() {
        //Configured in Saleslogix.html
        window.localStorage.removeItem('preferences');
        S.open(Saleslogix.URL);
        Saleslogix.Common.Login();
    }
});

var navigateTo = function(listid,listname,listref) {

        var list_item = FuncUnit._window.Ext.DomQuery.select(listref)[0];
        FuncUnit._window.ReUI.DomHelper.dispatch(list_item, 'click');
            S.wait(3000, function(){
                equal(S(listid).css('display'), 'block', listname + ' Click on home screen goes to ' + listname + ' screen');
        });

};

test('On Home Screen', function() {
    expect(39);
    equal(S('.button.configure').css('display'), 'block', 'Confiure Button must be visible.');
    
    S('#home').visible(function(){
        navigateTo('#account_list','Account','#home li a[href="#account_list"]');
    });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#account_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });

    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#account_list').css('display'), 'block', 'Account screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });
    
    S('#home').visible(function(){
            navigateTo('#campaign_list','Campaign','#home li a[href="#campaign_list"]');
        });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#campaign_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
        
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#campaign_list').css('display'), 'block', 'Campaign screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });
    
    S('#home').visible(function(){
            navigateTo('#contact_list','Contact','#home li a[href="#contact_list"]');
        });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#contact_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#contact_list').css('display'), 'block', 'Contact screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });
    
    S('#home').visible(function(){
            navigateTo('#salesorder_list','SalesOrder','#home li a[href="#salesorder_list"]');
        });
    
    // S('.button.actionButton').click(function(){
            ////The Application is using alert, which is difficult to test. 
            ////It must throw exceptions, that could be caught.
            // S.wait(5000, function(){
                // equal(S('#salesorder_edit').css('display'), 'block', 'Edit screen must be visible.');
            // });
        // });
    
    // S('#backButton').click(function(){
            ////The Application is using alert, which is difficult to test.
            ////It must throw exceptions, that could be caught.
            // S.wait(5000, function(){
                // equal(S('#salesorder_list').css('display'), 'block', 'Sales Order screen must be visible.');
            // });
        // });
    
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });

    S('#home').visible(function(){
            navigateTo('#contract_list','Contract','#home li a[href="#contract_list"]');
        });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#contract_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#contract_list').css('display'), 'block', 'Contract screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });

    S('#home').visible(function(){
            navigateTo('#opportunity_list','Opportunity','#home li a[href="#opportunity_list"]');
            //backtoHomeview();

        });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#opportunity_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#opportunity_list').css('display'), 'block', 'Opportunity screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });

    S('#home').visible(function(){
            navigateTo('#lead_list','Lead','#home li a[href="#lead_list"]');

        });
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#lead_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#lead_list').css('display'), 'block', 'Lead screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });

    S('#home').visible(function(){

            navigateTo('#return_list','Return','#home li a[href="#return_list"]');
            
        });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#return_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#return_list').css('display'), 'block', 'Return screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });

    S('#home').visible(function(){

            navigateTo('#ticket_list','Ticket','#home li a[href="#ticket_list"]');
            
        });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#ticket_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#ticket_list').css('display'), 'block', 'Ticket screen must be visible.');
            });
        });
    
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });

    S('#home').visible(function(){

            navigateTo('#defect_list','Defect','#home li a[href="#defect_list"]');
            
        });
    
    S('.button.actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#defect_edit').css('display'), 'block', 'Edit screen must be visible.');
            });
        });
    
    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#defect_list').css('display'), 'block', 'Defect screen must be visible.');
            });
        });
    

    S('#backButton').click(function(){
            //The Application is using alert, which is difficult to test.
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#home').css('display'), 'block', 'Home screen must be visible.');
            });
        });

});

