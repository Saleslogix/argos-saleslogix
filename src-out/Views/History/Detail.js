define('crm/Views/History/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/string', 'dojo/_base/lang', 'dojo/query', 'dojo/dom-class', '../../Format', 'argos/ErrorManager', '../../Template', 'argos/Detail'], function (exports, module, _dojo_baseDeclare, _dojoString, _dojo_baseLang, _dojoQuery, _dojoDomClass, _Format, _argosErrorManager, _Template, _argosDetail) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _string = _interopRequireDefault(_dojoString);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _query = _interopRequireDefault(_dojoQuery);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _format = _interopRequireDefault(_Format);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _template = _interopRequireDefault(_Template);

  var _Detail = _interopRequireDefault(_argosDetail);

  /**
   * @class crm.Views.History.Detail
   *
   * @extends argos.Detail
   *
   * @requires argos.ErrorManager
   *
   * @requires crm.Format
   * @requires crm.Template
   */
  var __class = (0, _declare['default'])('crm.Views.History.Detail', [_Detail['default']], {
    // Templates
    createUserTemplate: _template['default'].nameLF,

    // Localization
    categoryText: 'category',
    completedText: 'completed',
    durationText: 'duration',
    leaderText: 'leader',
    longNotesText: 'notes',
    notesText: 'Notes',
    priorityText: 'priority',
    regardingText: 'regarding',
    completedByText: 'completed by',
    scheduledText: 'scheduled',
    timelessText: 'timeless',
    companyText: 'company',
    leadText: 'lead',
    titleText: 'History',
    accountText: 'account',
    contactText: 'contact',
    opportunityText: 'opportunity',
    ticketNumberText: 'ticket',
    moreDetailsText: 'More Details',
    relatedItemsText: 'Related Items',
    relatedAttachmentText: 'Attachments',
    relatedAttachmentTitleText: 'History Attachments',
    modifiedText: 'modified',
    typeText: 'type',
    activityTypeText: {
      'atToDo': 'To-Do',
      'atPhoneCall': 'Phone Call',
      'atAppointment': 'Meeting',
      'atLiterature': 'Literature Request',
      'atPersonal': 'Personal Activity',
      'atQuestion': 'Question',
      'atEMail': 'E-mail'
    },
    // View Properties
    id: 'history_detail',
    existsRE: /^[\w]{12}$/,
    editView: 'history_edit',
    dateFormatText: 'M/D/YYYY h:mm:ss A',
    resourceKind: 'history',
    security: null, // 'Entities/History/View',
    querySelect: ['AccountId', 'AccountName', 'Category', 'ModifyDate', 'CompletedDate', 'ContactId', 'ContactName', 'CompletedUser', 'Description', 'Duration', 'Notes', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'StartDate', 'TicketId', 'TicketNumber', 'LeadId', 'LeadName', 'Timeless', 'Type', 'UserName', 'UserId'],

    formatActivityType: function formatActivityType(val) {
      return this.activityTypeText[val] || val;
    },
    isHistoryForLead: function isHistoryForLead(entry) {
      return this.existsRE.test(entry && entry.LeadId);
    },
    isHistoryForActivity: function isHistoryForActivity(entry) {
      return this.existsRE.test(entry && entry.ActivityId);
    },
    isHistoryOfType: function isHistoryOfType(entry, type) {
      return entry && entry.Type === type;
    },
    provideText: function provideText(entry) {
      return entry && (entry.LongNotes || entry.Notes);
    },
    requestCompletedUser: function requestCompletedUser(entry) {
      var completedUser = entry.CompletedUser;

      if (completedUser) {
        var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setResourceKind('users').setResourceSelector(_string['default'].substitute('\'${0}\'', [completedUser])).setQueryArg('select', ['UserInfo/FirstName', 'UserInfo/LastName'].join(','));

        request.allowCacheUse = true;

        return request;
      }
    },
    requestCodeData: function requestCodeData(row, node, value, entry) {
      var request = this.requestCompletedUser(entry);
      if (request) {
        request.read({
          success: _lang['default'].hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
          failure: this.onRequestCodeDataFailure,
          scope: this
        });
      } else {
        this.onCodeDataNull();
      }
    },
    onRequestCodeDataSuccess: function onRequestCodeDataSuccess(row, node, value, entry, data) {
      var codeText = entry[row.property];
      this.setNodeText(node, this.createUserTemplate.apply(data.UserInfo));
      this.entry[row.name] = codeText;
    },
    onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
      var rowNode = (0, _query['default'])('[data-property="CompletedUser"]');
      if (rowNode) {
        this.setNodeText(rowNode[0], this.entry.UserName);
      }

      _ErrorManager['default'].addError(response, o, this.options, 'failure');
    },
    onCodeDataNull: function onCodeDataNull() {
      var rowNode = (0, _query['default'])('[data-property="CompletedUser"]');
      if (rowNode) {
        this.setNodeText(rowNode[0], '');
      }
    },
    setNodeText: function setNodeText(node, value) {
      _domClass['default'].remove(node, 'content-loading');

      (0, _query['default'])('span', node).text(value);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.notesText,
        name: 'NotesSection',
        children: [{
          name: 'LongNotes',
          property: 'LongNotes',
          encode: false,
          label: this.longNotesText,
          provider: this.provideText.bindDelegate(this),
          use: _template['default'].noteDetailProperty
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'StartDate',
          property: 'StartDate',
          label: this.scheduledText,
          renderer: _format['default'].date.bindDelegate(this, this.dateFormatText),
          exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
        }, {
          name: 'CompletedDate',
          property: 'CompletedDate',
          label: this.completedText,
          renderer: _format['default'].date.bindDelegate(this, this.dateFormatText),
          exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
        }, {
          name: 'ModifyDate',
          property: 'ModifyDate',
          label: this.modifiedText,
          renderer: _format['default'].date.bindDelegate(this, this.dateFormatText),
          include: this.isHistoryOfType.bindDelegate(this, 'atNote')
        }, {
          name: 'Description',
          property: 'Description',
          label: this.regardingText
        }, {
          name: 'CompletedUser',
          property: 'CompletedUser',
          label: this.completedByText,
          value: this.loadingText,
          cls: 'content-loading',
          onCreate: this.requestCodeData.bindDelegate(this)
        }, {
          name: 'AccountName',
          property: 'AccountName',
          exclude: this.isHistoryForLead,
          label: this.accountText,
          view: 'account_detail',
          key: 'AccountId',
          descriptor: 'AccountName'
        }, {
          name: 'ContactName',
          property: 'ContactName',
          exclude: this.isHistoryForLead,
          label: this.contactText,
          view: 'contact_detail',
          key: 'ContactId',
          descriptor: 'ContactName'
        }, {
          name: 'OpportunityName',
          property: 'OpportunityName',
          exclude: this.isHistoryForLead,
          label: this.opportunityText,
          view: 'opportunity_detail',
          key: 'OpportunityId',
          descriptor: 'OpportunityName'
        }, {
          name: 'TicketNumber',
          property: 'TicketNumber',
          exclude: this.isHistoryForLead,
          label: this.ticketNumberText,
          view: 'ticket_detail',
          key: 'TicketId',
          descriptor: 'TicketNumber'
        }, {
          name: 'LeadName',
          property: 'LeadName',
          include: this.isHistoryForLead,
          label: this.leadText,
          view: 'lead_detail',
          key: 'LeadId',
          descriptor: 'LeadName'
        }, {
          name: 'AccountName',
          property: 'AccountName',
          include: this.isHistoryForLead,
          label: this.companyText
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: [{
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'historyId eq "${0}"'), // must be lower case because of feed
          view: 'history_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.History.Detail', __class);
  module.exports = __class;
});
