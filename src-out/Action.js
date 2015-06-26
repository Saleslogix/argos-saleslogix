define('crm/Action', ['exports', 'module', 'dojo/_base/lang', 'dojo/string', 'argos/Utility'], function (exports, module, _dojo_baseLang, _dojoString, _argosUtility) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    /*
     * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
     */

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _utility = _interopRequireDefault(_argosUtility);

    /**
     * @class crm.Action
     *
     *
     * @requires argos.Utility
     *
     */
    var __class = _lang['default'].setObject('crm.Action', {
        calledText: 'Called ${0}',
        emailedText: 'E-mailed ${0}',

        navigateToHistoryInsert: function navigateToHistoryInsert(entry, complete) {
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
        recordToHistory: function recordToHistory(complete, o) {
            var entry = {
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': new Date()
            };
            _lang['default'].mixin(entry, o);

            this.navigateToHistoryInsert(entry, complete);
        },
        callPhone: function callPhone(action, selection, phoneProperty) {
            var value;
            if (!selection || !selection.data) {
                return;
            }
            this.setSource({
                entry: selection.data,
                descriptor: selection.data['$descriptor'],
                key: selection.data['$key']
            });

            _lang['default'].mixin(selection.data, {
                'Type': 'atPhoneCall',
                'Description': _string['default'].substitute(crm.Action.calledText, [selection.data['$descriptor']])
            });
            value = _utility['default'].getValue(selection.data, phoneProperty, '');
            crm.Action.recordToHistory((function () {
                App.initiateCall(value);
            }).bindDelegate(this), selection.data);
        },
        sendEmail: function sendEmail(action, selection, emailProperty) {
            var value;
            if (!selection || !selection.data) {
                return;
            }
            _lang['default'].mixin(selection.data, {
                'Type': 'atEmail',
                'Description': _string['default'].substitute(crm.Action.emailedText, [selection.data['$descriptor']])
            });
            value = _utility['default'].getValue(selection.data, emailProperty, '');
            crm.Action.recordToHistory((function () {
                App.initiateEmail(value);
            }).bindDelegate(this), selection.data);
        },

        addNote: function addNote(action, selection) {
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
                view.show({ insert: true });
            }
        },
        addActivity: function addActivity(action, selection) {
            this.setSource({
                entry: selection.data,
                descriptor: selection.data['$descriptor'],
                key: selection.data['$key']
            });
            App.navigateToActivityInsertView();
        },
        navigateToEntity: function navigateToEntity(action, selection, o) {
            var options = {
                key: _utility['default'].getValue(selection.data, o.keyProperty),
                descriptor: _utility['default'].getValue(selection.data, o.textProperty)
            },
                view = App.getView(o.view);

            if (view && options.key) {
                view.show(options);
            }
        },

        hasProperty: function hasProperty(action, selection, property) {
            return _utility['default'].getValue(selection.data, property);
        },
        addAttachment: function addAttachment(action, selection) {
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

    _lang['default'].setObject('Mobile.SalesLogix.Action', __class);
    module.exports = __class;
});
