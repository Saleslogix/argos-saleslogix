module("Home View", {
    setup: function() {
        //Configured in Saleslogix.html
        S.open(Saleslogix.URL);
    }
});

test('On Home Screen', function() {
    expect(1);
    equal(S('.button.configure').css('display'), 'block', 'Confiure Button must be visible.')
});
