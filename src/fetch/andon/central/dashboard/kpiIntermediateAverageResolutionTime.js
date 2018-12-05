import get from "../../../get";
import config from "../../../config";

export default async () => {
  const route = "kpi/top/intermediates/by/average/time/of/resolved/warnings";
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