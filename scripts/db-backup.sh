#!/bin/bash
# ====================================================================
# MEHERAH OS — DAILY AUTOMATED LEDGER BACKUP PROTOCOL
# ====================================================================

# Set critical script boundaries to stop instantly on any execution error
set -e

# Configuration Metrics
BACKUP_DIR="/var/backups/meherah-ledger"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="$BACKUP_DIR/meherah_prod_$TIMESTAMP.sql.gz"
RETENTION_DAYS=30

# Ensure the targeted backup storage directory exists safely
mkdir -p "$BACKUP_DIR"

echo "⏳ Starting database encryption backup routine for MEHERAH OS..."

# Verify the production DATABASE_URL environment parameter is active
if [ -z "$DATABASE_URL" ]; then
    echo "❌ CRITICAL FAULT: DATABASE_URL variable is empty or unmapped."
    exit 1
fi

# Execute a streaming, compressed binary database snapshot
pg_dump "$DATABASE_URL" | gzip > "$OUTPUT_FILE"

echo "✅ Backup archived successfully at: $OUTPUT_FILE"

# Automatically clear out local snapshots older than the retention threshold
echo "🧹 Commencing cleanup of files older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -type f -name "meherah_prod_*.sql.gz" -mtime +$RETENTION_DAYS -exec rm {} \;

echo "🚀 Database maintenance lifecycle loop complete."
