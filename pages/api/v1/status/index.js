import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = await database
    .query(`SHOW server_version`)
    .then((value) => {
      return value.rows[0].server_version;
    });

  const maxConnections = await database
    .query(`SHOW max_connections`)
    .then((value) => {
      return value.rows[0].max_connections;
    });

  const openedConnections = await database
    .query({
      text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
      values: [process.env.POSTGRES_DB],
    })
    .then((value) => {
      return value.rows[0].count;
    });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: parseFloat(databaseVersion),
        max_connections: parseInt(maxConnections),
        opened_connections: parseInt(openedConnections),
      },
    },
  });
}

export default status;
