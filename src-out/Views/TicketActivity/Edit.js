define('crm/Views/TicketActivity/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../../Template', '../../Validator', 'argos/ErrorManager', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Template, _Validator, _argosErrorManager, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _template = _interopRequireDefault(_Template);

  var _validator = _interopRequireDefault(_Validator);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.TicketActivity.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.ErrorManager
   *
   * @requires crm.Template
   * @requires crm.Validator
   */
  var __class = (0, _declare['default'])('crm.Views.TicketActivity.Edit', [_Edit['default']], {
    //Localization
    titleText: 'Edit Ticket Activity',
    activityTypeText: 'type',
    activityTypeTitleText: 'Type',
    publicAccessText: 'public access',
    publicAccessTitleText: 'Public Access',
    userText: 'user',
    startDateText: 'start date',
    endDateText: 'end date',
    commentsText: 'comments',
    startingFormatText: 'M/D/YYYY h:mm A',

    //View Properties
    entityName: 'TicketActivity',
    id: 'ticketactivity_edit',
    querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'PublicAccessCode', 'User/UserName', 'User/UserInfo/FirstName', 'User/UserInfo/LastName'],
    resourceKind: 'ticketActivities',

    processTemplateEntry: function processTemplateEntry(entry) {
      this.inherited(arguments);

      if (entry['PublicAccessCode']) {
        this.requestCodeData('name eq "Ticket Activity Public Access"', entry['PublicAccessCode'], this.fields['PublicAccessCode']);
      }
    },
    createPicklistRequest: function createPicklistRequest(name) {
      var request, uri;
      request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService()).setResourceKind('picklists').setContractName('system');

      uri = request.getUri();
      uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
      uri.setCollectionPredicate(name);

      request.allowCacheUse = true;
      return request;
    },
    requestCodeData: function requestCodeData(picklistName, code, field) {
      var request = this.createPicklistRequest(picklistName);
      request.read({
        success: _lang['default'].hitch(this, this.onRequestCodeDataSuccess, code, field),
        failure: this.onRequestCodeDataFailure,
        scope: this
      });
    },
    onRequestCodeDataSuccess: function onRequestCodeDataSuccess(code, field, feed) {
      var value = this.processCodeDataFeed(feed, code);
      field.setValue(code);
      field.setText(value);
    },
    onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
      _ErrorManager['default'].addError(response, o, this.options, 'failure');
    },
    processCodeDataFeed: function processCodeDataFeed(feed, currentValue, options) {
      var keyProperty, textProperty, i;

      keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
      textProperty = options && options.textProperty ? options.textProperty : 'text';

      for (i = 0; i < feed.$resources.length; i++) {
        if (feed.$resources[i][keyProperty] === currentValue) {
          return feed.$resources[i][textProperty];
        }
      }

      return currentValue;
    },

    applyContext: function applyContext() {
      this.inherited(arguments);

      var ticketContext = App.isNavigationFromResourceKind(['tickets']),
          ticketKey = ticketContext && ticketContext.key,
          user = App.context.user,
          userField = this.fields.User;

      if (ticketKey) {
        this.fields['TicketId'].setValue(ticketKey);
      }

      if (userField) {
        userField.setValue(user);
      }
    },

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        name: 'TicketId',
        property: 'Ticket.$key',
        type: 'hidden'
      }, {
        label: this.commentsText,
        name: 'ActivityDescription',
        property: 'ActivityDescription',
        rows: 6,
        type: 'textarea'
      }, {
        label: this.activityTypeText,
        name: 'ActivityTypeCode',
        property: 'ActivityTypeCode',
        requireSelection: true,
        title: this.activityTypeTitleText,
        storageMode: 'id',
        picklist: 'Ticket Activity',
        type: 'picklist'
      }, {
        label: this.publicAccessText,
        name: 'PublicAccessCode',
        property: 'PublicAccessCode',
        title: this.publicAccessTitleText,
        storageMode: 'id',
        picklist: 'Ticket Activity Public Access',
        type: 'picklist'
      }, {
        label: this.userText,
        name: 'User',
        property: 'User',
        textProperty: 'UserInfo',
        textTemplate: _template['default'].nameLF,
        type: 'lookup',
        view: 'user_list'
      }, {
        label: this.startDateText,
        name: 'AssignedDate',
        property: 'AssignedDate',
        type: 'date',
        showTimePicker: true,
        dateFormatText: this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_validator['default'].exists, _validator['default'].isDateInRange]
      }, {
        label: this.endDateText,
        name: 'CompletedDate',
        property: 'CompletedDate',
        type: 'date',
        showTimePicker: true,
        dateFormatText: this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_validator['default'].exists, _validator['default'].isDateInRange]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.TicketActivity.Edit', __class);
  module.exports = __class;
});
