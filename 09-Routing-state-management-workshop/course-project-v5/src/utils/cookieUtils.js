import Cookies from 'js-cookie';

export const getCookie = field => Cookies.get(field);

export function setCookie(name, value, expiresInMins) {
  const expires = new Date(new Date().getTime() + expiresInMins * 60 * 1000);
  Cookies.set(name, value, { expires });
}
