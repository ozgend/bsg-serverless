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
      .findOne({ Slug: slug })
      .then((item) => {
        callback(null, { statusCode: 200, body: JSON.stringify({ success: true, fuckoff: item.toResponseModel() }) });
      })
      .catch((err) => {
        console.log(err);
        callback(err, { statusCode: 200, body: JSON.stringify({ success: false }) });
      })
      .finally(() => {
        db.close();
      });
  });
};

function convertToResponseModel(dbo) {
  return { To: dbo.To, From: dbo.From, Message: dbo.Message, Time: dbo.Time, Timestamp: dbo.Timestamp, views: dbo.views };
}

FuckModel.prototype.toResponseModel = function () {
  return { To: this.To, From: this.From, Message: this.Message, Time: this.Time, Timestamp: this.Timestamp, views: this.views };
}

/*
String.prototype.sanitize = function () {
  return validator.stripLow(this);
}

Date.utcNow = function () {
  var now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
}
*/