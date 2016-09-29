import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import List from 'argos/List';

/**
 * @class crm.Views.SelectList
 *
 *
 * @extends argos.List
 *
 */
const __class = declare('crm.Views.SelectList', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.$descriptor %}</h3>',
  ]),

  // View Properties
  id: 'select_list',
  expose: false,
  enablePullToRefresh: false,

  refreshRequiredFor: function refreshRequiredFor(options) {
    if (this.options) {
      return options ? (this.options.data !== options.data) : false;
    }
    return true;
  },
  hasMoreData: function hasMoreData() {
    return false;
  },
  requestData: function requestData() {
    this.store = null;
    this.inherited(arguments);
  },
  createStore: function createStore() {
    // caller is responsible for passing in a well-structured feed object.
    const data = this.expandExpression(this.options && this.options.data && this.options.data.$resources);
    const store = new Memory({
      data,
    });
    store.idProperty = '$key';
    return store;
  },
});

lang.setObject('Mobile.SalesLogix.Views.SelectList', __class);
export default __class;
