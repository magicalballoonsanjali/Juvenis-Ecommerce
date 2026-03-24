import mongoose from "mongoose";

const notifySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  email: {
    type: String,
    required: true,
  },
  notified: {
    type: Boolean,
    default: false,
  },
});

const Notify =
  mongoose.models.Notify || mongoose.model("Notify", notifySchema);

export default Notify;