define('crm/ApplicationModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/ApplicationModule', 'argos/Calendar', 'argos/List', 'argos/Views/Signature', 'argos/SearchWidget', 'argos/Views/FileSelect', './Views/AddAccountContact', './Views/AreaCategoryIssueLookup', './Views/AreaCategoryIssue/AreaLookup', './Views/AreaCategoryIssue/CategoryLookup', './Views/AreaCategoryIssue/IssueLookup', './Views/ExchangeRateLookup', './Views/MainToolbar', './Views/UpdateToolbar', './Views/LeftDrawer', './Views/RightDrawer', './Views/Offline/Detail', './Views/Offline/List', './Views/Login', './Views/LogOff', './Views/Settings', './Views/Configure', './Views/Help', './Views/NameEdit', './Views/PickList', './Views/SelectList', './Views/SpeedSearchList', './Views/TextEdit', './Views/Account/List', './Views/Account/Detail', './Views/Account/Edit', './Views/Address/List', './Views/Address/Edit', './Views/ActivityAttendee/List', './Views/ActivityAttendee/Detail', './Views/ActivityAttendee/Edit', './Views/ActivityAttendee/TypesList', './Views/Activity/List', './Views/Activity/MyDay', './Views/Activity/MyList', './Views/Activity/Detail', './Views/Activity/Edit', './Views/Activity/Complete', './Views/Activity/TypesList', './Views/Activity/Recurring', './Views/Calendar/CalendarView', './Views/Calendar/DayView', './Views/Calendar/MonthView', './Views/Calendar/WeekView', './Views/Charts/GenericBar', './Views/Charts/GenericLine', './Views/Charts/GenericPie', './Views/Competitor/List', './Views/Contact/List', './Views/Contact/Detail', './Views/Contact/Edit', './Views/Contract/List', './Views/ErrorLog/List', './Views/ErrorLog/Detail', './Views/Event/List', './Views/Event/Detail', './Views/Event/Edit', './Views/Groups/Selector', './Views/Lead/List', './Views/Lead/Detail', './Views/Lead/Edit', './Views/LeadSource/List', './Views/Opportunity/List', './Views/Opportunity/Detail', './Views/Opportunity/Edit', './Views/Opportunity/QuickEdit', './Views/OpportunityContact/List', './Views/OpportunityContact/Detail', './Views/OpportunityContact/Edit', './Views/OpportunityProduct/List', './Views/OpportunityProduct/Detail', './Views/OpportunityProduct/Edit', './Views/Owner/List', './Views/Product/List', './Views/ProductProgram/List', './Views/Ticket/List', './Views/Ticket/Detail', './Views/Ticket/Edit', './Views/Ticket/UrgencyLookup', './Views/TicketActivity/List', './Views/TicketActivity/Detail', './Views/TicketActivity/Edit', './Views/TicketActivity/RateLookup', './Views/TicketActivityItem/List', './Views/TicketActivityItem/Detail', './Views/History/List', './Views/History/ListOffline', './Views/History/Detail', './Views/History/Edit', './Views/History/EditOffline', './Views/HistoryAttendee/List', './Views/HistoryAttendee/Detail', './Views/User/CalendarAccessList', './Views/User/List', './Views/Attachment/ViewAttachment', './Views/Attachment/List', './Views/Attachment/AddAttachment', './Views/Attachment/MyAttachmentList', './Views/RecentlyViewed/List', './Views/Briefcase/List', './Views/OfflineOptions/Edit', './Views/LanguageOptions/Edit', 'argos/I18n', './Models/Names', 'argos/Models/Types', 'argos/RelatedViewManager', 'argos/RelatedViewWidget', './Views/History/RelatedView', './Views/OfflineOptions/UsageWidget', './Views/LanguageOptions/UsageWidget', './Fields/AddressField', './Fields/MultiCurrencyField', './Fields/NameField', './Fields/PicklistField', './Fields/RecurrencesField', './Views/RelatedContextWidget', './Views/RelatedEditWidget', './Action', './Format', './Template', './Validator', './Environment', './Utility', './Models/Account/Offline', './Models/Account/SData', './Models/ActivityAttendee/Offline', './Models/ActivityAttendee/SData', './Models/Activity/Offline', './Models/Activity/SData', './Models/AreaCategoryIssue/SData', './Models/Contact/Offline', './Models/Contact/SData', './Models/Integration/SData', './Models/Lead/Offline', './Models/Lead/SData', './Models/LeadAddress/Offline', './Models/LeadAddress/SData', './Models/Opportunity/Offline', './Models/Opportunity/SData', './Models/OpportunityContact/Offline', './Models/OpportunityContact/SData', './Models/UserActivity/Offline', './Models/UserActivity/SData', './Models/Address/Offline', './Models/Address/SData', './Models/History/Offline', './Models/History/SData', './Models/HistoryAttendee/Offline', './Models/HistoryAttendee/SData', './Models/Ticket/Offline', './Models/Ticket/SData', './Models/TicketActivity/Offline', './Models/TicketActivity/SData', './Models/Authentication/Offline'], function (module, exports, _declare, _lang, _ApplicationModule, _Calendar, _List, _Signature, _SearchWidget, _FileSelect, _AddAccountContact, _AreaCategoryIssueLookup, _AreaLookup, _CategoryLookup, _IssueLookup, _ExchangeRateLookup, _MainToolbar, _UpdateToolbar, _LeftDrawer, _RightDrawer, _Detail, _List3, _Login, _LogOff, _Settings, _Configure, _Help, _NameEdit, _PickList, _SelectList, _SpeedSearchList, _TextEdit, _List5, _Detail3, _Edit, _List7, _Edit3, _List9, _Detail5, _Edit5, _TypesList, _List11, _MyDay, _MyList, _Detail7, _Edit7, _Complete, _TypesList3, _Recurring, _CalendarView, _DayView, _MonthView, _WeekView, _GenericBar, _GenericLine, _GenericPie, _List13, _List15, _Detail9, _Edit9, _List17, _List19, _Detail11, _List21, _Detail13, _Edit11, _Selector, _List23, _Detail15, _Edit13, _List25, _List27, _Detail17, _Edit15, _QuickEdit, _List29, _Detail19, _Edit17, _List31, _Detail21, _Edit19, _List33, _List35, _List37, _List39, _Detail23, _Edit21, _UrgencyLookup, _List41, _Detail25, _Edit23, _RateLookup, _List43, _Detail27, _List45, _ListOffline, _Detail29, _Edit25, _EditOffline, _List47, _Detail31, _CalendarAccessList, _List49, _ViewAttachment, _List51, _AddAttachment, _MyAttachmentList, _List53, _List55, _Edit27, _Edit29, _I18n, _Names, _Types) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _ApplicationModule2 = _interopRequireDefault(_ApplicationModule);

  var _Calendar2 = _interopRequireDefault(_Calendar);

  var _List2 = _interopRequireDefault(_List);

  var _Signature2 = _interopRequireDefault(_Signature);

  var _SearchWidget2 = _interopRequireDefault(_SearchWidget);

  var _FileSelect2 = _interopRequireDefault(_FileSelect);

  var _AddAccountContact2 = _interopRequireDefault(_AddAccountContact);

  var _AreaCategoryIssueLookup2 = _interopRequireDefault(_AreaCategoryIssueLookup);

  var _AreaLookup2 = _interopRequireDefault(_AreaLookup);

  var _CategoryLookup2 = _interopRequireDefault(_CategoryLookup);

  var _IssueLookup2 = _interopRequireDefault(_IssueLookup);

  var _ExchangeRateLookup2 = _interopRequireDefault(_ExchangeRateLookup);

  var _MainToolbar2 = _interopRequireDefault(_MainToolbar);

  var _UpdateToolbar2 = _interopRequireDefault(_UpdateToolbar);

  var _LeftDrawer2 = _interopRequireDefault(_LeftDrawer);

  var _RightDrawer2 = _interopRequireDefault(_RightDrawer);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _List4 = _interopRequireDefault(_List3);

  var _Login2 = _interopRequireDefault(_Login);

  var _LogOff2 = _interopRequireDefault(_LogOff);

  var _Settings2 = _interopRequireDefault(_Settings);

  var _Configure2 = _interopRequireDefault(_Configure);

  var _Help2 = _interopRequireDefault(_Help);

  var _NameEdit2 = _interopRequireDefault(_NameEdit);

  var _PickList2 = _interopRequireDefault(_PickList);

  var _SelectList2 = _interopRequireDefault(_SelectList);

  var _SpeedSearchList2 = _interopRequireDefault(_SpeedSearchList);

  var _TextEdit2 = _interopRequireDefault(_TextEdit);

  var _List6 = _interopRequireDefault(_List5);

  var _Detail4 = _interopRequireDefault(_Detail3);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _List8 = _interopRequireDefault(_List7);

  var _Edit4 = _interopRequireDefault(_Edit3);

  var _List10 = _interopRequireDefault(_List9);

  var _Detail6 = _interopRequireDefault(_Detail5);

  var _Edit6 = _interopRequireDefault(_Edit5);

  var _TypesList2 = _interopRequireDefault(_TypesList);

  var _List12 = _interopRequireDefault(_List11);

  var _MyDay2 = _interopRequireDefault(_MyDay);

  var _MyList2 = _interopRequireDefault(_MyList);

  var _Detail8 = _interopRequireDefault(_Detail7);

  var _Edit8 = _interopRequireDefault(_Edit7);

  var _Complete2 = _interopRequireDefault(_Complete);

  var _TypesList4 = _interopRequireDefault(_TypesList3);

  var _Recurring2 = _interopRequireDefault(_Recurring);

  var _CalendarView2 = _interopRequireDefault(_CalendarView);

  var _DayView2 = _interopRequireDefault(_DayView);

  var _MonthView2 = _interopRequireDefault(_MonthView);

  var _WeekView2 = _interopRequireDefault(_WeekView);

  var _GenericBar2 = _interopRequireDefault(_GenericBar);

  var _GenericLine2 = _interopRequireDefault(_GenericLine);

  var _GenericPie2 = _interopRequireDefault(_GenericPie);

  var _List14 = _interopRequireDefault(_List13);

  var _List16 = _interopRequireDefault(_List15);

  var _Detail10 = _interopRequireDefault(_Detail9);

  var _Edit10 = _interopRequireDefault(_Edit9);

  var _List18 = _interopRequireDefault(_List17);

  var _List20 = _interopRequireDefault(_List19);

  var _Detail12 = _interopRequireDefault(_Detail11);

  var _List22 = _interopRequireDefault(_List21);

  var _Detail14 = _interopRequireDefault(_Detail13);

  var _Edit12 = _interopRequireDefault(_Edit11);

  var _Selector2 = _interopRequireDefault(_Selector);

  var _List24 = _interopRequireDefault(_List23);

  var _Detail16 = _interopRequireDefault(_Detail15);

  var _Edit14 = _interopRequireDefault(_Edit13);

  var _List26 = _interopRequireDefault(_List25);

  var _List28 = _interopRequireDefault(_List27);

  var _Detail18 = _interopRequireDefault(_Detail17);

  var _Edit16 = _interopRequireDefault(_Edit15);

  var _QuickEdit2 = _interopRequireDefault(_QuickEdit);

  var _List30 = _interopRequireDefault(_List29);

  var _Detail20 = _interopRequireDefault(_Detail19);

  var _Edit18 = _interopRequireDefault(_Edit17);

  var _List32 = _interopRequireDefault(_List31);

  var _Detail22 = _interopRequireDefault(_Detail21);

  var _Edit20 = _interopRequireDefault(_Edit19);

  var _List34 = _interopRequireDefault(_List33);

  var _List36 = _interopRequireDefault(_List35);

  var _List38 = _interopRequireDefault(_List37);

  var _List40 = _interopRequireDefault(_List39);

  var _Detail24 = _interopRequireDefault(_Detail23);

  var _Edit22 = _interopRequireDefault(_Edit21);

  var _UrgencyLookup2 = _interopRequireDefault(_UrgencyLookup);

  var _List42 = _interopRequireDefault(_List41);

  var _Detail26 = _interopRequireDefault(_Detail25);

  var _Edit24 = _interopRequireDefault(_Edit23);

  var _RateLookup2 = _interopRequireDefault(_RateLookup);

  var _List44 = _interopRequireDefault(_List43);

  var _Detail28 = _interopRequireDefault(_Detail27);

  var _List46 = _interopRequireDefault(_List45);

  var _ListOffline2 = _interopRequireDefault(_ListOffline);

  var _Detail30 = _interopRequireDefault(_Detail29);

  var _Edit26 = _interopRequireDefault(_Edit25);

  var _EditOffline2 = _interopRequireDefault(_EditOffline);

  var _List48 = _interopRequireDefault(_List47);

  var _Detail32 = _interopRequireDefault(_Detail31);

  var _CalendarAccessList2 = _interopRequireDefault(_CalendarAccessList);

  var _List50 = _interopRequireDefault(_List49);

  var _ViewAttachment2 = _interopRequireDefault(_ViewAttachment);

  var _List52 = _interopRequireDefault(_List51);

  var _AddAttachment2 = _interopRequireDefault(_AddAttachment);

  var _MyAttachmentList2 = _interopRequireDefault(_MyAttachmentList);

  var _List54 = _interopRequireDefault(_List53);

  var _List56 = _interopRequireDefault(_List55);

  var _Edit28 = _interopRequireDefault(_Edit27);

  var _Edit30 = _interopRequireDefault(_Edit29);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  var _Types2 = _interopRequireDefault(_Types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('applicationModule');

  /**
   * @class
   * @alias module:crm/ApplicationModule
   * @extends module:argos/ApplicationModule
   */
  // Legacy
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
  var __class = (0, _declare2.default)('crm.ApplicationModule', [_ApplicationModule2.default], /** @lends module:crm/ApplicationModule.prototype */{
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

      this.registerView(new _Calendar2.default({
        expose: false
      }));

      this.registerView(new _Signature2.default({
        expose: false
      }));

      this.registerView(new _Login2.default());

      this.registerView(new _LogOff2.default());

      this.registerView(new _LeftDrawer2.default(), $('.application-menu', this.application.getContainerNode()).first().get(0), 'last');

      var modalBody = $('.modal-body', this.application.viewSettingsModal.element);
      this.registerView(new _RightDrawer2.default(), modalBody.first().get(0));

      this.registerView(new _Detail2.default({
        canRedirectTo: true
      }));
      this.registerView(new _List4.default({
        expose: false,
        canRedirectTo: true
      }));
      this.registerView(new _List54.default({
        expose: true,
        canRedirectTo: true
      }));
      this.registerView(new _List54.default({
        id: 'recently_viewed_list_offline',
        expose: false,
        canRedirectTo: true
      }));
      this.registerView(new _List56.default({
        expose: true,
        canRedirectTo: true
      }));
      this.registerView(new _Help2.default({
        canRedirectTo: true
      }));
      this.registerView(new _Settings2.default({
        canRedirectTo: true
      }));
      this.registerView(new _Configure2.default());
      this.registerView(new _PickList2.default());
      this.registerView(new _SelectList2.default());
      this.registerView(new _SpeedSearchList2.default());
      this.registerView(new _AddAccountContact2.default());
      this.registerView(new _AreaCategoryIssueLookup2.default());
      this.registerView(new _AreaLookup2.default());
      this.registerView(new _CategoryLookup2.default());
      this.registerView(new _IssueLookup2.default());
      this.registerView(new _ExchangeRateLookup2.default());
      this.registerView(new _FileSelect2.default());

      this.registerView(new _NameEdit2.default());
      this.registerView(new _TextEdit2.default());
      this.registerView(new _List8.default({
        id: 'address_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Edit4.default());

      this.registerView(new _List6.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail4.default({
        canRedirectTo: true
      }));
      this.registerView(new _Edit2.default());
      this.registerView(new _List6.default({
        id: 'account_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _CalendarView2.default());
      this.registerView(new _DayView2.default());
      this.registerView(new _MonthView2.default());
      this.registerView(new _WeekView2.default());

      // Charts
      this.registerView(new _GenericBar2.default({
        expose: false
      }));
      this.registerView(new _GenericLine2.default({
        expose: false
      }));
      this.registerView(new _GenericPie2.default({
        expose: false
      }));

      this.registerView(new _List14.default({
        id: 'competitor_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List16.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail10.default({
        canRedirectTo: true
      }));
      this.registerView(new _Edit10.default());
      this.registerView(new _List16.default({
        id: 'contact_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List18.default({
        id: 'contract_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List20.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail12.default({
        canRedirectTo: true
      }));

      this.registerView(new _Edit12.default());
      this.registerView(new _List22.default({
        expose: false
      }));
      this.registerView(new _Detail14.default());
      this.registerView(new _List22.default({
        id: 'event_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _Selector2.default());

      this.registerView(new _Edit16.default());
      this.registerView(new _QuickEdit2.default());
      this.registerView(new _List28.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail18.default({
        canRedirectTo: true
      }));
      this.registerView(new _List28.default({
        id: 'opportunity_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _Edit18.default());
      this.registerView(new _List30.default());
      this.registerView(new _Detail20.default());
      this.registerView(new _List30.default({
        id: 'opportunitycontact_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List32.default({
        id: 'opportunityproduct_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _Detail22.default({
        id: 'opportunityproduct_detail',
        expose: false
      }));

      this.registerView(new _Edit20.default({
        id: 'opportunityproduct_edit',
        expose: false
      }));

      this.registerView(new _Edit14.default());
      this.registerView(new _List24.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail16.default({
        canRedirectTo: true
      }));
      this.registerView(new _List24.default({
        id: 'lead_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List40.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail24.default({
        canRedirectTo: true
      }));
      this.registerView(new _Edit22.default());
      this.registerView(new _List40.default({
        id: 'ticket_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List42.default());
      this.registerView(new _Detail26.default());
      this.registerView(new _Edit24.default());
      this.registerView(new _RateLookup2.default());
      this.registerView(new _List42.default({
        id: 'ticketactivity_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List44.default());
      this.registerView(new _Detail28.default());
      this.registerView(new _List44.default({
        id: 'ticketactivityitem_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List10.default({
        id: 'activity_attendee_related',
        expose: false
      }));
      this.registerView(new _Detail6.default());
      this.registerView(new _Edit6.default());
      this.registerView(new _TypesList2.default());

      this.registerView(new _Detail8.default({
        canRedirectTo: true
      }));
      this.registerView(new _Edit8.default());
      this.registerView(new _Complete2.default());
      this.registerView(new _TypesList4.default());
      this.registerView(new _List12.default({
        id: 'activity_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _MyDay2.default());
      this.registerView(new _MyList2.default());
      this.registerView(new _Recurring2.default());

      this.registerView(new _Detail30.default());
      this.registerView(new _List46.default());
      this.registerView(new _ListOffline2.default());
      this.registerView(new _Edit26.default());
      this.registerView(new _EditOffline2.default());
      this.registerView(new _List46.default({
        id: 'history_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List48.default({
        id: 'history_attendee_related',
        expose: false
      }));
      this.registerView(new _Detail32.default());

      this.registerView(new _CalendarAccessList2.default({
        expose: false
      }));

      this.registerView(new _List50.default({
        expose: false
      }));

      this.registerView(new _List34.default({
        expose: false
      }));

      this.registerView(new _List36.default({
        id: 'product_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List38.default({
        id: 'productprogram_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List26.default({
        expose: false
      }));

      this.registerView(new _UrgencyLookup2.default({
        expose: false
      }));

      this.registerView(new _ViewAttachment2.default());
      this.registerView(new _AddAttachment2.default());
      this.registerView(new _MyAttachmentList2.default());
      this.registerView(new _List52.default({
        id: 'account_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List52.default({
        id: 'contact_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List52.default({
        id: 'lead_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List52.default({
        id: 'ticket_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List52.default({
        id: 'opportunity_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List52.default({
        id: 'activity_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List52.default({
        id: 'history_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Edit28.default({
        expose: false
      }));
      this.registerView(new _Edit30.default({
        expose: false
      }));
    },
    loadToolbars: function loadToolbars() {
      this.inherited(loadToolbars, arguments);

      this.registerToolbar(new _MainToolbar2.default({
        name: 'tbar'
      }));

      this.registerToolbar(new _UpdateToolbar2.default({
        name: 'updatebar'
      }));
    },
    loadCustomizations: function loadCustomizations() {
      this.loadBaseCustomizations();
    },
    loadBaseCustomizations: function loadBaseCustomizations() {
      _lang2.default.extend(_List2.default, {
        expose: true,
        getSecurity: function getSecurity() {
          return this.expose && this.security; // only check security on exposed views
        }
      });

      _lang2.default.extend(_SearchWidget2.default, {
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
            var model = _this.application.ModelManager.getModel(_Names2.default.INTEGRATION, _Types2.default.SDATA);
            return model.getEntries(null, { contractName: 'dynamic' }).then(function (results) {
              _this.application.context.integrations = results;
              if (results) {
                results.forEach(function (integration) {
                  App.requestIntegrationSettings(integration.$descriptor);
                });
              }
              return results;
            });
          }
        }, {
          name: 'distinct_areacategoryissues',
          fn: function fn() {
            return App.requestAreaCategoryIssueServices();
          }
        }]
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});