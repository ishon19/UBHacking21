const getRouteFromName = (name) => {
  const routeName = `request-${name.toLowerCase()}`;
  return routeName;
};

export { getRouteFromName };
