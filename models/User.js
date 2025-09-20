import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name:{ type:String, required:true},
    email:{type:String,required:true,unique:true},
    imageURL:{ type:String, required:true},
    cartItems:{type:String,required:true},
    
},{minimize:false});

const User = mongoose.models.user || mongoose.model("user",userSchema);


export default User