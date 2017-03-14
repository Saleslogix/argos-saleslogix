import { SET_CONFIG } from '../actions/config';

// TODO: Refactor the settings passed into the app to use these instead.
const initialConfigState = {
  connections: null,
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
    default:
      return state;
  }
}
