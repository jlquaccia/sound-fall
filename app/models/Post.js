var mongoose = require('mongoose');

module.exports = function () {
  var PostSchema = new mongoose.Schema({
    title: String,
    artist: String,
    tags: [{type: String}]
  }, {collection: 'post'});

  var PostModel = mongoose.model('PostModel', PostSchema);

  var api = {

  };

  return api;
};