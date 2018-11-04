import get from "../../get";
import config from "../../config";

export default async () => {
  try {
    let response = await get("user/session");
  
    if(!response.ok) {
      console.log("[ANDON] error in fetching session.");
      return null;
    }
    
    response = await response.json();
  
    if(response.data) {
      console.log("[ANDON] session fetched.");
      return response.data;
    }
  
    console.log("[ANDON] no session.");
  } catch (error) {
    config.logError()
  }
}