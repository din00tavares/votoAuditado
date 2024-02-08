import { Client } from "pg";

async function query(query) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  try {
    const result = await client.query(query);
    return result;
  } catch (error) {
    return error;
  } finally {
    client.end();
  }
}

export default {
  query: query,
};
