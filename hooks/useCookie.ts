import { Cookies } from 'react-cookie';

export default function useCookie() {
  const cookie = new Cookies();

  const setCookie = (name: string, value: string, options?: any) => {
    return cookie.set(name, value, { ...options });
  };

  const getCookie = (name: string) => {
    return cookie.get(name);
  };

  const removeCookie = (name: string) => {
    cookie.remove(name);
  };

  return { setCookie, getCookie, removeCookie };
}
