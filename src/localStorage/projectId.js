const projectIdKey = "project-id";

export const getProjectId = () => {
  if(typeof(window.Storage) !== "undefined") {
    return window.localStorage.getItem(projectIdKey);
  }
  return null;
}

export const setProjectId = (value) => {
  if(typeof(window.Storage) !== "undefined") {
    window.localStorage.setItem(projectIdKey, value);
    return true;
  }
  return false;
}
