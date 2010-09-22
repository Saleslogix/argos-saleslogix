if (!Saleslogix) Saleslogix = {};
if (!Saleslogix.Common) Saleslogix.Common = {};

Saleslogix.Common.Login = function (callback, credentials) {
    if (!credentials) {
      credentials = {
        user: 'lee',
        password: ''
      }
    }
    //Clear local storage "preferences" for all test cases.
    try {
        FuncUnit._window.localStorage.removeItem('[preferences]');
    } catch(e) {}
    
    callback = typeof callback == "function" ? callback : function(){};
    S('#login .actionButton').visible(function() {
        S('#login input[name="user"]').type(credentials.user);
        S('#login input[name="pass"]').type(credentials.password);
        FuncUnit._window.App.getView('login').validateCredentials(credentials.user, credentials.password, false);
        //Need to find a better way for testing Ajax calls.
        //Better hook up to Argos Login event. Right now it doesn't exist.
        //We wait for 5 seconds for authentication. This also helps in testing latency.
        S.wait(5000, callback);
    });
};
