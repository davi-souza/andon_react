import {urlInit,credentials,jsonHeaders} from './fetchConst';

export const FetchSendWarning = async (warning) => {
  try {
    let Response = await fetch(urlInit + 'warning/create',{
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