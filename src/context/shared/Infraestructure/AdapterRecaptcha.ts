import axios, { AxiosRequestConfig } from 'axios';
import { IError } from '../../../types/IError';

export class AdapterReCaptcha {
  public static async verifyCaptcha(captcha: string, url: string, key: string): Promise<void> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `secret=${key}&response=${captcha}`,
    };
    const resp = await axios.request(config);
    if (resp.status !== 200) throw new IError(`Error: status code invalid ${resp.status}`, 0, 406, 'Captcha no válido');
    const { success } = resp.data;
    if (!success) throw new IError(`Error: success: ${success} `, 0, 406, 'Captcha no válido');
  }
}
