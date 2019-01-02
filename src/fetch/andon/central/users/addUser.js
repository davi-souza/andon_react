import config from "../../../config";
import post from "../../../post";
import { getProjectId } from '../../../../localStorage/projectId';

export default async (userInfo) => {
  const route = [
    "user"
  ].join("");
  try {
    let response = await post(route, { ...userInfo, projectId:getProjectId() } );

    const ok = response.ok;
    response = await response.json();

    if(ok) {
      return response.data;
    }
    alert(response.msg);
    return null;
  } catch (err) {
    config.logError();
    return null;
  }
}