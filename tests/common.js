if (!Saleslogix) Saleslogix = {};
if (!Saleslogix.Common) Saleslogix.Common = {};

Saleslogix.Common.Login = function (callback) {
    callback = typeof callback == "function" ? callback : function(){};
    S('#login_dialog .blueButton').visible(function() {
        S('#login_dialog .blueButton').click(callback);
    });
};