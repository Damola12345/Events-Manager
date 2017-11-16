import dotenv from 'dotenv';

// Load .env
dotenv.config();

export default {
  /* "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }, */
  development: {
    use_env_variable: 'DATABASE_URL'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
