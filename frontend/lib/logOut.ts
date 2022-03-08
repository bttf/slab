import { clearAccessToken } from "./storage";

const logOut = () => {
  clearAccessToken();
  window.location.href = "/";
};

export default logOut;
