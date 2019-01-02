import get from '../../../get';
import { getProjectId } from '../../../../localStorage/projectId';

const filter = {
  projectId: getProjectId(),
};

export const getPlaces = async () => {
  try {
    const route = 'place';
    let response = await get(route,filter);
    const ok = response.ok;
    response = await response.json();
    if(ok) {
      return response.data;
    } else {
      alert(response.msg);
      return null;
    }
  } catch (err) {
    alert('Houve um erro.');
    return null;
  }
}