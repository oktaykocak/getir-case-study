/*!
 * getir-case-study-ok
 * Copyright(c) 2021 Oktay Koçak
 * Do What The F*ck You Want To Public Licensed
 */

var Utils = require("../utils/utils");
var MongoDB = require("../utils/mongodb.js");
var MONGODB = new MongoDB();

/**
 * Return records from database call.
 *
 * @param {Object} req
 * @param {ServerResponse} res
 * @return {ServerResponse}
 * @public
 */

exports.getRecords = async function (req, res) {
  var response = Utils.validateParams(req.body);
  if (response.code != 0) {
    res
      .status(response.httpCode)
      .json({ code: response.code, msg: response.msg });
  } else {
    MONGODB.executeQuery(req.body)
      .then((response) => {
        res.status(200).json({ code: 0, msg: "Success", records: response });
      })
      .catch((error) => {
        res.status(error.http_code).json({
          code: error.code,
          msg: error.msg,
        });
      });
  }
};

/**
 * Handles undefined API paths.
 *
 * @param {Object} req
 * @param {ServerResponse} res
 * @return {ServerResponse}
 * @public
 */

exports.undefinedpath = function (req, res) {
  res.status(404).json({ code: 2, msg: "Path not found" });
};

/**
 * Handles unavailable request methods.
 *
 * @param {Object} req
 * @param {ServerResponse} res
 * @return {ServerResponse}
 * @public
 */

exports.undefinedmethod = function (req, res) {
  res.status(404).json({ code: 3, msg: "Method not allowed" });
};
