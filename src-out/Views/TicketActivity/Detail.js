define('crm/Views/TicketActivity/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/query', 'dojo/dom-class', '../../Format', '../../Template', 'argos/ErrorManager', 'argos/Detail', 'dojo/NodeList-manipulate'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoQuery, _dojoDomClass, _Format, _Template, _argosErrorManager, _argosDetail, _dojoNodeListManipulate) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _query = _interopRequireDefault(_dojoQuery);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _format = _interopRequireDefault(_Format);

  var _template = _interopRequireDefault(_Template);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _Detail = _interopRequireDefault(_argosDetail);

  /**
   * @class crm.Views.TicketActivity.Detail
   *
   * @extends argos.Detail
   *
   * @requires argos.ErrorManager
   * @requires argos.Format
   *
   * @requires crm.Format
   * @requires crm.Template
   */
  var __class = (0, _declare['default'])('crm.Views.TicketActivity.Detail', [_Detail['default']], {
    // Localization
    titleText: 'Ticket Activity',

    accountText: 'account',
    contactText: 'contact',
    typeText: 'type',
    publicAccessText: 'public access',
    assignedDateText: 'start date',
    completedDateText: 'end date',
    followUpText: 'follow up',
    unitsText: 'time units',
    elapsedUnitsText: 'elapsed hours',
    rateTypeDescriptionText: 'charge type',
    rateText: 'rate',
    totalLaborText: 'total labor',
    totalPartsText: 'total parts',
    totalFeeText: 'total fee',
    activityDescriptionText: 'comments',
    ticketNumberText: 'ticket number',
    userText: 'user',

    completeTicketText: 'Complete Ticket Activity',
    moreDetailsText: 'More Details',
    relatedItemsText: 'Related Items',
    relatedTicketActivityItemText: 'Ticket Activity Parts',

    // View Properties
    id: 'ticketactivity_detail',
    editView: 'ticketactivity_edit',

    querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'ElapsedUnits', 'FollowUp', 'PublicAccessCode', 'Rate', 'RateTypeDescription/Amount', 'RateTypeDescription/RateTypeCode', 'RateTypeDescription/TypeDescription', 'TotalFee', 'TotalLabor', 'TotalParts', 'Units', 'Ticket/Account/AccountName', 'Ticket/TicketNumber', 'Ticket/Contact/Name', 'User/UserInfo/LastName', 'User/UserInfo/FirstName'],
    resourceKind: 'ticketActivities',

    createPicklistRequest: function createPicklistRequest(predicate) {
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService()).setResourceKind('picklists').setContractName('system');
      var uri = request.getUri();

      uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
      uri.setCollectionPredicate(predicate);

      request.allowCacheUse = true;

      return request;
    },

    requestCodeData: function requestCodeData(row, node, value, entry, predicate) {
      var request = this.createPicklistRequest(predicate);
      request.read({
        success: _lang['default'].hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
        failure: this.onRequestCodeDataFailure,
        scope: this
      });
    },

    onRequestCodeDataSuccess: function onRequestCodeDataSuccess(row, node, value, entry, data) {
      var codeText = this.processCodeDataFeed(data, entry[row.property]);
      if (codeText) {
        this.setNodeText(node, codeText);
        this.entry[row.name] = codeText;
      }
    },

    onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
      _ErrorManager['default'].addError(response, o, this.options, 'failure');
    },

    processCodeDataFeed: function processCodeDataFeed(feed, currentValue, options) {
      var keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
      var textProperty = options && options.textProperty ? options.textProperty : 'text';

      for (var i = 0; i < feed.$resources.length; i++) {
        if (feed.$resources[i][keyProperty] === currentValue) {
          return feed.$resources[i][textProperty];
        }
      }

      return currentValue;
    },
    setNodeText: function setNodeText(node, value) {
      _domClass['default'].remove(node, 'content-loading');

      (0, _query['default'])('span', node).text(value);
    },

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.activityDescriptionText,
          name: 'ActivityDescription',
          property: 'ActivityDescription'
        }, {
          label: this.ticketNumberText,
          name: 'Ticket.TicketNumber',
          property: 'Ticket.TicketNumber',
          view: 'ticket_detail',
          key: 'Ticket.$key'
        }, {
          name: 'Ticket.Account.AccountName',
          property: 'Ticket.Account.AccountName',
          descriptor: 'Ticket.Account.AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Ticket.Account.$key'
        }, {
          name: 'Ticket.Contact',
          property: 'Ticket.Contact.Name',
          descriptor: 'Ticket.Contact.Name',
          label: this.contactText,
          view: 'contact_detail',
          key: 'Ticket.Contact.$key'
        }, {
          name: 'User.UserInfo',
          property: 'User.UserInfo',
          label: this.userText,
          tpl: _template['default'].nameLF
        }, {
          label: this.typeText,
          name: 'ActivityTypeCode',
          property: 'ActivityTypeCode',
          onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Ticket Activity"')
        }, {
          label: this.publicAccessText,
          name: 'PublicAccessCode',
          property: 'PublicAccessCode',
          onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Ticket Activity Public Access"')
        }, {
          label: this.assignedDateText,
          name: 'AssignedDate',
          property: 'AssignedDate',
          renderer: _format['default'].date
        }, {
          label: this.completedDateText,
          name: 'CompletedDate',
          property: 'CompletedDate',
          renderer: _format['default'].date
        }, {
          label: this.followUpText,
          name: 'FollowUp',
          property: 'FollowUp',
          renderer: _format['default'].yesNo
        }]
      }, {
        title: this.moreDetailsText,
        collapsed: true,
        name: 'MoreDetailsTextSection',
        children: [{
          label: this.unitsText,
          name: 'Units',
          property: 'Units'
        }, {
          label: this.elapsedUnitsText,
          name: 'ElapsedUnits',
          property: 'ElapsedUnits',
          renderer: _format['default'].fixedLocale
        }, {
          label: this.rateTypeDescriptionText,
          name: 'RateTypeDescription.RateTypeCode',
          property: 'RateTypeDescription.RateTypeCode'
        }, {
          label: this.rateText,
          name: 'Rate',
          property: 'Rate',
          renderer: _format['default'].currency
        }, {
          label: this.totalLaborText,
          name: 'TotalLabor',
          property: 'TotalLabor',
          renderer: _format['default'].currency
        }, {
          label: this.totalPartsText,
          name: 'TotalParts',
          property: 'TotalParts',
          renderer: _format['default'].currency
        }, {
          label: this.totalFeeText,
          name: 'TotalFee',
          property: 'TotalFee',
          renderer: _format['default'].currency
        }]
      }, {
        list: true,
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        children: [{
          name: 'TicketActivityItemRelated',
          label: this.relatedTicketActivityItemText,
          where: this.formatRelatedQuery.bindDelegate(this, 'TicketActivity.Id eq "${0}"'),
          view: 'ticketactivityitem_related'
        }]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.TicketActivity.Detail', __class);
  module.exports = __class;
});
