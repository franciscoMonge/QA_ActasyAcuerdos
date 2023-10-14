const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'botbackend.juanvfletes.com',
  database: 'qa',
  password: 'bubbletea',
  port: 5432,
});

/*
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qa',
  password: 'tukituki',
  port: 5433,
});
*/
module.exports = pool;