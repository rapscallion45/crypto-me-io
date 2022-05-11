const getObjMaxProp = (obj) => {
  const values = Object.values(obj);
  const max = Math.max(...values);
  return max;
};
export default getObjMaxProp;
