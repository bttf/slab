const LOCAL_STORAGE_PREFIX = "v1";

const ACCESS_TOKEN_KEY = `${LOCAL_STORAGE_PREFIX}_access_token`;

export const storeAccessToken = (token: string) =>
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const getAccessToken = () =>
  window.localStorage.getItem(ACCESS_TOKEN_KEY);

export const clearAccessToken = () =>
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
