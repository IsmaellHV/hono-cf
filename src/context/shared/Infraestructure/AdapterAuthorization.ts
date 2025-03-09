import { Context } from 'hono';
import { IError } from '../../../types/IError';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export class AdapterAuthorization {
  public static async validateAuthBasic(c: Context): Promise<Response> {
    try {
      const Param: string[] = c.req.header('Authorization').split(' ');

      if (Param.length !== 2) throw new IError('No está autorizado para utilizar este servicio', 0, 401);
      if (Param[0].trim().toUpperCase() !== 'BASIC') throw new IError('No está autorizado para utilizar este servicio', 0, 401);

      const body: string = Buffer.from(Param[1], 'base64').toString('utf8');
      const contenido: string[] = body.split(':');
      if (contenido.length !== 2) throw new IError('No está autorizado para utilizar este servicio', 0, 401);

      // const ok: boolean = await AdapterAuthorization.existsAuthBasic(contenido[0], contenido[1]);
      // if (!ok) throw new IError('No está autorizado para utilizar este servicio', 0, 401);

      c.set('paramLog', {
        origen: c.req.header('origin') || c.req.header('host'),
        agente: c.get('agente'),
        ip: '0.0.0.0',
        usuario: {
          _id: null,
          username: null,
          tipoDocumentoIdentidad: null,
          numeroDocumentoIdentidad: null,
          primerApellido: null,
          segundoApellido: null,
          nombres: null,
          telefono: null,
          correoElectronico: null,
          entidad: null,
          dependencia: null,
        },
      });
    } catch (err) {
      const error = err as IError;
      error.message = err.message || 'No está autorizado para utilizar este servicio';
      error.statusHttp = err.statusHttp || 401;
      error.errorCode = err.errorCode || 0;
      error.messageClient = err.messageClient || 'No está autorizado para utilizar este servicio';
      return c.json({ error: true, errorDescription: error.messageClient, errorCode: error.errorCode, message: error.message }, error.statusHttp as ContentfulStatusCode);
    }
  }

  public static async noValidate(c: Context): Promise<Response> {
    try {
      throw new IError('No está autorizado para utilizar este servicio', 0, 401);
    } catch (err) {
      const error = err as IError;
      error.message = err.message || 'No está autorizado para utilizar este servicio';
      error.statusHttp = err.statusHttp || 401;
      error.errorCode = err.errorCode || 0;
      error.messageClient = err.messageClient || 'No está autorizado para utilizar este servicio';

      return c.json({ error: true, errorDescription: error.messageClient, errorCode: error.errorCode, message: error.message }, error.statusHttp as ContentfulStatusCode);
    }
  }
}
