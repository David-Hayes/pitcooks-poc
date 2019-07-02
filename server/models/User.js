const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({

  local: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    recipes: {
      type: Array,
      default: []
    }
  }

});

// generating a hash
userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

// checking if password is valid
userSchema.methods.validPassword = function (password) { return bcrypt.compareSync(password, this.local.password); }; // eslint-disable-line func-names

// create the model for users and expose it to our app
module.exports = mongoose.model('Users', userSchema);
