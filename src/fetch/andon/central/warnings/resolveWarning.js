import config from "../../../config";
import put from "../../../put";

export default async ({userId,warningId}) => {
  const route = [
    "warning/",
    "resolve"
  ].join("");
  try {
    let response = await put(route,{
      userId, warningId,
    });

    const ok = response.ok;
    response = await response.json();

    if(ok) {
      return true;
    }
    alert(response.msg);
    return false;
  } catch (err) {
    config.logError(err);
    return false;
  }
}
