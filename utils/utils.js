/*!
 * getir-case-study-ok
 * Copyright(c) 2021 Oktay Koçak
 * Do What The F*ck You Want To Public Licensed
 */

var dateReg = /^\d{4}[-]\d{2}[-]\d{2}$/;

/**
 * Validates request body.
 *
 * @param {Object} body
 * @return {Object}
 * @public
 */

exports.validateParams = function (body) {
  var parametersList = ["startDate", "endDate", "minCount", "maxCount"];
  var missingParams = [];
  var invalidParams = [];
  var response = {
    code: 0,
  };
  for (var i = 0; i < parametersList.length; i++) {
    if (
      body[parametersList[i]] === undefined ||
      body[parametersList[i]] === null
    ) {
      missingParams.push(parametersList[i]);
    } else {
      if (i < 2 && !isValidDate(body[parametersList[i]])) {
        invalidParams.push(parametersList[i] + " must be a valid date string");
      } else if (i >= 2) {
        if (typeof body[parametersList[i]] !== "number") {
          invalidParams.push(parametersList[i] + " must be a number");
        } else if (body[parametersList[i]] < 0) {
          invalidParams.push(parametersList[i] + " must be an integer");
        }
      }
    }
  }

  // Check if we have any missing parameters
  if (missingParams.length > 0) {
    response = {
      code: 3,
      httpCode: 400,
      msg: "Parameter(s) missing: " + missingParams.join(","),
    };
    // Check if we have any invaliddddd parameters
  } else if (invalidParams.length > 0) {
    response = {
      code: 4,
      httpCode: 400,
      msg: "Invalid Parameter(s): " + invalidParams.join(","),
    };
  } else {
    // Check if we have any illogical constraints
    // Check count constraint
    if (body.minCount > body.maxCount) {
      response = {
        code: 5,
        httpCode: 400,
        msg: "maxCount must be greater than minCount",
      };
      // Check date constraint
    } else if (
      new Date(body.startDate).getTime() > new Date(body.endDate).getTime()
    ) {
      response = {
        code: 6,
        httpCode: 400,
        msg: "endDate must be greater than startDate",
      };
    }
  }
  // Continue with the request pipeline
  return response;
};

/**
 * Checks if input string is a valid formatted date.
 *
 * @param {string} date
 * @return {boolean}
 * @private
 */

isValidDate = function (date) {
  if (!date.match(dateReg)) return false;
  var d = new Date(date);
  return !isNaN(d.getTime());
};
