define('crm/Views/Activity/TypesList', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'dojo/store/Memory'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosList, _dojoStoreMemory) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _List = _interopRequireDefault(_argosList);

  var _MemoryStore = _interopRequireDefault(_dojoStoreMemory);

  /**
   * @class crm.Views.Activity.TypesList
   *
   * @extends argos.List
   * @mixins argos._LegacySDataListMixin
   * @mixins crm.Views._CardLayoutListMixin
   *
   * @requires argos.List
   * @requires argos._LegacySDataListMixin
   *
   * @requires crm.Views._CardLayoutListMixin
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Activity.TypesList', [_List['default']], {
    //Templates
    rowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">', '<div class="list-item-static-selector">', '{% if ($.icon) { %}', '<img src="{%: $.icon || "" %}" alt="icon" class="icon" />', '{% } else if ($.iconClass) { %}', '<div class="{%= $.iconClass %}"></div>', '{% } %}', '</div>', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
    itemTemplate: new Simplate(['<h3>{%: $.$descriptor %}</h3>']),

    //Localization
    titleText: 'Schedule...',
    activityTypeText: {
      'atToDo': 'To-Do',
      'atPhoneCall': 'Phone Call',
      'atAppointment': 'Meeting',
      'atLiterature': 'Literature Request',
      'atPersonal': 'Personal Activity',
      'event': 'Event'
    },
    activityTypeIcons: {
      'atToDo': 'fa fa-list-ul',
      'atPhoneCall': 'fa fa-phone',
      'atAppointment': 'fa fa-calendar-o',
      'atLiterature': 'fa fa-calendar-o',
      'atPersonal': 'fa fa-check-square-o',
      'event': 'fa fa-calendar-o'
    },

    //View Properties
    activityTypeOrder: ['atAppointment',
    //'atLiterature', //For [#7206791], We will enable this later.
    'atPersonal', 'atPhoneCall', 'atToDo', 'event'],
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    id: 'activity_types_list',
    editView: 'activity_edit',
    eventEditView: 'event_edit',

    activateEntry: function activateEntry(params) {
      if (params.key) {
        var source = this.options && this.options.source,
            view = App.getView(params.key === 'event' ? this.eventEditView : this.editView);

        if (view) {
          view.show({
            insert: true,
            entry: this.options && this.options.entry || null,
            source: source,
            activityType: params.key,
            title: this.activityTypeText[params.key],
            returnTo: this.options && this.options.returnTo,
            currentDate: this.options && this.options.currentDate
          }, {
            returnTo: -1
          });
        }
      }
    },
    refreshRequiredFor: function refreshRequiredFor(options) {
      if (this.options) {
        return options;
      } else {
        return true;
      }
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    createStore: function createStore() {
      var list, i, store, eventViews;

      list = [];
      eventViews = ['calendar_monthlist', 'calendar_weeklist', 'calendar_daylist', 'calendar_yearlist'];

      for (i = 0; i < this.activityTypeOrder.length; i++) {
        list.push({
          '$key': this.activityTypeOrder[i],
          '$descriptor': this.activityTypeText[this.activityTypeOrder[i]],
          'iconClass': this.activityTypeIcons[this.activityTypeOrder[i]],
          'type': this.activityTypeOrder[i]
        });
      }

      if (eventViews.indexOf(this.options.returnTo) === -1) {
        list.pop(); // remove event for non event views
      }

      store = new _MemoryStore['default']({
        data: list
      });
      return store;
    },
    init: function init() {
      this.inherited(arguments);
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Activity.TypesList', __class);
  module.exports = __class;
});
