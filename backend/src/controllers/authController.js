const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { nom, email, mot_de_passe, rôle } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({ nom, email, mot_de_passe: hashedPassword, rôle });

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!match) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id, rôle: user.rôle }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
