// action Types
export const SET_USER = 'SET_USER';
export const SET_MAX_VIEWPORTS = 'SET_MAX_VIEWPORTS';


// creators
export function setUser(entry) {
  return {
    type: SET_USER,
    entry,
  };
}

export function setMaxViewPorts(max) {
  return {
    type: SET_MAX_VIEWPORTS,
    max,
  };
}
