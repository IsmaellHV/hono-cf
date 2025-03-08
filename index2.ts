import { Hono } from 'hono';
import { Bindings, getEnvironment } from './src/env';
import { Resend } from 'resend';

const app = new Hono<{ Bindings: Bindings }>();
console.log('holaaaaaaaaaaaa');

app.get('/', (c) => {
  const ENVIRONMENT = getEnvironment(c);
  console.log('ENVIRONMENT', ENVIRONMENT);
  return c.text(`Hello ${ENVIRONMENT.PREFIX}!`);
});

app.get('/send', async (c) => {
  const ENVIRONMENT = getEnvironment(c);
  const resend = new Resend(ENVIRONMENT.RESEND.API_KEY);

  const resp = await resend.emails.send({
    from: ENVIRONMENT.RESEND.FROM,
    to: ['ismaelhv@outlook.com'],
    subject: 'Prueba',
    html: '<p>it works!</p>',
  });
  console.log('RESPONSE', resp);

  return c.text('Enviado...');
});

export default app;
