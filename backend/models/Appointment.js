import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  datum: {
    type: Date,
    required: true,
  },
  tijd: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Gepland",
  },
});

export default mongoose.model("Appointment", appointmentSchema);