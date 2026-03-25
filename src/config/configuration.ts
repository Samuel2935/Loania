export default () => ({
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    user: process.env.DATABASE_USER || 'postgres',
    pass: process.env.DATABASE_PASS || 'password',
    name: process.env.DATABASE_NAME || 'loan_app',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret',
    expires: process.env.JWT_EXPIRES || '1d',
  },
});
