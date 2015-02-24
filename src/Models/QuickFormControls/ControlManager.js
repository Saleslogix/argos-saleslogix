/* 
 * See copyright file.
 */

/**
 * @class crm.Models.QuickFormControls.ControlManager
 * Control Manager is a registry for Quickform control types that enables the QuickFormModel to render the quickform control metadata
 * simply define `type: 'myControlType'`.
 * @alternateClassName ControlManager
 * @singleton
 */
define('crm/Models/QuickFormControls/ControlManager', [
    'dojo/_base/lang'
], function(
    lang
) {
    var store = {};
    return lang.setObject('crm.Models.QuickFormControls.ControlManager', {
        /**
         * @property {Object}
         * The type map that translates string type names to constructor functions
         */
        types: store,
        /**
         * Registers a control map type by providing a unique name and the constructor to be called
         * @param {String} name Unique string name of control, will be what is used in QuickForm Model Layout.
         * @param {Function} ctor Constructor function of control
         */
        register: function(name, map) {
            this.types[name] = map;
            return map;
        },
        /**
         * Retrieves a control map to a constructor for the given control name
         * @param name Unique name of control
         * @return {object} of string and {Function} Constructor for the given control type
         */
        get: function(name) {
            return this.types[name];
        },
        getByType: function (type) {
            var map;
            for (var name in this.types) {
                 map = this.types[name];
                 if (map.type === type) {
                     return map;
                 }
            }
            return null;
        }
    });
});
