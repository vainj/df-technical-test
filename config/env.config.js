// Imports
import * as dotEnv from 'dotenv';

// Loads environment variables from `.env` file
const config = dotEnv.config();

export const ENV = config.parsed;