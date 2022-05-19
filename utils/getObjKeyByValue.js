const getObjKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);
export default getObjKeyByValue;
