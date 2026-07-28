-- MEHERAH OS Production Ledger Schema DDL
-- Target: PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER ACCOUNTS & CREDENTIALS STORAGE
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    national_id_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA256 Hash of original NIN for unique mapping without saving raw PII
    account_status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (account_status IN ('ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. OPEN FINANCE WALLET CONNECTORS
CREATE TABLE IF NOT EXISTS linked_wallets (
    wallet_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    provider_name VARCHAR(30) NOT NULL CHECK (provider_name IN ('PEARL_BANK', 'STANBIC_FLEXIPAY', 'MTN_MOMO', 'AIRTEL_MONEY')),
    masked_account_token VARCHAR(100) NOT NULL, -- Tokenized identifier from Telco API
    currency VARCHAR(3) DEFAULT 'UGX',
    balance_amount NUMERIC(15, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. LIQUIDITY ROUTING & TRANSACTION ENGINE
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_wallet_id UUID REFERENCES linked_wallets(wallet_id),
    recipient_identifier VARCHAR(100) NOT NULL,
    amount_ugx NUMERIC(15, 2) NOT NULL,
    system_fee_ugx NUMERIC(10, 2) DEFAULT 0.00,
    settlement_status VARCHAR(20) DEFAULT 'PENDING' CHECK (settlement_status IN ('PENDING', 'PROCESSING', 'SETTLED', 'FAILED')),
    zk_proof_hash VARCHAR(64), -- Verification block for compliance tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    settled_at TIMESTAMP WITH TIME ZONE
);

-- 4. HARDENED ZERO-TRUST PII SCRUBBER LOGS (PARTITIONED)
CREATE TABLE IF NOT EXISTS security_scrub_audit (
    audit_id UUID DEFAULT uuid_generate_v4(),
    agent_name VARCHAR(30) NOT NULL,
    original_prompt_bytes INT NOT NULL, -- Save length metrics for token optimization
    scrubbed_prompt TEXT NOT NULL,       -- Storing strictly cleaned text containing no raw NINs/Phones
    detections_triggered INT DEFAULT 0,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (audit_id, executed_at)
) PARTITION BY RANGE (executed_at);

-- Create optimized indices for lightning-fast queries
CREATE INDEX IF NOT EXISTS idx_users_hash ON users(national_id_hash);
CREATE INDEX IF NOT EXISTS idx_wallets_user ON linked_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(settlement_status);

-- Time-Based Partition Sub-Tables
CREATE TABLE IF NOT EXISTS security_scrub_audit_2026_m07 PARTITION OF security_scrub_audit
    FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-08-01 00:00:00+00');

CREATE TABLE IF NOT EXISTS security_scrub_audit_2026_m08 PARTITION OF security_scrub_audit
    FOR VALUES FROM ('2026-08-01 00:00:00+00') TO ('2026-09-01 00:00:00+00');

CREATE TABLE IF NOT EXISTS security_scrub_audit_2026_m09 PARTITION OF security_scrub_audit
    FOR VALUES FROM ('2026-09-01 00:00:00+00') TO ('2026-10-01 00:00:00+00');

-- Automatic "Updated At" Trigger Logic
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_modtime ON users;
CREATE TRIGGER update_user_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

-- =========================================================================
-- STAGE 4: POSTGRESQL SCHEMA FOR LEARNING SYSTEMS
-- =========================================================================

-- Track core strategy metrics and iterative updates
CREATE TABLE IF NOT EXISTS strategy_metrics (
    strategy_id VARCHAR(255) PRIMARY KEY,
    strategy_name VARCHAR(100) NOT NULL,
    success_rate NUMERIC(5, 2) DEFAULT 0.00,
    confidence_score NUMERIC(5, 2) DEFAULT 0.00,
    total_missions_executed INT DEFAULT 0,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit log of individual run variations and optimization failures
CREATE TABLE IF NOT EXISTS learning_history_logs (
    log_id SERIAL PRIMARY KEY,
    strategy_id VARCHAR(255) REFERENCES strategy_metrics(strategy_id),
    agent_id VARCHAR(100) NOT NULL,
    mission_id VARCHAR(100) NOT NULL,
    outcome VARCHAR(50) NOT NULL, -- 'SUCCESS', 'FAILED', 'RECOVERED'
    previous_confidence NUMERIC(5, 2),
    new_confidence NUMERIC(5, 2),
    adjustment_reason TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing optimization for fast retrieval during agent planning steps
CREATE INDEX IF NOT EXISTS idx_strategy_perf ON strategy_metrics (strategy_name, confidence_score);
CREATE INDEX IF NOT EXISTS idx_learning_logs ON learning_history_logs (strategy_id, recorded_at DESC);

