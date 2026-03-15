import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import authenticate from './api/middleware/auth.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// ========== AUTH ==========
app.post('/api/register', async (req, res) => {
    const { gmail, username, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (gmail, username, password) VALUES ($1, $2, $3) RETURNING id, username',
            [gmail, username, hashed]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { gmail, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE gmail = $1', [gmail]);
        if (user.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, user.rows[0].password);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.rows[0].id, username: user.rows[0].username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        
        // Kirim token juga di body agar terlihat di Postman
        res.json({ 
            message: 'Login success', 
            user: { id: user.rows[0].id, username: user.rows[0].username },
            token: token // <-- tambahkan ini
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

app.get('/api/me', authenticate, (req, res) => {
    res.json({ user: req.user });
});

// ========== MAHASISWA ==========
app.get('/api/mahasiswa', authenticate, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM mhs_tb ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/mahasiswa', authenticate, async (req, res) => {
    const { name, nim, jurusan, ipk, isActive } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO mhs_tb (name, nim, jurusan, ipk, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, nim, jurusan, ipk, isActive ?? true]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/mahasiswa/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { name, nim, jurusan, ipk, isActive } = req.body;
    try {
        const result = await pool.query(
            'UPDATE mhs_tb SET name = $1, nim = $2, jurusan = $3, ipk = $4, isActive = $5 WHERE id = $6 RETURNING *',
            [name, nim, jurusan, ipk, isActive, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Data not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/mahasiswa/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM mhs_tb WHERE id = $1', [id]);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/mahasiswa/:id/toggle', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE mhs_tb SET isActive = NOT isActive WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));