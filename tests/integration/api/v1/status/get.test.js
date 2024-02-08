test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const { version, max_connections, opened_connections } =
    responseBody.dependencies.database;

  expect(version).toBe(16);

  expect(max_connections).toBeGreaterThan(0);

  expect(opened_connections).toBeGreaterThan(0);
});
