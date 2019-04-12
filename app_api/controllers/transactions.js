/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-useless-concat */

// Below are the predefined generic functions to use in the feature modules

const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

function timeStamp() {
  return `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}  ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`;
}

const hasId = function (arr, id) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === id) {
      return true;
    }
  }
  return false;
};

// eslint-disable-next-line func-names