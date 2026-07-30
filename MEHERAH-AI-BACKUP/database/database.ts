import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let sqlite3: any = null;
try {
  sqlite3 = eval('require')('sqlite3');
} catch (e) {
  console.warn('[SQLite Driver Warning] sqlite3 native module unavailable, using resilient fallback db.');
}

const dbPath = path.resolve(process.cwd(), process.env.DATABASE_FILE || './meherah.db');

class FallbackDb {
  private users = new Map<string, any>();
  private wallets = new Map<string, any>();
  private transactions: any[] = [];
  private aiDecisions: any[] = [];
  private memories = new Map<string, any>();

  serialize(fn: () => void) {
    if (fn) fn();
  }

  run(sql: string, params: any[] = [], cb?: (err: Error | null) => void) {
    if (typeof params === 'function') {
      cb = params;
      params = [];
    }
    const sqlUpper = sql.toUpperCase();
    if (sqlUpper.includes('INSERT INTO USERS')) {
      const [id, name, email, password] = params;
      if ([...this.users.values()].some(u => u.email === email)) {
        if (cb) cb(new Error('Email already exists'));
        return;
      }
      this.users.set(id, { id, name, email, password, created_at: new Date().toISOString() });
    } else if (sqlUpper.includes('INSERT INTO WALLETS')) {
      const [id, user_id, balance] = params;
      this.wallets.set(user_id, { id, user_id, balance: balance || 0.0, currency: 'USD', updated_at: new Date().toISOString() });
    } else if (sqlUpper.includes('INSERT INTO TRANSACTIONS')) {
      const [id, wallet_id, amount, type, status, reference] = params;
      this.transactions.push({ id, wallet_id, amount, type, status, reference, gateway: 'Flutterwave', created_at: new Date().toISOString() });
    } else if (sqlUpper.includes('UPDATE WALLETS')) {
      const [amount, wallet_id] = params;
      for (const w of this.wallets.values()) {
        if (w.id === wallet_id) {
          w.balance += amount;
          w.updated_at = new Date().toISOString();
        }
      }
    } else if (sqlUpper.includes('INSERT INTO AI_DECISIONS')) {
      const [id, transaction_ref, fraud_score, confidence_score, reasoning] = params;
      this.aiDecisions.push({ id, transaction_ref, fraud_score, confidence_score, reasoning, created_at: new Date().toISOString() });
    } else if (sqlUpper.includes('MEMORIES')) {
      const [id, key_metric, value_data] = params;
      this.memories.set(id, { id, key_metric, value_data, updated_at: new Date().toISOString() });
    }

    if (cb) cb(null);
  }

  get(sql: string, params: any[] = [], cb?: (err: Error | null, row: any) => void) {
    if (typeof params === 'function') {
      cb = params;
      params = [];
    }
    const sqlUpper = sql.toUpperCase();
    let row: any = null;
    if (sqlUpper.includes('FROM USERS WHERE EMAIL =')) {
      const email = params[0];
      row = [...this.users.values()].find(u => u.email === email) || null;
    } else if (sqlUpper.includes('FROM WALLETS WHERE USER_ID =')) {
      const userId = params[0];
      row = this.wallets.get(userId) || null;
    } else if (sqlUpper.includes('COUNT(*) AS TOTAL_TX')) {
      const walletId = params[0];
      const txs = this.transactions.filter(t => t.wallet_id === walletId);
      const total_tx = txs.length;
      const success_tx = txs.filter(t => t.status === 'success').length;
      const today_vol = txs.reduce((acc, curr) => acc + (curr.amount || 0), 0);
      row = { total_tx, success_tx, today_vol };
    }
    if (cb) cb(null, row);
  }

  all(sql: string, params: any[] = [], cb?: (err: Error | null, rows: any[]) => void) {
    if (typeof params === 'function') {
      cb = params;
      params = [];
    }
    const sqlUpper = sql.toUpperCase();
    let rows: any[] = [];
    if (sqlUpper.includes('FROM TRANSACTIONS')) {
      const walletId = params[0];
      rows = this.transactions.filter(t => t.wallet_id === walletId).slice(0, 5);
    }
    if (cb) cb(null, rows);
  }
}

let activeDb: any;
if (sqlite3) {
  try {
    activeDb = new (sqlite3.verbose().Database)(dbPath);
  } catch (err) {
    console.warn('[SQLite Open Warning] Failed to open SQLite file, using fallback db:', err);
    activeDb = new FallbackDb();
  }
} else {
  activeDb = new FallbackDb();
}

export const db = activeDb;

export function initSqliteDb(): Promise<void> {
  return new Promise((resolve) => {
    if (!sqlite3 || activeDb instanceof FallbackDb) {
      resolve();
      return;
    }
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Wallets (
          id TEXT PRIMARY KEY,
          user_id TEXT UNIQUE NOT NULL,
          balance REAL DEFAULT 0.0,
          currency TEXT DEFAULT 'USD',
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES Users(id)
      )`);

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

      db.run(`CREATE TABLE IF NOT EXISTS PaymentRoutes (
          id TEXT PRIMARY KEY,
          gateway_name TEXT NOT NULL,
          payment_method TEXT NOT NULL,
          is_active INTEGER DEFAULT 1,
          estimated_success_rate REAL DEFAULT 95.0
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS AI_Decisions (
          id TEXT PRIMARY KEY,
          transaction_ref TEXT NOT NULL,
          fraud_score REAL NOT NULL,
          chosen_route_id TEXT,
          confidence_score REAL NOT NULL,
          reasoning TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Memories (
          id TEXT PRIMARY KEY,
          key_metric TEXT NOT NULL,
          value_data TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Logs (
          id TEXT PRIMARY KEY,
          level TEXT NOT NULL,
          message TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(
        `INSERT OR IGNORE INTO PaymentRoutes (id, gateway_name, payment_method, is_active, estimated_success_rate) 
         VALUES ('route-flw-card', 'Flutterwave Sandbox', 'card', 1, 98.5)`,
        () => {
          resolve();
        }
      );
    });
  });
}

initSqliteDb().catch((err) => console.warn('[SQLite Init Non-fatal Warning]', err));

export default db;


