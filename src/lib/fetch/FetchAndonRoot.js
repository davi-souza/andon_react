import {urlInit,credentials} from './fetchConst';

export const FetchGetSession = async () => {
  let fetchResult = await fetch(urlInit + 'user/session',{
    method: 'get',
    credentials,
  });
  return fetchResult;
}