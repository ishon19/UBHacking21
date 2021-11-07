const getRouteFromName = (name) => {
  const routeName = `request-${name.toLowerCase()}`;
  return routeName;
};

const checkIfUserLoggedIn = async () => {
  const userInfo = await localStorage.getItem("userInfo");
  if (userInfo) {
    return true;
  }
  return false;
};

const getUserId = async () => {
  const userInfo = await localStorage.getItem("userInfo");
  if (userInfo) {
    const userInfoParsed = JSON.parse(userInfo);
    return userInfoParsed.uid;
  }
  return null;
};

const getUserName = async () => {
  const userInfo = await localStorage.getItem("userInfo");
  if (userInfo) {
    const userInfoParsed = JSON.parse(userInfo);
    return userInfoParsed.displayName;
  }
  return null;
};

export { getRouteFromName, checkIfUserLoggedIn, getUserId, getUserName };
