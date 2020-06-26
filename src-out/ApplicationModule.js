define("crm/ApplicationModule", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/ApplicationModule", "argos/Calendar", "argos/RelatedViewManager", "argos/RelatedViewWidget", "argos/List", "argos/Views/Signature", "argos/SearchWidget", "argos/Views/FileSelect", "./Views/AddAccountContact", "./Views/AreaCategoryIssueLookup", "./Views/ExchangeRateLookup", "./Views/MainToolbar", "./Views/UpdateToolbar", "./Views/LeftDrawer", "./Views/RightDrawer", "./Views/Offline/Detail", "./Views/Offline/List", "./Views/Login", "./Views/LogOff", "./Views/Settings", "./Views/Configure", "./Views/Help", "./Views/NameEdit", "./Views/PickList", "./Views/SelectList", "./Views/SpeedSearchList", "./Views/TextEdit", "./Views/Account/List", "./Views/Account/Detail", "./Views/Account/Edit", "./Views/Address/List", "./Views/Address/Edit", "./Views/ActivityAttendee/List", "./Views/ActivityAttendee/Detail", "./Views/ActivityAttendee/Edit", "./Views/ActivityAttendee/TypesList", "./Views/Activity/List", "./Views/Activity/MyDay", "./Views/Activity/MyList", "./Views/Activity/Detail", "./Views/Activity/Edit", "./Views/Activity/Complete", "./Views/Activity/TypesList", "./Views/Activity/Recurring", "./Views/Calendar/CalendarView", "./Views/Calendar/DayView", "./Views/Calendar/MonthView", "./Views/Calendar/WeekView", "./Views/Charts/GenericBar", "./Views/Charts/GenericLine", "./Views/Charts/GenericPie", "./Views/Competitor/List", "./Views/Contact/List", "./Views/Contact/Detail", "./Views/Contact/Edit", "./Views/Contract/List", "./Views/ErrorLog/List", "./Views/ErrorLog/Detail", "./Views/Event/List", "./Views/Event/Detail", "./Views/Event/Edit", "./Views/Groups/Selector", "./Views/Lead/List", "./Views/Lead/Detail", "./Views/Lead/Edit", "./Views/LeadSource/List", "./Views/Opportunity/List", "./Views/Opportunity/Detail", "./Views/Opportunity/Edit", "./Views/Opportunity/QuickEdit", "./Views/OpportunityContact/List", "./Views/OpportunityContact/Detail", "./Views/OpportunityContact/Edit", "./Views/OpportunityProduct/List", "./Views/OpportunityProduct/Detail", "./Views/OpportunityProduct/Edit", "./Views/Owner/List", "./Views/Product/List", "./Views/ProductProgram/List", "./Views/Ticket/List", "./Views/Ticket/Detail", "./Views/Ticket/Edit", "./Views/Ticket/UrgencyLookup", "./Views/TicketActivity/List", "./Views/TicketActivity/Detail", "./Views/TicketActivity/Edit", "./Views/TicketActivity/RateLookup", "./Views/TicketActivityItem/List", "./Views/TicketActivityItem/Detail", "./Views/History/List", "./Views/History/ListOffline", "./Views/History/Detail", "./Views/History/Edit", "./Views/History/EditOffline", "./Views/History/RelatedView", "./Views/User/CalendarAccessList", "./Views/User/List", "./Views/Attachment/ViewAttachment", "./Views/Attachment/List", "./Views/Attachment/AddAttachment", "./Views/Attachment/MyAttachmentList", "./Views/RecentlyViewed/List", "./Views/Briefcase/List", "./Views/OfflineOptions/Edit", "./Views/LanguageOptions/Edit", "argos/I18n", "./Models/Names", "argos/Models/Types", "./Views/OfflineOptions/UsageWidget", "./Views/LanguageOptions/UsageWidget", "./Fields/AddressField", "./Fields/MultiCurrencyField", "./Fields/NameField", "./Fields/PicklistField", "./Fields/RecurrencesField", "./Views/RelatedContextWidget", "./Views/RelatedEditWidget", "./Action", "./Format", "./Template", "./Validator", "./Environment", "./Utility", "./Models/Account/Offline", "./Models/Account/SData", "./Models/ActivityAttendee/Offline", "./Models/ActivityAttendee/SData", "./Models/Activity/Offline", "./Models/Activity/SData", "./Models/Contact/Offline", "./Models/Contact/SData", "./Models/Integration/SData", "./Models/Lead/Offline", "./Models/Lead/SData", "./Models/LeadAddress/Offline", "./Models/LeadAddress/SData", "./Models/Opportunity/Offline", "./Models/Opportunity/SData", "./Models/OpportunityContact/Offline", "./Models/OpportunityContact/SData", "./Models/UserActivity/Offline", "./Models/UserActivity/SData", "./Models/Address/Offline", "./Models/Address/SData", "./Models/History/Offline", "./Models/History/SData", "./Models/Ticket/Offline", "./Models/Ticket/SData", "./Models/TicketActivity/Offline", "./Models/TicketActivity/SData", "./Models/Authentication/Offline"], function (_exports, _declare, _lang, _ApplicationModule, _Calendar, _RelatedViewManager, _RelatedViewWidget, _List, _Signature, _SearchWidget, _FileSelect, _AddAccountContact, _AreaCategoryIssueLookup, _ExchangeRateLookup, _MainToolbar, _UpdateToolbar, _LeftDrawer, _RightDrawer, _Detail, _List2, _Login, _LogOff, _Settings, _Configure, _Help, _NameEdit, _PickList, _SelectList, _SpeedSearchList, _TextEdit, _List3, _Detail2, _Edit, _List4, _Edit2, _List5, _Detail3, _Edit3, _TypesList, _List6, _MyDay, _MyList, _Detail4, _Edit4, _Complete, _TypesList2, _Recurring, _CalendarView, _DayView, _MonthView, _WeekView, _GenericBar, _GenericLine, _GenericPie, _List7, _List8, _Detail5, _Edit5, _List9, _List10, _Detail6, _List11, _Detail7, _Edit6, _Selector, _List12, _Detail8, _Edit7, _List13, _List14, _Detail9, _Edit8, _QuickEdit, _List15, _Detail10, _Edit9, _List16, _Detail11, _Edit10, _List17, _List18, _List19, _List20, _Detail12, _Edit11, _UrgencyLookup, _List21, _Detail13, _Edit12, _RateLookup, _List22, _Detail14, _List23, _ListOffline, _Detail15, _Edit13, _EditOffline, _RelatedView, _CalendarAccessList, _List24, _ViewAttachment, _List25, _AddAttachment, _MyAttachmentList, _List26, _List27, _Edit14, _Edit15, _I18n, _Names, _Types, _UsageWidget, _UsageWidget2, _AddressField, _MultiCurrencyField, _NameField, _PicklistField, _RecurrencesField, _RelatedContextWidget, _RelatedEditWidget, _Action, _Format, _Template, _Validator, _Environment, _Utility, _Offline, _SData, _Offline2, _SData2, _Offline3, _SData3, _Offline4, _SData4, _SData5, _Offline5, _SData6, _Offline6, _SData7, _Offline7, _SData8, _Offline8, _SData9, _Offline9, _SData10, _Offline10, _SData11, _Offline11, _SData12, _Offline12, _SData13, _Offline13, _SData14, _Offline14) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _ApplicationModule = _interopRequireDefault(_ApplicationModule);
  _Calendar = _interopRequireDefault(_Calendar);
  _List = _interopRequireDefault(_List);
  _Signature = _interopRequireDefault(_Signature);
  _SearchWidget = _interopRequireDefault(_SearchWidget);
  _FileSelect = _interopRequireDefault(_FileSelect);
  _AddAccountContact = _interopRequireDefault(_AddAccountContact);
  _AreaCategoryIssueLookup = _interopRequireDefault(_AreaCategoryIssueLookup);
  _ExchangeRateLookup = _interopRequireDefault(_ExchangeRateLookup);
  _MainToolbar = _interopRequireDefault(_MainToolbar);
  _UpdateToolbar = _interopRequireDefault(_UpdateToolbar);
  _LeftDrawer = _interopRequireDefault(_LeftDrawer);
  _RightDrawer = _interopRequireDefault(_RightDrawer);
  _Detail = _interopRequireDefault(_Detail);
  _List2 = _interopRequireDefault(_List2);
  _Login = _interopRequireDefault(_Login);
  _LogOff = _interopRequireDefault(_LogOff);
  _Settings = _interopRequireDefault(_Settings);
  _Configure = _interopRequireDefault(_Configure);
  _Help = _interopRequireDefault(_Help);
  _NameEdit = _interopRequireDefault(_NameEdit);
  _PickList = _interopRequireDefault(_PickList);
  _SelectList = _interopRequireDefault(_SelectList);
  _SpeedSearchList = _interopRequireDefault(_SpeedSearchList);
  _TextEdit = _interopRequireDefault(_TextEdit);
  _List3 = _interopRequireDefault(_List3);
  _Detail2 = _interopRequireDefault(_Detail2);
  _Edit = _interopRequireDefault(_Edit);
  _List4 = _interopRequireDefault(_List4);
  _Edit2 = _interopRequireDefault(_Edit2);
  _List5 = _interopRequireDefault(_List5);
  _Detail3 = _interopRequireDefault(_Detail3);
  _Edit3 = _interopRequireDefault(_Edit3);
  _TypesList = _interopRequireDefault(_TypesList);
  _List6 = _interopRequireDefault(_List6);
  _MyDay = _interopRequireDefault(_MyDay);
  _MyList = _interopRequireDefault(_MyList);
  _Detail4 = _interopRequireDefault(_Detail4);
  _Edit4 = _interopRequireDefault(_Edit4);
  _Complete = _interopRequireDefault(_Complete);
  _TypesList2 = _interopRequireDefault(_TypesList2);
  _Recurring = _interopRequireDefault(_Recurring);
  _CalendarView = _interopRequireDefault(_CalendarView);
  _DayView = _interopRequireDefault(_DayView);
  _MonthView = _interopRequireDefault(_MonthView);
  _WeekView = _interopRequireDefault(_WeekView);
  _GenericBar = _interopRequireDefault(_GenericBar);
  _GenericLine = _interopRequireDefault(_GenericLine);
  _GenericPie = _interopRequireDefault(_GenericPie);
  _List7 = _interopRequireDefault(_List7);
  _List8 = _interopRequireDefault(_List8);
  _Detail5 = _interopRequireDefault(_Detail5);
  _Edit5 = _interopRequireDefault(_Edit5);
  _List9 = _interopRequireDefault(_List9);
  _List10 = _interopRequireDefault(_List10);
  _Detail6 = _interopRequireDefault(_Detail6);
  _List11 = _interopRequireDefault(_List11);
  _Detail7 = _interopRequireDefault(_Detail7);
  _Edit6 = _interopRequireDefault(_Edit6);
  _Selector = _interopRequireDefault(_Selector);
  _List12 = _interopRequireDefault(_List12);
  _Detail8 = _interopRequireDefault(_Detail8);
  _Edit7 = _interopRequireDefault(_Edit7);
  _List13 = _interopRequireDefault(_List13);
  _List14 = _interopRequireDefault(_List14);
  _Detail9 = _interopRequireDefault(_Detail9);
  _Edit8 = _interopRequireDefault(_Edit8);
  _QuickEdit = _interopRequireDefault(_QuickEdit);
  _List15 = _interopRequireDefault(_List15);
  _Detail10 = _interopRequireDefault(_Detail10);
  _Edit9 = _interopRequireDefault(_Edit9);
  _List16 = _interopRequireDefault(_List16);
  _Detail11 = _interopRequireDefault(_Detail11);
  _Edit10 = _interopRequireDefault(_Edit10);
  _List17 = _interopRequireDefault(_List17);
  _List18 = _interopRequireDefault(_List18);
  _List19 = _interopRequireDefault(_List19);
  _List20 = _interopRequireDefault(_List20);
  _Detail12 = _interopRequireDefault(_Detail12);
  _Edit11 = _interopRequireDefault(_Edit11);
  _UrgencyLookup = _interopRequireDefault(_UrgencyLookup);
  _List21 = _interopRequireDefault(_List21);
  _Detail13 = _interopRequireDefault(_Detail13);
  _Edit12 = _interopRequireDefault(_Edit12);
  _RateLookup = _interopRequireDefault(_RateLookup);
  _List22 = _interopRequireDefault(_List22);
  _Detail14 = _interopRequireDefault(_Detail14);
  _List23 = _interopRequireDefault(_List23);
  _ListOffline = _interopRequireDefault(_ListOffline);
  _Detail15 = _interopRequireDefault(_Detail15);
  _Edit13 = _interopRequireDefault(_Edit13);
  _EditOffline = _interopRequireDefault(_EditOffline);
  _CalendarAccessList = _interopRequireDefault(_CalendarAccessList);
  _List24 = _interopRequireDefault(_List24);
  _ViewAttachment = _interopRequireDefault(_ViewAttachment);
  _List25 = _interopRequireDefault(_List25);
  _AddAttachment = _interopRequireDefault(_AddAttachment);
  _MyAttachmentList = _interopRequireDefault(_MyAttachmentList);
  _List26 = _interopRequireDefault(_List26);
  _List27 = _interopRequireDefault(_List27);
  _Edit14 = _interopRequireDefault(_Edit14);
  _Edit15 = _interopRequireDefault(_Edit15);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);
  _Types = _interopRequireDefault(_Types);

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

  /**
  * @module crm/ApplicationModule
  */
  var resource = (0, _I18n["default"])('applicationModule');
  /**
   * @class
   * @alias module:crm/ApplicationModule
   * @extends module:argos/ApplicationModule
   */

  var __class = (0, _declare["default"])('crm.ApplicationModule', [_ApplicationModule["default"]],
  /** @lends module:crm/ApplicationModule.prototype */
  {
    searchText: resource.searchText,
    loadCache: function loadCache() {
      /* index.aspx will cache everything under content/, help/, and localization/ automatically.
      * Add additional caches here if you need
      const app = this.application;
      app.registerCacheUrls([
        './folder1/file1.demo',
      ]);
      */
    },
    loadViews: function loadViews() {
      this.inherited(loadViews, arguments);
      this.registerView(new _Calendar["default"]({
        expose: false
      }));
      this.registerView(new _Signature["default"]({
        expose: false
      }));
      this.registerView(new _Login["default"]());
      this.registerView(new _LogOff["default"]());
      this.registerView(new _LeftDrawer["default"](), $('.application-menu', this.application.getContainerNode()).first().get(0), 'last');
      var modalBody = $('.modal-body', this.application.viewSettingsModal.element);
      this.registerView(new _RightDrawer["default"](), modalBody.first().get(0));
      this.registerView(new _Detail["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _List2["default"]({
        expose: false,
        canRedirectTo: true
      }));
      this.registerView(new _List26["default"]({
        expose: true,
        canRedirectTo: true
      }));
      this.registerView(new _List26["default"]({
        id: 'recently_viewed_list_offline',
        expose: false,
        canRedirectTo: true
      }));
      this.registerView(new _List27["default"]({
        expose: true,
        canRedirectTo: true
      }));
      this.registerView(new _Help["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Settings["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Configure["default"]());
      this.registerView(new _PickList["default"]());
      this.registerView(new _SelectList["default"]());
      this.registerView(new _SpeedSearchList["default"]());
      this.registerView(new _AddAccountContact["default"]());
      this.registerView(new _AreaCategoryIssueLookup["default"]());
      this.registerView(new _ExchangeRateLookup["default"]());
      this.registerView(new _FileSelect["default"]());
      this.registerView(new _NameEdit["default"]());
      this.registerView(new _TextEdit["default"]());
      this.registerView(new _List4["default"]({
        id: 'address_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Edit2["default"]());
      this.registerView(new _List3["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Detail2["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Edit["default"]());
      this.registerView(new _List3["default"]({
        id: 'account_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _CalendarView["default"]());
      this.registerView(new _DayView["default"]());
      this.registerView(new _MonthView["default"]());
      this.registerView(new _WeekView["default"]()); // Charts

      this.registerView(new _GenericBar["default"]({
        expose: false
      }));
      this.registerView(new _GenericLine["default"]({
        expose: false
      }));
      this.registerView(new _GenericPie["default"]({
        expose: false
      }));
      this.registerView(new _List7["default"]({
        id: 'competitor_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List8["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Detail5["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Edit5["default"]());
      this.registerView(new _List8["default"]({
        id: 'contact_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List9["default"]({
        id: 'contract_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List10["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Detail6["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Edit6["default"]());
      this.registerView(new _List11["default"]({
        expose: false
      }));
      this.registerView(new _Detail7["default"]());
      this.registerView(new _List11["default"]({
        id: 'event_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Selector["default"]());
      this.registerView(new _Edit8["default"]());
      this.registerView(new _QuickEdit["default"]());
      this.registerView(new _List14["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Detail9["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _List14["default"]({
        id: 'opportunity_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Edit9["default"]());
      this.registerView(new _List15["default"]());
      this.registerView(new _Detail10["default"]());
      this.registerView(new _List15["default"]({
        id: 'opportunitycontact_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List16["default"]({
        id: 'opportunityproduct_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Detail11["default"]({
        id: 'opportunityproduct_detail',
        expose: false
      }));
      this.registerView(new _Edit10["default"]({
        id: 'opportunityproduct_edit',
        expose: false
      }));
      this.registerView(new _Edit7["default"]());
      this.registerView(new _List12["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Detail8["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _List12["default"]({
        id: 'lead_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List20["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Detail12["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Edit11["default"]());
      this.registerView(new _List20["default"]({
        id: 'ticket_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List21["default"]());
      this.registerView(new _Detail13["default"]());
      this.registerView(new _Edit12["default"]());
      this.registerView(new _RateLookup["default"]());
      this.registerView(new _List21["default"]({
        id: 'ticketactivity_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List22["default"]());
      this.registerView(new _Detail14["default"]());
      this.registerView(new _List22["default"]({
        id: 'ticketactivityitem_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List5["default"]({
        id: 'activity_attendee_related',
        expose: false
      }));
      this.registerView(new _Detail3["default"]());
      this.registerView(new _Edit3["default"]());
      this.registerView(new _TypesList["default"]());
      this.registerView(new _Detail4["default"]({
        canRedirectTo: true
      }));
      this.registerView(new _Edit4["default"]());
      this.registerView(new _Complete["default"]());
      this.registerView(new _TypesList2["default"]());
      this.registerView(new _List6["default"]({
        id: 'activity_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _MyDay["default"]());
      this.registerView(new _MyList["default"]());
      this.registerView(new _Recurring["default"]());
      this.registerView(new _Detail15["default"]());
      this.registerView(new _List23["default"]());
      this.registerView(new _ListOffline["default"]());
      this.registerView(new _Edit13["default"]());
      this.registerView(new _EditOffline["default"]());
      this.registerView(new _List23["default"]({
        id: 'history_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _CalendarAccessList["default"]({
        expose: false
      }));
      this.registerView(new _List24["default"]({
        expose: false
      }));
      this.registerView(new _List17["default"]({
        expose: false
      }));
      this.registerView(new _List18["default"]({
        id: 'product_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List19["default"]({
        id: 'productprogram_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List13["default"]({
        expose: false
      }));
      this.registerView(new _UrgencyLookup["default"]({
        expose: false
      }));
      this.registerView(new _ViewAttachment["default"]());
      this.registerView(new _AddAttachment["default"]());
      this.registerView(new _MyAttachmentList["default"]());
      this.registerView(new _List25["default"]({
        id: 'account_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List25["default"]({
        id: 'contact_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List25["default"]({
        id: 'lead_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List25["default"]({
        id: 'ticket_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List25["default"]({
        id: 'opportunity_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List25["default"]({
        id: 'activity_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List25["default"]({
        id: 'history_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Edit14["default"]({
        expose: false
      }));
      this.registerView(new _Edit15["default"]({
        expose: false
      }));
    },
    loadToolbars: function loadToolbars() {
      this.inherited(loadToolbars, arguments);
      this.registerToolbar(new _MainToolbar["default"]({
        name: 'tbar'
      }));
      this.registerToolbar(new _UpdateToolbar["default"]({
        name: 'updatebar'
      }));
    },
    loadCustomizations: function loadCustomizations() {
      this.loadBaseCustomizations();
    },
    loadBaseCustomizations: function loadBaseCustomizations() {
      _lang["default"].extend(_List["default"], {
        expose: true,
        getSecurity: function getSecurity() {
          return this.expose && this.security; // only check security on exposed views
        }
      });

      _lang["default"].extend(_SearchWidget["default"], {
        searchText: this.searchText
      });
    },

    /**
     * @deprecated typo, use loadAppStatePromises instead.
     */
    loadAppStatPromises: function loadAppStatPromises() {
      // Redirect to the typo fix.
      this.loadAppStatePromises();
    },
    loadAppStatePromises: function loadAppStatePromises() {
      var _this = this;

      this.registerAppStatePromise({
        seq: 1,
        description: resource.userContextAndOptionsText,
        items: [{
          name: 'user_detail',
          description: resource.userInformationText,
          fn: function fn() {
            return App.requestUserDetails();
          }
        }, {
          name: 'user_options',
          description: resource.userOptionsText,
          fn: function fn() {
            return App.requestUserOptions();
          }
        }, {
          name: 'system_options',
          description: resource.systemOptionsText,
          fn: function fn() {
            return App.requestSystemOptions();
          }
        }, {
          name: 'integrations',
          description: resource.integrationsText,
          fn: function fn() {
            var model = _this.application.ModelManager.getModel(_Names["default"].INTEGRATION, _Types["default"].SDATA);

            return model.getEntries(null, {
              contractName: 'dynamic'
            }).then(function (results) {
              _this.application.context.integrations = results;

              if (results) {
                results.forEach(function (integration) {
                  App.requestIntegrationSettings(integration.$descriptor);
                });
              }

              return results;
            });
          }
        }]
      });
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});