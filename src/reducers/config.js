import { SET_CONFIG, SET_ENDPOINT } from '../actions/config';

// TODO: Refactor the settings passed into the app to use these instead.
const initialConfigState = {
  connections: null,
  endpoint: '',
  maxUploadFileSize: 40000000,
  enableUpdateNotification: false,
  enableMultiCurrency: false,
  enableGroups: true,
  enableHashTags: true,
  enableConcurrencyCheck: false,
  enableOfflineSupport: false,
  warehouseDiscovery: 'auto',
  enableMingle: false,
  mingleSettings: null,
  mingleRedirectUrl: '',
};

export function config(state = initialConfigState, action) {
  const { type, payload, error, meta } = action; // eslint-disable-line
  switch (type) {
    case SET_CONFIG:
      return Object.assign({}, state, payload.config);
    case SET_ENDPOINT:
      return Object.assign({}, state, {
        endpoint: payload.url,
      });
    default:
      return state;
  }
}
