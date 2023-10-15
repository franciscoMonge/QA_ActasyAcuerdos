const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'botbackend.juanvfletes.com',
  database: 'qa',
  password: 'bubbletea',
  port: 5432,
});


module.exports = pool;