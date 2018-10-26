import {urlInit,credentials, jsonHeaders, catchErro} from './fetchConst';

export const FetchIntermediateUsers = async (projectId) => {
  try {
    let Response = await fetch(urlInit + `central/${projectId}/intermediates`,{
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