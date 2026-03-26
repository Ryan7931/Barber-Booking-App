router.post("/register", async (req, res) => {
  const { naam, email, password } = req.body;

  try {
    // email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Ongeldig email adres" });
    }

    // password validatie
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: "Wachtwoord moet minimaal 8 tekens, 1 hoofdletter en 1 speciaal teken bevatten"
      });
    }

    // check bestaande email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email bestaat al" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      naam,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});