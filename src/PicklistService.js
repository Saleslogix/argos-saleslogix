import lang from 'dojo/_base/lang';
import ErrorManager from 'argos/ErrorManager';
import SData from 'argos/Store/SData';

const PickListService = ICRMServicesSDK.PickListService;
const picklistFormat = ICRMCommonSDK.format.picklist;

const __class = lang.setObject('crm.PicklistService', {
  _picklists: {},

  // Previous properties
  _viewMapping: {},
  _store: null,
  contractName: 'system',
  resourceKind: 'picklists',
  include: ['items'],
  select: [
    'name',
    'allowMultiples',
    'valueMustExist',
    'required',
    'alphaSorted',
    'noneEditable',
    'modifyDate',
    'items/text',
    'items/code',
    'items/number',
  ],
  orderBy: 'name',
  where: '',

  init(service, storage) {
    this.service = new PickListService(storage, service);
  },
  getPicklistByKey(key) {
    return this._picklists[key];
  },
  getPicklistByName(name) {
    return this._picklists[name] || false;
    // const iterableKeys = Object.keys(this._picklists);
    // for (let i = 0; i < iterableKeys.length; i++) {
    //   if (this._picklists[iterableKeys[i]].name === name) {
    //     return this._picklists[iterableKeys[i]];
    //   }
    // }
    // return false;
  },
  getPicklistItemByCode(picklistName, itemCode) {
    const picklist = this.getPicklistByName(picklistName);

    if (picklist) {
      for (let i = 0; i < picklist.items.length; i++) {
        if (picklist.items[i].code === itemCode) {
          return picklist.items[i];
        }
      }
    }
    return false;
  },
  getPicklistItemTextByCode(picklistName, itemCode) {
    const picklistItem = this.getPicklistItemByCode(picklistName, itemCode);
    if (itemCode && picklistItem) {
      return picklistItem.text;
    }
    return null;
  },
  format(picklistCode /* , storageMode */) {
    const picklist = this.getPicklistByName(picklistCode);
    return picklistFormat(picklist);
  },
  registerPicklist(code, picklist) {
    if (!this._picklists[code]) {
      this._picklists[code] = picklist;
    }
  },
  requestPicklists() {
    // const promise = new Promise((resolve, reject) => {
    //   const iterableKeys = Object.keys(this._picklists);
    //   const promises = [];
    //   for (let i = 0; i < iterableKeys.length; i++) {
    //     promises.push(this.requestPicklist(iterableKeys[i]));
    //   }
    //   Promise.all(promises).then(() => {
    //     resolve(true);
    //   }, (response) => {
    //     reject(response);
    //   });
    // });
    // return promise;
    return this.requestPicklistsFromArray(Object.keys(this._picklists));
  },
  requestPicklistsFromArray(picklists) {
    const promise = new Promise((resolve, reject) => {
      const promises = [];
      // const pickListServiceOptions = {
      //   storageMode: 'code',
      // };
      for (let i = 0; i < picklists.length; i++) {
        // const temp = new Promise((res, rej) => {
        //   const {
        //     options,
        //     handlers,
        //   } = this.service.getFirstByKey(
        //     picklists[i],
        //     false,
        //     true,
        //     this.onPicklistSuccess(res),
        //     this.onPicklistError(rej),
        //     { pickListServiceOptions }
        //   );
        //   if (options) {
        //     const request = this.service.setUpRequest(
        //       new Sage.SData.Client.SDataResourceCollectionRequest(App.getService(false))
        //         .setContractName(this.contractName),
        //       options
        //     );
        //     request.read(handlers);
            // const store = this.getStore();
            // store.query(null, options).then((data) => {
            //   let picklist = null;
            //   if (data && data[0] && data[0].items) {
            //     picklist = data[0];
            //     picklist.items = picklist.items.$resources;
            //     this._picklists[picklist.name] = picklist;
            //   }
            //   res(picklist);
            // }, (response, o) => {
            //   ErrorManager.addError(response, o, options, 'failure');
            //   rej(response);
            // });
        //   }
        // });
        // promises.push(this.requestPicklist(picklists[i]));
        promises.push(this.requestPicklist(picklists[i]));
      }
      Promise.all(promises).then(() => {
        resolve(true);
      }, (response) => {
        reject(response);
      });
    });
    return promise;
  },
  onPicklistSuccess(resolve) {
    return (result) => {
      let picklist = null;
      if (result && result.items) {
        picklist = result;
        picklist.items = picklist.items.$resources;
        this._picklists[picklist.name] = picklist;
      }
      resolve(picklist);
    };
  },
  onPicklistError(reject) {
    return (response, o) => {
      ErrorManager.addError(response, o, null, 'failure');
      reject(response);
    };
  },
  requestPicklist(name, queryOptions = {}) {
    const pickListServiceOptions = Object.assign({}, {
      storageMode: 'code',
    }, queryOptions);
    const language = queryOptions.language || App.context.localization.locale;
    return new Promise((resolve, reject) => {
      const {
        options,
        handlers,
      } = this.service.getFirstByKey(
        name,
        false,
        true,
        this.onPicklistSuccess(resolve),
        this.onPicklistError(reject),
        { pickListServiceOptions, language }
      );
      if (options) {
        const request = this.service.setUpRequest(
          new Sage.SData.Client.SDataResourceCollectionRequest(App.getService(false))
            .setContractName(this.contractName),
          options
        );
        request.read(handlers);
      }
    });
  },

  // Previous functions
  getViewPicklists: function getViewPicklists(viewId) {
    const picklistIds = this._viewMapping[viewId];
    const picklists = [];
    if (picklistIds && picklistIds.length) {
      for (let i = 0; i < picklistIds.length; i++) {
        if (this._picklists[picklistIds[i]]) {
          picklists.push(this._picklists[picklistIds[i]]);
        } else {
          console.warn('Picklist "' + picklistIds[i] + '" has not been registered'); // eslint-disable-line
        }
      }
      return picklists;
    }
    return null;
  },
  registerPicklistToView: function registerPicklistToView(code, viewId) {
    if (!this._viewMapping[viewId]) {
      this._viewMapping[viewId] = [];
    }
    if (!this._viewMapping[viewId][code]) {
      this._viewMapping[viewId].push(code);
    } else {
      console.log('Picklist already exists for view "' + viewId + '"'); // eslint-disable-line
    }
    this.registerPicklist(code, true);
  },
  // requestPicklist: function requestPicklist(name, options) {
  //   const promise = new Promise((resolve, reject) => {
  //     const store = this.getStore();
  //     const queryOptions = {
  //       where: `name eq '${name}'`,
  //     };
  //     store.query(null, queryOptions).then((data) => {
  //       let picklist = null;
  //       if (data && data[0] && data[0].items) {
  //         picklist = data[0];
  //         picklist.items = picklist.items.$resources;
  //         this._picklists[picklist.name] = picklist;
  //       }
  //       resolve(picklist);
  //     }, (response, o) => {
  //       ErrorManager.addError(response, o, options, 'failure');
  //       reject(response);
  //     });
  //   });
  //   return promise;
  // },
  getStore: function getStore() {
    if (!this._store) {
      const options = this.getStoreOptions();
      this._store = new SData(options);
    }
    return this._store;
  },
  getStoreOptions: function getStoreOptions() {
    const options = {
      service: App.getService(false),
      contractName: this.contractName,
      resourceKind: this.resourceKind,
      include: this.include,
      select: this.select,
      orderBy: this.orderBy,
      where: this.where,
      scope: this,
    };
    return options;
  },
});

// Backwards compatibility
lang.setObject('crm.Integrations.BOE.PicklistService', __class);
lang.setObject('icboe.PicklistService', __class);
export default __class;
