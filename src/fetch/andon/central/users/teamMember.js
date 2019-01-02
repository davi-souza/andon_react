import config from "../../../config";
import put from "../../../put";

export const addTeamMember = async (intermediateId, leafId) => {
  const route = [
    "team/",
    intermediateId,
    "/add/member/",
    leafId,
  ].join("");
  try {
    let response = await put(route,{});
    const ok = response.ok;

    if(ok) {
      return true;
    }

    alert(response.msg);

    return false;
  } catch (err) {
    config.logError();
    return false;
  }
}

export const removeTeamMember = async (intermediateId, leafId) => {
  const route = [
    "team/",
    intermediateId,
    "/remove/member/",
    leafId,
  ].join("");
  try {
    let response = await put(route,{});
    const ok = response.ok;

    if(ok) {
      return true;
    }

    alert(response.msg);

    return false;
  } catch (err) {
    config.logError();
    return false;
  }
}