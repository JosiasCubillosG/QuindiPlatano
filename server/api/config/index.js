const config={
    dev: process.env.NODE_ENV !== "production",
    port: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    AMAZON_SECRET_KEY: process.env.AMAZON_SECRET_KEY,
    AMAZON_PUBLIC_KEY: process.env.AMAZON_PUBLIC_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
    PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY,
};

module.exports = { config };