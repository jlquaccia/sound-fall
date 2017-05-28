var mongoose = require('mongoose');

module.exports = mongoose.model('Placeholder', {
  name: {type: String, default: ''}
});