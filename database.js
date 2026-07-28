let sqlite3 = null;
try {
  sqlite3 = eval("require")("sqlite3");
} catch (e) {
  // SQLite optional
}

import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, process.env.DATABASE_FILE || './meherah.db');

class FallbackDb {
  constructor() {
    this.users = new Map();
    this.wallets = new Map();
    this.transactions = [];
    this.aiDecisions = [];
    this.memories = new Map();
  }

  serialize(fn) { if (fn) fn(); }
  run(sql, params = [], cb) {
    if (typeof params === 'function') { cb = params; params = []; }
    if (cb) cb(null);
  }
  get(sql, params = [], cb) {
    if (typeof params === 'function') { cb = params; params = []; }
    if (cb) cb(null, null);
  }
  all(sql, params = [], cb) {
    if (typeof params === 'function') { cb = params; params = []; }
    if (cb) cb(null, []);
  }
}

const db = sqlite3 ? new (sqlite3.verbose().Database)(dbPath) : new FallbackDb();

db.serialize(() => {
    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Wallets Table
    db.run(`CREATE TABLE IF NOT EXISTS Wallets (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        balance REAL DEFAULT 0.0,
        currency TEXT DEFAULT 'USD',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )`);

    // Transactions Table
    db.run(`CREATE TABLE IF NOT EXISTS Transactions (
        id TEXT PRIMARY KEY,
        wallet_id TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        reference TEXT UNIQUE NOT NULL,
        gateway TEXT DEFAULT 'Flutterwave',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(wallet_id) REFERENCES Wallets(id)
    )`);

    // PaymentRoutes Table
    db.run(`CREATE TABLE IF NOT EXISTS PaymentRoutes (
        id TEXT PRIMARY KEY,
        gateway_name TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        estimated_success_rate REAL DEFAULT 95.0
    )`);

    // AI_Decisions Table
    db.run(`CREATE TABLE IF NOT EXISTS AI_Decisions (
        id TEXT PRIMARY KEY,
        transaction_ref TEXT NOT NULL,
        fraud_score REAL NOT NULL,
        chosen_route_id TEXT,
        confidence_score REAL NOT NULL,
        reasoning TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Memories Table
    db.run(`CREATE TABLE IF NOT EXISTS Memories (
        id TEXT PRIMARY KEY,
        key_metric TEXT NOT NULL,
        value_data TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Logs Table
    db.run(`CREATE TABLE IF NOT EXISTS Logs (
        id TEXT PRIMARY KEY,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Seed initial sandbox payment route
    db.run(`INSERT OR IGNORE INTO PaymentRoutes (id, gateway_name, payment_method, is_active, estimated_success_rate) 
            VALUES ('route-flw-card', 'Flutterwave Sandbox', 'card', 1, 98.5)`);
});

export default db;
