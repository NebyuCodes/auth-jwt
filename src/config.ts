// Dotenv
import { config } from "dotenv";
config();

let api_url = <string>process.env.API_URL_LOCAL;
if (<string>process.env.NODE_ENV === "development") {
  api_url = <string>process.env.API_URL_DEVELOPMENT;
} else if (<string>process.env.NODE_ENV === "qa") {
  api_url = <string>process.env.API_URL_QA;
} else if (<string>process.env.NODE_ENV === "production") {
  api_url = <string>process.env.API_URL_PROD;
}

// Configs
export default {
  env: <string>process.env.NODE_ENV,
  db: {
    remote: <string>process.env.DB_REMOTE,
  },
  api_key: <string>process.env.API_KEY,
  delete_key: <string>process.env.DELETE_KEY,
  jwt: {
    expiresin: <string>process.env.JWT_EXPIRESIN,
    secret: <string>process.env.JWT_SECRET,
  },
};
