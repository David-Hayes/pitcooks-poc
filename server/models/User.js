const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({

  local: {
    email: String,
    password: String
  }

});

// generating a hash
userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
userSchema.methods.validPassword = (password) => bcrypt.compareSync(password, this.local.password);

// create the model for users and expose it to our app
module.exports = mongoose.model('Users', userSchema);
