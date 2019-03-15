const tokenKey = "token-key";

export const getTokenKey = () => {
  if(typeof(window.Storage) !== "undefined") {
    return window.localStorage.getItem(tokenKey);
  }
  return null;
}

export const setTokenKey = (value) => {
  if(typeof(window.Storage) !== "undefined") {
    window.localStorage.setItem(tokenKey, value);
    return true;
  }
  return false;
}
