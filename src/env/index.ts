import type { Bindings } from './env.d.ts';
import type { Context } from 'hono';

export const getEnvironment = (c: Context<{ Bindings: Bindings }>) => ({
  PREFIX: c.env.PREFIX || '',
  RESEND: {
    API_KEY: c.env.RESEND_API_TOKEN || '',
    FROM: c.env.RESEND_FROM || '',
  },
});
