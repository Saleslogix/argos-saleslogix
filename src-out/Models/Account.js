define('crm/Models/Account', ['exports', 'module', 'dojo/_base/declare', 'argos/_ModelBase', 'argos/Store/SData', 'dojo/Deferred'], function (exports, module, _dojo_baseDeclare, _argos_ModelBase, _argosStoreSData, _dojoDeferred) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _ModelBase2 = _interopRequireDefault(_argos_ModelBase);

    var _SDataStore = _interopRequireDefault(_argosStoreSData);

    var _Deferred = _interopRequireDefault(_dojoDeferred);

    module.exports = (0, _declare['default'])('Mobile.SalesLogix.Models.Account', [_ModelBase2['default']], {
        app: null,
        metadata: {
            sdata: {
                security: 'Entities/Account/View',
                querySelect: ['AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'BusinessDescription', 'CreateDate', 'CreateUser', 'Description', 'Fax', 'GlobalSyncID', 'ImportSource', 'Industry', 'LeadSource/Description', 'MainPhone', 'Notes', 'Owner/OwnerDescription', 'Status', 'SubType', 'Type', 'WebAddress'],
                resourceKind: 'accounts',
                getOptions: function getOptions(options) {
                    var getOptions = {};
                    if (options) {
                        if (options.select) getOptions.select = options.select;
                        if (options.include) getOptions.include = options.include;
                        if (options.contractName) getOptions.contractName = options.contractName;
                        if (options.resourceKind) getOptions.resourceKind = options.resourceKind;
                        if (options.resourceProperty) getOptions.resourceProperty = options.resourceProperty;
                        if (options.resourcePredicate) getOptions.resourcePredicate = options.resourcePredicate;
                    }

                    return getOptions;
                },
                getId: function getId(options) {
                    return options && (options.id || options.key);
                }
            }
        },
        _appGetter: function _appGetter() {
            return this.app || window.App;
        },
        _appSetter: function _appSetter(value) {
            this.app = value;
        },
        createStore: function createStore() {
            var m = this.metadata && this.metadata.sdata,
                app = this.get('app');
            return new _SDataStore['default']({
                service: app.getService(false),
                contractName: m.contractName,
                resourceKind: m.resourceKind,
                resourceProperty: m.resourceProperty,
                resourcePredicate: m.resourcePredicate,
                include: m.queryInclude,
                select: m.querySelect,
                itemsProperty: m.itemsProperty,
                idProperty: m.idProperty,
                labelProperty: m.labelProperty,
                entityProperty: m.entityProperty,
                versionProperty: m.versionProperty,
                scope: this
            });
        },
        getStore: function getStore() {
            return this._store;
        },
        setStore: function setStore(store) {
            this._store = store;
        },
        getEntries: function getEntries(query) {
            return {};
        },
        getEntry: function getEntry(options) {
            var store = this.createStore(),
                m = this.metadata && this.metadata.sdata;

            return store.get(m.getId(options), m.getOptions(options));
        },
        insertEntry: function insertEntry(entry, options) {
            var store = this.getStore();
            return store.add(entry, options);
        },
        updateEntry: function updateEntry(entry, options) {
            var store = this.getStore();

            if (!store) {
                throw new Error('No store set.');
            }

            return this.validate(entry).then((function fulfilled() {
                return store.put(entry, options);
            }).bind(this)); // Since we left off the reject handler, it will propagate up if there is a validation error
        },
        /**
         * If an entry is valid, validate should return a promise that resolves to true. If the entry is not valid,
         * validate should return a reject promise with the error message.
         * @param entry
         * @returns Promise
         */
        validate: function validate(entry) {
            var def = new _Deferred['default']();
            if (entry) {
                def.resolve(true);
            }

            def.reject('The entry is null or undefined.');
            return def.promise;
        }
    });
});
