export const env = {
    baseUrl: 'localhost:3000',
    middlewarePath:'/src/middlewares/middlewares.json'
};

export const config = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nodejs_batch_processing',
    dialect: 'mysql' as const
  };

  export const REDIS_URI = '127.0.0.1';
  export const REDIS_PORT = 6379;
  
  
