import get from "../../get";
import config from "../../config";
import { getProjectId } from "../../../localStorage/projectId";

export default async () => {
  try {
    let response = await get("reason", { projectId: parseInt(getProjectId(),10), active: true });
    if(response.ok) {
      response = await response.json();
      return response.data;
    }
    response = await response.json();
    alert(response.msg);
    return null
  } catch (err) {
    alert("Houve um erro.");
    return null;
  }
}