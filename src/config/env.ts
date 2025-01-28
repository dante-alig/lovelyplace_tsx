interface EnvConfig {
  API_BASE_URL: string;
  API_KEY: string;
  JWT_SECRET: string;
  MAPS_API_KEY: string;
}

const env: EnvConfig = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  API_KEY: import.meta.env.VITE_API_KEY || '',
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || '',
  MAPS_API_KEY: import.meta.env.VITE_MAPS_API_KEY || '',
};

// Vérification que toutes les variables d'environnement requises sont définies
const requiredEnvVars: (keyof EnvConfig)[] = ['API_KEY', 'JWT_SECRET', 'MAPS_API_KEY'];
requiredEnvVars.forEach((key) => {
  if (!env[key]) {
    console.error(`La variable d'environnement ${key} n'est pas définie !`);
  }
});

export default env;
