import {
  urlInit,
  credentials,
  jsonHeaders
} from './fetchConst';
import { getProjectId } from "../../localStorage/projectId";

export const FetchGetLeaf = async (login, location) => {
  try {
    let Response = await fetch(`${urlInit}warning-setup/leaf`, {
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({
        projectId: getProjectId(),
        login,
        location,
        hour: (new Date()).getHours()
      })
    });
    if (!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null
    }
    Response = await Response.json();
    return Response.data;
  } catch (err) {
    alert('Houve um erro em carregar os dados do usuário.');
    return null;
  }
}

export const FetchGetReasons = async (user) => {
  try {
    let Response = await fetch(`${urlInit}warning-setup/reasons`, {
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({
        ...user,
        hour: (new Date()).getHours()
      })
    });
    if (!Response.ok) {
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

export const FetchGetPlaces = async (user) => {
  try {
    let Response = await fetch(`${urlInit}warning-setup/places`, {
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({
        ...user,
        hour: (new Date()).getHours()
      })
    });
    if (!Response.ok) {
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

export const FetchSendWarning = async (warning, user) => {
  try {
    let Response = await fetch(`${urlInit}warning-setup`, {
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({
        ...warning,
        ...user,
        hour: (new Date()).getHours()
      }),
    });
    if (!Response.ok) {
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
