import { Context, Hono, Next } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { UAParser } from 'ua-parser-js';
import { IError } from '../types/IError';
import { cors } from 'hono/cors';
import { Bindings, getEnvironment } from '../env';
import { logger } from 'hono/logger';

export class ServerREST {
  public app: Hono<{ Bindings: Bindings }>;

  constructor() {}
  // this.whitelist = ENVIRONMENT.DOMAINS;

  // Configurar middlewares globales (reemplaza createServer, configurePlugins, configureDataType)
  // this.configureMiddlewares();

  // Configurar middleware de validación (reemplaza middlewareValidator)

  // Configurar manejo de errores y notFound
  // this.configureErrorHandlers();

  public async exec() {
    this.app = await this.createServer();
    await this.configurePlugins();
    await this.middlewareValidator();
    return this.app;
  }

  private async createServer() {
    const app = new Hono<{ Bindings: Bindings }>();
    return app;
  }

  private async configurePlugins() {
    //   // // Logger
    // this.app.use('*', logger());
    this.app.use(logger());

    //   // // Helmet (seguridad)
    //   // this.app.use('*', helmet());

    //   // // Compression
    //   // this.app.use('*', compression());

    //   // // CORS con whitelist
    this.app.use('*', async (c, next) => {
      const ENVIRONMENT = getEnvironment(c);

      const corsMiddleware = cors({
        // origin: ENVIRONMENT.DOMAINS,
        origin: (origin, c) => {
          console.log('origin', origin);
          console.log(ENVIRONMENT.DOMAINS.includes(origin));
          console.log(ENVIRONMENT.DOMAINS.includes(origin) ? origin : null);
          return ENVIRONMENT.DOMAINS.includes(origin) ? origin : null;
        },
        allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
        allowMethods: ['GET', 'OPTIONS', 'POST'],
        exposeHeaders: ['Content-Length'],
        credentials: true,
      });
      return corsMiddleware(c, next);
    });

    // this.app.use('*', async (c: Context, next: Next) => {
    //   const ENVIRONMENT = getEnvironment(c);
    // const allowedOrigin = (origin: string) => {
    //   return ENVIRONMENT.DOMAINS.includes(origin) ? origin : null;
    // };

    // // Obtiene el origen de la petición
    // const requestOrigin = c.req.raw.headers.get('origin') || c.req.header('host') || '';
    // console.log('requestOrigin', requestOrigin);
    // const originResult = allowedOrigin(requestOrigin);
    // console.log('originResult', originResult);

    // if (!originResult) {
    //   // Si el origen no está permitido, retorna un error
    //   return c.json({ error: 'Origen no permitido' }, { status: 403 });
    // }

    // Si está permitido, aplica CORS y sigue el flujo
    //     const corsOptions = {
    //       origin: ENVIRONMENT.DOMAINS,
    //       allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //       allowHeaders: ['Content-Type', 'Authorization'],
    //     };
    //     return await cors(corsOptions)(c, next);
    //   });
    // }
  }

  private middlewareValidator() {
    this.app.use(async (c: Context, next: Next) => {
      const userAgent = c.req.header('User-Agent') || '';
      const parser = new UAParser(userAgent);
      const uaResult = parser.getResult();
      c.set('agente', uaResult);
      c.set('authBasic', false);
      c.set('authJWT', false);

      const authorization = c.req.header('Authorization');
      if (authorization) {
        const Param = authorization.split(' ');
        if (Param.length === 1) Param.unshift('BEARER');
        if (Param.length === 2) {
          switch (Param[0].trim().toUpperCase()) {
            case 'BASIC':
              c.set('authBasic', true);
              break;
            case 'BEARER':
              c.set('authJWT', true);
              break;
          }
        }
      }
      await next();
    });
  }

  // private configureErrorHandlers() {
  //   // onError: Manejo global de errores (reemplaza middlewareError)
  //   this.app.onError(async (err, c) => {
  //     const error = err as IError;

  //     error.message = error.message || 'Se produjo un error. Por favor, inténtelo de nuevo más tarde';
  //     error.statusHttp = error.statusHttp || 500;
  //     error.errorCode = error.errorCode || 0;
  //     error.messageClient = error.messageClient || 'Se produjo un error. Por favor, inténtelo de nuevo más tarde';

  //     return c.json(
  //       {
  //         error: true,
  //         errorDescription: error.messageClient,
  //         errorCode: error.errorCode,
  //         message: error.message,
  //       },
  //       error.statusHttp,
  //     );
  //   });

  //   // notFound: Manejo de rutas inexistentes (reemplaza middlewareNotFound)
  //   this.app.notFound(async (c) => {
  //     const error = new IError('EndPoint not found', 0, 404, 'Servicio no encontrado');

  //     return c.json(
  //       {
  //         error: true,
  //         errorDescription: error.messageClient,
  //         errorCode: error.errorCode,
  //         message: error.message,
  //       },
  //       404,
  //     );
  //   });
  // }

  public async middlewareNotFound() {
    this.app.notFound((c: Context) => {
      try {
        throw new IError('EndPoint not found', 0, 404, 'Servicio no encontrado');
      } catch (err) {
        const error = err as IError;
        error.message = err.message || 'EndPoint not found';
        error.statusHttp = err.statusHttp || 500;
        error.errorCode = err.errorCode || 0;
        error.messageClient = err.messageClient || 'Servicio no encontrado';

        return c.json({ error: true, errorDescription: error.messageClient, errorCode: error.errorCode, message: error.message }, error.statusHttp as ContentfulStatusCode);
      }
    });
  }
}
