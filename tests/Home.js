module("Home", {
    setup: function() {
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL);
        Saleslogix.Common.Login();
    }
});

test('On Home Screen', function() {
    expect(1);
    equal(S('.button.configure').css('display'), 'block', 'Confiure Button must be visible.')
});
