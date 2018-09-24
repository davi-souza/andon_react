import {urlInit,credentials,jsonHeaders} from './fetchConst';

export const FetchCentralWarnings = async (projectId) => {
  let fetchResult = await fetch(urlInit + 'warning/central?filter=' + JSON.stringify({projectId}),{
    method: 'get',
    credentials,
  });
  return fetchResult;
}
export const FetchCentralResolveWarning = async(userId,warningId) => {
  let fetchResult = await fetch(urlInit + 'warning/resolve',{
    method: 'put',
    headers: jsonHeaders,
    credentials,
    body: JSON.stringify({userId,warningId}),
  });
  return fetchResult;
}

export const FetchCentralUsers = async (projectId) => {
  let fetchResult = await fetch(urlInit + 'user/central?filter=' + JSON.stringify({projectId}),{
    method: 'get',
    credentials,
  });
  return fetchResult;
}
export const FetchCentralEditUser = async (userObj) => {
  let fetchResult = await fetch(urlInit + 'user/central/update',{
    method: 'put',
    credentials,
    headers: jsonHeaders,
    body: JSON.stringify({
      filter: {
        id: userObj['ID'],
      },
      updates: userObj,
    }),
  });
  return fetchResult;
}
export const FetchCentralDeleteUser = async (id) => {
  let fetchResult = await fetch(urlInit + 'user/delete',{
    method: 'delete',
    credentials,
    headers: jsonHeaders,
    body: JSON.stringify({
      filter: { id },
    }),
  });
  return fetchResult;
}
export const FetchCentralAddUser = async (userObj) => {
  let fetchResult = await fetch(urlInit + 'user/central/add',{
    method: 'post',
    credentials,
    headers: jsonHeaders,
    body: JSON.stringify(userObj),
  });
  return fetchResult;
}

export const FetchCentralTeams = async (projectId) => {
  let fetchResult = await fetch(urlInit + 'team/central?filter=' + JSON.stringify({projectId}),{
    method: 'get',
    credentials,
  });
  return fetchResult;
}
export const FetchCentralAddTeam = async (teamObj) => {
  let fetchResult = await fetch(urlInit + 'team/central/add',{
    method: 'post',
    credentials,
    headers: jsonHeaders,
    body: JSON.stringify(teamObj),
  });
  return fetchResult;
}
export const FetchCentralEditTeam = async (teamObj) => {
  let fetchResult = await fetch(urlInit + 'team/central/update',{
    method: 'put',
    credentials,
    headers: jsonHeaders,
    body: JSON.stringify({
      filter: {
        id: teamObj['ID'],
      },
      updates: teamObj,
    }),
  });
  return fetchResult;
}