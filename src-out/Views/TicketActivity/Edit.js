define("crm/Views/TicketActivity/Edit", ["exports", "dojo/_base/declare", "dojo/_base/lang", "../../Template", "../../Validator", "argos/ErrorManager", "argos/Edit", "argos/I18n", "../../Models/Names"], function (_exports, _declare, _lang, _Template, _Validator, _ErrorManager, _Edit, _I18n, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Template = _interopRequireDefault(_Template);
  _Validator = _interopRequireDefault(_Validator);
  _ErrorManager = _interopRequireDefault(_ErrorManager);
  _Edit = _interopRequireDefault(_Edit);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  var resource = (0, _I18n["default"])('ticketActivityEdit');
  var dtFormatResource = (0, _I18n["default"])('ticketActivityEditDateTimeFormat');

  var __class = (0, _declare["default"])('crm.Views.TicketActivity.Edit', [_Edit["default"]], {
    // Localization
    titleText: resource.titleText,
    activityTypeText: resource.activityTypeText,
    activityTypeTitleText: resource.activityTypeTitleText,
    publicAccessText: resource.publicAccessText,
    publicAccessTitleText: resource.publicAccessTitleText,
    userText: resource.userText,
    startDateText: resource.startDateText,
    endDateText: resource.endDateText,
    commentsText: resource.commentsText,
    startingFormatText: dtFormatResource.startingFormatText,
    startingFormatText24: dtFormatResource.startingFormatText24,
    // View Properties
    entityName: 'TicketActivity',
    id: 'ticketactivity_edit',
    querySelect: [],
    queryInclude: [],
    modelName: _Names["default"].TICKETACTIVITY,
    resourceKind: 'ticketActivities',
    processTemplateEntry: function processTemplateEntry(entry) {
      this.inherited(processTemplateEntry, arguments);

      if (entry.PublicAccessCode) {
        this.requestCodeData('name eq "Ticket Activity Public Access"', entry.PublicAccessCode, this.fields.PublicAccessCode);
      }
    },
    createPicklistRequest: function createPicklistRequest(name) {
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService()).setResourceKind('picklists').setContractName('system');
      var uri = request.getUri();
      uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
      uri.setCollectionPredicate(name);
      request.allowCacheUse = true;
      return request;
    },
    requestCodeData: function requestCodeData(picklistName, code, field) {
      var request = this.createPicklistRequest(picklistName);
      request.read({
        success: _lang["default"].hitch(this, this.onRequestCodeDataSuccess, code, field),
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
      _ErrorManager["default"].addError(response, o, this.options, 'failure');
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
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);
      var ticketContext = App.isNavigationFromResourceKind(['tickets']);
      var ticketKey = ticketContext && ticketContext.key;
      var user = App.context.user;
      var userField = this.fields.User;

      if (ticketKey) {
        this.fields.TicketId.setValue(ticketKey);
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
        textTemplate: _Template["default"].nameLF,
        type: 'lookup',
        view: 'user_list'
      }, {
        label: this.startDateText,
        name: 'AssignedDate',
        property: 'AssignedDate',
        type: 'date',
        showTimePicker: true,
        dateFormatText: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator["default"].exists, _Validator["default"].isDateInRange]
      }, {
        label: this.endDateText,
        name: 'CompletedDate',
        property: 'CompletedDate',
        type: 'date',
        showTimePicker: true,
        dateFormatText: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
        minValue: new Date(1900, 0, 1),
        validator: [_Validator["default"].exists, _Validator["default"].isDateInRange]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});