/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Action
 *
 *
 * @requires argos.Utility
 *
 */
define('crm/Action', [
    'dojo/_base/lang',
    'dojo/string',
    'argos/Utility'
], function(
    lang,
    string,
    utility
) {
    var __class = lang.setObject('crm.Action', {
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
            var value;
            if (!selection || !selection.data) {
                return;
            }
            this.setSource({
                entry: selection.data,
                descriptor: selection.data['$descriptor'],
                key: selection.data['$key']
            });

            lang.mixin(selection.data, {
                'Type': 'atPhoneCall',
                'Description': string.substitute(crm.Action.calledText, [selection.data['$descriptor']])
            });
            value = utility.getValue(selection.data, phoneProperty, '');
            crm.Action.recordToHistory(function() {
                App.initiateCall(value);
            }.bindDelegate(this), selection.data);
        },
        sendEmail: function(action, selection, emailProperty) {
            var value;
            if (!selection || !selection.data) {
                return;
            }
            lang.mixin(selection.data, {
                'Type': 'atEmail',
                'Description': string.substitute(crm.Action.emailedText, [selection.data['$descriptor']])
            });
            value = utility.getValue(selection.data, emailProperty, '');
            crm.Action.recordToHistory(function() {
                App.initiateEmail(value);
            }.bindDelegate(this), selection.data);
        },

        addNote: function(action, selection) {
            var entry = selection.data,
                key = selection.data.$key,
                view,
                desc = selection.data.$descriptor;

            this.setSource({
                entry: entry,
                descriptor: desc,
                key: key
            });

            view = App.getView('history_edit');

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
            App.navigateToActivityInsertView();
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

    lang.setObject('Mobile.SalesLogix.Action', __class);
    return __class;
});

