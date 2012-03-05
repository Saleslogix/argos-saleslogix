(function() {
var getV = Sage.Platform.Mobile.Utility.getValue,
    scope = this,
    localize = function(name, values) {
        var target = getV(scope, name);
        if (target) apply(target, values);
    },
    apply = function(object, values){
        var target = object.prototype || object;
        for(var key in values){
            if(typeof values[key] === 'object'){
                apply(target[key], values[key]);
            } else {
                target[key] = values[key];
            }
        }
    };


localize("Sage.Platform.Mobile.Controls.DateField", {
  "dateFormatText": "dd/MM/yyyy"
});

localize("Mobile.SalesLogix.Activity.Complete", {
  "completedFormatText": "d/M/yyyy h:mm tt",
  "startingFormatText": "d/M/yyyy h:mm tt"
});

localize("Mobile.SalesLogix.Activity.Detail", {
  "startDateFormatText": "d/M/yyyy h:mm:ss tt",
  "timelessDateFormatText": "d/M/yyyy",
  "alarmDateFormatText": "d/M/yyyy h:mm:ss tt"
});

localize("Mobile.SalesLogix.Activity.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt"
});

localize("Mobile.SalesLogix.Activity.List", {
  "startDateFormatText": "ddd d/M/yy",
  "startTimeFormatText": "h:mm"
});

localize("Mobile.SalesLogix.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM yyyy",
  "dayTitleFormatText": "ddd d MMM, yyyy",
  "dayStartTimeFormatText": "h:mm"
});

localize("Mobile.SalesLogix.Calendar.UserActivityList", {
  "dateHeaderFormatText": "dddd, dd/MM/yyyy",
  "startTimeFormatText": "h:mm"
});

localize("Mobile.SalesLogix.Calendar.WeekView", {
  "weekTitleFormatText": "d MMM, yyyy",
  "dayHeaderLeftFormatText": "ddd",
  "dayHeaderRightFormatText": "d MMM, yyyy",
  "startTimeFormatText": "h:mm"
});

localize("Mobile.SalesLogix.History.Detail", {
  "dateFormatText": "d/M/yyyy h:mm:ss tt"
});

localize("Mobile.SalesLogix.History.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt"
});

localize("Mobile.SalesLogix.History.List", {
  "hourMinuteFormatText": "h:mm",
  "dateFormatText": "d/M/yy"
});

})();

