import Manager from './Manager';
import MODEL_TYPES from './Types';

export default {
  getModel: function getModel(entityName) {
    let Ctor;
    if (App.onLine) {
      Ctor = Manager.get(entityName, MODEL_TYPES.SDATA);
    } else {
      Ctor = Manager.get(entityName, MODEL_TYPES.OFFLINE);
    }

    return new Ctor();
  },
};
