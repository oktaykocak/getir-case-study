/*!
 * getir-case-study-ok
 * Copyright(c) 2021 Oktay Koçak
 * Do What The F*ck You Want To Public Licensed
 */

const { MongoClient } = require("mongodb");

let CLIENT;
let DB;

const URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";

class MongoDB {
  /**
   * Return records from database call.
   *
   * @param {Object} data
   * @return {Promise}
   * @public
   */

  async executeQuery(data) {
    let that = this;
    return new Promise(async function (resolve, reject) {
      try {
        if (DB === undefined) {
          await that.createConnection();
        }

        DB.collection("records")
          .aggregate([
            {
              $match: {
                createdAt: {
                  $gte: new Date(data.startDate),
                  $lte: new Date(data.endDate),
                },
              },
            },
            {
              $project: {
                _id: 0,
                key: "$key",
                createdAt: "$createdAt",
                totalCount: { $sum: "$counts" },
              },
            },
            {
              $match: {
                totalCount: {
                  $lte: parseInt(data.maxCount),
                  $gte: parseInt(data.minCount),
                },
              },
            },
          ])
          .toArray(function (err, records) {
            if (err) {
              reject({
                code: 11,
                msg: "Internal server error",
                http_code: 500,
              });
            } else {
              resolve(records);
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Creates a database connection.
   *
   * @return {Promise}
   * @public
   */

  createConnection() {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(
        URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (err, client) {
          if (err) {
            var object = {
              code: 10,
              msg: "Internal server error",
              http_code: 500,
            };
            reject(object);
          } else {
            CLIENT = client;
            DB = client.db();
            resolve();
          }
        }
      );
    });
  }

  /**
   * Closes database connection during unit tests.
   *
   * @return null
   * @public
   */

  closeConnection() {
    if (CLIENT) {
      CLIENT.close();
    }
  }
}

module.exports = MongoDB;
