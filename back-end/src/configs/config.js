import dotenv from "dotenv";
dotenv.config();

export const config = {
    api_server_port: process.env.API_SERVER_PORT,
    mysql: {
        database_url: process.env.MYSQL_DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    },
    cookie: {
        secret: process.env.COOKIE_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    nodemailer: {
        service: process.env.NODEMAILER_SERVICE,
        user: process.env.NODEMAILER_USER,
        password: process.env.NODEMAILER_PASSWORD,
    },
};