import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    maxlength: 20
  },
  email:{
    type: String,
    required: true,
    unique:true,
    maxlength:50
  },
  address: {
    type: String,
    required: true,
    maxlength:60,
  },
  phone: {
    type:String,
    required: true,
    maxlength:14
  },
  password: {
    type:String,
    required: true,
    trim: true,
    minlength: 5
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", function (next){
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (error, salt) {
      if (error) {
        return next(error) 
      } else {
        bcrypt.hash(user.password, salt, function (error, hash){
          if (error) {
            return next(error);
          } else {
            user.password = hash;
            next();
          }
        })
      }
    })
  } else {
    return next();
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword,this.password,function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

const User = mongoose.model("User", userSchema);

export default User;