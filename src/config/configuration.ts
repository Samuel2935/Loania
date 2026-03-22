export default () => ({
  db: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    name: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
});