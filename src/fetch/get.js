import config from "./config";
import { getProjectId } from "../localStorage/projectId";

export default (route, filter = {}) => {
  const projectId = getProjectId();
  if(!projectId) {
    alert("Insira o ID do seu projeto!");
    return null;
  }
  filter.projectId = projectId;
  return fetch([
    config.prefix,
    route,
    `?filter=`,
    JSON.stringify(filter)
  ].join(''), {
    method: "get",
    credentials: config.credentials,
  });
}