// ServerREST.ts
import { Hono } from 'hono';
// import { serve } from '@hono/node-server'; // Para levantar el server en Node
// import parse from 'ua-parser-js';

// import { ENVIRONMENT } from '../env';
import { IError } from '../types/IError';
import { Bindings } from '../env';

// Si usabas IRequest, en Hono el contexto se maneja a través de 'Context' (c)
export class ServerREST {
  public app: Hono;

  private port: number;
  private whitelist: string[];

  constructor() {
    // this.port = ENVIRONMENT.PORT;
    // this.whitelist = ENVIRONMENT.DOMAINS;

    this.app = new Hono();

    // Configurar middlewares globales (reemplaza createServer, configurePlugins, configureDataType)
    // this.configureMiddlewares();

    // // Configurar middleware de validación (reemplaza middlewareValidator)
    // this.configureValidator();

    // // Configurar manejo de errores y notFound
    // this.configureErrorHandlers();
  }

  public async exec() {
    return this.app;
  }

  // private configureMiddlewares() {
  //   // // Logger
  //   // this.app.use('*', logger());

  //   // // Helmet (seguridad)
  //   // this.app.use('*', helmet());

  //   // // Compression
  //   // this.app.use('*', compression());

  //   // // CORS con whitelist
  //   // this.app.use('*', cors({
  //   //   origin: (origin) => {
  //   //     // Si no hay 'origin' (ej: Postman), dejamos pasar
  //   //     if (!origin) return '*';

  //   //     // Validar contra la lista de dominios permitidos
  //   //     const isAllowed = this.whitelist.some((dom) => origin.includes(dom));
  //   //     return isAllowed ? origin : ''; // si retornas '', Hono enviará 'null' como Access-Control-Allow-Origin
  //   //   },
  //   // }));

  //   // IMPORTANTE:
  //   // A diferencia de Express, Hono no parsea automáticamente JSON, form, etc.
  //   // En Node, podrías usar un plugin de body-parser para Hono, pero no es oficial.
  //   // Por ejemplo: https://github.com/honojs/body-parse
  //   // Si no, deberás parsear manualmente en cada ruta.
  // }

  // private configureValidator() {
  //   // Reemplaza tu 'middlewareValidator'
  //   this.app.use('*', async (c, next) => {
  //     try {
  //       // Similar a: req.agente = parse(req.headers['user-agent'])
  //       const userAgent = c.req.header('User-Agent') || '';
  //       c.set('agente', parse(userAgent));

  //       // Inicializamos flags
  //       c.set('authBasic', false);
  //       c.set('authJWT', false);

  //       // Extraemos Authorization
  //       const authorization = c.req.header('Authorization');
  //       if (authorization) {
  //         const Param = authorization.split(' ');
  //         // Caso especial de tu código
  //         if (Param.length === 1) Param.unshift('BEARER');
  //         if (Param.length === 2) {
  //           switch (Param[0].trim().toUpperCase()) {
  //             case 'BASIC':
  //               c.set('authBasic', true);
  //               break;
  //             case 'BEARER':
  //               c.set('authJWT', true);
  //               break;
  //           }
  //         }
  //       }

  //       // Continúa al siguiente middleware o ruta
  //       await next();
  //     } catch (err) {
  //       // Manejo de error dentro del middleware
  //       const error = err as IError;
  //       error.message = error.message || 'Error en middlewareValidator';
  //       error.statusHttp = error.statusHttp || 401;
  //       error.errorCode = error.errorCode || 0;
  //       error.messageClient = error.messageClient || 'Error en middlewareValidator';

  //       // Respuesta de error
  //       return c.json(
  //         {
  //           error: true,
  //           errorDescription: error.messageClient,
  //           errorCode: error.errorCode,
  //           message: error.message,
  //         },
  //         error.statusHttp,
  //       );
  //     }
  //   });
  // }

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
}
