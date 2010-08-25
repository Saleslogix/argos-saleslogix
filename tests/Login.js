module("Login", {
    setup: function() {
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL);
    }
});

test('On application start', function() {
    expect(1);
    S('#login_dialog .actionButton').visible(function() {
        equal(S('#login_dialog').css('display'), 'block', 'Login Dialog is displayed.');
    });
});

test('On clicking Login button, with correct credentials', function() {
    expect(3);
    Saleslogix.Common.Login(function(){
        equal(S('#home').attr('selected'), 'true', 'Home View must be selected.');
        equal(S('#home').css('display'), 'block', 'Home View must be visible.');
        //Need to find a better way for testing Ajax calls.
        //Better hook up to Argos Login event. Right now it doesn't exist.
        //We wait for 5 seconds for authentication. This also helps in testing latency.
        S.wait(5000, function(){
            equal(S('#login_dialog').css('display'), 'none', 'Login dialog must be invisible.');
        });
    });
});

test('On clicking Login button, with incorrect credentials', function() {
    expect(1);
    S('#login_dialog .actionButton').visible(function() {
        //Simulates backspace 3 times to delete "lee".
        S('#login_dialog_user').type('\b\b\bbrucelee');
        S('#login_dialog_pass').type('password');

        S('#login_dialog .actionButton').click(function(){
            //The Application is using alert, which is difficult to test. 
            //It must throw exceptions, that could be caught.
            S.wait(5000, function(){
                equal(S('#login_dialog').css('display'), 'block', 'Login dialog must be visible.');
            });
        });
    });
});
