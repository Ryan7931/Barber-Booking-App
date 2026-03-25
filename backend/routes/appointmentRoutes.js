import express from "express";
import Appointment from "../models/Appointment.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { datum, tijd, service } = req.body;

  try {
    const appointment = new Appointment({
      user_id: req.userId,
      datum,
      tijd,
      service,
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user_id: req.userId,
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.user_id.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    appointment.status = "Geannuleerd";
    await appointment.save();

    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;