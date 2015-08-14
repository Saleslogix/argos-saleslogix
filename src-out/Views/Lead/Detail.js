define('crm/Views/Lead/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Format', 'argos/Detail'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Format, _argosDetail) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _format = _interopRequireDefault(_Format);

  var _Detail = _interopRequireDefault(_argosDetail);

  /**
   * @class crm.Views.Lead.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.Lead.Detail', [_Detail['default']], {
    // Localization
    activityTypeText: {
      'atPhoneCall': 'Phone Call',
      'atEMail': 'E-mail'
    },
    accountText: 'company',
    addressText: 'address',
    businessDescriptionText: 'bus desc',
    createDateText: 'create date',
    createUserText: 'create user',
    eMailText: 'email',
    leadSourceText: 'lead source',
    industryText: 'industry',
    interestsText: 'interests',
    leadTitleText: 'title',
    nameText: 'name',
    notesText: 'comments',
    ownerText: 'owner',
    relatedActivitiesText: 'Activities',
    relatedHistoriesText: 'Notes/History',
    relatedItemsText: 'Related Items',
    relatedNotesText: 'Notes',
    relatedAttachmentText: 'Attachments',
    relatedAttachmentTitleText: 'Lead Attachments',
    sicCodeText: 'sic code',
    titleText: 'Lead',
    tollFreeText: 'toll free',
    mobileText: 'mobile phone',
    webText: 'web',
    workText: 'work phone',
    actionsText: 'Quick Actions',
    callWorkNumberText: 'Call main number',
    scheduleActivityText: 'Schedule activity',
    addNoteText: 'Add note',
    sendEmailText: 'Send email',
    viewAddressText: 'View address',
    moreDetailsText: 'More Details',
    calledText: 'Called ${0}',
    emailedText: 'Emailed ${0}',

    // View Properties
    id: 'lead_detail',
    editView: 'lead_edit',
    historyEditView: 'history_edit',
    noteEditView: 'history_edit',
    security: 'Entities/Lead/View',
    querySelect: ['Address/*', 'BusinessDescription', 'Company', 'CreateDate', 'CreateUser', 'Email', 'FirstName', 'FullAddress', 'Industry', 'Interests', 'LastName', 'LeadNameLastFirst', 'LeadSource/Description', 'MiddleName', 'Mobile', 'Notes', 'Owner/OwnerDescription', 'Prefix', 'SICCode', 'Suffix', 'Title', 'TollFree', 'WebAddress', 'WorkPhone'],
    resourceKind: 'leads',

    navigateToHistoryInsert: function navigateToHistoryInsert(type, entry, complete) {
      var view = App.getView(this.historyEditView);
      if (view) {
        this.refreshRequired = true;

        view.show({
          title: this.activityTypeText[type],
          template: {},
          entry: entry,
          insert: true
        }, {
          complete: complete
        });
      }
    },
    recordCallToHistory: function recordCallToHistory(complete) {
      var entry = {
        '$name': 'History',
        'Type': 'atPhoneCall',
        'AccountName': this.entry.Company,
        'LeadId': this.entry.$key,
        'LeadName': this.entry.LeadNameLastFirst,
        'Description': _string['default'].substitute(this.calledText, [this.entry.LeadNameLastFirst]),
        'UserId': App.context && App.context.user.$key,
        'UserName': App.context && App.context.user.UserName,
        'Duration': 15,
        'CompletedDate': new Date()
      };

      this.navigateToHistoryInsert('atPhoneCall', entry, complete);
    },
    recordEmailToHistory: function recordEmailToHistory(complete) {
      var entry = {
        '$name': 'History',
        'Type': 'atEMail',
        'AccountName': this.entry.Company,
        'LeadId': this.entry.$key,
        'LeadName': this.entry.LeadNameLastFirst,
        'Description': _string['default'].substitute(this.emailedText, [this.entry.LeadNameLastFirst]),
        'UserId': App.context && App.context.user.$key,
        'UserName': App.context && App.context.user.UserName,
        'Duration': 15,
        'CompletedDate': new Date()
      };

      this.navigateToHistoryInsert('atEMail', entry, complete);
    },
    callWorkPhone: function callWorkPhone() {
      this.recordCallToHistory((function initiateCall() {
        App.initiateCall(this.entry.WorkPhone);
      }).bindDelegate(this));
    },
    checkWorkPhone: function checkWorkPhone(entry, value) {
      return !value;
    },
    sendEmail: function sendEmail() {
      this.recordEmailToHistory((function initiateEmail() {
        App.initiateEmail(this.entry.Email);
      }).bindDelegate(this));
    },
    checkEmail: function checkEmail(entry, value) {
      return !value;
    },
    viewAddress: function viewAddress() {
      App.showMapForAddress(_format['default'].address(this.entry.Address, true, ' '));
    },
    checkAddress: function checkAddress(entry, value) {
      return !_format['default'].address(value, true, '');
    },
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
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        list: true,
        title: this.actionsText,
        cls: 'action-list',
        name: 'QuickActionSection',
        children: [{
          name: 'CallWorkPhoneAction',
          property: 'WorkPhone',
          label: this.callWorkNumberText,
          action: 'callWorkPhone',
          iconClass: 'fa fa-phone-square fa-lg',
          disabled: this.checkWorkPhone,
          renderer: _format['default'].phone.bindDelegate(this, false)
        }, {
          name: 'CheckEmailAction',
          property: 'Email',
          label: this.sendEmailText,
          action: 'sendEmail',
          iconClass: 'fa fa-envelope fa-lg',
          disabled: this.checkEmail
        }, {
          name: 'ScheduleActivityAction',
          label: this.scheduleActivityText,
          action: 'scheduleActivity',
          iconClass: 'fa fa-calendar fa-lg',
          tpl: new Simplate(['{%: $.Company %} / {%: $.LeadNameLastFirst %}'])
        }, {
          name: 'AddNoteAction',
          property: 'LeadNameLastFirst',
          iconClass: 'fa fa-edit fa-lg',
          label: this.addNoteText,
          action: 'addNote'
        }, {
          name: 'ViewAddressAction',
          property: 'Address',
          label: this.viewAddressText,
          action: 'viewAddress',
          iconClass: 'fa fa-map-marker fa-lg',
          disabled: this.checkAddress,
          renderer: _format['default'].address.bindDelegate(this, [true, ' '])
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.nameText,
          name: 'LeadNameLastFirst',
          property: 'LeadNameLastFirst'
        }, {
          label: this.accountText,
          name: 'Company',
          property: 'Company'
        }, {
          label: this.leadTitleText,
          name: 'Title',
          property: 'Title'
        }]
      }, {
        title: this.moreDetailsText,
        name: 'MoreDetailsSection',
        collapsed: true,
        children: [{
          label: this.workText,
          name: 'WorkPhone',
          property: 'WorkPhone',
          renderer: _format['default'].phone
        }, {
          label: this.mobileText,
          name: 'Mobile',
          property: 'Mobile',
          renderer: _format['default'].phone
        }, {
          label: this.tollFreeText,
          name: 'TollFree',
          property: 'TollFree',
          renderer: _format['default'].phone
        }, {
          label: this.leadSourceText,
          name: 'LeadSource.Description',
          property: 'LeadSource.Description'
        }, {
          label: this.webText,
          name: 'WebAddress',
          property: 'WebAddress',
          renderer: _format['default'].link
        }, {
          label: this.interestsText,
          name: 'Interests',
          property: 'Interests'
        }, {
          label: this.industryText,
          name: 'Industry',
          property: 'Industry'
        }, {
          label: this.sicCodeText,
          name: 'SICCode',
          property: 'SICCode'
        }, {
          label: this.businessDescriptionText,
          name: 'BusinessDescription',
          property: 'BusinessDescription'
        }, {
          label: this.notesText,
          name: 'Notes',
          property: 'Notes'
        }, {
          label: this.ownerText,
          name: 'Owner.OwnerDescription',
          property: 'Owner.OwnerDescription'
        }]
      }, {
        list: true,
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        children: [{
          name: 'ActivityRelated',
          label: this.relatedActivitiesText,
          view: 'activity_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}"')
        }, {
          name: 'HistoryRelated',
          label: this.relatedHistoriesText,
          where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}" and Type ne "atDatabaseChange"'),
          view: 'history_related'
        }, {
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'leadId eq "${0}"'), // must be lower case because of feed
          view: 'lead_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Lead.Detail', __class);
  module.exports = __class;
});
