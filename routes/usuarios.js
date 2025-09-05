const express = require("express");
const admin = require("firebase-admin");
if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

const router = express.Router();

// DELETE /usuarios/rol/socio/:email
router.delete("/rol/socio/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const snapshot = await db
      .collection("usuarios")
      .where("email", "==", email)
      .where("rol", "==", "socio")
      .get();
    if (snapshot.empty)
      return res.status(404).json({ error: "Socio no encontrado" });

    snapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /usuarios/rol/organizacion/:email
router.delete("/rol/organizacion/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const snapshot = await db
      .collection("usuarios")
      .where("email", "==", email)
      .where("rol", "==", "organizacion")
      .get();
    if (snapshot.empty)
      return res.status(404).json({ error: "Organización no encontrada" });

    snapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
