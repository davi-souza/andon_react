import get from "../../../get";
import config from "../../../config";

export default async () => {
  const route = "kpi/top/warnings/qty/by/reason";
  try {
    let response = await get(route,{});
    const ok = response.ok;
    response = await response.json();
    if(!ok) {
      config.logError();
      return [];
    }
    return response.data;
  } catch (error) {
    config.logError();
    return [];
  }
}