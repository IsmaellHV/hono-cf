import { EntityAttachment } from './EntityAttachment';
import { EntityExcel } from './EntityExcel';

export interface EntityMain {
  type: string | null;
  name: string | null;
  to: string[] | null;
  cc: string[] | null;
  bcc: string[] | null;
  priority: string | null;
  subject: string | null;
  cuerpo: string | null;
  excel: EntityExcel[] | null;
  attachment: EntityAttachment[] | null;
  saludo: string | null;
  usuario: string | null;
}
