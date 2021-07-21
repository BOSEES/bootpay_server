import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemImage: {
    type:String,
    required: true
  },
  itemName:{
    type:String,
    unique:true,
    required: true
  },
  unique:{
    type: String,
    unique:true,
    required: true
  },
  price: {
    type: Number,
    required:true
  },
  qty:{
    type:Number,
    default:1,
  },
  category:[String]
})

const Item = mongoose.model("Item", itemSchema);

export default Item;