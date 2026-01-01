// Este archivo carga dotenv ANTES de importar cualquier otro módulo
import { config } from 'dotenv';
config();

// Ahora importamos el servidor
import './server.js';
