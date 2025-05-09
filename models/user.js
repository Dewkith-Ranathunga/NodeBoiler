import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default:"https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg",
  },
});

const User = mongoose.model("users", userSchema);

export default User;
