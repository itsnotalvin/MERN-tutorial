import 'dotenv/config';


const config = {
    mongoDBURL: process.env.mongoDBURL,
    PORT: process.env.PORT
}

export default config;
export const PORT = 5555;