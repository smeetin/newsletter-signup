import { Hono } from "hono";

import { getConnInfo } from "hono/bun";

const app = new Hono();

app.get("/", (c) => {
  const info = getConnInfo(c);
  const ip = info.remote.address || "unkown";
  return c.text(`ip: ${ip}: ${JSON.stringify(info)}`);
});

export default app;
