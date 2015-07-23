define('crm/Views/OpportunityContact/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'dojo/string', 'argos/Detail', 'argos/_LegacySDataDetailMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseConnect, _dojoString, _argosDetail, _argos_LegacySDataDetailMixin) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _connect = _interopRequireDefault(_dojo_baseConnect);

    var _string = _interopRequireDefault(_dojoString);

    var _Detail = _interopRequireDefault(_argosDetail);

    var _LegacySDataDetailMixin2 = _interopRequireDefault(_argos_LegacySDataDetailMixin);

    /**
     * @class crm.Views.OpportunityContact.Detail
     *
     * @extends argos.Detail
     * @mixins argos._LegacySDataDetailMixin
     */
    var __class = (0, _declare['default'])('crm.Views.OpportunityContact.Detail', [_Detail['default'], _LegacySDataDetailMixin2['default']], {
        //Localization
        titleText: 'Opportunity Contact',
        accountText: 'account',
        contactTitleText: 'title',
        nameText: 'contact',
        moreDetailsText: 'More Details',
        salesRoleText: 'role',
        strategyText: 'strategy',
        personalBenefitsText: 'personal ben',
        standingText: 'standing',
        issuesText: 'issues',
        competitorNameText: 'competitor pref',
        removeContactTitleText: 'Remove Contact',
        confirmDeleteText: 'Remove "${0}" from the opportunity?',
        contactText: 'Contact',

        //View Properties
        id: 'opportunitycontact_detail',
        editView: 'opportunitycontact_edit',
        security: 'Entities/Contact/View',
        querySelect: ['Opportunity/Description', 'Contact/Account/AccountName', 'Contact/AccountName', 'SalesRole', 'Contact/NameLF', 'Contact/Title', 'IsPrimary', 'Competitors/CompetitorName', 'Issues', 'PersonalBenefits', 'Standing', 'Strategy'],
        resourceKind: 'opportunityContacts',

        createEntryForDelete: function createEntryForDelete() {
            var entry = {
                '$key': this.entry['$key'],
                '$etag': this.entry['$etag'],
                '$name': this.entry['$name']
            };
            return entry;
        },
        removeContact: function removeContact() {
            var confirmMessage, entry, request;

            confirmMessage = _string['default'].substitute(this.confirmDeleteText, [this.entry.Contact.NameLF]);
            if (!confirm(confirmMessage)) {
                return;
            }

            entry = this.createEntryForDelete();
            request = this.createRequest();

            if (request) {
                request['delete'](entry, {
                    success: this.onDeleteSuccess,
                    failure: this.onRequestDataFailure,
                    scope: this
                });
            }
        },
        onDeleteSuccess: function onDeleteSuccess() {
            _connect['default'].publish('/app/refresh', [{
                resourceKind: this.resourceKind
            }]);
            ReUI.back();
        },
        createToolLayout: function createToolLayout() {
            return this.tools || (this.tools = {
                'tbar': [{
                    id: 'edit',
                    action: 'navigateToEditView',
                    cls: 'fa fa-pencil fa-fw fa-lg',
                    security: App.getViewSecurity(this.editView, 'update')
                }, {
                    id: 'removeContact',
                    cls: 'fa fa-times-circle fa-lg',
                    action: 'removeContact',
                    title: this.removeContactTitleText
                }]
            });
        },
        createLayout: function createLayout() {
            return this.layout || (this.layout = [{
                title: this.contactText,
                name: 'DetailsSection',
                children: [{
                    name: 'NameLF',
                    property: 'Contact.NameLF',
                    label: this.nameText,
                    view: 'contact_detail',
                    key: 'Contact.$key',
                    descriptor: 'Contact.NameLF'
                }, {
                    name: 'AccountName',
                    property: 'Contact.AccountName',
                    descriptor: 'AccountName',
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'Contact.Account.$key'
                }, {
                    name: 'Title',
                    property: 'Contact.Title',
                    label: this.contactTitleText
                }]
            }, {
                title: this.detailsText,
                name: 'MoreDetailsSection',
                children: [{
                    name: 'SalesRole',
                    property: 'SalesRole',
                    label: this.salesRoleText
                }, {
                    name: 'Standing',
                    property: 'Standing',
                    label: this.standingText
                }, {
                    name: 'PersonalBenefits',
                    property: 'PersonalBenefits',
                    label: this.personalBenefitsText
                }, {
                    name: 'CompetitorName',
                    property: 'Competitors.CompetitorName',
                    label: this.competitorNameText
                }, {
                    name: 'Strategy',
                    property: 'Strategy',
                    label: this.strategyText
                }, {
                    name: 'Issues',
                    property: 'Issues',
                    label: this.issuesText
                }]
            }]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.OpportunityContact.Detail', __class);
    module.exports = __class;
});
