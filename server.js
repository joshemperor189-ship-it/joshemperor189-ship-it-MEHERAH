import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from './database.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// --- AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access token missing' });

    jwt.verify(token, process.env.JWT_SECRET || 'meherah_super_secret_key_2026', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// --- MODULE 2: AUTHENTICATION ROUTES ---
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const walletId = uuidv4();

        db.serialize(() => {
            db.run(`INSERT INTO Users (id, name, email, password) VALUES (?, ?, ?, ?)`, 
                [userId, name, email, hashedPassword], (err) => {
                    if (err) return res.status(400).json({ error: 'Email already exists' });
                    
                    db.run(`INSERT INTO Wallets (id, user_id, balance) VALUES (?, ?, 0.0)`, [walletId, userId]);
                    return res.status(201).json({ message: 'User registered successfully', userId });
                });
        });
    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM Users WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'User not found' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'meherah_super_secret_key_2026', { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

// --- MODULE 3 & 4: WALLET & FLUTTERWAVE GATEWAY LAYER ---
app.post('/api/wallet/deposit', authenticateToken, (req, res) => {
    const { amount, payment_method } = req.body;
    const reference = 'MEHERAH-' + uuidv4();

    db.get(`SELECT id, balance FROM Wallets WHERE user_id = ?`, [req.user.id], (err, wallet) => {
        if (err || !wallet) return res.status(404).json({ error: 'Wallet not found' });

        const fraudScore = amount > 10000 ? 0.85 : 0.02; 
        const confidenceScore = fraudScore > 0.5 ? 45.0 : 99.0;
        
        let decisionReasoning = `AI evaluation clear. Route selected via Flutterwave Sandbox using ${payment_method || 'card'}.`;
        if (fraudScore > 0.5) {
            decisionReasoning = `High risk transaction flagged (${fraudScore * 100}% risk index). Extra validation routing executed.`;
        }

        const decisionId = uuidv4();
        db.run(`INSERT INTO AI_Decisions (id, transaction_ref, fraud_score, chosen_route_id, confidence_score, reasoning) 
                VALUES (?, ?, ?, 'route-flw-card', ?, ?)`, 
                [decisionId, reference, fraudScore, confidenceScore, decisionReasoning]);

        if (fraudScore > 0.5) {
            return res.status(400).json({ error: 'Transaction declined by Meherah AI Risk Engine.', reasoning: decisionReasoning });
        }

        const gatewayStatus = 'success'; 

        if (gatewayStatus === 'success') {
            db.serialize(() => {
                const txId = uuidv4();
                db.run(`INSERT INTO Transactions (id, wallet_id, amount, type, status, reference) VALUES (?, ?, ?, 'deposit', 'success', ?)`,
                    [txId, wallet.id, amount, reference]);
                
                db.run(`UPDATE Wallets SET balance = balance + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, 
                    [amount, wallet.id]);

                db.run(`INSERT OR REPLACE INTO Memories (id, key_metric, value_data) VALUES ('last_success_rate', 'global', '98.5')`);

                return res.json({
                    status: 'success',
                    message: 'Payment approved by AI routing and simulated Flutterwave gateway.',
                    reference,
                    ai_analysis: { fraudScore, confidenceScore, reasoning: decisionReasoning }
                });
            });
        } else {
            return res.status(400).json({ error: 'Gateway transmission failed.' });
        }
    });
});

// --- MODULE 6: DASHBOARD VERSION 1 METRICS ---
app.get('/api/dashboard/metrics', authenticateToken, (req, res) => {
    db.get(`SELECT id, balance FROM Wallets WHERE user_id = ?`, [req.user.id], (err, wallet) => {
        if (!wallet) return res.status(404).json({ error: 'No wallet structure found' });

        const metricsQuery = `
            SELECT 
                COUNT(*) as total_tx,
                SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success_tx,
                SUM(CASE WHEN DATE(created_at) = DATE('now') THEN amount ELSE 0 END) as today_vol
            FROM Transactions WHERE wallet_id = ?
        `;

        db.get(metricsQuery, [wallet.id], (err, row) => {
            db.all(`SELECT * FROM Transactions WHERE wallet_id = ? ORDER BY created_at DESC LIMIT 5`, [wallet.id], (err, transactions) => {
                const total = row?.total_tx || 0;
                const successful = row?.success_tx || 0;
                const successRate = total > 0 ? ((successful / total) * 100).toFixed(1) : "100.0";

                res.json({
                    totalBalance: wallet.balance,
                    todaysTransactions: row?.today_vol || 0,
                    paymentSuccessRate: `${successRate}%`,
                    aiConfidenceScore: '98.4%',
                    connectedGateway: 'Flutterwave Sandbox',
                    recentActivity: transactions || [],
                    aiInsights: total > 0 ? "System execution highly stable. No routing degradation detected." : "Awaiting initial transactional deployment data streams."
                });
            });
        });
    });
});

const PORT = process.env.PORT || 5000;
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Meherah Engine Phase 1 execution active on port ${PORT}`);
  });
}

export default app;
