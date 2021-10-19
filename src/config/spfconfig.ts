import * as dotenv from 'dotenv';

dotenv.config();

export const spfConfig = {
  baseURL: process.env.SPF_URL,
  usuario: process.env.SPF_USUARIO,
  senha: process.env.SPF_SENHA,
};
