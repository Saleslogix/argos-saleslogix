module("Login", {
    setup: function() {
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL);
    }
});

test('On application start', function() {
    expect(1);
    S('#login').visible(function() {
        equal(1, 1, 'Login Screen is displayed.');
    });
});

test('On clicking Login button, with correct credentials', function() {
    expect(3);
    Saleslogix.Common.Login(function(){
        equal(S('#home').attr('selected'), 'true', 'Home View must be selected.');
        equal(S('#home').css('display'), 'block', 'Home View must be visible.');
        equal(S('#login').css('display'), 'none', 'Login dialog must be invisible.');
    });
});

test('On clicking Login button, with incorrect credentials', function() {
    expect(1);
    S('#login .actionButton').visible(function() {
        S('#login .actionButton').click(function(){
            equal(S('#login').css('display'), 'block', 'Login dialog must be visible.');
        });
    }, {user: 'brucelee', password: 'password'});
});
