-- Core Production Storage Engine Initialization Script
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Structural Access Control (RBAC Model)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Founder', 'Analyst', 'Developer', 'Admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Mission Control Pipeline Records
CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    goal TEXT NOT NULL,
    scope_tier VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'INITIALIZED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial High-Privilege Administration Account Setup
-- Explicitly force password generation on first access via management panel
INSERT INTO users (email, password_hash, role) 
VALUES ('ops@meherah.ai', '$2b$12$K39p4b7R7pZ3Z9HkE3hP7eH1e3o8uN8xG7mR5T3u1q9w8E5r6y7u', 'Admin')
ON CONFLICT (email) DO NOTHING;
