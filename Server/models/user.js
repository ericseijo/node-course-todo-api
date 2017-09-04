const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

// Override .toJSON to only return what we want
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject(); // take mongoose var and convert it to object

  return _.pick(userObject, ['_id', 'email']);  //Only return this data
};

// Instance method
// Arrow functions do not bind a this keyword
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({
    access: access,
    token: token  
  });

  // return value so can be chained
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  user = this;

  return user.update({
    // $pull Let's you remove items from an array that meet certain criteria
    $pull: {
      tokens: {
        token: token
      }
    }
  });
  
};

//.statics turns method into a model method as opposed to
//.methods which creates an instance method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded; // undefined on purpose so that jwt can throw an error

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  // return a promise so we can chain
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    //Bcrypt only supports callbacks 
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  // don't rehash if not changed
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });

  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

// var newUser = new User({
//   email: 'eric@codephreak.com'
// });

// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save user');
// });

module.exports = {User}