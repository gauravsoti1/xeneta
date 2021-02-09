import { PORT_ENDPOINT } from "endpoints";
import { sendRequest } from "util/sendRequest";

export function getPorts() {
  const url = PORT_ENDPOINT;
  return sendRequest({ url, method: "GET" }).then((res) => {
    console.log("ports ===", res);
    return res;
  });
}
