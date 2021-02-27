/*!
 * getir-case-study-ok
 * Copyright(c) 2021 Oktay Koçak
 * Do What The F*ck You Want To Public Licensed
 */

var api = require("../controllers/api.js");

/**
 * Exports app routes.
 *
 * @param {Object} app
 * @return {Function}
 * @api private
 */

module.exports = function (app) {
  app.route("/records").post(api.getRecords).all(api.undefinedmethod);
  app.all("*", api.undefinedpath);
};
