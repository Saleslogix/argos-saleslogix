define('Mobile/SalesLogix/Action', [
    'dojo/_base/lang'
], function(
    lang
) {
    return lang.setObject('Mobile.SalesLogix.Action', {
        navigateToHistoryInsert: function(entry, complete) {
            var view = App.getView('history_edit');
            if (view)
            {
                view.show({
                    title: entry['Title'] || null,
                    template: {},
                    entry: entry,
                    insert: true
                }, {
                    complete: complete
                });
            }
        },
        recordToHistory: function(complete, o) {
            var entry = {
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': (new Date())
            };
            lang.mixin(entry, o);

            this.navigateToHistoryInsert(entry, complete);
        },

        callPhone: function(phoneNumber, entry) {
            this.recordToHistory(function() {
                App.initiateCall(phoneNumber);
            }.bindDelegate(this), entry);
        }

    });
});