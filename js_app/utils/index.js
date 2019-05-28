const expect = require('chai').expect;

const isObjWithProps = obj => !!obj && !!Object.keys(obj).length && typeof obj === 'object' && !Array.isArray(obj);

const checkFormat = function cicle(proto, object) {
  for (const key in proto) {
    if (isObjWithProps(proto[key])) {
      cicle(proto[key], object[key])
    } else {
      expect(object).to.have.property(key)
    }
  }
};

const filterByValue = (filter, format) => {
  const field = filter && filter.field;
  const value = filter && filter.value;
  if(!field && !!value) return null;

  const type = findValueByKeyInObject(format, field);

  return item => {
    const val = type === 'number' ? parseInt(value):value;

    return findValueByKeyInObject(item, field) === val;
  };
};

const findValueByKeyInObject = (object, searchedKey) => {
  if (object[searchedKey]) return object[searchedKey];
  if (!isObjWithProps(object)) return;

  for (const key in object) {
    if (key === searchedKey) {
      return object[searchedKey];
    } else if (isObjWithProps(object[key] )) {
      return findValueByKeyInObject(object[key]);
    }
  }
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createFilter = (filterParams) => {
  const field = filterParams && filterParams.field;
  let value = filterParams && filterParams.value;

  return field && value
    && (results => results.data.filter(e => findValueByKeyInObject(e, filterParams.field) === filterParams.value));
};

const getData = e => e.data;

const filterByMatchingField = ({list, matchField, value}) => {

};

module.exports = {
  createFilter,
  getData,
  getRandomInRange,
  isObjWithProps,
  checkFormat,
  filterByValue,
  findValueByKeyInObject,
  filterByMatchingField
};