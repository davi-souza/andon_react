import put from "../../put";
import config from "../../config";

const route = "warning/resolve";

export default async (userId,warningId) => {
  try {
    let response = await put(route, { userId, warningId });

    if(response.ok) {
      return true;
    }

    response = await response.json();
    alert(response.msg);
    return false;

  } catch (error) {
    config.logError();
    return false;
  }
}