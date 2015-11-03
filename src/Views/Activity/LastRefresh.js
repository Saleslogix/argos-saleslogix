import MetricWidget from '../MetricWidget';
import declare from 'dojo/_base/declare';
import MemoryStore from 'dojo/store/Memory';


export default declare('crm.Views.Activity.LastRefresh', [MetricWidget], {
  valueFn: function valueFn(value) {
    return value[0];
  },
  createStore: function createStore() {
    return new MemoryStore({
      data: [{
        value: moment().toDate(),
      }],
    });
  },
});
