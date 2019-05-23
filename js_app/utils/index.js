const expect = require('chai').expect;

const isObjWithProps = obj => !!obj && !!Object.keys(obj).length && typeof obj === 'object' && !Array.isArray(obj);

const checkFormat = function cicle(proto, o) {
  for (prop in proto) {
    if (isObjWithProps(proto[prop])) {
      cicle(proto[prop], o[prop])
    } else {
      expect(o).to.have.property(prop)
    }
  }
};

const filterByValue = (filter, format) => {
  const field = filter && filter.field;
  const value = filter && filter.value;
  const type = findValueByKeyInObject(format, field);

  const filterFn = item => {
    const val = type === 'number' ? parseInt(value):value;
    return findValueByKeyInObject(item, field) === val;
  };

  return field && value && filterFn;
};

const findValueByKeyInObject = (o, key) => {
  if (o[key]) return o[key];
  if (!isObjWithProps(o)) return;

  let value;

  function find(obj){
    for (prop in obj) {
      if (prop === key) {
        value = obj[key]
      } else {
        if (obj.hasOwnProperty(prop) && isObjWithProps(obj[prop])) {
          find(obj[prop])
        }
      }
    }
  }
  find(o);

  return value;

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

module.exports = {createFilter, getData, getRandomInRange, isObjWithProps, checkFormat, filterByValue, findValueByKeyInObject};