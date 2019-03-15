import {urlInit,credentials,jsonHeaders} from './fetchConst';

export const FetchSendWarning = async (warning) => {
  try {
    let Response = await fetch(`${urlInit}warning`,{
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify(warning),
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    } else {
      return true;
    }
  } catch (e) {
    alert('Houve um erro.');
    return null;
  }
}

export const FetchGetReasons = async (projectId) => {
  try {
    let Response = await fetch(`${urlInit}reason?filter=${JSON.stringify({projectId,active:true})}`,{
      method: 'get',
      credentials,
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null
    }
    Response = await Response.json();
    return Response.data;
  } catch (err) {
    alert('Houve um erro em carregar os motivos.');
    return null;
  }
}

export const FetchGetPlaces = async (userLogin, projectId) => {
  try {
    let Response = await fetch(`${urlInit}warning/setup/1`,{
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({projectId, userLogin})
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null
    }
    Response = await Response.json();
    return Response.data;
  } catch (err) {
    alert('Houve um erro em carregar os locais.');
    return null;
  }
}
