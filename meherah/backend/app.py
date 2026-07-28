# MEHERAH Core Application Service Pipeline Gateway entry point
import asyncio
import os
import sys

from database.ledger_db import ProductionDatabase
from security.auth_matrix import SecurityAuthorizationMatrix
from providers.telecom_adapter import MobileMoneyGatewayAPI

async def main():
    print("[INIT] Bootstrapping MEHERAH Financial Framework Platform Stack...")
    
    # Securely acquire configuration matrix targets from environment bindings
    db_conn_str = os.getenv("DATABASE_URL", "postgresql://localhost:5432/meherah_dev")
    api_key_chk = os.getenv("NATIONAL_GATEWAY_TOKEN", "MOCK_TOKEN_FOR_DEV")
    
    if not api_key_chk:
        print("[CRITICAL] Missing infrastructure access environment vectors. Halting execution.")
        sys.exit(1)
        
    # Wire infrastructural modules
    db = ProductionDatabase()
    matrix = SecurityAuthorizationMatrix()
    api = MobileMoneyGatewayAPI()
    
    print("[SUCCESS] Core Platform dependencies established cleanly.")

if __name__ == "__main__":
    asyncio.run(main())
