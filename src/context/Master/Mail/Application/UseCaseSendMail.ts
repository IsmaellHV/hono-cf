import { EntityMain } from '../Domain/EntityMain';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { Context } from 'hono';

export class UseCaseSendMail {
  constructor(private repository: RepositoryMain) {}

  public async exec(c: Context, params: EntityMain): Promise<void> {
    try {
      await this.repository.validateSendMail(params);
      await this._exec(c, params);
    } catch (error) {
      throw error;
    }
  }

  async _exec(c: Context, params: EntityMain): Promise<void> {
    try {
      await this.repository.sendMail(c, params);
    } catch (error) {
      throw error;
    }
  }
}
