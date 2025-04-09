const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const multer = require('multer');
const path = require('path');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const fs = require('fs');
app.use(express.static('C:/Users/omar/Desktop/tenstep/src/assets/logo.png'));
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("327012043130-etgktdhdufcdhdpth1gd60ko7q1asakn.apps.googleusercontent.com"); // Remplacez ceci par votre Google Client ID
// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/omar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  Matricule: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "a1b2c3d4e5f6g7h8i9j0",
        { expiresIn: "1h" }
      );
      // Envoyer le token et les données de l'utilisateur en réponse
      res.json({ success: true, token, Matricule: user.Matricule });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

app.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    Matricule,
    password,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res
        .status(400)
        .json({ success: false, message: "Email already exist." });
      return;
    }

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      Matricule,
      password,
    });

    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// Update user
app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    });

    if (updatedUser) {
      res.json({ success: true, data: updatedUser });
    } else {
      res.status(404).json({ success: false, message: "Utilisateur introuvable." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.json({ success: true, data: user });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Adresse du serveur SMTP
      port: 587, // Port du serveur SMTP (peut varier en fonction du fournisseur)
      secure: false, // Si le serveur nécessite une connexion sécurisée (SSL/TLS)
      auth: {
        user: 'omarabidi@jendouba.r-iset.tn',
pass: 'dpY3xy4QMg'
      },tls: {
        ciphers: 'SSLv3'
      }
    });

    await transporter.sendMail({
      from: 'omarabidi@jendouba.r-iset.tn', // Votre adresse e-mail
      to,
      subject,
      text: message
    });

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (user) {
      res.json({ success: true });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});
// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
