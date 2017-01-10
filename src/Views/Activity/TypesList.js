import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import List from 'argos/List';
import MemoryStore from 'dojo/store/Memory';
import getResource from 'argos/I18n';

const resource = getResource('activityTypesList');

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
const __class = declare('crm.Views.Activity.TypesList', [List], {
  // Templates
  rowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
    '<div class="list-item-static-selector">',
    '{% if ($.icon) { %}',
    '<img src="{%: $.icon || "" %}" alt="icon" class="icon" />',
    '{% } else if ($.iconClass) { %}',
    '<div class="{%= $.iconClass %}"></div>',
    '{% } %}',
    '</div>',
    '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
    '</li>',
  ]),
  itemTemplate: new Simplate([
    '<h3>{%: $.$descriptor %}</h3>',
  ]),

  // Localization
  titleText: resource.titleText,
  activityTypeText: {
    atToDo: resource.toDo,
    atPhoneCall: resource.phoneCall,
    atAppointment: resource.meeting,
    atLiterature: resource.literature,
    atPersonal: resource.personal,
    event: resource.eventText,
  },

  // View Properties
  activityTypeIcons: {
    atToDo: 'fa fa-list-ul',
    atPhoneCall: 'fa fa-phone',
    atAppointment: 'fa fa-calendar-o',
    atLiterature: 'fa fa-calendar-o',
    atPersonal: 'fa fa-check-square-o',
    event: 'fa fa-calendar-o',
  },
  activityTypeOrder: [
    'atAppointment',
    // 'atLiterature', // For [#7206791], We will enable this later.
    'atPersonal',
    'atPhoneCall',
    'atToDo',
    'event',
  ],
  expose: false,
  enableSearch: false,
  enablePullToRefresh: false,
  id: 'activity_types_list',
  editView: 'activity_edit',
  eventEditView: 'event_edit',

  activateEntry: function activateEntry(params) {
    if (params.key) {
      const view = App.getView((params.key === 'event') ? this.eventEditView : this.editView);

      if (view) {
        const source = this.options && this.options.source;
        view.show({
          insert: true,
          entry: (this.options && this.options.entry) || null,
          source,
          activityType: params.key,
          title: this.activityTypeText[params.key],
          returnTo: this.options && this.options.returnTo,
          currentDate: this.options && this.options.currentDate,
        }, {
          returnTo: -1,
        });
      }
    }
  },
  refreshRequiredFor: function refreshRequiredFor(options) {
    let toReturn;
    if (this.options) {
      toReturn = options;
    } else {
      toReturn = true;
    }
    return toReturn;
  },
  hasMoreData: function hasMoreData() {
    return false;
  },
  createStore: function createStore() {
    const list = [];
    const eventViews = [
      'calendar_view',
      'calendar_monthlist',
      'calendar_weeklist',
      'calendar_daylist',
      'calendar_yearlist',
    ];

    for (let i = 0; i < this.activityTypeOrder.length; i++) {
      list.push({
        $key: this.activityTypeOrder[i],
        $descriptor: this.activityTypeText[this.activityTypeOrder[i]],
        iconClass: this.activityTypeIcons[this.activityTypeOrder[i]],
        type: this.activityTypeOrder[i],
      });
    }

    if (eventViews.indexOf(this.options.returnTo) === -1) {
      list.pop(); // remove event for non event views
    }

    const store = new MemoryStore({
      data: list,
    });
    return store;
  },
  init: function init() {
    this.inherited(arguments);
  },
  onTransitionAway: function onTransitionAway() {
    this.inherited(arguments);
    this.refreshRequired = true;
    this.store = null;
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
});

lang.setObject('Mobile.SalesLogix.Views.Activity.TypesList', __class);
export default __class;
