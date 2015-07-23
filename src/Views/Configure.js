import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import query from 'dojo/query';
import string from 'dojo/string';
import domAttr from 'dojo/dom-attr';
import domClass from 'dojo/dom-class';
import Memory from 'dojo/store/Memory';
import _ConfigureBase from 'argos/_ConfigureBase';

/**
 * @class crm.Views.Configure
 *
 *
 * @extends argos._ConfigureBase
 *
 */
var __class = declare('crm.Views.Configure', [_ConfigureBase], {
    // Localization
    titleText: 'Configure',

    //View Properties
    id: 'configure',
    idProperty: '$key',
    labelProperty: '$descriptor',

    onSave: function() {
        var view;

        App.preferences.home = App.preferences.home || {};
        App.preferences.configure = App.preferences.configure || {};

        App.preferences.configure.order = this.getOrderedKeys();
        App.preferences.home.visible = this.getSelectedKeys();

        App.persistPreferences();

        ReUI.back();
        view = App.getView('left_drawer');
        if (view) {
            view.refresh();
        }
    },
    createStore: function() {
        var list = [],
            exposed = App.getExposedViews(),
            order = this.getSavedOrderedKeys(),
            reduced,
            all;

        // De-dup id's
        all = order.concat(exposed);
        reduced = all.reduce(function(previous, current) {
            if (previous.indexOf(current) === -1) {
                previous.push(current);
            }

            return previous;
        }, []);

        // The order array could have had stale id's, filter out valid views here
        reduced = array.filter(reduced, function(key) {
            var view = App.getView(key);
            return view && typeof view.getSecurity === 'function' && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(key) !== -1;
        });

        list = array.map(reduced, function(key) {
            var view = App.getView(key);
            return {
                '$key': view.id,
                '$descriptor': view.titleText,
                'icon': view.icon
            };
        });

        return Memory({data: list});
    },
    getSavedOrderedKeys: function() {
        return (App.preferences.configure && App.preferences.configure.order) || [];
    },
    getSavedSelectedKeys: function() {
        return (App.preferences.home && App.preferences.home.visible) || [];
    }
});

lang.setObject('Mobile.SalesLogix.Views.Configure', __class);
export default __class;

