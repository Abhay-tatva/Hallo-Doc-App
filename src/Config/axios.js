import axios from "axios";
// import { clearCookie, getValueFromCookie } from '@/src/utility/cookie';
// import { TOKEN_KEY, DEFAULT_CONTENT_TYPE } from '@/src/constants/common';
// import { HOMEPAGE_URL } from '../constants/urls';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

Axios.interceptors.request.use((config) => {
  const useToken = config?.withAuthToken ?? true;
  const token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).loginReducer,
  ).jwtToken;
  const headers = config.headers;
  return {
    ...config,
    headers: {
      ...headers,
      "Content-Type": headers["Content-Type"],
      Authorization: useToken && token && `Bearer ${token}`,
    },
  };
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.request?.statusText === "Unauthorized") {
      // for handling unauthorised api
      //   clearCookie();
      //   if (window) window.location.href = HOMEPAGE_URL;
    }
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  },
);

export default Axios;
