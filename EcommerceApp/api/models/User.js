const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,

  addresses: [
    {
      name: String,
      mobileNo: String,
      houseNo: String,
      landmark: String,
      city: String,
      country: String,
      postalCode: String,
    },
  ],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
