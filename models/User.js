import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name:{ type:String, required:true},
    email:{type:String,required:true,unique:true},
    imageURL:{ type:String, required: false, default: ""},
    cartItems:{type:Object,default:{}},

     wishlist: [{ type: String }],
    
},{minimize:false});


const User = mongoose.models.User || mongoose.model("User",userSchema);


export default User