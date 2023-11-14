"use strict";

const localStorageHelper = (function () {
  let keySuffix = "List";

  const getKey = function (storedClass) {
    return storedClass.name + keySuffix;
  };

  const getList = function (storedClass) {
    const stored = localStorage.getItem(getKey(storedClass));
    if (stored === null) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((obj) => new storedClass(obj));
  };

  const storeList = function (storedClass, storedClassList) {
    const simpleList = storedClassList.map((instance) =>
      instance.toPlainObject()
    );
    localStorage.setItem(getKey(storedClass), JSON.stringify(simpleList));
  };

  return {
    getList,
    storeList,
  };
})();

export default localStorageHelper;
