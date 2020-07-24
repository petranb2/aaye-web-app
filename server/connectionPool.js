const sql = require('mssql');

const config = {
  user: 'sa',
  password: '123456',
  server: 'KMH-EFAR-5',
  database: 'aaye',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 1 * 1000 // 1*1000 millSec = 1 sec
  },
  options: {
    enableArithAbort: true
  }
};
// name of the pool
const poolName = 'defaultPool'
// object that holds the pool names
const pools = {}

// manage a set of pools by name (config will be required to create the pool)
// a pool will be removed when it is closed
async function getPool() {
  // if pool doesn't exist will be created 
  if (!Object.prototype.hasOwnProperty.call(pools, poolName)) {
    const pool = new sql.ConnectionPool(config)
    const close = pool.close.bind(pool)
    pool.close = (...args) => {
      delete pools[poolName]
      return close(...args)
    }
    await pool.connect()
    pools[poolName] = pool
  }
  return pools[poolName]
}

// close all pools
function closeAll() {
  return Promise.all(Object.values(pools).map((pool) => {
    return pool.close()
  }))
};

module.exports = {
  closeAll,
  getPool
}