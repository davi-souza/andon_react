import config from "../../config";
import get from "../../get";

export default async (projectId) => {
  const route = [
    "central/",
    projectId,
    "/warnings"
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