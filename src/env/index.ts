import type { Context } from 'hono';

export type Bindings = {
  PREFIX: string;
  RESEND_API_TOKEN: string;
  RESEND_FROM: string;
};

export const getEnvironment = (c: Context<{ Bindings: Bindings }>) => ({
  PREFIX: c.env.PREFIX || '',
  RESEND: {
    API_KEY: c.env.RESEND_API_TOKEN || '',
    FROM: c.env.RESEND_FROM || '',
  },
});
