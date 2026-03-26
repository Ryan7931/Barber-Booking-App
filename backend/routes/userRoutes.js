import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { naam, email, password } = req.body;

  if (!naam || !email || !password) {
    return res.status(400).json({ msg: "Alle velden zijn verplicht" });
  }

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Ongeldig email adres" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: "Wachtwoord moet minimaal 8 tekens, 1 hoofdletter en 1 speciaal teken bevatten",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email bestaat al" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ naam, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Alle velden zijn verplicht" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Ongeldige inloggegevens" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Ongeldige inloggegevens" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, naam: user.naam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;