import lang from 'dojo/_base/lang';

const store = new Map();

const __class = lang.setObject('crm.Models.Manager', {
  register: function register(entityName, modelType, ctor) {
    if (!store.has(entityName)) {
      store.set({entityName, modelType}, ctor);
    }
    return ctor;
  },
  get: function get(entityName, modelType) {
    return store.get({entityName, modelType});
  },
});

export default __class;
