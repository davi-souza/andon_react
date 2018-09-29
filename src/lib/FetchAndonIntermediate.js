import {urlInit,credentials,jsonHeaders} from './fetchConst';

export const FetchIntermediateGetWarning = async (teamId) => {
  try {
    let Response = await fetch(urlInit + 'warning/team/'+String(teamId),{
      method: 'get',
      credentials,
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return [];
    } else {
      Response = await Response.json();
      return Response.data;
    }
  } catch (e) {
    alert('Houve um erro.');
    return [];
  }
  
}

export const FetchIntermediateResolveWarning = async (payload) => {
  try {
    let Response = await fetch(urlInit + 'warning/resolve',{
      method: 'put',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    } else {
      // Response = await Response.json();
      // alert(Response.msg);
      return true;
    }
  } catch (e) {
    alert('Houve um erro.');
    return null;
  }
}