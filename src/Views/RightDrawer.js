import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import GroupedList from 'argos/GroupedList';

/**
 * @class crm.Views.RightDrawer
 *
 *
 * @extends argos.GroupedList
 *
 */
const __class = declare('crm.Views.RightDrawer', [GroupedList], {
  // Templates
  cls: ' contextualContent',
  rowTemplate: new Simplate([
    '<li class="{%: $.cls %}" data-action="{%= $.action %}"',
    '{% if($.dataProps) { %}',
    '{% for(var prop in $.dataProps) { %}',
    ' data-{%= prop %}="{%= $.dataProps[prop] %}"',
    '{% } %}',
    '{% } %}',
    '>',
    '{% if ($$._hasIcon($)) { %}',
    '<div class="list-item-static-selector {%: $.iconCls %} ">',
    '{% if ($.icon) { %}',
    '<img src="{%: $.icon %}" alt="icon" class="icon" />',
    '{% } %}',
    '</div>',
    '{% } %}',
    '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
    '</li>',
  ]),
  _hasIcon: function _hasIcon(entry) {
    return entry.iconTemplate || entry.cls || entry.icon || entry.iconCls;
  },
  itemTemplate: new Simplate([
    '<h3>{%: $.title %}</h3>',
  ]),

  // View Properties
  id: 'right_drawer',
  expose: false,
  enableSearch: false,
  customizationSet: 'right_drawer',
  enablePullToRefresh: false,
  dataProps: null,
  pageSize: 100,

  hasMoreData: function hasMoreData() {
    return false;
  },
  getGroupForEntry: function getGroupForEntry() {},
  init: function init() {
    this.inherited(arguments);
    this.connect(App, 'onRegistered', this._onRegistered);
  },
  setLayout: function setLayout(layout) {
    this.layout = layout;
  },
  createLayout: function createLayout() {
    return this.layout || [];
  },
  createStore: function createStore() {
    const layout = this._createCustomizedLayout(this.createLayout());
    const list = [];

    for (let i = 0; i < layout.length; i++) {
      const section = layout[i].children;

      for (let j = 0; j < section.length; j++) {
        const row = section[j];

        if (row.security && !App.hasAccessTo(row.security)) {
          continue;
        }
        if (typeof this.query !== 'function' || this.query(row)) {
          list.push(row);
        }
      }
    }

    const store = new Memory({
      data: list,
    });
    return store;
  },
  clear: function clear() {
    this.inherited(arguments);
    this.store = null;
  },
  /**
   * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
   */
  refresh: function refresh() {
    this.clear();
    this.requestData();
  },
  show: function show() {
    if (this.onShow(this) === false) {
      return;
    }

    this.refresh();
  },
  _onRegistered: function _onRegistered() {
    this.refreshRequired = true;
  },
});

lang.setObject('Mobile.SalesLogix.Views.RightDrawer', __class);
export default __class;
