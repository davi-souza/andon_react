import {urlInit,credentials, jsonHeaders, catchErro} from './fetchConst';

export const FetchGetTeams = async (projectId) => {
  try {
    let Response = await fetch(urlInit + 'team/central?filter=' + JSON.stringify({projectId}),{
      method: 'get',
      credentials,
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    }
    Response = await Response.json();
    return Response.data;
  } catch (error) {
    return catchErro();
  }
}

export const FetchAddTeam = async (teamObj) => {
  try {
    let Response = await fetch(urlInit + 'team/central/create',{
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify(teamObj),
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    }
    Response = await Response.json();
    return Response.data;
  } catch (error) {
    return catchErro();
  }
}

export const FetchEditTeam = async (teamObj) => {
  try {
    let Response = await fetch(urlInit + 'team/central/update',{
      method: 'put',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({
        filter: {
          id: teamObj.id,
        },
        updates: teamObj,
      }),
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    }
    Response = await Response.json();
    return true;
  } catch (error) {
    return catchErro();
  }
}