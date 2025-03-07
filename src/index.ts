import { Hono } from 'hono';
import { getEnvironment } from './env';
import type { Bindings } from './env/env.d.ts';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  const ENVIRONMENT = getEnvironment(c);
  console.log('ENVIRONMENT', ENVIRONMENT);
  return c.text(`Hello ${ENVIRONMENT.NAME}`);
});

export default app;
