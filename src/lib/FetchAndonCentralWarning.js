import {urlInit,credentials, jsonHeaders, catchErro} from './fetchConst';

export const FetchGetWarnings = async (teamId) => {
  try {
    let Response = await fetch(urlInit + 'warning/team/'+String(teamId),{
      method: 'get',
      credentials,
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    } else {
      Response = await Response.json();
      return Response.data;
    }
  } catch (e) {
    catchErro();
  } 
}

export const FetchResolveWarning = async ({userId,warningId}) => {
  try {
    let Response = await fetch(urlInit + 'warning/resolve/',{
      method: 'put',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({
        userId,
        warningId
      })
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return false;
    } else {
      Response = await Response.json();
      return true;
    }
  } catch (e) {
    return catchErro();
  } 
}