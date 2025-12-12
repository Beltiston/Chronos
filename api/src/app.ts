import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use('/v1/*', cors({
  origin: (origin) =>
    origin === 'https://example.com' ? origin : '*',
}))

app
app.notFound((c) => {
  return c.json({ status: 404, message: "not found" }, 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

export default app;
