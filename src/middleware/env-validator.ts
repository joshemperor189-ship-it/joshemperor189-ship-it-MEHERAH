export function validateProductionEnvironment(): void {
  const CRITICAL_VARS = [
    'DATABASE_URL',
    'MTN_WEBHOOK_SECRET',
    'GEMINI_API_KEY'
  ];

  const missing = CRITICAL_VARS.filter(variable => !process.env[variable]);

  if (missing.length > 0) {
    console.warn(`⚠️ MEHERAH OS PRODUCTION NOTICE: Missing environment variables: ${missing.join(', ')}.`);
    console.warn(`ℹ️ Operating with built-in standby fallbacks (JSON state engine, default secret signatures, and AI Gateway routing).`);
  } else {
    console.log('✅ MEHERAH OS: All production environment variables verified.');
  }
}

