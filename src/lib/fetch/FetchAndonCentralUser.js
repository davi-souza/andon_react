import {urlInit,credentials, jsonHeaders, catchError} from './fetchConst';

export const FetchGetUsers = async (projectId) => {
  try {
    let Response = await fetch(urlInit + `central/${projectId}/users`,{
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
    catchError();
  } 
}

export const FetchUpdateUser = async (oldUser,newUser) => {
  let filter = {
    id: oldUser.id,
  };
  let updates = {};
  for(let key in newUser) {
    if(key === 'teams') {
      if(newUser[key] && newUser[key][0]) {
        if(newUser[key][0] !== oldUser[key][0]) {
          updates[key] = [];
          updates[key].push(newUser[key][0]);
        }
      }
    } else {
      if(newUser[key] !== oldUser[key]) {
        updates[key] = newUser[key].trim();
      }
    }
  }
  try {
    let Response = await fetch(urlInit + 'user/central/update',{
      method: 'put',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify({
        filter,updates,
      })
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    } else {
      return true;
    }
  } catch (e) {
    return catchError();
  }
}

export const FetchAddUser = async (newUser) => {
  try {
    let Response = await fetch(urlInit+'user/central/add', {
      method: 'post',
      credentials,
      headers: jsonHeaders,
      body: JSON.stringify(newUser),
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    } else {
      Response = await Response.json();
      return Response.data;
    }
  } catch(e) {
    return catchError();
  }
}

export const FetchDeleteUser = async (userId) => {
  try {
    let Response = await fetch(urlInit+'user/central/delete/'+String(userId), {
      method: 'delete',
      credentials,
    });
    if(!Response.ok) {
      Response = await Response.json();
      alert(Response.msg);
      return null;
    } else {
      return true;
    }
  } catch(e) {
    return catchError();
  }
}