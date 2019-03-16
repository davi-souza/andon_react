import get from "../../../get";
import config from "../../../config";

export default async () => {
  const route = "kpi/warnings/open/qty";
  try {
    let response = await get(route,{});
    const ok = response.ok;
    response = await response.json();
    if(!ok) {
      config.logError(null);
      return null;
    }
    return response.data;
  } catch (error) {
    config.logError(error);
    return null
  }
}
