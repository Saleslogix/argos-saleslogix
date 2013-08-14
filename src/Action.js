/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
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
            if (view) {
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
        callPhone: function(action, selection, phoneProperty) {
            this.setSource({
                entry: selection.data,
                descriptor: selection.data['$descriptor'],
                key: selection.data['$key']
            });

            lang.mixin(selection.data, {
                'Type': 'atPhoneCall',
                'Description': string.substitute(Mobile.SalesLogix.Action.calledText, [selection.data['$descriptor']])
            });

            Mobile.SalesLogix.Action.recordToHistory(function() {
                App.initiateCall(selection.data[phoneProperty]);
            }.bindDelegate(this), selection.data);
        },
        sendEmail: function(action, selection, emailProperty) {
            lang.mixin(selection.data, {
                'Type': 'atEmail',
                'Description': string.substitute(Mobile.SalesLogix.Action.emailedText, [selection.data['$descriptor']])
            });

            Mobile.SalesLogix.Action.recordToHistory(function() {
                App.initiateEmail(selection.data[emailProperty]);
            }.bindDelegate(this), selection.data);
        },

        addNote: function(action, selection) {
            this.setSource({
                entry: selection.data,
                descriptor: selection.data['$descriptor'],
                key: selection.data['$key']
            });

            var view = App.getView('history_edit');

            if (view) {
                view.show({insert: true});
            }
        },
        addActivity: function(action, selection) {
            this.setSource({
                entry: selection.data,
                descriptor: selection.data['$descriptor'],
                key: selection.data['$key']
            });
            App.navigateToActivityInsertView({insert: true});
        },
        navigateToEntity: function(action, selection, o) {
            var options = {
                key: utility.getValue(selection.data, o.keyProperty),
                descriptor: utility.getValue(selection.data, o.textProperty)
            },
                view = App.getView(o.view);

            if (view && options.key) {
                view.show(options);
            }
        },

        hasProperty: function(action, selection, property) {
            return utility.getValue(selection.data, property);
        },
        addAttachment: function(action, selection) {
            var view;
            this.setSource({
                entry: selection.data,
                descriptor: selection.data['$descriptor'],
                key: selection.data['$key']
            });
            view = App.getView('attachment_Add');

            if (view) {
                view.show({ insert: true });
            }
        }
    });
});

