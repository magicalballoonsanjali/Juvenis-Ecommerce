import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name:{ type:String, required:true},
    email:{type:String,required:true,unique:true},
    imageURL:{ type:String, required: false, default: ""},
    cartItems:{type:Object,default:{}},
    isSeller:{
        type:Boolean,
        default:false
    },
     wishlist: [{ type: String }],
    
},{minimize:false});


const User = mongoose.models.User || mongoose.model("User",userSchema);


export default User