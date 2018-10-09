import {urlInit,credentials,jsonHeaders} from './fetchConst';

export const FetchLogin = async (login) => {
  try {
    let Response = await fetch(urlInit + 'user/login',{
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify(login),
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
    alert('Ocorreu um erro.');
    return null;
  }
}