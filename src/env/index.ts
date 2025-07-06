import type { Context } from 'hono';

export type Bindings = {
  PREFIX: string;
  DOMAINS: string;
  RESEND_API_TOKEN: string;
  RESEND_FROM: string;
  DB_LOG: D1Database;
};

export const getEnvironment = (c: Context<{ Bindings: Bindings }>) => ({
  PREFIX: c.env.PREFIX || '',
  DOMAINS: c.env.DOMAINS ? JSON.parse(c.env.DOMAINS) : [],
  RESEND: {
    API_KEY: c.env.RESEND_API_TOKEN || '',
    FROM: c.env.RESEND_FROM || '',
  },
});
