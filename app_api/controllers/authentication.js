/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

// Predefined generic function for server response in feature modules

const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};