import config from "../../../config";
import get from "../../../get";

export const getLeafUsers = async (projectId) => {
  const route = [
    "central/",
    projectId,
    "/users"
  ].join("");
  try {
    let response = await get(route,{});

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

export const getIntermediateUsers = async (projectId) => {
  const route = [
    "central/",
    projectId,
    "/intermediates"
  ].join("");
  try {
    let response = await get(route,{});

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