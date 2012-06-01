define('Mobile/SalesLogix/Action', [
    'dojo/_base/lang',
    'dojo/string',
    'Sage/Platform/Mobile/Utility'
], function(
    lang,
    string,
    utility
) {
    return lang.setObject('Mobile.SalesLogix.Action', {
        calledText: 'Called ${0}',
        emailedText: 'E-mailed ${0}',

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

        callPhone: function(action, key, descriptor, phoneProperty, entry) {
            entry = this.expandExpression(entry, key, descriptor);

            lang.mixin(entry.entry, {
                'Type': 'atPhoneCall',
                'Description': string.substitute(Mobile.SalesLogix.Action.calledText, [descriptor])
            });

            Mobile.SalesLogix.Action.recordToHistory(function() {
                App.initiateCall(entry.selectedEntry[phoneProperty]);
            }.bindDelegate(this), entry.entry);
        },

        addNote: function(action, key, descriptor, entry) {
            entry = this.expandExpression(entry, key, descriptor);

            var view = App.getView('history_edit'),
                options = {
                    entry: entry.entry,
                    insert: true
                };

            if (view)
                view.show(options);
        },
        addActivity: function(action, key, descriptor, entry) {
            entry = this.expandExpression(entry, key, descriptor);
            var options = {
                    entry: entry.entry,
                    insert: true
                };
            App.navigateToActivityInsertView(options);
        },
        navigateToEntity: function(action, key, descriptor, o) {
            var entry = this.expandExpression(o.entry, key, descriptor),
                options = {
                    key: utility.getValue(entry.selectedEntry, o.keyProperty),
                    descriptor: utility.getValue(entry.selectedEntry, o.textProperty)
                },
                view = App.getView(o.view);

            if (view && options.key)
                view.show(options);
        },
        sendEmail: function(action, key, descriptor, emailProperty, entry) {
            entry = this.expandExpression(entry, key, descriptor);

            lang.mixin(entry.entry, {
                'Type': 'atEmail',
                'Description': string.substitute(Mobile.SalesLogix.Action.emailedText, [descriptor])
            });

            Mobile.SalesLogix.Action.recordToHistory(function() {
                App.initiateEmail(entry.selectedEntry[emailProperty]);
            }.bindDelegate(this), entry.entry);
        },
        expandExpression: function(expression) {
            if (typeof expression === 'function')
                return expression.apply(this, Array.prototype.slice.call(arguments, 1));
            else
                return expression;
        }

    });
});