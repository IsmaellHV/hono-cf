import AJV, { Schema } from 'ajv';
import addFormats from 'ajv-formats';
import { Context } from 'hono';
import { IError } from '../../../../types/IError';
import { AdapterGenerico } from '../../../shared/Infraestructure/AdapterGenerico';
import { EntityMain } from '../Domain/EntityMain';
import { RepositoryMain } from '../Domain/RepositoryMain';
const ajv = new AJV({ removeAdditional: true, logger: false });
addFormats(ajv);

export class RepositoryMainImpl implements RepositoryMain {
  public async validateSendMail(params: EntityMain): Promise<void> {
    const schema: Schema = {
      type: 'object',
      properties: {
        type: { type: 'string', nullable: true },
        name: { type: 'string', nullable: true },
        to: { type: ['string', 'array'], items: { type: 'string' }, nullable: true },
        cc: { type: ['string', 'array'], items: { type: 'string' }, nullable: true },
        bcc: { type: ['string', 'array'], items: { type: 'string' }, nullable: true },
        priority: { type: 'string', nullable: true },
        subject: { type: 'string', nullable: true },
        cuerpo: { type: 'string', nullable: true },
        saludo: { type: 'string', nullable: true },
        excel: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              data: { type: 'object' },
              filename: { type: 'string' },
            },
            required: ['data', 'filename'],
            additionalProperties: false,
          },
          nullable: true,
        },
        attachment: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              base64: { type: 'string' },
              filename: { type: 'string' },
              cid: { type: 'string' },
            },
            required: ['base64', 'filename'],
            additionalProperties: false,
          },
          nullable: true,
        },
      },
      required: [],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);
    const valid = validate(params);
    if (!valid) {
      throw new IError(AdapterGenerico.decodeErrorAJV(validate.errors[0]), 0);
    }
  }

  public async sendMail(c: Context, params: EntityMain): Promise<void> {
    console.log('correo enviado....');
  }
}
