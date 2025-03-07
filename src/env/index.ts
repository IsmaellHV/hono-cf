import type { Bindings } from './env.d.ts';
import type { Context } from 'hono';

export const getEnvironment = (c: Context<{ Bindings: Bindings }>) => ({
  NAME: c.env.NAME || '',
  API_TOKEN: c.env.API_TOKEN || '',
});
