import { stringify } from "query-string";
// TODO: if error is not authenticated, redirect the user to login page? and otherwise throw error?
export const sendRequest = ({ url, method, headers = {}, queryParams }) => {
  let mergedHeaders = new Headers({
    "content-type": "application/json",
    "x-api-key": "8QlhKoDjavHlv4oacpAG1ljdDa01FoN9pBK3JXbc",
    ...headers,
  });
  // don't stringify when uploading form data
  const options = {
    method: method,
    headers: mergedHeaders,
  };
  if (queryParams) {
    url = `${url}?${stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(function(json) {
        return Promise.reject({
          status: res.status,
          ok: false,
          message: json.message,
          body: json,
        });
      });
    }
  });
};
