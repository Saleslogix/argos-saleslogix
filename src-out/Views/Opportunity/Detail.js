define('crm/Views/Opportunity/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/dom-construct', 'dojo/query', 'dojo/string', 'argos/Detail', '../../Format'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoDomConstruct, _dojoQuery, _dojoString, _argosDetail, _Format) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

    var _query = _interopRequireDefault(_dojoQuery);

    var _string = _interopRequireDefault(_dojoString);

    var _Detail = _interopRequireDefault(_argosDetail);

    var _format = _interopRequireDefault(_Format);

    /**
     * @class crm.Views.Opportunity.Detail
     *
     * @extends argos.Detail
     *
     * @requires crm.Format
     */
    var __class = (0, _declare['default'])('crm.Views.Opportunity.Detail', [_Detail['default']], {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        detailsText: 'Details',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        importSourceText: 'lead source',
        opportunityText: 'opportunity',
        ownerText: 'owner',
        actionsText: 'Quick Actions',
        potentialText: 'sales potential',
        potentialBaseText: 'sales potential (base rate)',
        potentialOpportunityText: 'sales potential (opp. rate)',
        potentialMyRateText: 'sales potential (my rate)',
        probabilityText: 'close prob',
        relatedActivitiesText: 'Activities',
        relatedContactsText: 'Opportunity Contacts',
        relatedHistoriesText: 'Notes/History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        relatedProductsText: 'Products',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'Opportunity Attachments',
        resellerText: 'reseller',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        moreDetailsText: 'More Details',
        multiCurrencyText: 'Multi Currency',
        multiCurrencyRateText: 'exchange rate',
        multiCurrencyCodeText: 'code',
        multiCurrencyDateText: 'rate date',
        multiCurrencyLockedText: 'rate locked',
        exchangeRateDateFormatText: 'M/D/YYYY h:mm A',

        //View Properties
        id: 'opportunity_detail',
        editView: 'opportunity_edit',
        noteEditView: 'history_edit',
        security: 'Entities/Opportunity/View',
        querySelect: ['Account/AccountName', 'Account/WebAddress', 'Account/MainPhone', 'Account/Fax', 'Account/Address/*', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'CloseProbability', 'Description', 'EstimatedClose', 'ExchangeRate', 'ExchangeRateCode', 'ExchangeRateDate', 'ExchangeRateLocked', 'LeadSource/Description', 'Owner/OwnerDescription', 'Reseller/AccountName', 'SalesPotential', 'Stage', 'Status', 'Type', 'Weighted'],
        resourceKind: 'opportunities',

        scheduleActivity: function scheduleActivity() {
            App.navigateToActivityInsertView();
        },
        addNote: function addNote() {
            var view = App.getView(this.noteEditView);
            if (view) {
                view.show({
                    template: {},
                    insert: true
                });
            }
        },
        processEntry: function processEntry() {
            this.inherited(arguments);

            if (App.hasMultiCurrency() && this.options && this.entry && this.entry.ExchangeRate) {
                this.options.ExchangeRate = this.entry.ExchangeRate;
                this.options.ExchangeRateCode = this.entry.ExchangeRateCode;
            }
        },
        getValues: function getValues() {
            var values = this.inherited(arguments),
                estimatedCloseDate = this.fields['EstimatedClose'].getValue(),
                timelessStartDate = estimatedCloseDate.clone().clearTime().add({ minutes: -1 * estimatedCloseDate.getTimezoneOffset(), seconds: 5 });

            values = values || {};
            values['EstimatedClose'] = timelessStartDate;

            return values;
        },
        formatAccountRelatedQuery: function formatAccountRelatedQuery(fmt) {
            return _string['default'].substitute(fmt, [this.entry['Account']['$key']]);
        },
        createLayout: function createLayout() {
            var layout, quickActions, details, moreDetails, multiCurrency, relatedItems;

            quickActions = {
                list: true,
                title: this.actionsText,
                cls: 'action-list',
                name: 'QuickActionsSection',
                children: [{
                    name: 'ScheduleActivityAction',
                    property: 'Description',
                    label: this.scheduleActivityText,
                    iconClass: 'fa fa-calendar fa-lg',
                    action: 'scheduleActivity'
                }, {
                    name: 'AddNoteAction',
                    property: 'Description',
                    label: this.addNoteText,
                    iconClass: 'fa fa-edit fa-lg',
                    action: 'addNote'
                }]
            };

            details = {
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    label: this.opportunityText,
                    name: 'Description',
                    property: 'Description'
                }, {
                    label: this.accountText,
                    key: 'Account.$key',
                    name: 'Account.AccountName',
                    property: 'Account.AccountName',
                    view: 'account_detail'
                }, {
                    label: this.statusText,
                    name: 'Status',
                    property: 'Status'
                }, {
                    label: this.estCloseText,
                    name: 'EstimatedClose',
                    property: 'EstimatedClose',
                    renderer: _format['default'].date.bindDelegate(this, null, true)
                }, {
                    label: App.hasMultiCurrency() ? this.potentialBaseText : this.potentialText,
                    name: 'SalesPotential',
                    property: 'SalesPotential',
                    renderer: (function (val) {
                        var exhangeRate, convertedValue;
                        if (App.hasMultiCurrency()) {
                            exhangeRate = App.getBaseExchangeRate();
                            convertedValue = val * exhangeRate.rate;
                            return _format['default'].multiCurrency.call(null, convertedValue, exhangeRate.code);
                        }
                        return _format['default'].currency.call(null, val);
                    }).bindDelegate(this)
                }]
            };

            multiCurrency = {
                title: this.multiCurrencyText,
                name: 'MultiCurrencySection',
                children: [{
                    label: this.multiCurrencyRateText,
                    name: 'ExchangeRate',
                    property: 'ExchangeRate'
                }, {
                    label: this.multiCurrencyCodeText,
                    name: 'ExchangeRateCode',
                    property: 'ExchangeRateCode'
                }, {
                    label: this.multiCurrencyDateText,
                    name: 'ExchangeRateDate',
                    property: 'ExchangeRateDate',
                    renderer: _format['default'].date.bindDelegate(this, this.exchangeRateDateFormatText, false)
                }, {
                    label: this.multiCurrencyLockedText,
                    name: 'ExchangeRateLocked',
                    property: 'ExchangeRateLocked'
                }]
            };

            moreDetails = {
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
                    label: this.typeText,
                    name: 'Type',
                    property: 'Type'
                }, {
                    label: this.resellerText,
                    key: 'Reseller.$key',
                    name: 'Reseller.AccountName',
                    property: 'Reseller.AccountName',
                    view: 'account_detail'
                }, {
                    label: this.probabilityText,
                    name: 'CloseProbability',
                    property: 'CloseProbability'
                }, {
                    label: this.acctMgrText,
                    name: 'AccountManager.UserInfo',
                    property: 'AccountManager.UserInfo',
                    renderer: _format['default'].nameLF
                }, {
                    label: this.importSourceText,
                    name: 'LeadSource.Description',
                    property: 'LeadSource.Description'
                }]
            };

            relatedItems = {
                list: true,
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    name: 'OpportunityRelated',
                    label: this.relatedProductsText,
                    view: 'opportunityproduct_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"')
                }, {
                    name: 'ActivityRelated',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}"')
                }, {
                    name: 'ContactRelated',
                    label: this.relatedContactsText,
                    options: {
                        prefilter: this.formatAccountRelatedQuery.bindDelegate(this, 'Account.Id eq "${0}"')
                    },
                    view: 'opportunitycontact_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"')
                }, {
                    name: 'HistoryRelated',
                    label: this.relatedHistoriesText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}" and Type ne "atDatabaseChange"'),
                    view: 'history_related'
                }, {
                    name: 'AttachmentRelated',
                    label: this.relatedAttachmentText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'opportunityId eq "${0}"'), // must be lower case because of feed
                    view: 'opportunity_attachment_related',
                    title: this.relatedAttachmentTitleText
                }]
            };

            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

            layout.push(quickActions);
            layout.push(details);

            if (App.hasMultiCurrency()) {
                details.children.push({
                    label: this.potentialMyRateText,
                    name: 'SalesPotentialMine',
                    property: 'SalesPotential',
                    renderer: (function (val) {
                        var exhangeRate, convertedValue;
                        if (App.hasMultiCurrency()) {
                            exhangeRate = App.getMyExchangeRate();
                            convertedValue = val * exhangeRate.rate;
                            return _format['default'].multiCurrency.call(null, convertedValue, exhangeRate.code);
                        }

                        return '-';
                    }).bindDelegate(this)
                }, {
                    label: this.potentialOpportunityText,
                    name: 'SalesPotentialOpportunity',
                    property: 'SalesPotentialOpportunity',
                    renderer: function renderer(val) {
                        if (App.hasMultiCurrency()) {
                            return _format['default'].multiCurrency.call(null, val.SalesPotential * val.ExchangeRate, val.ExchangeRateCode);
                        }

                        return '-';
                    }
                });

                layout.push(multiCurrency);
            }

            layout.push(moreDetails);
            layout.push(relatedItems);
            return layout;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Opportunity.Detail', __class);
    module.exports = __class;
});
