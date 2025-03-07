import { Hono } from 'hono';
import { getEnvironment } from './env';
import type { Bindings } from './env/env.d.ts';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  const ENVIRONMENT = getEnvironment(c);
  console.log('ENVIRONMENT', ENVIRONMENT);

  const response = c.text(`Hello ${ENVIRONMENT.NAME}`);

  for (let i = 0; i < 10000; i++) {
    console.log('i', i);
    c.executionCtx.waitUntil(new Promise((resolve) => setTimeout(resolve, 1000)));
  }

  return response;
});

export default app;
