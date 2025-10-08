import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true,ref:'User'},
    items:[{
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        quantity:{type:Number,required:true}
    },
],
    amount:{type:Number,required:true},
    address:{type:mongoose.Schema.Types.ObjectId,ref:'Address',required:true},
    status:{type:String,required:true, default:'Order Placed'},
    date:{type:Number,required:true},
     paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    paymentIntentId: { type: String }, // Stripe Payment Intent ID
    stripeSessionId: { type: String }, // Stripe Checkout Session ID
})

const Order = mongoose.models.Order || mongoose.model('Order',orderSchema)

export default Order