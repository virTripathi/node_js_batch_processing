export const env = {
    baseUrl: 'localhost:3000',
    middlewarePath:'/src/middlewares/middlewares.json'
};

export const config = {
    host: process.env.DB_HOST ??'localhost',
    port: parseInt(process.env.DB_PORT?process.env.DB_PORT:'3306'),
    username: process.env.DB_USERNAME ??'root',
    password: process.env.DB_PASSWORD ??'',
    database: process.env.DB_DATABASE ??'nodejs_batch_processing',
    dialect: (process.env.DB_DIALECT ?? 'mysql') as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'
  };

  export const REDIS_URI = '127.0.0.1';
  export const REDIS_PORT = 6379;

  
