import config from "./config";

export default (route, payload = {}) => {
  return fetch([
    config.prefix,
    route,
  ].join(""), {
    method: "put",
    credentials: config.credentials,
    headers: config.headers,
    body: JSON.stringify(payload),
  });
}