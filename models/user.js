import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);

export default User;