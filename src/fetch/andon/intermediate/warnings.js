import get from "../../get";
import config from "../../config";

export default async (userId) => {
  const route = [
    "team/",
    userId.toString(),
    "/open/warnings"
  ].join("");

  try {
    let response = await get(route);
  
    if(!response.ok) {
      response = await response.json();
      alert(response.msg);
      return null;
    }

    response = await response.json();
    return response.data;

  } catch (error) {
    config.logError();
    return null;
  }
}