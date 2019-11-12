define('crm/ApplicationModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/ApplicationModule', 'argos/Calendar', 'argos/List', 'argos/Views/Signature', 'argos/SearchWidget', 'argos/Views/FileSelect', './Views/AddAccountContact', './Views/AreaCategoryIssueLookup', './Views/ExchangeRateLookup', './Views/MainToolbar', './Views/UpdateToolbar', './Views/LeftDrawer', './Views/RightDrawer', './Views/Offline/Detail', './Views/Offline/List', './Views/Login', './Views/LogOff', './Views/Settings', './Views/Configure', './Views/Help', './Views/NameEdit', './Views/PickList', './Views/SelectList', './Views/SpeedSearchList', './Views/TextEdit', './Views/Account/List', './Views/Account/Detail', './Views/Account/Edit', './Views/Address/List', './Views/Address/Edit', './Views/Activity/List', './Views/Activity/MyDay', './Views/Activity/MyList', './Views/Activity/Detail', './Views/Activity/Edit', './Views/Activity/Complete', './Views/Activity/TypesList', './Views/Activity/Recurring', './Views/Calendar/CalendarView', './Views/Calendar/DayView', './Views/Calendar/MonthView', './Views/Calendar/WeekView', './Views/Charts/GenericBar', './Views/Charts/GenericLine', './Views/Charts/GenericPie', './Views/Competitor/List', './Views/Contact/List', './Views/Contact/Detail', './Views/Contact/Edit', './Views/Contract/List', './Views/ErrorLog/List', './Views/ErrorLog/Detail', './Views/Event/List', './Views/Event/Detail', './Views/Event/Edit', './Views/Groups/Selector', './Views/Lead/List', './Views/Lead/Detail', './Views/Lead/Edit', './Views/LeadSource/List', './Views/Opportunity/List', './Views/Opportunity/Detail', './Views/Opportunity/Edit', './Views/Opportunity/QuickEdit', './Views/OpportunityContact/List', './Views/OpportunityContact/Detail', './Views/OpportunityContact/Edit', './Views/OpportunityProduct/List', './Views/OpportunityProduct/Detail', './Views/OpportunityProduct/Edit', './Views/Owner/List', './Views/Product/List', './Views/ProductProgram/List', './Views/Ticket/List', './Views/Ticket/Detail', './Views/Ticket/Edit', './Views/Ticket/UrgencyLookup', './Views/TicketActivity/List', './Views/TicketActivity/Detail', './Views/TicketActivity/Edit', './Views/TicketActivity/RateLookup', './Views/TicketActivityItem/List', './Views/TicketActivityItem/Detail', './Views/History/List', './Views/History/ListOffline', './Views/History/Detail', './Views/History/Edit', './Views/History/EditOffline', './Views/User/CalendarAccessList', './Views/User/List', './Views/Attachment/ViewAttachment', './Views/Attachment/List', './Views/Attachment/AddAttachment', './Views/Attachment/MyAttachmentList', './Views/RecentlyViewed/List', './Views/Briefcase/List', './Views/OfflineOptions/Edit', './Views/LanguageOptions/Edit', 'argos/I18n', './Models/Names', 'argos/Models/Types', 'argos/RelatedViewManager', 'argos/RelatedViewWidget', './Views/History/RelatedView', './Views/OfflineOptions/UsageWidget', './Views/LanguageOptions/UsageWidget', './Fields/AddressField', './Fields/MultiCurrencyField', './Fields/NameField', './Fields/PicklistField', './Fields/RecurrencesField', './Views/RelatedContextWidget', './Views/RelatedEditWidget', './Action', './Format', './Template', './Validator', './Environment', './Utility', './Models/Account/Offline', './Models/Account/SData', './Models/Activity/Offline', './Models/Activity/SData', './Models/Contact/Offline', './Models/Contact/SData', './Models/Integration/SData', './Models/Lead/Offline', './Models/Lead/SData', './Models/LeadAddress/Offline', './Models/LeadAddress/SData', './Models/Opportunity/Offline', './Models/Opportunity/SData', './Models/OpportunityContact/Offline', './Models/OpportunityContact/SData', './Models/UserActivity/Offline', './Models/UserActivity/SData', './Models/Address/Offline', './Models/Address/SData', './Models/History/Offline', './Models/History/SData', './Models/Ticket/Offline', './Models/Ticket/SData', './Models/TicketActivity/Offline', './Models/TicketActivity/SData', './Models/Authentication/Offline'], function (module, exports, _declare, _lang, _ApplicationModule, _Calendar, _List, _Signature, _SearchWidget, _FileSelect, _AddAccountContact, _AreaCategoryIssueLookup, _ExchangeRateLookup, _MainToolbar, _UpdateToolbar, _LeftDrawer, _RightDrawer, _Detail, _List3, _Login, _LogOff, _Settings, _Configure, _Help, _NameEdit, _PickList, _SelectList, _SpeedSearchList, _TextEdit, _List5, _Detail3, _Edit, _List7, _Edit3, _List9, _MyDay, _MyList, _Detail5, _Edit5, _Complete, _TypesList, _Recurring, _CalendarView, _DayView, _MonthView, _WeekView, _GenericBar, _GenericLine, _GenericPie, _List11, _List13, _Detail7, _Edit7, _List15, _List17, _Detail9, _List19, _Detail11, _Edit9, _Selector, _List21, _Detail13, _Edit11, _List23, _List25, _Detail15, _Edit13, _QuickEdit, _List27, _Detail17, _Edit15, _List29, _Detail19, _Edit17, _List31, _List33, _List35, _List37, _Detail21, _Edit19, _UrgencyLookup, _List39, _Detail23, _Edit21, _RateLookup, _List41, _Detail25, _List43, _ListOffline, _Detail27, _Edit23, _EditOffline, _CalendarAccessList, _List45, _ViewAttachment, _List47, _AddAttachment, _MyAttachmentList, _List49, _List51, _Edit25, _Edit27, _I18n, _Names, _Types) {
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

  var _MyDay2 = _interopRequireDefault(_MyDay);

  var _MyList2 = _interopRequireDefault(_MyList);

  var _Detail6 = _interopRequireDefault(_Detail5);

  var _Edit6 = _interopRequireDefault(_Edit5);

  var _Complete2 = _interopRequireDefault(_Complete);

  var _TypesList2 = _interopRequireDefault(_TypesList);

  var _Recurring2 = _interopRequireDefault(_Recurring);

  var _CalendarView2 = _interopRequireDefault(_CalendarView);

  var _DayView2 = _interopRequireDefault(_DayView);

  var _MonthView2 = _interopRequireDefault(_MonthView);

  var _WeekView2 = _interopRequireDefault(_WeekView);

  var _GenericBar2 = _interopRequireDefault(_GenericBar);

  var _GenericLine2 = _interopRequireDefault(_GenericLine);

  var _GenericPie2 = _interopRequireDefault(_GenericPie);

  var _List12 = _interopRequireDefault(_List11);

  var _List14 = _interopRequireDefault(_List13);

  var _Detail8 = _interopRequireDefault(_Detail7);

  var _Edit8 = _interopRequireDefault(_Edit7);

  var _List16 = _interopRequireDefault(_List15);

  var _List18 = _interopRequireDefault(_List17);

  var _Detail10 = _interopRequireDefault(_Detail9);

  var _List20 = _interopRequireDefault(_List19);

  var _Detail12 = _interopRequireDefault(_Detail11);

  var _Edit10 = _interopRequireDefault(_Edit9);

  var _Selector2 = _interopRequireDefault(_Selector);

  var _List22 = _interopRequireDefault(_List21);

  var _Detail14 = _interopRequireDefault(_Detail13);

  var _Edit12 = _interopRequireDefault(_Edit11);

  var _List24 = _interopRequireDefault(_List23);

  var _List26 = _interopRequireDefault(_List25);

  var _Detail16 = _interopRequireDefault(_Detail15);

  var _Edit14 = _interopRequireDefault(_Edit13);

  var _QuickEdit2 = _interopRequireDefault(_QuickEdit);

  var _List28 = _interopRequireDefault(_List27);

  var _Detail18 = _interopRequireDefault(_Detail17);

  var _Edit16 = _interopRequireDefault(_Edit15);

  var _List30 = _interopRequireDefault(_List29);

  var _Detail20 = _interopRequireDefault(_Detail19);

  var _Edit18 = _interopRequireDefault(_Edit17);

  var _List32 = _interopRequireDefault(_List31);

  var _List34 = _interopRequireDefault(_List33);

  var _List36 = _interopRequireDefault(_List35);

  var _List38 = _interopRequireDefault(_List37);

  var _Detail22 = _interopRequireDefault(_Detail21);

  var _Edit20 = _interopRequireDefault(_Edit19);

  var _UrgencyLookup2 = _interopRequireDefault(_UrgencyLookup);

  var _List40 = _interopRequireDefault(_List39);

  var _Detail24 = _interopRequireDefault(_Detail23);

  var _Edit22 = _interopRequireDefault(_Edit21);

  var _RateLookup2 = _interopRequireDefault(_RateLookup);

  var _List42 = _interopRequireDefault(_List41);

  var _Detail26 = _interopRequireDefault(_Detail25);

  var _List44 = _interopRequireDefault(_List43);

  var _ListOffline2 = _interopRequireDefault(_ListOffline);

  var _Detail28 = _interopRequireDefault(_Detail27);

  var _Edit24 = _interopRequireDefault(_Edit23);

  var _EditOffline2 = _interopRequireDefault(_EditOffline);

  var _CalendarAccessList2 = _interopRequireDefault(_CalendarAccessList);

  var _List46 = _interopRequireDefault(_List45);

  var _ViewAttachment2 = _interopRequireDefault(_ViewAttachment);

  var _List48 = _interopRequireDefault(_List47);

  var _AddAttachment2 = _interopRequireDefault(_AddAttachment);

  var _MyAttachmentList2 = _interopRequireDefault(_MyAttachmentList);

  var _List50 = _interopRequireDefault(_List49);

  var _List52 = _interopRequireDefault(_List51);

  var _Edit26 = _interopRequireDefault(_Edit25);

  var _Edit28 = _interopRequireDefault(_Edit27);

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
   * @class crm.ApplicationModule
   * @extends argos.ApplicationModule
   */
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

  var __class = (0, _declare2.default)('crm.ApplicationModule', [_ApplicationModule2.default], /** @lends crm.ApplicationModule# */{
    searchText: resource.searchText,
    loadViews: function loadViews() {
      this.inherited(arguments);

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
      this.registerView(new _List50.default({
        expose: true,
        canRedirectTo: true
      }));
      this.registerView(new _List50.default({
        id: 'recently_viewed_list_offline',
        expose: false,
        canRedirectTo: true
      }));
      this.registerView(new _List52.default({
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

      this.registerView(new _List12.default({
        id: 'competitor_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List14.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail8.default({
        canRedirectTo: true
      }));
      this.registerView(new _Edit8.default());
      this.registerView(new _List14.default({
        id: 'contact_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List16.default({
        id: 'contract_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List18.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail10.default({
        canRedirectTo: true
      }));

      this.registerView(new _Edit10.default());
      this.registerView(new _List20.default({
        expose: false
      }));
      this.registerView(new _Detail12.default());
      this.registerView(new _List20.default({
        id: 'event_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _Selector2.default());

      this.registerView(new _Edit14.default());
      this.registerView(new _QuickEdit2.default());
      this.registerView(new _List26.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail16.default({
        canRedirectTo: true
      }));
      this.registerView(new _List26.default({
        id: 'opportunity_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _Edit16.default());
      this.registerView(new _List28.default());
      this.registerView(new _Detail18.default());
      this.registerView(new _List28.default({
        id: 'opportunitycontact_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List30.default({
        id: 'opportunityproduct_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _Detail20.default({
        id: 'opportunityproduct_detail',
        expose: false
      }));

      this.registerView(new _Edit18.default({
        id: 'opportunityproduct_edit',
        expose: false
      }));

      this.registerView(new _Edit12.default());
      this.registerView(new _List22.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail14.default({
        canRedirectTo: true
      }));
      this.registerView(new _List22.default({
        id: 'lead_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List38.default({
        canRedirectTo: true
      }));
      this.registerView(new _Detail22.default({
        canRedirectTo: true
      }));
      this.registerView(new _Edit20.default());
      this.registerView(new _List38.default({
        id: 'ticket_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List40.default());
      this.registerView(new _Detail24.default());
      this.registerView(new _Edit22.default());
      this.registerView(new _RateLookup2.default());
      this.registerView(new _List40.default({
        id: 'ticketactivity_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List42.default());
      this.registerView(new _Detail26.default());
      this.registerView(new _List42.default({
        id: 'ticketactivityitem_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _Detail6.default({
        canRedirectTo: true
      }));
      this.registerView(new _Edit6.default());
      this.registerView(new _Complete2.default());
      this.registerView(new _TypesList2.default());
      this.registerView(new _List10.default({
        id: 'activity_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _MyDay2.default());
      this.registerView(new _MyList2.default());
      this.registerView(new _Recurring2.default());

      this.registerView(new _Detail28.default());
      this.registerView(new _List44.default());
      this.registerView(new _ListOffline2.default());
      this.registerView(new _Edit24.default());
      this.registerView(new _EditOffline2.default());
      this.registerView(new _List44.default({
        id: 'history_related',
        expose: false,
        groupsEnabled: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _CalendarAccessList2.default({
        expose: false
      }));

      this.registerView(new _List46.default({
        expose: false
      }));

      this.registerView(new _List32.default({
        expose: false
      }));

      this.registerView(new _List34.default({
        id: 'product_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List36.default({
        id: 'productprogram_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));

      this.registerView(new _List24.default({
        expose: false
      }));

      this.registerView(new _UrgencyLookup2.default({
        expose: false
      }));

      this.registerView(new _ViewAttachment2.default());
      this.registerView(new _AddAttachment2.default());
      this.registerView(new _MyAttachmentList2.default());
      this.registerView(new _List48.default({
        id: 'account_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List48.default({
        id: 'contact_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List48.default({
        id: 'lead_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List48.default({
        id: 'ticket_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List48.default({
        id: 'opportunity_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List48.default({
        id: 'activity_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _List48.default({
        id: 'history_attachment_related',
        expose: false,
        defaultSearchTerm: function defaultSearchTerm() {
          return '';
        }
      }));
      this.registerView(new _Edit26.default({
        expose: false
      }));
      this.registerView(new _Edit28.default({
        expose: false
      }));
    },
    loadToolbars: function loadToolbars() {
      this.inherited(arguments);

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
        }]
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHBsaWNhdGlvbk1vZHVsZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJzZWFyY2hUZXh0IiwibG9hZFZpZXdzIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicmVnaXN0ZXJWaWV3IiwiZXhwb3NlIiwiJCIsImFwcGxpY2F0aW9uIiwiZ2V0Q29udGFpbmVyTm9kZSIsImZpcnN0IiwiZ2V0IiwibW9kYWxCb2R5Iiwidmlld1NldHRpbmdzTW9kYWwiLCJlbGVtZW50IiwiY2FuUmVkaXJlY3RUbyIsImlkIiwiZGVmYXVsdFNlYXJjaFRlcm0iLCJncm91cHNFbmFibGVkIiwibG9hZFRvb2xiYXJzIiwicmVnaXN0ZXJUb29sYmFyIiwibmFtZSIsImxvYWRDdXN0b21pemF0aW9ucyIsImxvYWRCYXNlQ3VzdG9taXphdGlvbnMiLCJleHRlbmQiLCJnZXRTZWN1cml0eSIsInNlY3VyaXR5IiwibG9hZEFwcFN0YXRQcm9taXNlcyIsImxvYWRBcHBTdGF0ZVByb21pc2VzIiwicmVnaXN0ZXJBcHBTdGF0ZVByb21pc2UiLCJzZXEiLCJkZXNjcmlwdGlvbiIsInVzZXJDb250ZXh0QW5kT3B0aW9uc1RleHQiLCJpdGVtcyIsInVzZXJJbmZvcm1hdGlvblRleHQiLCJmbiIsIkFwcCIsInJlcXVlc3RVc2VyRGV0YWlscyIsInVzZXJPcHRpb25zVGV4dCIsInJlcXVlc3RVc2VyT3B0aW9ucyIsInN5c3RlbU9wdGlvbnNUZXh0IiwicmVxdWVzdFN5c3RlbU9wdGlvbnMiLCJpbnRlZ3JhdGlvbnNUZXh0IiwibW9kZWwiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIklOVEVHUkFUSU9OIiwiU0RBVEEiLCJnZXRFbnRyaWVzIiwiY29udHJhY3ROYW1lIiwidGhlbiIsInJlc3VsdHMiLCJjb250ZXh0IiwiaW50ZWdyYXRpb25zIiwiZm9yRWFjaCIsImludGVncmF0aW9uIiwicmVxdWVzdEludGVncmF0aW9uU2V0dGluZ3MiLCIkZGVzY3JpcHRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1LQSxNQUFNQSxXQUFXLG9CQUFZLG1CQUFaLENBQWpCOztBQUVBOzs7O0FBcktBOzs7Ozs7Ozs7Ozs7Ozs7QUF5S0EsTUFBTUMsVUFBVSx1QkFBUSx1QkFBUixFQUFpQyw2QkFBakMsRUFBc0Qsb0NBQW9DO0FBQ3hHQyxnQkFBWUYsU0FBU0UsVUFEbUY7QUFFeEdDLGVBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixXQUFLQyxTQUFMLENBQWVDLFNBQWY7O0FBRUEsV0FBS0MsWUFBTCxDQUFrQix1QkFBYTtBQUM3QkMsZ0JBQVE7QUFEcUIsT0FBYixDQUFsQjs7QUFJQSxXQUFLRCxZQUFMLENBQWtCLHdCQUFjO0FBQzlCQyxnQkFBUTtBQURzQixPQUFkLENBQWxCOztBQUlBLFdBQUtELFlBQUwsQ0FBa0IscUJBQWxCOztBQUVBLFdBQUtBLFlBQUwsQ0FBa0Isc0JBQWxCOztBQUVBLFdBQUtBLFlBQUwsQ0FBa0IsMEJBQWxCLEVBQW9DRSxFQUFFLG1CQUFGLEVBQXVCLEtBQUtDLFdBQUwsQ0FBaUJDLGdCQUFqQixFQUF2QixFQUE0REMsS0FBNUQsR0FBb0VDLEdBQXBFLENBQXdFLENBQXhFLENBQXBDLEVBQWdILE1BQWhIOztBQUVBLFVBQU1DLFlBQVlMLEVBQUUsYUFBRixFQUFpQixLQUFLQyxXQUFMLENBQWlCSyxpQkFBakIsQ0FBbUNDLE9BQXBELENBQWxCO0FBQ0EsV0FBS1QsWUFBTCxDQUFrQiwyQkFBbEIsRUFBcUNPLFVBQVVGLEtBQVYsR0FBa0JDLEdBQWxCLENBQXNCLENBQXRCLENBQXJDOztBQUVBLFdBQUtOLFlBQUwsQ0FBa0IscUJBQWtCO0FBQ2xDVSx1QkFBZTtBQURtQixPQUFsQixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0IsbUJBQWdCO0FBQ2hDQyxnQkFBUSxLQUR3QjtBQUVoQ1MsdUJBQWU7QUFGaUIsT0FBaEIsQ0FBbEI7QUFJQSxXQUFLVixZQUFMLENBQWtCLG9CQUF1QjtBQUN2Q0MsZ0JBQVEsSUFEK0I7QUFFdkNTLHVCQUFlO0FBRndCLE9BQXZCLENBQWxCO0FBSUEsV0FBS1YsWUFBTCxDQUFrQixvQkFBdUI7QUFDdkNXLFlBQUksOEJBRG1DO0FBRXZDVixnQkFBUSxLQUYrQjtBQUd2Q1MsdUJBQWU7QUFId0IsT0FBdkIsQ0FBbEI7QUFLQSxXQUFLVixZQUFMLENBQWtCLG9CQUFrQjtBQUNsQ0MsZ0JBQVEsSUFEMEI7QUFFbENTLHVCQUFlO0FBRm1CLE9BQWxCLENBQWxCO0FBSUEsV0FBS1YsWUFBTCxDQUFrQixtQkFBUztBQUN6QlUsdUJBQWU7QUFEVSxPQUFULENBQWxCO0FBR0EsV0FBS1YsWUFBTCxDQUFrQix1QkFBYTtBQUM3QlUsdUJBQWU7QUFEYyxPQUFiLENBQWxCO0FBR0EsV0FBS1YsWUFBTCxDQUFrQix5QkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLHdCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IsMEJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQiwrQkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLGlDQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IsdUNBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixrQ0FBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLDBCQUFsQjs7QUFFQSxXQUFLQSxZQUFMLENBQWtCLHdCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0Isd0JBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixtQkFBZ0I7QUFDaENXLFlBQUksaUJBRDRCO0FBRWhDVixnQkFBUSxLQUZ3QjtBQUdoQ1csMkJBQW1CLFNBQVNBLGlCQUFULEdBQTZCO0FBQzlDLGlCQUFPLEVBQVA7QUFDRDtBQUwrQixPQUFoQixDQUFsQjtBQU9BLFdBQUtaLFlBQUwsQ0FBa0Isb0JBQWxCOztBQUVBLFdBQUtBLFlBQUwsQ0FBa0IsbUJBQWdCO0FBQ2hDVSx1QkFBZTtBQURpQixPQUFoQixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0IscUJBQWtCO0FBQ2xDVSx1QkFBZTtBQURtQixPQUFsQixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0Isb0JBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixtQkFBZ0I7QUFDaENXLFlBQUksaUJBRDRCO0FBRWhDVixnQkFBUSxLQUZ3QjtBQUdoQ1ksdUJBQWUsS0FIaUI7QUFJaENELDJCQUFtQixTQUFTQSxpQkFBVCxHQUE2QjtBQUM5QyxpQkFBTyxFQUFQO0FBQ0Q7QUFOK0IsT0FBaEIsQ0FBbEI7O0FBU0EsV0FBS1osWUFBTCxDQUFrQiw0QkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLHVCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IseUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQix3QkFBbEI7O0FBRUE7QUFDQSxXQUFLQSxZQUFMLENBQWtCLHlCQUFlO0FBQy9CQyxnQkFBUTtBQUR1QixPQUFmLENBQWxCO0FBR0EsV0FBS0QsWUFBTCxDQUFrQiwwQkFBZ0I7QUFDaENDLGdCQUFRO0FBRHdCLE9BQWhCLENBQWxCO0FBR0EsV0FBS0QsWUFBTCxDQUFrQix5QkFBZTtBQUMvQkMsZ0JBQVE7QUFEdUIsT0FBZixDQUFsQjs7QUFJQSxXQUFLRCxZQUFMLENBQWtCLG9CQUFtQjtBQUNuQ1csWUFBSSxvQkFEK0I7QUFFbkNWLGdCQUFRLEtBRjJCO0FBR25DVywyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTGtDLE9BQW5CLENBQWxCOztBQVFBLFdBQUtaLFlBQUwsQ0FBa0Isb0JBQWdCO0FBQ2hDVSx1QkFBZTtBQURpQixPQUFoQixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0IscUJBQWtCO0FBQ2xDVSx1QkFBZTtBQURtQixPQUFsQixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0Isb0JBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixvQkFBZ0I7QUFDaENXLFlBQUksaUJBRDRCO0FBRWhDVixnQkFBUSxLQUZ3QjtBQUdoQ1ksdUJBQWUsS0FIaUI7QUFJaENELDJCQUFtQiw2QkFBTTtBQUN2QixpQkFBTyxFQUFQO0FBQ0Q7QUFOK0IsT0FBaEIsQ0FBbEI7O0FBU0EsV0FBS1osWUFBTCxDQUFrQixvQkFBaUI7QUFDakNXLFlBQUksa0JBRDZCO0FBRWpDVixnQkFBUSxLQUZ5QjtBQUdqQ1csMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQUxnQyxPQUFqQixDQUFsQjs7QUFRQSxXQUFLWixZQUFMLENBQWtCLG9CQUFpQjtBQUNqQ1UsdUJBQWU7QUFEa0IsT0FBakIsQ0FBbEI7QUFHQSxXQUFLVixZQUFMLENBQWtCLHNCQUFtQjtBQUNuQ1UsdUJBQWU7QUFEb0IsT0FBbkIsQ0FBbEI7O0FBSUEsV0FBS1YsWUFBTCxDQUFrQixxQkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLG9CQUFjO0FBQzlCQyxnQkFBUTtBQURzQixPQUFkLENBQWxCO0FBR0EsV0FBS0QsWUFBTCxDQUFrQix1QkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLG9CQUFjO0FBQzlCVyxZQUFJLGVBRDBCO0FBRTlCVixnQkFBUSxLQUZzQjtBQUc5QlcsMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQUw2QixPQUFkLENBQWxCOztBQVFBLFdBQUtaLFlBQUwsQ0FBa0Isd0JBQWxCOztBQUVBLFdBQUtBLFlBQUwsQ0FBa0IscUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQix5QkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLG9CQUFvQjtBQUNwQ1UsdUJBQWU7QUFEcUIsT0FBcEIsQ0FBbEI7QUFHQSxXQUFLVixZQUFMLENBQWtCLHNCQUFzQjtBQUN0Q1UsdUJBQWU7QUFEdUIsT0FBdEIsQ0FBbEI7QUFHQSxXQUFLVixZQUFMLENBQWtCLG9CQUFvQjtBQUNwQ1csWUFBSSxxQkFEZ0M7QUFFcENWLGdCQUFRLEtBRjRCO0FBR3BDWSx1QkFBZSxLQUhxQjtBQUlwQ0QsMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQU5tQyxPQUFwQixDQUFsQjs7QUFTQSxXQUFLWixZQUFMLENBQWtCLHFCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IscUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQix1QkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLG9CQUEyQjtBQUMzQ1csWUFBSSw0QkFEdUM7QUFFM0NWLGdCQUFRLEtBRm1DO0FBRzNDVywyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTDBDLE9BQTNCLENBQWxCOztBQVFBLFdBQUtaLFlBQUwsQ0FBa0Isb0JBQTJCO0FBQzNDVyxZQUFJLDRCQUR1QztBQUUzQ1YsZ0JBQVEsS0FGbUM7QUFHM0NXLDJCQUFtQiw2QkFBTTtBQUN2QixpQkFBTyxFQUFQO0FBQ0Q7QUFMMEMsT0FBM0IsQ0FBbEI7O0FBUUEsV0FBS1osWUFBTCxDQUFrQixzQkFBNkI7QUFDN0NXLFlBQUksMkJBRHlDO0FBRTdDVixnQkFBUTtBQUZxQyxPQUE3QixDQUFsQjs7QUFLQSxXQUFLRCxZQUFMLENBQWtCLG9CQUEyQjtBQUMzQ1csWUFBSSx5QkFEdUM7QUFFM0NWLGdCQUFRO0FBRm1DLE9BQTNCLENBQWxCOztBQUtBLFdBQUtELFlBQUwsQ0FBa0IscUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixvQkFBYTtBQUM3QlUsdUJBQWU7QUFEYyxPQUFiLENBQWxCO0FBR0EsV0FBS1YsWUFBTCxDQUFrQixzQkFBZTtBQUMvQlUsdUJBQWU7QUFEZ0IsT0FBZixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0Isb0JBQWE7QUFDN0JXLFlBQUksY0FEeUI7QUFFN0JWLGdCQUFRLEtBRnFCO0FBRzdCWSx1QkFBZSxLQUhjO0FBSTdCRCwyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTjRCLE9BQWIsQ0FBbEI7O0FBU0EsV0FBS1osWUFBTCxDQUFrQixvQkFBZTtBQUMvQlUsdUJBQWU7QUFEZ0IsT0FBZixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0Isc0JBQWlCO0FBQ2pDVSx1QkFBZTtBQURrQixPQUFqQixDQUFsQjtBQUdBLFdBQUtWLFlBQUwsQ0FBa0IscUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixvQkFBZTtBQUMvQlcsWUFBSSxnQkFEMkI7QUFFL0JWLGdCQUFRLEtBRnVCO0FBRy9CWSx1QkFBZSxLQUhnQjtBQUkvQkQsMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQU44QixPQUFmLENBQWxCOztBQVNBLFdBQUtaLFlBQUwsQ0FBa0IscUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQix1QkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLHFCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IsMEJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixvQkFBdUI7QUFDdkNXLFlBQUksd0JBRG1DO0FBRXZDVixnQkFBUSxLQUYrQjtBQUd2Q1csMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQUxzQyxPQUF2QixDQUFsQjs7QUFRQSxXQUFLWixZQUFMLENBQWtCLHFCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IsdUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixvQkFBMkI7QUFDM0NXLFlBQUksNEJBRHVDO0FBRTNDVixnQkFBUSxLQUZtQztBQUczQ1csMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQUwwQyxPQUEzQixDQUFsQjs7QUFRQSxXQUFLWixZQUFMLENBQWtCLHFCQUFtQjtBQUNuQ1UsdUJBQWU7QUFEb0IsT0FBbkIsQ0FBbEI7QUFHQSxXQUFLVixZQUFMLENBQWtCLG9CQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0Isd0JBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQix5QkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLG9CQUFpQjtBQUNqQ1csWUFBSSxrQkFENkI7QUFFakNWLGdCQUFRLEtBRnlCO0FBR2pDVywyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTGdDLE9BQWpCLENBQWxCOztBQVFBLFdBQUtaLFlBQUwsQ0FBa0IscUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixzQkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLHlCQUFsQjs7QUFFQSxXQUFLQSxZQUFMLENBQWtCLHVCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IscUJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQiwyQkFBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLHFCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IsMkJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixvQkFBZ0I7QUFDaENXLFlBQUksaUJBRDRCO0FBRWhDVixnQkFBUSxLQUZ3QjtBQUdoQ1ksdUJBQWUsS0FIaUI7QUFJaENELDJCQUFtQiw2QkFBTTtBQUN2QixpQkFBTyxFQUFQO0FBQ0Q7QUFOK0IsT0FBaEIsQ0FBbEI7O0FBU0EsV0FBS1osWUFBTCxDQUFrQixpQ0FBdUI7QUFDdkNDLGdCQUFRO0FBRCtCLE9BQXZCLENBQWxCOztBQUlBLFdBQUtELFlBQUwsQ0FBa0Isb0JBQWE7QUFDN0JDLGdCQUFRO0FBRHFCLE9BQWIsQ0FBbEI7O0FBSUEsV0FBS0QsWUFBTCxDQUFrQixvQkFBYztBQUM5QkMsZ0JBQVE7QUFEc0IsT0FBZCxDQUFsQjs7QUFJQSxXQUFLRCxZQUFMLENBQWtCLG9CQUFnQjtBQUNoQ1csWUFBSSxpQkFENEI7QUFFaENWLGdCQUFRLEtBRndCO0FBR2hDVywyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTCtCLE9BQWhCLENBQWxCOztBQVFBLFdBQUtaLFlBQUwsQ0FBa0Isb0JBQXVCO0FBQ3ZDVyxZQUFJLHdCQURtQztBQUV2Q1YsZ0JBQVEsS0FGK0I7QUFHdkNXLDJCQUFtQiw2QkFBTTtBQUN2QixpQkFBTyxFQUFQO0FBQ0Q7QUFMc0MsT0FBdkIsQ0FBbEI7O0FBUUEsV0FBS1osWUFBTCxDQUFrQixvQkFBbUI7QUFDbkNDLGdCQUFRO0FBRDJCLE9BQW5CLENBQWxCOztBQUlBLFdBQUtELFlBQUwsQ0FBa0IsNEJBQXdCO0FBQ3hDQyxnQkFBUTtBQURnQyxPQUF4QixDQUFsQjs7QUFJQSxXQUFLRCxZQUFMLENBQWtCLDhCQUFsQjtBQUNBLFdBQUtBLFlBQUwsQ0FBa0IsNkJBQWxCO0FBQ0EsV0FBS0EsWUFBTCxDQUFrQixnQ0FBbEI7QUFDQSxXQUFLQSxZQUFMLENBQWtCLG9CQUFtQjtBQUNuQ1csWUFBSSw0QkFEK0I7QUFFbkNWLGdCQUFRLEtBRjJCO0FBR25DVywyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTGtDLE9BQW5CLENBQWxCO0FBT0EsV0FBS1osWUFBTCxDQUFrQixvQkFBbUI7QUFDbkNXLFlBQUksNEJBRCtCO0FBRW5DVixnQkFBUSxLQUYyQjtBQUduQ1csMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQUxrQyxPQUFuQixDQUFsQjtBQU9BLFdBQUtaLFlBQUwsQ0FBa0Isb0JBQW1CO0FBQ25DVyxZQUFJLHlCQUQrQjtBQUVuQ1YsZ0JBQVEsS0FGMkI7QUFHbkNXLDJCQUFtQiw2QkFBTTtBQUN2QixpQkFBTyxFQUFQO0FBQ0Q7QUFMa0MsT0FBbkIsQ0FBbEI7QUFPQSxXQUFLWixZQUFMLENBQWtCLG9CQUFtQjtBQUNuQ1csWUFBSSwyQkFEK0I7QUFFbkNWLGdCQUFRLEtBRjJCO0FBR25DVywyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTGtDLE9BQW5CLENBQWxCO0FBT0EsV0FBS1osWUFBTCxDQUFrQixvQkFBbUI7QUFDbkNXLFlBQUksZ0NBRCtCO0FBRW5DVixnQkFBUSxLQUYyQjtBQUduQ1csMkJBQW1CLDZCQUFNO0FBQ3ZCLGlCQUFPLEVBQVA7QUFDRDtBQUxrQyxPQUFuQixDQUFsQjtBQU9BLFdBQUtaLFlBQUwsQ0FBa0Isb0JBQW1CO0FBQ25DVyxZQUFJLDZCQUQrQjtBQUVuQ1YsZ0JBQVEsS0FGMkI7QUFHbkNXLDJCQUFtQiw2QkFBTTtBQUN2QixpQkFBTyxFQUFQO0FBQ0Q7QUFMa0MsT0FBbkIsQ0FBbEI7QUFPQSxXQUFLWixZQUFMLENBQWtCLG9CQUFtQjtBQUNuQ1csWUFBSSw0QkFEK0I7QUFFbkNWLGdCQUFRLEtBRjJCO0FBR25DVywyQkFBbUIsNkJBQU07QUFDdkIsaUJBQU8sRUFBUDtBQUNEO0FBTGtDLE9BQW5CLENBQWxCO0FBT0EsV0FBS1osWUFBTCxDQUFrQixvQkFBdUI7QUFDdkNDLGdCQUFRO0FBRCtCLE9BQXZCLENBQWxCO0FBR0EsV0FBS0QsWUFBTCxDQUFrQixvQkFBd0I7QUFDeENDLGdCQUFRO0FBRGdDLE9BQXhCLENBQWxCO0FBR0QsS0E1WHVHO0FBNlh4R2Esa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxXQUFLaEIsU0FBTCxDQUFlQyxTQUFmOztBQUVBLFdBQUtnQixlQUFMLENBQXFCLDBCQUFnQjtBQUNuQ0MsY0FBTTtBQUQ2QixPQUFoQixDQUFyQjs7QUFJQSxXQUFLRCxlQUFMLENBQXFCLDRCQUFrQjtBQUNyQ0MsY0FBTTtBQUQrQixPQUFsQixDQUFyQjtBQUdELEtBdll1RztBQXdZeEdDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxXQUFLQyxzQkFBTDtBQUNELEtBMVl1RztBQTJZeEdBLDRCQUF3QixTQUFTQSxzQkFBVCxHQUFrQztBQUN4RCxxQkFBS0MsTUFBTCxpQkFBa0I7QUFDaEJsQixnQkFBUSxJQURRO0FBRWhCbUIscUJBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxpQkFBUSxLQUFLbkIsTUFBTCxJQUFlLEtBQUtvQixRQUE1QixDQURrQyxDQUNLO0FBQ3hDO0FBSmUsT0FBbEI7O0FBT0EscUJBQUtGLE1BQUwseUJBQTBCO0FBQ3hCdkIsb0JBQVksS0FBS0E7QUFETyxPQUExQjtBQUdELEtBdFp1RztBQXVaeEc7OztBQUdBMEIseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xEO0FBQ0EsV0FBS0Msb0JBQUw7QUFDRCxLQTdadUc7QUE4WnhHQSwwQkFBc0IsU0FBU0Esb0JBQVQsR0FBZ0M7QUFBQTs7QUFDcEQsV0FBS0MsdUJBQUwsQ0FBNkI7QUFDM0JDLGFBQUssQ0FEc0I7QUFFM0JDLHFCQUFhaEMsU0FBU2lDLHlCQUZLO0FBRzNCQyxlQUFPLENBQUM7QUFDTlosZ0JBQU0sYUFEQTtBQUVOVSx1QkFBYWhDLFNBQVNtQyxtQkFGaEI7QUFHTkMsY0FBSTtBQUFBLG1CQUFNQyxJQUFJQyxrQkFBSixFQUFOO0FBQUE7QUFIRSxTQUFELEVBSUo7QUFDRGhCLGdCQUFNLGNBREw7QUFFRFUsdUJBQWFoQyxTQUFTdUMsZUFGckI7QUFHREgsY0FBSTtBQUFBLG1CQUFNQyxJQUFJRyxrQkFBSixFQUFOO0FBQUE7QUFISCxTQUpJLEVBUUo7QUFDRGxCLGdCQUFNLGdCQURMO0FBRURVLHVCQUFhaEMsU0FBU3lDLGlCQUZyQjtBQUdETCxjQUFJO0FBQUEsbUJBQU1DLElBQUlLLG9CQUFKLEVBQU47QUFBQTtBQUhILFNBUkksRUFZSjtBQUNEcEIsZ0JBQU0sY0FETDtBQUVEVSx1QkFBYWhDLFNBQVMyQyxnQkFGckI7QUFHRFAsY0FBSSxjQUFNO0FBQ1IsZ0JBQU1RLFFBQVEsTUFBS25DLFdBQUwsQ0FBaUJvQyxZQUFqQixDQUE4QkMsUUFBOUIsQ0FBdUMsZ0JBQVlDLFdBQW5ELEVBQWdFLGdCQUFZQyxLQUE1RSxDQUFkO0FBQ0EsbUJBQU9KLE1BQU1LLFVBQU4sQ0FBaUIsSUFBakIsRUFBdUIsRUFBRUMsY0FBYyxTQUFoQixFQUF2QixFQUFvREMsSUFBcEQsQ0FBeUQsVUFBQ0MsT0FBRCxFQUFhO0FBQzNFLG9CQUFLM0MsV0FBTCxDQUFpQjRDLE9BQWpCLENBQXlCQyxZQUF6QixHQUF3Q0YsT0FBeEM7QUFDQSxrQkFBSUEsT0FBSixFQUFhO0FBQ1hBLHdCQUFRRyxPQUFSLENBQWdCLFVBQUNDLFdBQUQsRUFBaUI7QUFDL0JuQixzQkFBSW9CLDBCQUFKLENBQStCRCxZQUFZRSxXQUEzQztBQUNELGlCQUZEO0FBR0Q7QUFDRCxxQkFBT04sT0FBUDtBQUNELGFBUk0sQ0FBUDtBQVNEO0FBZEEsU0FaSTtBQUhvQixPQUE3QjtBQWdDRDtBQS9idUcsR0FBMUYsQ0FBaEI7O29CQWtjZW5ELE8iLCJmaWxlIjoiQXBwbGljYXRpb25Nb2R1bGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgQXBwbGljYXRpb25Nb2R1bGUgZnJvbSAnYXJnb3MvQXBwbGljYXRpb25Nb2R1bGUnO1xyXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSAnYXJnb3MvQ2FsZW5kYXInO1xyXG5pbXBvcnQgJ2FyZ29zL1JlbGF0ZWRWaWV3TWFuYWdlcic7XHJcbmltcG9ydCAnYXJnb3MvUmVsYXRlZFZpZXdXaWRnZXQnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IFNpZ25hdHVyZSBmcm9tICdhcmdvcy9WaWV3cy9TaWduYXR1cmUnO1xyXG5pbXBvcnQgU2VhcmNoV2lkZ2V0IGZyb20gJ2FyZ29zL1NlYXJjaFdpZGdldCc7XHJcbmltcG9ydCBGaWxlU2VsZWN0IGZyb20gJ2FyZ29zL1ZpZXdzL0ZpbGVTZWxlY3QnO1xyXG5pbXBvcnQgQWRkQWNjb3VudENvbnRhY3QgZnJvbSAnLi9WaWV3cy9BZGRBY2NvdW50Q29udGFjdCc7XHJcbmltcG9ydCBBcmVhQ2F0ZWdvcnlJc3N1ZUxvb2t1cCBmcm9tICcuL1ZpZXdzL0FyZWFDYXRlZ29yeUlzc3VlTG9va3VwJztcclxuaW1wb3J0IEV4Y2hhbmdlUmF0ZUxvb2t1cCBmcm9tICcuL1ZpZXdzL0V4Y2hhbmdlUmF0ZUxvb2t1cCc7XHJcbmltcG9ydCBNYWluVG9vbGJhciBmcm9tICcuL1ZpZXdzL01haW5Ub29sYmFyJztcclxuaW1wb3J0IFVwZGF0ZVRvb2xiYXIgZnJvbSAnLi9WaWV3cy9VcGRhdGVUb29sYmFyJztcclxuaW1wb3J0IExlZnREcmF3ZXIgZnJvbSAnLi9WaWV3cy9MZWZ0RHJhd2VyJztcclxuaW1wb3J0IFJpZ2h0RHJhd2VyIGZyb20gJy4vVmlld3MvUmlnaHREcmF3ZXInO1xyXG5pbXBvcnQgT2ZmbGluZURldGFpbCBmcm9tICcuL1ZpZXdzL09mZmxpbmUvRGV0YWlsJztcclxuaW1wb3J0IE9mZmxpbmVMaXN0IGZyb20gJy4vVmlld3MvT2ZmbGluZS9MaXN0JztcclxuaW1wb3J0IExvZ2luIGZyb20gJy4vVmlld3MvTG9naW4nO1xyXG5pbXBvcnQgTG9nT2ZmIGZyb20gJy4vVmlld3MvTG9nT2ZmJztcclxuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vVmlld3MvU2V0dGluZ3MnO1xyXG5pbXBvcnQgQ29uZmlndXJlIGZyb20gJy4vVmlld3MvQ29uZmlndXJlJztcclxuaW1wb3J0IEhlbHAgZnJvbSAnLi9WaWV3cy9IZWxwJztcclxuaW1wb3J0IE5hbWVFZGl0IGZyb20gJy4vVmlld3MvTmFtZUVkaXQnO1xyXG5pbXBvcnQgUGlja0xpc3QgZnJvbSAnLi9WaWV3cy9QaWNrTGlzdCc7XHJcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vVmlld3MvU2VsZWN0TGlzdCc7XHJcbmltcG9ydCBTcGVlZFNlYXJjaExpc3QgZnJvbSAnLi9WaWV3cy9TcGVlZFNlYXJjaExpc3QnO1xyXG5pbXBvcnQgVGV4dEVkaXQgZnJvbSAnLi9WaWV3cy9UZXh0RWRpdCc7XHJcbmltcG9ydCBBY2NvdW50TGlzdCBmcm9tICcuL1ZpZXdzL0FjY291bnQvTGlzdCc7XHJcbmltcG9ydCBBY2NvdW50RGV0YWlsIGZyb20gJy4vVmlld3MvQWNjb3VudC9EZXRhaWwnO1xyXG5pbXBvcnQgQWNjb3VudEVkaXQgZnJvbSAnLi9WaWV3cy9BY2NvdW50L0VkaXQnO1xyXG5pbXBvcnQgQWRkcmVzc0xpc3QgZnJvbSAnLi9WaWV3cy9BZGRyZXNzL0xpc3QnO1xyXG5pbXBvcnQgQWRkcmVzc0VkaXQgZnJvbSAnLi9WaWV3cy9BZGRyZXNzL0VkaXQnO1xyXG5pbXBvcnQgQWN0aXZpdHlMaXN0IGZyb20gJy4vVmlld3MvQWN0aXZpdHkvTGlzdCc7XHJcbmltcG9ydCBNeURheUxpc3QgZnJvbSAnLi9WaWV3cy9BY3Rpdml0eS9NeURheSc7XHJcbmltcG9ydCBNeUFjdGl2aXR5TGlzdCBmcm9tICcuL1ZpZXdzL0FjdGl2aXR5L015TGlzdCc7XHJcbmltcG9ydCBBY3Rpdml0eURldGFpbCBmcm9tICcuL1ZpZXdzL0FjdGl2aXR5L0RldGFpbCc7XHJcbmltcG9ydCBBY3Rpdml0eUVkaXQgZnJvbSAnLi9WaWV3cy9BY3Rpdml0eS9FZGl0JztcclxuaW1wb3J0IEFjdGl2aXR5Q29tcGxldGUgZnJvbSAnLi9WaWV3cy9BY3Rpdml0eS9Db21wbGV0ZSc7XHJcbmltcG9ydCBBY3Rpdml0eVR5cGVzTGlzdCBmcm9tICcuL1ZpZXdzL0FjdGl2aXR5L1R5cGVzTGlzdCc7XHJcbmltcG9ydCBBY3Rpdml0eVJlY3VycmluZyBmcm9tICcuL1ZpZXdzL0FjdGl2aXR5L1JlY3VycmluZyc7XHJcbmltcG9ydCBDYWxlbmRhclZpZXcgZnJvbSAnLi9WaWV3cy9DYWxlbmRhci9DYWxlbmRhclZpZXcnO1xyXG5pbXBvcnQgRGF5VmlldyBmcm9tICcuL1ZpZXdzL0NhbGVuZGFyL0RheVZpZXcnO1xyXG5pbXBvcnQgTW9udGhWaWV3IGZyb20gJy4vVmlld3MvQ2FsZW5kYXIvTW9udGhWaWV3JztcclxuaW1wb3J0IFdlZWtWaWV3IGZyb20gJy4vVmlld3MvQ2FsZW5kYXIvV2Vla1ZpZXcnO1xyXG5pbXBvcnQgR2VuZXJpY0JhciBmcm9tICcuL1ZpZXdzL0NoYXJ0cy9HZW5lcmljQmFyJztcclxuaW1wb3J0IEdlbmVyaWNMaW5lIGZyb20gJy4vVmlld3MvQ2hhcnRzL0dlbmVyaWNMaW5lJztcclxuaW1wb3J0IEdlbmVyaWNQaWUgZnJvbSAnLi9WaWV3cy9DaGFydHMvR2VuZXJpY1BpZSc7XHJcbmltcG9ydCBDb21wZXRpdG9yTGlzdCBmcm9tICcuL1ZpZXdzL0NvbXBldGl0b3IvTGlzdCc7XHJcbmltcG9ydCBDb250YWN0TGlzdCBmcm9tICcuL1ZpZXdzL0NvbnRhY3QvTGlzdCc7XHJcbmltcG9ydCBDb250YWN0RGV0YWlsIGZyb20gJy4vVmlld3MvQ29udGFjdC9EZXRhaWwnO1xyXG5pbXBvcnQgQ29udGFjdEVkaXQgZnJvbSAnLi9WaWV3cy9Db250YWN0L0VkaXQnO1xyXG5pbXBvcnQgQ29udHJhY3RMaXN0IGZyb20gJy4vVmlld3MvQ29udHJhY3QvTGlzdCc7XHJcbmltcG9ydCBFcnJvckxvZ0xpc3QgZnJvbSAnLi9WaWV3cy9FcnJvckxvZy9MaXN0JztcclxuaW1wb3J0IEVycm9yTG9nRGV0YWlsIGZyb20gJy4vVmlld3MvRXJyb3JMb2cvRGV0YWlsJztcclxuaW1wb3J0IEV2ZW50TGlzdCBmcm9tICcuL1ZpZXdzL0V2ZW50L0xpc3QnO1xyXG5pbXBvcnQgRXZlbnREZXRhaWwgZnJvbSAnLi9WaWV3cy9FdmVudC9EZXRhaWwnO1xyXG5pbXBvcnQgRXZlbnRFZGl0IGZyb20gJy4vVmlld3MvRXZlbnQvRWRpdCc7XHJcbmltcG9ydCBHcm91cHNTZWxlY3RvciBmcm9tICcuL1ZpZXdzL0dyb3Vwcy9TZWxlY3Rvcic7XHJcbmltcG9ydCBMZWFkTGlzdCBmcm9tICcuL1ZpZXdzL0xlYWQvTGlzdCc7XHJcbmltcG9ydCBMZWFkRGV0YWlsIGZyb20gJy4vVmlld3MvTGVhZC9EZXRhaWwnO1xyXG5pbXBvcnQgTGVhZEVkaXQgZnJvbSAnLi9WaWV3cy9MZWFkL0VkaXQnO1xyXG5pbXBvcnQgTGVhZFNvdXJjZUxpc3QgZnJvbSAnLi9WaWV3cy9MZWFkU291cmNlL0xpc3QnO1xyXG5pbXBvcnQgT3Bwb3J0dW5pdHlMaXN0IGZyb20gJy4vVmlld3MvT3Bwb3J0dW5pdHkvTGlzdCc7XHJcbmltcG9ydCBPcHBvcnR1bml0eURldGFpbCBmcm9tICcuL1ZpZXdzL09wcG9ydHVuaXR5L0RldGFpbCc7XHJcbmltcG9ydCBPcHBvcnR1bml0eUVkaXQgZnJvbSAnLi9WaWV3cy9PcHBvcnR1bml0eS9FZGl0JztcclxuaW1wb3J0IE9wcG9ydHVuaXR5UXVpY2tFZGl0IGZyb20gJy4vVmlld3MvT3Bwb3J0dW5pdHkvUXVpY2tFZGl0JztcclxuaW1wb3J0IE9wcG9ydHVuaXR5Q29udGFjdExpc3QgZnJvbSAnLi9WaWV3cy9PcHBvcnR1bml0eUNvbnRhY3QvTGlzdCc7XHJcbmltcG9ydCBPcHBvcnR1bml0eUNvbnRhY3REZXRhaWwgZnJvbSAnLi9WaWV3cy9PcHBvcnR1bml0eUNvbnRhY3QvRGV0YWlsJztcclxuaW1wb3J0IE9wcG9ydHVuaXR5Q29udGFjdEVkaXQgZnJvbSAnLi9WaWV3cy9PcHBvcnR1bml0eUNvbnRhY3QvRWRpdCc7XHJcbmltcG9ydCBPcHBvcnR1bml0eVByb2R1Y3RMaXN0IGZyb20gJy4vVmlld3MvT3Bwb3J0dW5pdHlQcm9kdWN0L0xpc3QnO1xyXG5pbXBvcnQgT3Bwb3J0dW5pdHlQcm9kdWN0RGV0YWlsIGZyb20gJy4vVmlld3MvT3Bwb3J0dW5pdHlQcm9kdWN0L0RldGFpbCc7XHJcbmltcG9ydCBPcHBvcnR1bml0eVByb2R1Y3RFZGl0IGZyb20gJy4vVmlld3MvT3Bwb3J0dW5pdHlQcm9kdWN0L0VkaXQnO1xyXG5pbXBvcnQgT3duZXJMaXN0IGZyb20gJy4vVmlld3MvT3duZXIvTGlzdCc7XHJcbmltcG9ydCBQcm9kdWN0TGlzdCBmcm9tICcuL1ZpZXdzL1Byb2R1Y3QvTGlzdCc7XHJcbmltcG9ydCBQcm9kdWN0UHJvZ3JhbUxpc3QgZnJvbSAnLi9WaWV3cy9Qcm9kdWN0UHJvZ3JhbS9MaXN0JztcclxuaW1wb3J0IFRpY2tldExpc3QgZnJvbSAnLi9WaWV3cy9UaWNrZXQvTGlzdCc7XHJcbmltcG9ydCBUaWNrZXREZXRhaWwgZnJvbSAnLi9WaWV3cy9UaWNrZXQvRGV0YWlsJztcclxuaW1wb3J0IFRpY2tldEVkaXQgZnJvbSAnLi9WaWV3cy9UaWNrZXQvRWRpdCc7XHJcbmltcG9ydCBUaWNrZXRVcmdlbmN5TG9va3VwIGZyb20gJy4vVmlld3MvVGlja2V0L1VyZ2VuY3lMb29rdXAnO1xyXG5pbXBvcnQgVGlja2V0QWN0aXZpdHlMaXN0IGZyb20gJy4vVmlld3MvVGlja2V0QWN0aXZpdHkvTGlzdCc7XHJcbmltcG9ydCBUaWNrZXRBY3Rpdml0eURldGFpbCBmcm9tICcuL1ZpZXdzL1RpY2tldEFjdGl2aXR5L0RldGFpbCc7XHJcbmltcG9ydCBUaWNrZXRBY3Rpdml0eUVkaXQgZnJvbSAnLi9WaWV3cy9UaWNrZXRBY3Rpdml0eS9FZGl0JztcclxuaW1wb3J0IFRpY2tldEFjdGl2aXR5UmF0ZUxvb2t1cCBmcm9tICcuL1ZpZXdzL1RpY2tldEFjdGl2aXR5L1JhdGVMb29rdXAnO1xyXG5pbXBvcnQgVGlja2V0QWN0aXZpdHlJdGVtTGlzdCBmcm9tICcuL1ZpZXdzL1RpY2tldEFjdGl2aXR5SXRlbS9MaXN0JztcclxuaW1wb3J0IFRpY2tldEFjdGl2aXR5SXRlbURldGFpbCBmcm9tICcuL1ZpZXdzL1RpY2tldEFjdGl2aXR5SXRlbS9EZXRhaWwnO1xyXG5pbXBvcnQgSGlzdG9yeUxpc3QgZnJvbSAnLi9WaWV3cy9IaXN0b3J5L0xpc3QnO1xyXG5pbXBvcnQgSGlzdG9yeUxpc3RPZmZsaW5lIGZyb20gJy4vVmlld3MvSGlzdG9yeS9MaXN0T2ZmbGluZSc7XHJcbmltcG9ydCBIaXN0b3J5RGV0YWlsIGZyb20gJy4vVmlld3MvSGlzdG9yeS9EZXRhaWwnO1xyXG5pbXBvcnQgSGlzdG9yeUVkaXQgZnJvbSAnLi9WaWV3cy9IaXN0b3J5L0VkaXQnO1xyXG5pbXBvcnQgSGlzdG9yeUVkaXRPZmZsaW5lIGZyb20gJy4vVmlld3MvSGlzdG9yeS9FZGl0T2ZmbGluZSc7XHJcbmltcG9ydCAnLi9WaWV3cy9IaXN0b3J5L1JlbGF0ZWRWaWV3JztcclxuaW1wb3J0IENhbGVuZGFyQWNjZXNzTGlzdCBmcm9tICcuL1ZpZXdzL1VzZXIvQ2FsZW5kYXJBY2Nlc3NMaXN0JztcclxuaW1wb3J0IFVzZXJMaXN0IGZyb20gJy4vVmlld3MvVXNlci9MaXN0JztcclxuaW1wb3J0IFZpZXdBdHRhY2htZW50IGZyb20gJy4vVmlld3MvQXR0YWNobWVudC9WaWV3QXR0YWNobWVudCc7XHJcbmltcG9ydCBBdHRhY2htZW50TGlzdCBmcm9tICcuL1ZpZXdzL0F0dGFjaG1lbnQvTGlzdCc7XHJcbmltcG9ydCBBZGRBdHRhY2htZW50IGZyb20gJy4vVmlld3MvQXR0YWNobWVudC9BZGRBdHRhY2htZW50JztcclxuaW1wb3J0IE15QXR0YWNobWVudExpc3QgZnJvbSAnLi9WaWV3cy9BdHRhY2htZW50L015QXR0YWNobWVudExpc3QnO1xyXG5pbXBvcnQgUmVjZW50bHlWaWV3ZWRMaXN0IGZyb20gJy4vVmlld3MvUmVjZW50bHlWaWV3ZWQvTGlzdCc7XHJcbmltcG9ydCBCcmllZmNhc2VMaXN0IGZyb20gJy4vVmlld3MvQnJpZWZjYXNlL0xpc3QnO1xyXG5pbXBvcnQgT2ZmbGluZU9wdGlvbnNFZGl0IGZyb20gJy4vVmlld3MvT2ZmbGluZU9wdGlvbnMvRWRpdCc7XHJcbmltcG9ydCBMYW5ndWFnZU9wdGlvbnNFZGl0IGZyb20gJy4vVmlld3MvTGFuZ3VhZ2VPcHRpb25zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5pbXBvcnQgJy4vVmlld3MvT2ZmbGluZU9wdGlvbnMvVXNhZ2VXaWRnZXQnO1xyXG5pbXBvcnQgJy4vVmlld3MvTGFuZ3VhZ2VPcHRpb25zL1VzYWdlV2lkZ2V0JztcclxuaW1wb3J0ICcuL0ZpZWxkcy9BZGRyZXNzRmllbGQnO1xyXG5pbXBvcnQgJy4vRmllbGRzL011bHRpQ3VycmVuY3lGaWVsZCc7XHJcbmltcG9ydCAnLi9GaWVsZHMvTmFtZUZpZWxkJztcclxuaW1wb3J0ICcuL0ZpZWxkcy9QaWNrbGlzdEZpZWxkJztcclxuaW1wb3J0ICcuL0ZpZWxkcy9SZWN1cnJlbmNlc0ZpZWxkJztcclxuaW1wb3J0ICcuL1ZpZXdzL1JlbGF0ZWRDb250ZXh0V2lkZ2V0JztcclxuaW1wb3J0ICcuL1ZpZXdzL1JlbGF0ZWRFZGl0V2lkZ2V0JztcclxuaW1wb3J0ICcuL0FjdGlvbic7XHJcbmltcG9ydCAnLi9Gb3JtYXQnO1xyXG5pbXBvcnQgJy4vVGVtcGxhdGUnO1xyXG5pbXBvcnQgJy4vVmFsaWRhdG9yJztcclxuaW1wb3J0ICcuL0Vudmlyb25tZW50JztcclxuaW1wb3J0ICcuL1V0aWxpdHknO1xyXG5pbXBvcnQgJy4vTW9kZWxzL0FjY291bnQvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvQWNjb3VudC9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvQWN0aXZpdHkvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvQWN0aXZpdHkvU0RhdGEnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL0NvbnRhY3QvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvQ29udGFjdC9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvSW50ZWdyYXRpb24vU0RhdGEnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL0xlYWQvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvTGVhZC9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvTGVhZEFkZHJlc3MvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvTGVhZEFkZHJlc3MvU0RhdGEnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL09wcG9ydHVuaXR5L09mZmxpbmUnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL09wcG9ydHVuaXR5L1NEYXRhJztcclxuaW1wb3J0ICcuL01vZGVscy9PcHBvcnR1bml0eUNvbnRhY3QvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvT3Bwb3J0dW5pdHlDb250YWN0L1NEYXRhJztcclxuaW1wb3J0ICcuL01vZGVscy9Vc2VyQWN0aXZpdHkvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvVXNlckFjdGl2aXR5L1NEYXRhJztcclxuaW1wb3J0ICcuL01vZGVscy9BZGRyZXNzL09mZmxpbmUnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL0FkZHJlc3MvU0RhdGEnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL0hpc3RvcnkvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvSGlzdG9yeS9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvVGlja2V0L09mZmxpbmUnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL1RpY2tldC9TRGF0YSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvVGlja2V0QWN0aXZpdHkvT2ZmbGluZSc7XHJcbmltcG9ydCAnLi9Nb2RlbHMvVGlja2V0QWN0aXZpdHkvU0RhdGEnO1xyXG5pbXBvcnQgJy4vTW9kZWxzL0F1dGhlbnRpY2F0aW9uL09mZmxpbmUnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYXBwbGljYXRpb25Nb2R1bGUnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLkFwcGxpY2F0aW9uTW9kdWxlXHJcbiAqIEBleHRlbmRzIGFyZ29zLkFwcGxpY2F0aW9uTW9kdWxlXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkFwcGxpY2F0aW9uTW9kdWxlJywgW0FwcGxpY2F0aW9uTW9kdWxlXSwgLyoqIEBsZW5kcyBjcm0uQXBwbGljYXRpb25Nb2R1bGUjICove1xyXG4gIHNlYXJjaFRleHQ6IHJlc291cmNlLnNlYXJjaFRleHQsXHJcbiAgbG9hZFZpZXdzOiBmdW5jdGlvbiBsb2FkVmlld3MoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDYWxlbmRhcih7XHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFNpZ25hdHVyZSh7XHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IExvZ2luKCkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBMb2dPZmYoKSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IExlZnREcmF3ZXIoKSwgJCgnLmFwcGxpY2F0aW9uLW1lbnUnLCB0aGlzLmFwcGxpY2F0aW9uLmdldENvbnRhaW5lck5vZGUoKSkuZmlyc3QoKS5nZXQoMCksICdsYXN0Jyk7XHJcblxyXG4gICAgY29uc3QgbW9kYWxCb2R5ID0gJCgnLm1vZGFsLWJvZHknLCB0aGlzLmFwcGxpY2F0aW9uLnZpZXdTZXR0aW5nc01vZGFsLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFJpZ2h0RHJhd2VyKCksIG1vZGFsQm9keS5maXJzdCgpLmdldCgwKSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE9mZmxpbmVEZXRhaWwoe1xyXG4gICAgICBjYW5SZWRpcmVjdFRvOiB0cnVlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE9mZmxpbmVMaXN0KHtcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBSZWNlbnRseVZpZXdlZExpc3Qoe1xyXG4gICAgICBleHBvc2U6IHRydWUsXHJcbiAgICAgIGNhblJlZGlyZWN0VG86IHRydWUsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgUmVjZW50bHlWaWV3ZWRMaXN0KHtcclxuICAgICAgaWQ6ICdyZWNlbnRseV92aWV3ZWRfbGlzdF9vZmZsaW5lJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBCcmllZmNhc2VMaXN0KHtcclxuICAgICAgZXhwb3NlOiB0cnVlLFxyXG4gICAgICBjYW5SZWRpcmVjdFRvOiB0cnVlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEhlbHAoe1xyXG4gICAgICBjYW5SZWRpcmVjdFRvOiB0cnVlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFNldHRpbmdzKHtcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDb25maWd1cmUoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgUGlja0xpc3QoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgU2VsZWN0TGlzdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBTcGVlZFNlYXJjaExpc3QoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWRkQWNjb3VudENvbnRhY3QoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQXJlYUNhdGVnb3J5SXNzdWVMb29rdXAoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgRXhjaGFuZ2VSYXRlTG9va3VwKCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEZpbGVTZWxlY3QoKSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE5hbWVFZGl0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFRleHRFZGl0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEFkZHJlc3NMaXN0KHtcclxuICAgICAgaWQ6ICdhZGRyZXNzX3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEFkZHJlc3NFZGl0KCkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBBY2NvdW50TGlzdCh7XHJcbiAgICAgIGNhblJlZGlyZWN0VG86IHRydWUsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWNjb3VudERldGFpbCh7XHJcbiAgICAgIGNhblJlZGlyZWN0VG86IHRydWUsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWNjb3VudEVkaXQoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWNjb3VudExpc3Qoe1xyXG4gICAgICBpZDogJ2FjY291bnRfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogZnVuY3Rpb24gZGVmYXVsdFNlYXJjaFRlcm0oKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDYWxlbmRhclZpZXcoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgRGF5VmlldygpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBNb250aFZpZXcoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgV2Vla1ZpZXcoKSk7XHJcblxyXG4gICAgLy8gQ2hhcnRzXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgR2VuZXJpY0Jhcih7XHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgR2VuZXJpY0xpbmUoe1xyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEdlbmVyaWNQaWUoe1xyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDb21wZXRpdG9yTGlzdCh7XHJcbiAgICAgIGlkOiAnY29tcGV0aXRvcl9yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IENvbnRhY3RMaXN0KHtcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDb250YWN0RGV0YWlsKHtcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDb250YWN0RWRpdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDb250YWN0TGlzdCh7XHJcbiAgICAgIGlkOiAnY29udGFjdF9yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBDb250cmFjdExpc3Qoe1xyXG4gICAgICBpZDogJ2NvbnRyYWN0X3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgRXJyb3JMb2dMaXN0KHtcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBFcnJvckxvZ0RldGFpbCh7XHJcbiAgICAgIGNhblJlZGlyZWN0VG86IHRydWUsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEV2ZW50RWRpdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBFdmVudExpc3Qoe1xyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEV2ZW50RGV0YWlsKCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEV2ZW50TGlzdCh7XHJcbiAgICAgIGlkOiAnZXZlbnRfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBHcm91cHNTZWxlY3RvcigpKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgT3Bwb3J0dW5pdHlFZGl0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE9wcG9ydHVuaXR5UXVpY2tFZGl0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE9wcG9ydHVuaXR5TGlzdCh7XHJcbiAgICAgIGNhblJlZGlyZWN0VG86IHRydWUsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgT3Bwb3J0dW5pdHlEZXRhaWwoe1xyXG4gICAgICBjYW5SZWRpcmVjdFRvOiB0cnVlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE9wcG9ydHVuaXR5TGlzdCh7XHJcbiAgICAgIGlkOiAnb3Bwb3J0dW5pdHlfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgT3Bwb3J0dW5pdHlDb250YWN0RWRpdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBPcHBvcnR1bml0eUNvbnRhY3RMaXN0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE9wcG9ydHVuaXR5Q29udGFjdERldGFpbCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBPcHBvcnR1bml0eUNvbnRhY3RMaXN0KHtcclxuICAgICAgaWQ6ICdvcHBvcnR1bml0eWNvbnRhY3RfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBPcHBvcnR1bml0eVByb2R1Y3RMaXN0KHtcclxuICAgICAgaWQ6ICdvcHBvcnR1bml0eXByb2R1Y3RfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBPcHBvcnR1bml0eVByb2R1Y3REZXRhaWwoe1xyXG4gICAgICBpZDogJ29wcG9ydHVuaXR5cHJvZHVjdF9kZXRhaWwnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBPcHBvcnR1bml0eVByb2R1Y3RFZGl0KHtcclxuICAgICAgaWQ6ICdvcHBvcnR1bml0eXByb2R1Y3RfZWRpdCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IExlYWRFZGl0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IExlYWRMaXN0KHtcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBMZWFkRGV0YWlsKHtcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBMZWFkTGlzdCh7XHJcbiAgICAgIGlkOiAnbGVhZF9yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBUaWNrZXRMaXN0KHtcclxuICAgICAgY2FuUmVkaXJlY3RUbzogdHJ1ZSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBUaWNrZXREZXRhaWwoe1xyXG4gICAgICBjYW5SZWRpcmVjdFRvOiB0cnVlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFRpY2tldEVkaXQoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgVGlja2V0TGlzdCh7XHJcbiAgICAgIGlkOiAndGlja2V0X3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFRpY2tldEFjdGl2aXR5TGlzdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBUaWNrZXRBY3Rpdml0eURldGFpbCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBUaWNrZXRBY3Rpdml0eUVkaXQoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgVGlja2V0QWN0aXZpdHlSYXRlTG9va3VwKCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFRpY2tldEFjdGl2aXR5TGlzdCh7XHJcbiAgICAgIGlkOiAndGlja2V0YWN0aXZpdHlfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBUaWNrZXRBY3Rpdml0eUl0ZW1MaXN0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFRpY2tldEFjdGl2aXR5SXRlbURldGFpbCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBUaWNrZXRBY3Rpdml0eUl0ZW1MaXN0KHtcclxuICAgICAgaWQ6ICd0aWNrZXRhY3Rpdml0eWl0ZW1fcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBBY3Rpdml0eURldGFpbCh7XHJcbiAgICAgIGNhblJlZGlyZWN0VG86IHRydWUsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWN0aXZpdHlFZGl0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEFjdGl2aXR5Q29tcGxldGUoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWN0aXZpdHlUeXBlc0xpc3QoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWN0aXZpdHlMaXN0KHtcclxuICAgICAgaWQ6ICdhY3Rpdml0eV9yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IE15RGF5TGlzdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBNeUFjdGl2aXR5TGlzdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBBY3Rpdml0eVJlY3VycmluZygpKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgSGlzdG9yeURldGFpbCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBIaXN0b3J5TGlzdCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBIaXN0b3J5TGlzdE9mZmxpbmUoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgSGlzdG9yeUVkaXQoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgSGlzdG9yeUVkaXRPZmZsaW5lKCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEhpc3RvcnlMaXN0KHtcclxuICAgICAgaWQ6ICdoaXN0b3J5X3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IENhbGVuZGFyQWNjZXNzTGlzdCh7XHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IFVzZXJMaXN0KHtcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgT3duZXJMaXN0KHtcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgUHJvZHVjdExpc3Qoe1xyXG4gICAgICBpZDogJ3Byb2R1Y3RfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBQcm9kdWN0UHJvZ3JhbUxpc3Qoe1xyXG4gICAgICBpZDogJ3Byb2R1Y3Rwcm9ncmFtX3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgTGVhZFNvdXJjZUxpc3Qoe1xyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBUaWNrZXRVcmdlbmN5TG9va3VwKHtcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgVmlld0F0dGFjaG1lbnQoKSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQWRkQXR0YWNobWVudCgpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBNeUF0dGFjaG1lbnRMaXN0KCkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEF0dGFjaG1lbnRMaXN0KHtcclxuICAgICAgaWQ6ICdhY2NvdW50X2F0dGFjaG1lbnRfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEF0dGFjaG1lbnRMaXN0KHtcclxuICAgICAgaWQ6ICdjb250YWN0X2F0dGFjaG1lbnRfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEF0dGFjaG1lbnRMaXN0KHtcclxuICAgICAgaWQ6ICdsZWFkX2F0dGFjaG1lbnRfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEF0dGFjaG1lbnRMaXN0KHtcclxuICAgICAgaWQ6ICd0aWNrZXRfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgZGVmYXVsdFNlYXJjaFRlcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0sXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgQXR0YWNobWVudExpc3Qoe1xyXG4gICAgICBpZDogJ29wcG9ydHVuaXR5X2F0dGFjaG1lbnRfcmVsYXRlZCcsXHJcbiAgICAgIGV4cG9zZTogZmFsc2UsXHJcbiAgICAgIGRlZmF1bHRTZWFyY2hUZXJtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9LFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEF0dGFjaG1lbnRMaXN0KHtcclxuICAgICAgaWQ6ICdhY3Rpdml0eV9hdHRhY2htZW50X3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBBdHRhY2htZW50TGlzdCh7XHJcbiAgICAgIGlkOiAnaGlzdG9yeV9hdHRhY2htZW50X3JlbGF0ZWQnLFxyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgICBkZWZhdWx0U2VhcmNoVGVybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVnaXN0ZXJWaWV3KG5ldyBPZmZsaW5lT3B0aW9uc0VkaXQoe1xyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IExhbmd1YWdlT3B0aW9uc0VkaXQoe1xyXG4gICAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgbG9hZFRvb2xiYXJzOiBmdW5jdGlvbiBsb2FkVG9vbGJhcnMoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXJUb29sYmFyKG5ldyBNYWluVG9vbGJhcih7XHJcbiAgICAgIG5hbWU6ICd0YmFyJyxcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyVG9vbGJhcihuZXcgVXBkYXRlVG9vbGJhcih7XHJcbiAgICAgIG5hbWU6ICd1cGRhdGViYXInLFxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICB0aGlzLmxvYWRCYXNlQ3VzdG9taXphdGlvbnMoKTtcclxuICB9LFxyXG4gIGxvYWRCYXNlQ3VzdG9taXphdGlvbnM6IGZ1bmN0aW9uIGxvYWRCYXNlQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBsYW5nLmV4dGVuZChMaXN0LCB7XHJcbiAgICAgIGV4cG9zZTogdHJ1ZSxcclxuICAgICAgZ2V0U2VjdXJpdHk6IGZ1bmN0aW9uIGdldFNlY3VyaXR5KCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5leHBvc2UgJiYgdGhpcy5zZWN1cml0eSk7IC8vIG9ubHkgY2hlY2sgc2VjdXJpdHkgb24gZXhwb3NlZCB2aWV3c1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgbGFuZy5leHRlbmQoU2VhcmNoV2lkZ2V0LCB7XHJcbiAgICAgIHNlYXJjaFRleHQ6IHRoaXMuc2VhcmNoVGV4dCxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgdHlwbywgdXNlIGxvYWRBcHBTdGF0ZVByb21pc2VzIGluc3RlYWQuXHJcbiAgICovXHJcbiAgbG9hZEFwcFN0YXRQcm9taXNlczogZnVuY3Rpb24gbG9hZEFwcFN0YXRQcm9taXNlcygpIHtcclxuICAgIC8vIFJlZGlyZWN0IHRvIHRoZSB0eXBvIGZpeC5cclxuICAgIHRoaXMubG9hZEFwcFN0YXRlUHJvbWlzZXMoKTtcclxuICB9LFxyXG4gIGxvYWRBcHBTdGF0ZVByb21pc2VzOiBmdW5jdGlvbiBsb2FkQXBwU3RhdGVQcm9taXNlcygpIHtcclxuICAgIHRoaXMucmVnaXN0ZXJBcHBTdGF0ZVByb21pc2Uoe1xyXG4gICAgICBzZXE6IDEsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiByZXNvdXJjZS51c2VyQ29udGV4dEFuZE9wdGlvbnNUZXh0LFxyXG4gICAgICBpdGVtczogW3tcclxuICAgICAgICBuYW1lOiAndXNlcl9kZXRhaWwnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiByZXNvdXJjZS51c2VySW5mb3JtYXRpb25UZXh0LFxyXG4gICAgICAgIGZuOiAoKSA9PiBBcHAucmVxdWVzdFVzZXJEZXRhaWxzKCksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAndXNlcl9vcHRpb25zJyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogcmVzb3VyY2UudXNlck9wdGlvbnNUZXh0LFxyXG4gICAgICAgIGZuOiAoKSA9PiBBcHAucmVxdWVzdFVzZXJPcHRpb25zKCksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnc3lzdGVtX29wdGlvbnMnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiByZXNvdXJjZS5zeXN0ZW1PcHRpb25zVGV4dCxcclxuICAgICAgICBmbjogKCkgPT4gQXBwLnJlcXVlc3RTeXN0ZW1PcHRpb25zKCksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnaW50ZWdyYXRpb25zJyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogcmVzb3VyY2UuaW50ZWdyYXRpb25zVGV4dCxcclxuICAgICAgICBmbjogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLmFwcGxpY2F0aW9uLk1vZGVsTWFuYWdlci5nZXRNb2RlbChNT0RFTF9OQU1FUy5JTlRFR1JBVElPTiwgTU9ERUxfVFlQRVMuU0RBVEEpO1xyXG4gICAgICAgICAgcmV0dXJuIG1vZGVsLmdldEVudHJpZXMobnVsbCwgeyBjb250cmFjdE5hbWU6ICdkeW5hbWljJyB9KS50aGVuKChyZXN1bHRzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb24uY29udGV4dC5pbnRlZ3JhdGlvbnMgPSByZXN1bHRzO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaCgoaW50ZWdyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIEFwcC5yZXF1ZXN0SW50ZWdyYXRpb25TZXR0aW5ncyhpbnRlZ3JhdGlvbi4kZGVzY3JpcHRvcik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9XSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19