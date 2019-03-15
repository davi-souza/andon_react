import post from "../../post";
import config from "../../config";
import { getProjectId } from "../../../localStorage/projectId";

const route = "warning/setup/";

export const stepOne = async (payload) => {
  try {
    const projectId = getProjectId();
    if(!projectId) {
      alert("Por favor, insira um ID do projeto.");
      return null;
    }
    payload.projectId = projectId;
    let response = await post(`${route}/1`, payload);
    const ok = response.ok;
    response = await response.json();
    if(!ok) {
      alert(response.msg);
      return null;
    }
    return response.data;
  } catch (e) {
    config.logError();
    return null;
  }
}

export const stepTwo = async (payload) => {
  try {
    const projectId = getProjectId();
    if(!projectId) {
      alert("Por favor, insira um ID do projeto.");
      return null;
    }
    payload.projectId = projectId;
    let response = await post(`${route}/2`, payload);
    const ok = response.ok;
    response = await response.json();
    if(!ok) {
      alert(response.msg);
      return null;
    }
    return response.data;
  } catch (e) {
    config.logError();
    return null;
  }
}
