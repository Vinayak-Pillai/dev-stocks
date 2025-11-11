import { configDotenv } from 'dotenv';

configDotenv();
export const JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET,
};
