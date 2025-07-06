import { AdapterConfigure } from './AdapterConfigure';
import { Controller } from './Controller';
import { EntityMain } from '../Domain/EntityMain';
import { IError } from '../../../../types/IError';
import { Hono, Context } from 'hono';
import { AdapterAuthorization } from '../../../shared/Infraestructure/AdapterAuthorization';

export class Router {
  private controller: Controller;
  public router: Hono;

  constructor() {
    this.router = new Hono();
    this.controller = new Controller();
  }

  public async exec(): Promise<void> {
    // this.router.get(`/${AdapterConfigure.SCHEMA}/${AdapterConfigure.ENTITY}/test/:id`, this.test.bind(this));
    this.router.get(`/${AdapterConfigure.SCHEMA}/${AdapterConfigure.ENTITY}/test`, this.test.bind(this));
    this.router.post(`/${AdapterConfigure.SCHEMA}/${AdapterConfigure.ENTITY}/sendMail`, this.sendMail.bind(this));
  }

  private async sendMail(c: Context): Promise<Response> {
    const req = c.req;
    const res = c.res;

    const body: EntityMain = await req.json();

    try {
      await this.controller.sendMail(c, body);
      return c.json(true, 200);
    } catch (error) {
      const err = error as IError;
      return c.json({ error: true, errorDescription: err.message }, 406);
    }
  }

  private async test(c: Context): Promise<Response> {
    if (c.get('authBasic')) {
      if (!(await AdapterAuthorization.validateAuthBasic(c))) return;
    } else if (c.get('authJWT')) {
      if (!(await AdapterAuthorization.validateAuthBasic(c))) return;
    } else {
      return await AdapterAuthorization.noValidate(c);
    }

    // const { results } = await c.env.DB_LOG.prepare(
    //   "SELECT * FROM Customers WHERE CompanyName = ?",
    // )
    //   .bind("Bs Beverages")
    //   .all();

    // const id = c.req.param('id');
    // const body = await c.req.parseBody(); //formaData
    const body = await c.req.json(); //raw JSON

    // console.log('ID', id);
    // console.log('BODY', body);
    return c.json(body, 200);
  }
}
