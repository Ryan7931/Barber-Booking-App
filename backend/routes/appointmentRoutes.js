import express from "express";
import Appointment from "../models/Appointment.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { datum, tijd, service } = req.body;

  try {
    const selectedDate = new Date(datum);
    const now = new Date();

    // ❌ verleden blokkeren
    if (selectedDate < now) {
      return res.status(400).json({ msg: "Datum ligt in het verleden" });
    }

    // tijd check
    const hour = parseInt(tijd.split(":")[0]);

    if (hour < 9 || hour >= 17) {
      return res.status(400).json({
        msg: "Alleen afspraken tussen 09:00 en 17:00"
      });
    }

    const appointment = new Appointment({
      user_id: req.userId,
      datum,
      tijd,
      service
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
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