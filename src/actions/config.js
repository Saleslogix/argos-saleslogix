// action Types
export const SET_CONFIG = 'SET_CONFIG';
export const SET_ENDPOINT = 'SET_ENDPOINT';

/*

See: https://github.com/acdlite/flux-standard-action

An action MUST
+ be a plain JavaScript object.
+ have a type property.

 An action MAY
+ have an error property.
+ have a payload property.
+ have a meta property.

An action MUST NOT
+ include properties other than type, payload, error, and meta.
*/

// creators
export function setConfig(config) {
  return {
    type: SET_CONFIG,
    payload: {
      config,
    },
  };
}

export function setEndPoint(url) {
  return {
    type: SET_ENDPOINT,
    payload: {
      url,
    },
  };
}
