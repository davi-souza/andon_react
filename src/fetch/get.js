import config from "./config";

export default (route, filter = {}) => {
  return fetch([
    config.prefix,
    route,
    `?filter=`,
    JSON.stringify(filter)
  ].join(''), {
    method: "get",
    credentials: config.credentials,
  })
}