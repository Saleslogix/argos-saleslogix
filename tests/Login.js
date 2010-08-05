module("Login", {
	setup: function() {
		S.open("http://127.0.0.1:8080/products/argos-saleslogix/index-dev.html");
		expect(2);
	}
});

test("On Login", function() {
	S('#login_dialog .blueButton').visible(function() {
		S('#login_dialog .blueButton').click(function(){
			equal(S('#home').attr('selected'), 'true', 'Home View must be selected.');
			equal(S('#home').css('display'), 'block', 'Home View must be visible.');
		});
	});
});
