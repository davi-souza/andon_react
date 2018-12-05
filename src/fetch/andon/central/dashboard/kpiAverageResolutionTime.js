import get from "../../../get";
import config from "../../../config";

export default async () => {
  const route = "kpi/warnings/average/resolution";
  try {
    let response = await get(route,{});
    const ok = response.ok;
    response = await response.json();
    if(!ok) {
      config.logError();
      return null;
    }
    return response.data;
  } catch (error) {
    config.logError();
    return null
  }
}