import { Bindings } from './env';
import { RouterRest } from './rest/Router';
import { ServerREST } from './rest/Server';

let appPromise: Promise<any> | null = null;

const initApp = async (env: { [key: string]: Bindings }) => {
  const rutas: RouterRest = new RouterRest();
  await rutas.exec();

  const server: ServerREST = new ServerREST();
  await server.exec();
  server.app.route(`/api/${env.PREFIX}`, rutas.router);
  return server.app;
};

export default {
  async fetch(request: Request, env: { [key: string]: Bindings }, ctx: ExecutionContext) {
    if (!appPromise) appPromise = initApp(env);
    const app = await appPromise;
    return app.fetch(request, env, ctx);
  },
};
