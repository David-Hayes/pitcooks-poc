const mongoose = require('mongoose');

const recipeschema = mongoose.Schema({

  title: {
    type: String,
    required: true
  }

});

// create the model for recipes and expose it to our app
module.exports = mongoose.model('Recipes', recipeschema);
