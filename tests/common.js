if (!Saleslogix) Saleslogix = {};
if (!Saleslogix.Common) Saleslogix.Common = {};

Saleslogix.Common.Login = function (callback) {
    //Clear local storage "preferences" for all test cases.
    try {
        FuncUnit._window.localStorage.removeItem('[preferences]');
    } catch(e) {}
    
    callback = typeof callback == "function" ? callback : function(){};
    S('#login_dialog .blueButton').visible(function() {
        S('#login_dialog .blueButton').click(callback);
    });
};
