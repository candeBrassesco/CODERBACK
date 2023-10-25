import dotenv from 'dotenv'

dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    SECRET_COOKIES: process.env.SECRET_COOKIES,
    SECRET_MONGO: process.env.SECRET_MONGO,
    NODE_ENV: process.env.NODE_ENV
}