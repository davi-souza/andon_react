import get from '../../../get';
import post from '../../../post';
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

export const addPlace = async (placeName) => {
  try {
    const route = 'place';
    const payload = {
      name: placeName,
      projectId: getProjectId(),
      latitude: -0.1,
      longitude: -0.1,
    };
    let response = await post(route,payload);
    const ok = response.ok;
    response = await response.json();
    if(ok) {
      return response.data;
    } else {
      alert(response.msg);
      return null;
    }
  } catch (err) {
    alert("Houve um erro.");
    return null;
  }
}

export const addSubPlace = async(placeId, subPlaceId) => {
  const route = 'place/add/subplace';
  const payload = { placeId, subPlaceId };
  try {
    let response = await post(route, payload);
    const ok = response.ok;
    response = await response.json();
    if(ok) {
      return true;
    }
    alert(response.msg);
    return false;
  } catch (err) {
    alert("Houve um erro");
    return false;
  }
}

export const removeSubPlace = async(placeId, subPlaceId) => {
  const route = 'place/remove/subplace';
  const payload = { placeId, subPlaceId };
  try {
    let response = await post(route, payload);
    const ok = response.ok;
    response = await response.json();
    if(ok) {
      return true;
    }
    alert(response.msg);
    return false;
  } catch (err) {
    alert("Houve um erro");
    return false;
  }
}