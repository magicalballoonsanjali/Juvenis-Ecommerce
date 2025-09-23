import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name:{ type:String, required:true},
    email:{type:String,required:true,unique:true},
    imageURL:{ type:String, required: false, default: ""},
    cartItems:{type:Object,default:{}},
    
},{minimize:false});

if (mongoose.models.user) {
  delete mongoose.models.user;
}

const User = mongoose.models.user || mongoose.model("user",userSchema);


export default User