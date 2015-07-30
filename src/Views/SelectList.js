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
var __class = declare('crm.Views.SelectList', [List], {
  //Templates
  itemTemplate: new Simplate([
    '<h3>{%: $.$descriptor %}</h3>'
  ]),

  //View Properties
  id: 'select_list',
  expose: false,
  enablePullToRefresh: false,

  refreshRequiredFor: function(options) {
    if (this.options) {
      return options ? (this.options.data !== options.data) : false;
    } else {
      return true;
    }
  },
  hasMoreData: function() {
    return false;
  },
  requestData: function() {
    this.store = null;
    this.inherited(arguments);
  },
  createStore: function() {
    // caller is responsible for passing in a well-structured feed object.
    var store, data = this.expandExpression(this.options && this.options.data && this.options.data.$resources);
    store = Memory({
      data: data
    });
    store.idProperty = '$key';
    return store;
  }
});

lang.setObject('Mobile.SalesLogix.Views.SelectList', __class);
export default __class;
