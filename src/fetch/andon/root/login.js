import post from "../../post";
import config from "../../config";
import { getProjectId } from "../../../localStorage/projectId";
import getToken from "../../../firebase/getToken";

const route = "user/login";

export default async (payload) => {
  try {
    const token = await getToken();
    const projectId = getProjectId();
    if(!projectId) {
      alert("Por favor, insira um ID do projeto.");
      return null;
    }
    payload.projectId = projectId;
    payload.token = token;
    let response = await post(route,payload);
    const ok = response.ok;
    response = await response.json();
    if(!ok) {
      alert(response.msg);
      return null;
    }
    return response.data;
  } catch (err) {
    alert("Houve um erro.")
    config.logError(err);
    return null;
  }
}