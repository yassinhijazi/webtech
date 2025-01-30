import express from "express";
import { createClient } from "@libsql/client";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
});

// Registrierung
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Fehlende Daten" });

    try {
        const existingUser = await db.execute("SELECT username FROM users WHERE username = ?", [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Benutzername bereits vergeben" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        res.status(201).json({ message: "Registrierung erfolgreich" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Fehlende Daten" });

    try {
        const result = await db.execute("SELECT nutzer_id, username, password FROM users WHERE username = ?", [username]);
        if (result.rows.length === 0) return res.status(401).json({ error: "Ungültige Anmeldedaten" });

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: "Ungültige Anmeldedaten" });

        res.json({ success: true, user: { id: user.nutzer_id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
