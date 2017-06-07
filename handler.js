const mongoose = require('mongoose');
const bluebird = require('bluebird');
const validator = require('validator');
const FuckModel = require('./model/Fuck.js');

mongoose.Promise = bluebird;

const mongoString = process.env.mongo_endpoint;

module.exports.find = (event, context, callback) => {
  const db = mongoose.connect(mongoString).connection;
  const slug = event.pathParameters.id;

  db.once('open', () => {
    FuckModel
      .find({ Slug: slug })
      .then((item) => {
        callback(null, { statusCode: 200, body: JSON.stringify({ success: true, fuckoff: item }) });
      })
      .catch((err) => {
        callback(err, { statusCode: 200, body: JSON.stringify({ success: false }) });
      })
      .finally(() => {
        db.close();
      });
  });
};

