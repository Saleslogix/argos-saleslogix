define('crm/Views/Contact/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'crm/Format', 'crm/Template', 'crm/Validator', 'argos/Edit', 'argos/Utility'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _crmFormat, _crmTemplate, _crmValidator, _argosEdit, _argosUtility) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _dString = _interopRequireDefault(_dojoString);

    var _format = _interopRequireDefault(_crmFormat);

    var _template = _interopRequireDefault(_crmTemplate);

    var _validator = _interopRequireDefault(_crmValidator);

    var _Edit = _interopRequireDefault(_argosEdit);

    var _utility = _interopRequireDefault(_argosUtility);

    /**
     * @class crm.Views.Contact.Edit
     *
     * @extends argos.Edit
     *
     * @requires argos.Utility
     *
     * @requires crm.Format
     * @requires crm.Template
     * @requires crm.Validator
     */
    var __class = (0, _declare['default'])('crm.Views.Contact.Edit', [_Edit['default']], {
        //Localization
        titleText: 'Contact',
        nameText: 'name',
        workText: 'work phone',
        mobileText: 'mobile phone',
        emailText: 'email',
        webText: 'web',
        acctMgrText: 'acct mgr',
        accountNameText: 'account',
        homePhoneText: 'home phone',
        faxText: 'fax',
        addressText: 'address',
        contactTitleText: 'title',
        titleTitleText: 'Title',
        addressTitleText: 'Address',
        ownerText: 'owner',
        cuisinePreferenceText: 'cuisine',
        cuisinePreferenceTitleText: 'Cuisine',

        //View Properties
        entityName: 'Contact',
        id: 'contact_edit',
        insertSecurity: 'Entities/Contact/Add',
        updateSecurity: 'Entities/Contact/Edit',
        querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'CuisinePreference', 'CreateDate', 'CreateUser', 'Email', 'Fax', 'FirstName', 'HomePhone', 'LastName', 'MiddleName', 'Mobile', 'Name', 'NameLF', 'Owner/OwnerDescription', 'Prefix', 'Suffix', 'Title', 'WebAddress', 'WorkPhone'],
        resourceKind: 'contacts',

        startup: function startup() {
            this.inherited(arguments);
            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
        },
        beforeTransitionTo: function beforeTransitionTo() {
            this.inherited(arguments);
            if (this.options.insert) {
                this.fields['Account'].enable();
            } else {
                this.fields['Account'].disable();
            }
        },
        onAccountChange: function onAccountChange(value) {
            if (value && value.text) {
                this.fields['AccountName'].setValue(value.text);
            }
            this.requestAccount(value['key']);
        },
        applyContext: function applyContext() {
            var found, lookup;

            found = App.queryNavigationContext(function (o) {
                o = o.options && o.options.source || o;
                return /^(accounts|opportunities)$/.test(o.resourceKind) && o.key;
            });

            lookup = {
                'accounts': this.applyAccountContext,
                'opportunities': this.applyOpportunityContext
            };

            this.fields['AccountManager'].setValue(App.context.user);
            this.fields['Owner'].setValue(App.context['defaultOwner']);

            if (found && lookup[found.resourceKind]) {
                lookup[found.resourceKind].call(this, found);
            }
        },
        applyAccountContext: function applyAccountContext(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            if (!entry && context.options && context.options.source && context.options.source.entry) {
                this.requestAccount(context.options.source.entry['$key']);
            }

            this.processAccount(entry);
        },
        requestAccount: function requestAccount(accountId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setResourceKind('accounts').setResourceSelector(_dString['default'].substitute('\'${0}\'', [accountId])).setQueryArg('select', ['AccountName', 'Address/*', 'Fax', 'MainPhone', 'WebAddress'].join(','));

            request.allowCacheUse = true;
            request.read({
                success: this.processAccount,
                failure: this.requestAccountFailure,
                scope: this
            });
        },
        requestAccountFailure: function requestAccountFailure() {},
        processAccount: function processAccount(entry) {
            var account = entry,
                accountName = _utility['default'].getValue(entry, 'AccountName'),
                webAddress = _utility['default'].getValue(entry, 'WebAddress'),
                mainPhone = _utility['default'].getValue(entry, 'MainPhone'),
                address = _utility['default'].getValue(entry, 'Address'),
                fax = _utility['default'].getValue(entry, 'Fax');

            if (account) {
                this.fields['Account'].setValue(account);
            }
            if (accountName) {
                this.fields['AccountName'].setValue(accountName);
            }
            if (webAddress) {
                this.fields['WebAddress'].setValue(webAddress);
            }
            if (mainPhone) {
                this.fields['WorkPhone'].setValue(mainPhone);
            }
            if (address) {
                this.fields['Address'].setValue(this.cleanAddressEntry(address));
            }
            if (fax) {
                this.fields['Fax'].setValue(fax);
            }
        },
        applyOpportunityContext: function applyOpportunityContext(context) {
            var view = App.getView(context.id),
                entry = view && view.entry,
                opportunityId = _utility['default'].getValue(entry, '$key'),
                account = _utility['default'].getValue(entry, 'Account'),
                accountName = _utility['default'].getValue(entry, 'Account.AccountName'),
                webAddress = _utility['default'].getValue(entry, 'Account.WebAddress'),
                mainPhone = _utility['default'].getValue(entry, 'Account.MainPhone'),
                address = _utility['default'].getValue(entry, 'Account.Address'),
                fax = _utility['default'].getValue(entry, 'Account.Fax');

            if (opportunityId) {
                this.fields['Opportunities.$resources[0].Opportunity.$key'].setValue(opportunityId);
            }
            if (account) {
                this.fields['Account'].setValue(account);
            }
            if (accountName) {
                this.fields['AccountName'].setValue(accountName);
            }
            if (webAddress) {
                this.fields['WebAddress'].setValue(webAddress);
            }
            if (mainPhone) {
                this.fields['WorkPhone'].setValue(mainPhone);
            }
            if (address) {
                this.fields['Address'].setValue(this.cleanAddressEntry(address));
            }
            if (fax) {
                this.fields['Fax'].setValue(fax);
            }
        },
        cleanAddressEntry: function cleanAddressEntry(address) {
            if (address) {
                var clean = {},
                    skip = {
                    '$key': true,
                    '$lookup': true,
                    '$url': true,
                    'EntityId': true,
                    'ModifyDate': true,
                    'ModifyUser': true,
                    'CreateDate': true,
                    'CreateUser': true
                },
                    name;

                for (name in address) {
                    if (address.hasOwnProperty(name)) {
                        if (!skip[name]) {
                            clean[name] = address[name];
                        }
                    }
                }

                return clean;
            } else {
                return null;
            }
        },
        createLayout: function createLayout() {
            return this.layout || (this.layout = [{
                applyTo: '.',
                formatValue: _format['default'].nameLF,
                label: this.nameText,
                name: 'ContactName',
                property: 'ContactName',
                type: 'name',
                validator: _validator['default'].name,
                view: 'name_edit'
            }, {
                label: this.accountNameText,
                name: 'Account',
                property: 'Account',
                textProperty: 'AccountName',
                type: 'lookup',
                validator: _validator['default'].exists,
                view: 'account_related'
            }, {
                name: 'AccountName',
                property: 'AccountName',
                type: 'hidden'
            }, {
                name: 'WebAddress',
                property: 'WebAddress',
                label: this.webText,
                type: 'text',
                inputType: 'url',
                maxTextLength: 128,
                validator: _validator['default'].exceedsMaxTextLength
            }, {
                name: 'WorkPhone',
                property: 'WorkPhone',
                label: this.workText,
                type: 'phone',
                maxTextLength: 32,
                validator: _validator['default'].exceedsMaxTextLength
            }, {
                name: 'Email',
                property: 'Email',
                label: this.emailText,
                type: 'text',
                inputType: 'email'
            }, {
                label: this.contactTitleText,
                name: 'Title',
                property: 'Title',
                picklist: 'Title',
                title: this.titleTitleText,
                type: 'picklist'
            }, {
                formatValue: _format['default'].address.bindDelegate(this, true),
                label: this.addressText,
                name: 'Address',
                property: 'Address',
                type: 'address',
                view: 'address_edit'
            }, {
                name: 'HomePhone',
                property: 'HomePhone',
                label: this.homePhoneText,
                type: 'phone',
                maxTextLength: 32,
                validator: _validator['default'].exceedsMaxTextLength
            }, {
                name: 'Mobile',
                property: 'Mobile',
                label: this.mobileText,
                type: 'phone',
                maxTextLength: 32,
                validator: _validator['default'].exceedsMaxTextLength
            }, {
                name: 'Fax',
                property: 'Fax',
                label: this.faxText,
                type: 'phone',
                maxTextLength: 32,
                validator: _validator['default'].exceedsMaxTextLength
            }, {
                label: this.acctMgrText,
                name: 'AccountManager',
                property: 'AccountManager',
                textProperty: 'UserInfo',
                textTemplate: _template['default'].nameLF,
                type: 'lookup',
                view: 'user_list'
            }, {
                label: this.ownerText,
                name: 'Owner',
                property: 'Owner',
                textProperty: 'OwnerDescription',
                type: 'lookup',
                view: 'owner_list'
            }, {
                name: 'Opportunities.$resources[0].Opportunity.$key',
                property: 'Opportunities.$resources[0].Opportunity.$key',
                type: 'hidden'
            }, {
                label: this.cuisinePreferenceText,
                name: 'CuisinePreference',
                property: 'CuisinePreference',
                type: 'picklist',
                picklist: 'CuisinePrefs',
                singleSelect: false,
                title: this.cuisinePreferenceTitleText
            }]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Contact.Edit', __class);
    module.exports = __class;
});
