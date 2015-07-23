define('crm/ApplicationModule', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/query', 'dojo/_base/window', 'argos/ApplicationModule', 'argos/Calendar', 'argos/RelatedViewManager', 'argos/RelatedViewWidget', 'argos/List', 'argos/Views/Signature', 'argos/SearchWidget', 'argos/Views/FileSelect', './Views/AddAccountContact', './Views/AreaCategoryIssueLookup', './Views/ExchangeRateLookup', './Views/MainToolbar', './Views/UpdateToolbar', './Views/LeftDrawer', './Views/RightDrawer', './Views/Offline/Detail', './Views/Offline/List', './Views/Login', './Views/LogOff', './Views/Settings', './Views/Configure', './Views/Help', './Views/NameEdit', './Views/PickList', './Views/SelectList', './Views/SpeedSearchList', './Views/TextEdit', './Views/Account/List', './Views/Account/Detail', './Views/Account/Edit', './Views/Address/List', './Views/Address/Edit', './Views/Activity/List', './Views/Activity/MyList', './Views/Activity/Detail', './Views/Activity/Edit', './Views/Activity/Complete', './Views/Activity/TypesList', './Views/Activity/Recurring', './Views/Calendar/DayView', './Views/Calendar/WeekView', './Views/Calendar/MonthView', './Views/Charts/GenericBar', './Views/Charts/GenericLine', './Views/Charts/GenericPie', './Views/Competitor/List', './Views/Contact/List', './Views/Contact/Detail', './Views/Contact/Edit', './Views/Contract/List', './Views/ErrorLog/List', './Views/ErrorLog/Detail', './Views/Event/List', './Views/Event/Detail', './Views/Event/Edit', './Views/Groups/Selector', './Views/Lead/List', './Views/Lead/Detail', './Views/Lead/Edit', './Views/LeadSource/List', './Views/Opportunity/List', './Views/Opportunity/Detail', './Views/Opportunity/Edit', './Views/Opportunity/QuickEdit', './Views/OpportunityContact/List', './Views/OpportunityContact/Detail', './Views/OpportunityContact/Edit', './Views/OpportunityProduct/List', './Views/OpportunityProduct/Detail', './Views/OpportunityProduct/Edit', './Views/Owner/List', './Views/Product/List', './Views/ProductProgram/List', './Views/Ticket/List', './Views/Ticket/Detail', './Views/Ticket/Edit', './Views/Ticket/UrgencyLookup', './Views/TicketActivity/List', './Views/TicketActivity/Detail', './Views/TicketActivity/Edit', './Views/TicketActivity/RateLookup', './Views/TicketActivityItem/List', './Views/TicketActivityItem/Detail', './Views/History/List', './Views/History/Detail', './Views/History/Edit', './Views/History/RelatedView', './Views/User/CalendarAccessList', './Views/User/List', './Views/Attachment/ViewAttachment', './Views/Attachment/List', './Views/Attachment/AddAttachment', './Views/Attachment/MyAttachmentList', './Fields/AddressField', './Fields/MultiCurrencyField', './Fields/NameField', './Fields/PicklistField', './Fields/RecurrencesField', './Views/RelatedContextWidget', './Views/RelatedEditWidget', './Action', './Format', './Template', './Validator', './Environment', './Utility'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoQuery, _dojo_baseWindow, _argosApplicationModule, _argosCalendar, _argosRelatedViewManager, _argosRelatedViewWidget, _argosList, _argosViewsSignature, _argosSearchWidget, _argosViewsFileSelect, _ViewsAddAccountContact, _ViewsAreaCategoryIssueLookup, _ViewsExchangeRateLookup, _ViewsMainToolbar, _ViewsUpdateToolbar, _ViewsLeftDrawer, _ViewsRightDrawer, _ViewsOfflineDetail, _ViewsOfflineList, _ViewsLogin, _ViewsLogOff, _ViewsSettings, _ViewsConfigure, _ViewsHelp, _ViewsNameEdit, _ViewsPickList, _ViewsSelectList, _ViewsSpeedSearchList, _ViewsTextEdit, _ViewsAccountList, _ViewsAccountDetail, _ViewsAccountEdit, _ViewsAddressList, _ViewsAddressEdit, _ViewsActivityList, _ViewsActivityMyList, _ViewsActivityDetail, _ViewsActivityEdit, _ViewsActivityComplete, _ViewsActivityTypesList, _ViewsActivityRecurring, _ViewsCalendarDayView, _ViewsCalendarWeekView, _ViewsCalendarMonthView, _ViewsChartsGenericBar, _ViewsChartsGenericLine, _ViewsChartsGenericPie, _ViewsCompetitorList, _ViewsContactList, _ViewsContactDetail, _ViewsContactEdit, _ViewsContractList, _ViewsErrorLogList, _ViewsErrorLogDetail, _ViewsEventList, _ViewsEventDetail, _ViewsEventEdit, _ViewsGroupsSelector, _ViewsLeadList, _ViewsLeadDetail, _ViewsLeadEdit, _ViewsLeadSourceList, _ViewsOpportunityList, _ViewsOpportunityDetail, _ViewsOpportunityEdit, _ViewsOpportunityQuickEdit, _ViewsOpportunityContactList, _ViewsOpportunityContactDetail, _ViewsOpportunityContactEdit, _ViewsOpportunityProductList, _ViewsOpportunityProductDetail, _ViewsOpportunityProductEdit, _ViewsOwnerList, _ViewsProductList, _ViewsProductProgramList, _ViewsTicketList, _ViewsTicketDetail, _ViewsTicketEdit, _ViewsTicketUrgencyLookup, _ViewsTicketActivityList, _ViewsTicketActivityDetail, _ViewsTicketActivityEdit, _ViewsTicketActivityRateLookup, _ViewsTicketActivityItemList, _ViewsTicketActivityItemDetail, _ViewsHistoryList, _ViewsHistoryDetail, _ViewsHistoryEdit, _ViewsHistoryRelatedView, _ViewsUserCalendarAccessList, _ViewsUserList, _ViewsAttachmentViewAttachment, _ViewsAttachmentList, _ViewsAttachmentAddAttachment, _ViewsAttachmentMyAttachmentList, _FieldsAddressField, _FieldsMultiCurrencyField, _FieldsNameField, _FieldsPicklistField, _FieldsRecurrencesField, _ViewsRelatedContextWidget, _ViewsRelatedEditWidget, _Action, _Format, _Template, _Validator, _Environment, _Utility) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _query = _interopRequireDefault(_dojoQuery);

    var _win = _interopRequireDefault(_dojo_baseWindow);

    var _ApplicationModule = _interopRequireDefault(_argosApplicationModule);

    var _Calendar = _interopRequireDefault(_argosCalendar);

    var _RelatedViewManager = _interopRequireDefault(_argosRelatedViewManager);

    var _RelatedViewWidget = _interopRequireDefault(_argosRelatedViewWidget);

    var _List = _interopRequireDefault(_argosList);

    var _Signature = _interopRequireDefault(_argosViewsSignature);

    var _SearchWidget = _interopRequireDefault(_argosSearchWidget);

    var _FileSelect = _interopRequireDefault(_argosViewsFileSelect);

    var _AddAccountContact = _interopRequireDefault(_ViewsAddAccountContact);

    var _AreaCategoryIssueLookup = _interopRequireDefault(_ViewsAreaCategoryIssueLookup);

    var _ExchangeRateLookup = _interopRequireDefault(_ViewsExchangeRateLookup);

    var _MainToolbar = _interopRequireDefault(_ViewsMainToolbar);

    var _UpdateToolbar = _interopRequireDefault(_ViewsUpdateToolbar);

    var _LeftDrawer = _interopRequireDefault(_ViewsLeftDrawer);

    var _RightDrawer = _interopRequireDefault(_ViewsRightDrawer);

    var _OfflineDetail = _interopRequireDefault(_ViewsOfflineDetail);

    var _OfflineList = _interopRequireDefault(_ViewsOfflineList);

    var _Login = _interopRequireDefault(_ViewsLogin);

    var _LogOff = _interopRequireDefault(_ViewsLogOff);

    var _Settings = _interopRequireDefault(_ViewsSettings);

    var _Configure = _interopRequireDefault(_ViewsConfigure);

    var _Help = _interopRequireDefault(_ViewsHelp);

    var _NameEdit = _interopRequireDefault(_ViewsNameEdit);

    var _PickList = _interopRequireDefault(_ViewsPickList);

    var _SelectList = _interopRequireDefault(_ViewsSelectList);

    var _SpeedSearchList = _interopRequireDefault(_ViewsSpeedSearchList);

    var _TextEdit = _interopRequireDefault(_ViewsTextEdit);

    var _AccountList = _interopRequireDefault(_ViewsAccountList);

    var _AccountDetail = _interopRequireDefault(_ViewsAccountDetail);

    var _AccountEdit = _interopRequireDefault(_ViewsAccountEdit);

    var _AddressList = _interopRequireDefault(_ViewsAddressList);

    var _AddressEdit = _interopRequireDefault(_ViewsAddressEdit);

    var _ActivityList = _interopRequireDefault(_ViewsActivityList);

    var _MyActivityList = _interopRequireDefault(_ViewsActivityMyList);

    var _ActivityDetail = _interopRequireDefault(_ViewsActivityDetail);

    var _ActivityEdit = _interopRequireDefault(_ViewsActivityEdit);

    var _ActivityComplete = _interopRequireDefault(_ViewsActivityComplete);

    var _ActivityTypesList = _interopRequireDefault(_ViewsActivityTypesList);

    var _ActivityRecurring = _interopRequireDefault(_ViewsActivityRecurring);

    var _CalendarDayView = _interopRequireDefault(_ViewsCalendarDayView);

    var _CalendarWeekView = _interopRequireDefault(_ViewsCalendarWeekView);

    var _CalendarMonthView = _interopRequireDefault(_ViewsCalendarMonthView);

    var _GenericBar = _interopRequireDefault(_ViewsChartsGenericBar);

    var _GenericLine = _interopRequireDefault(_ViewsChartsGenericLine);

    var _GenericPie = _interopRequireDefault(_ViewsChartsGenericPie);

    var _CompetitorList = _interopRequireDefault(_ViewsCompetitorList);

    var _ContactList = _interopRequireDefault(_ViewsContactList);

    var _ContactDetail = _interopRequireDefault(_ViewsContactDetail);

    var _ContactEdit = _interopRequireDefault(_ViewsContactEdit);

    var _ContractList = _interopRequireDefault(_ViewsContractList);

    var _ErrorLogList = _interopRequireDefault(_ViewsErrorLogList);

    var _ErrorLogDetail = _interopRequireDefault(_ViewsErrorLogDetail);

    var _EventList = _interopRequireDefault(_ViewsEventList);

    var _EventDetail = _interopRequireDefault(_ViewsEventDetail);

    var _EventEdit = _interopRequireDefault(_ViewsEventEdit);

    var _GroupsSelector = _interopRequireDefault(_ViewsGroupsSelector);

    var _LeadList = _interopRequireDefault(_ViewsLeadList);

    var _LeadDetail = _interopRequireDefault(_ViewsLeadDetail);

    var _LeadEdit = _interopRequireDefault(_ViewsLeadEdit);

    var _LeadSourceList = _interopRequireDefault(_ViewsLeadSourceList);

    var _OpportunityList = _interopRequireDefault(_ViewsOpportunityList);

    var _OpportunityDetail = _interopRequireDefault(_ViewsOpportunityDetail);

    var _OpportunityEdit = _interopRequireDefault(_ViewsOpportunityEdit);

    var _OpportunityQuickEdit = _interopRequireDefault(_ViewsOpportunityQuickEdit);

    var _OpportunityContactList = _interopRequireDefault(_ViewsOpportunityContactList);

    var _OpportunityContactDetail = _interopRequireDefault(_ViewsOpportunityContactDetail);

    var _OpportunityContactEdit = _interopRequireDefault(_ViewsOpportunityContactEdit);

    var _OpportunityProductList = _interopRequireDefault(_ViewsOpportunityProductList);

    var _OpportunityProductDetail = _interopRequireDefault(_ViewsOpportunityProductDetail);

    var _OpportunityProductEdit = _interopRequireDefault(_ViewsOpportunityProductEdit);

    var _OwnerList = _interopRequireDefault(_ViewsOwnerList);

    var _ProductList = _interopRequireDefault(_ViewsProductList);

    var _ProductProgramList = _interopRequireDefault(_ViewsProductProgramList);

    var _TicketList = _interopRequireDefault(_ViewsTicketList);

    var _TicketDetail = _interopRequireDefault(_ViewsTicketDetail);

    var _TicketEdit = _interopRequireDefault(_ViewsTicketEdit);

    var _TicketUrgencyLookup = _interopRequireDefault(_ViewsTicketUrgencyLookup);

    var _TicketActivityList = _interopRequireDefault(_ViewsTicketActivityList);

    var _TicketActivityDetail = _interopRequireDefault(_ViewsTicketActivityDetail);

    var _TicketActivityEdit = _interopRequireDefault(_ViewsTicketActivityEdit);

    var _TicketActivityRateLookup = _interopRequireDefault(_ViewsTicketActivityRateLookup);

    var _TicketActivityItemList = _interopRequireDefault(_ViewsTicketActivityItemList);

    var _TicketActivityItemDetail = _interopRequireDefault(_ViewsTicketActivityItemDetail);

    var _HistoryList = _interopRequireDefault(_ViewsHistoryList);

    var _HistoryDetail = _interopRequireDefault(_ViewsHistoryDetail);

    var _HistoryEdit = _interopRequireDefault(_ViewsHistoryEdit);

    var _HistoryRelatedView = _interopRequireDefault(_ViewsHistoryRelatedView);

    var _CalendarAccessList = _interopRequireDefault(_ViewsUserCalendarAccessList);

    var _UserList = _interopRequireDefault(_ViewsUserList);

    var _ViewAttachment = _interopRequireDefault(_ViewsAttachmentViewAttachment);

    var _AttachmentList = _interopRequireDefault(_ViewsAttachmentList);

    var _AddAttachment = _interopRequireDefault(_ViewsAttachmentAddAttachment);

    var _MyAttachmentList = _interopRequireDefault(_ViewsAttachmentMyAttachmentList);

    /**
     * @class crm.ApplicationModule
     *
     * @extends argos.ApplicationModule
     * @requires argos.Calendar
     * @requires argos.RelatedViewManager
     * @requires argos.RelatedViewWidget
     * @requires argos.List
     * @requires argos.Views.Signature
     * @requires argos.Views.FileSelect
     * @requires argos.SearchWidget
     *
     */
    var __class = (0, _declare['default'])('crm.ApplicationModule', [_ApplicationModule['default']], {
        searchText: 'Lookup',
        loadViews: function loadViews() {
            this.inherited(arguments);

            this.registerView(new _Calendar['default']({
                expose: false
            }));

            this.registerView(new _Signature['default']({
                expose: false
            }));

            this.registerView(new _Login['default']());
            this.registerView(new _LogOff['default']());

            this.registerView(new _LeftDrawer['default'](), (0, _query['default'])('.left-drawer')[0]);
            this.registerView(new _RightDrawer['default'](), (0, _query['default'])('.right-drawer')[0]);

            this.registerView(new _OfflineDetail['default']());
            this.registerView(new _OfflineList['default']({
                expose: true
            }));

            this.registerView(new _Help['default']());
            this.registerView(new _Settings['default']());
            this.registerView(new _Configure['default']());
            this.registerView(new _PickList['default']());
            this.registerView(new _SelectList['default']());
            this.registerView(new _SpeedSearchList['default']());
            this.registerView(new _AddAccountContact['default']());
            this.registerView(new _AreaCategoryIssueLookup['default']());
            this.registerView(new _ExchangeRateLookup['default']());
            this.registerView(new _FileSelect['default']());

            this.registerView(new _NameEdit['default']());
            this.registerView(new _TextEdit['default']());
            this.registerView(new _AddressList['default']({
                id: 'address_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
            this.registerView(new _AddressEdit['default']());

            this.registerView(new _AccountList['default']());
            this.registerView(new _AccountDetail['default']());
            this.registerView(new _AccountEdit['default']());
            this.registerView(new _AccountList['default']({
                id: 'account_related',
                expose: false,
                groupsEnabled: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _CalendarMonthView['default']());
            this.registerView(new _CalendarWeekView['default']());
            this.registerView(new _CalendarDayView['default']());

            // Charts
            this.registerView(new _GenericBar['default']({ expose: false }));
            this.registerView(new _GenericLine['default']({ expose: false }));
            this.registerView(new _GenericPie['default']({ expose: false }));

            this.registerView(new _CompetitorList['default']({
                id: 'competitor_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _ContactList['default']());
            this.registerView(new _ContactDetail['default']());
            this.registerView(new _ContactEdit['default']());
            this.registerView(new _ContactList['default']({
                id: 'contact_related',
                expose: false,
                groupsEnabled: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _ContractList['default']({
                id: 'contract_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _ErrorLogList['default']());
            this.registerView(new _ErrorLogDetail['default']());

            this.registerView(new _EventEdit['default']());
            this.registerView(new _EventList['default']({ expose: false }));
            this.registerView(new _EventDetail['default']());
            this.registerView(new _EventList['default']({
                id: 'event_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _GroupsSelector['default']());

            this.registerView(new _OpportunityEdit['default']());
            this.registerView(new _OpportunityQuickEdit['default']());
            this.registerView(new _OpportunityList['default']());
            this.registerView(new _OpportunityDetail['default']());
            this.registerView(new _OpportunityList['default']({
                id: 'opportunity_related',
                expose: false,
                groupsEnabled: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _OpportunityContactEdit['default']());
            this.registerView(new _OpportunityContactList['default']());
            this.registerView(new _OpportunityContactDetail['default']());
            this.registerView(new _OpportunityContactList['default']({
                id: 'opportunitycontact_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _OpportunityProductList['default']({
                id: 'opportunityproduct_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _OpportunityProductDetail['default']({
                id: 'opportunityproduct_detail',
                expose: false
            }));

            this.registerView(new _OpportunityProductEdit['default']({
                id: 'opportunityproduct_edit',
                expose: false
            }));

            this.registerView(new _LeadEdit['default']());
            this.registerView(new _LeadList['default']());
            this.registerView(new _LeadDetail['default']());
            this.registerView(new _LeadList['default']({
                id: 'lead_related',
                expose: false,
                groupsEnabled: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _TicketList['default']());
            this.registerView(new _TicketDetail['default']());
            this.registerView(new _TicketEdit['default']());
            this.registerView(new _TicketList['default']({
                id: 'ticket_related',
                expose: false,
                groupsEnabled: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _TicketActivityList['default']());
            this.registerView(new _TicketActivityDetail['default']());
            this.registerView(new _TicketActivityEdit['default']());
            this.registerView(new _TicketActivityRateLookup['default']());
            this.registerView(new _TicketActivityList['default']({
                id: 'ticketactivity_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _TicketActivityItemList['default']());
            this.registerView(new _TicketActivityItemDetail['default']());
            this.registerView(new _TicketActivityItemList['default']({
                id: 'ticketactivityitem_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _ActivityDetail['default']());
            this.registerView(new _ActivityEdit['default']());
            this.registerView(new _ActivityComplete['default']());
            this.registerView(new _ActivityTypesList['default']());
            this.registerView(new _ActivityList['default']({
                id: 'activity_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _MyActivityList['default']());
            this.registerView(new _ActivityRecurring['default']());

            this.registerView(new _HistoryDetail['default']());
            this.registerView(new _HistoryList['default']());
            this.registerView(new _HistoryEdit['default']());
            this.registerView(new _HistoryList['default']({
                id: 'history_related',
                expose: false,
                groupsEnabled: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _CalendarAccessList['default']({
                expose: false
            }));

            this.registerView(new _UserList['default']({
                expose: false
            }));

            this.registerView(new _OwnerList['default']({
                expose: false
            }));

            this.registerView(new _ProductList['default']({
                id: 'product_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _ProductProgramList['default']({
                id: 'productprogram_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));

            this.registerView(new _LeadSourceList['default']({
                expose: false
            }));

            this.registerView(new _TicketUrgencyLookup['default']({
                expose: false
            }));

            this.registerView(new _ViewAttachment['default']());
            this.registerView(new _AddAttachment['default']());
            this.registerView(new _MyAttachmentList['default']());
            this.registerView(new _AttachmentList['default']({
                id: 'account_attachment_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
            this.registerView(new _AttachmentList['default']({
                id: 'contact_attachment_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
            this.registerView(new _AttachmentList['default']({
                id: 'lead_attachment_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
            this.registerView(new _AttachmentList['default']({
                id: 'ticket_attachment_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
            this.registerView(new _AttachmentList['default']({
                id: 'opportunity_attachment_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
            this.registerView(new _AttachmentList['default']({
                id: 'activity_attachment_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
            this.registerView(new _AttachmentList['default']({
                id: 'history_attachment_related',
                expose: false,
                defaultSearchTerm: function defaultSearchTerm() {
                    return '';
                }
            }));
        },
        loadToolbars: function loadToolbars() {
            this.inherited(arguments);

            this.registerToolbar(new _MainToolbar['default']({
                name: 'tbar'
            }));

            this.registerToolbar(new _UpdateToolbar['default']({
                name: 'updatebar'
            }));
        },
        loadCustomizations: function loadCustomizations() {
            this.loadBaseCustomizations();
        },
        loadBaseCustomizations: function loadBaseCustomizations() {
            _lang['default'].extend(_List['default'], {
                expose: true,
                getSecurity: function getSecurity() {
                    return this.expose && this.security; // only check security on exposed views
                }
            });

            _lang['default'].extend(_SearchWidget['default'], {
                searchText: this.searchText
            });
        },
        loadAppStatPromises: function loadAppStatPromises() {
            this.registerAppStatePromise(function () {
                return App.requestUserDetails();
            });
            this.registerAppStatePromise(function () {
                return App.requestUserOptions();
            });
            this.registerAppStatePromise(function () {
                return App.requestSystemOptions();
            });
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.ApplicationModule', __class);
    module.exports = __class;
});
