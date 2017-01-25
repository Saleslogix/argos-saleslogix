// action Types
export const SET_USER = 'SET_USER';

// creators
export function setUser(entry) {
  return {
    type: SET_USER,
    entry,
  };
}
