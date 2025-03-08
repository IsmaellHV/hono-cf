import { ErrorObject } from 'ajv';

export class AdapterGenerico {
  public static decodeErrorAJV(error: ErrorObject): string {
    let parent: string[] = [];
    let IErrormessage = '';
    if (error.instancePath) {
      parent = error.instancePath
        .split('/')
        .filter((row) => row.trim() !== '')
        .map((row) =>
          row
            .replace(/([A-Z0-9])/g, ' $1')
            .trim()
            .toLowerCase(),
        );
    }
    if (parent.length > 0) {
      IErrormessage += `el campo ${parent.join(' de ')} `;
    }

    switch (error.keyword) {
      case 'required':
        IErrormessage += `parámetros de ingreso no presenta la propiedad ${error.params.missingProperty?.replace(/([A-Z0-9])/g, ' $1').trim()}`;
        break;
      case 'type':
        const schemaPath = error.schemaPath?.split('/') ?? [];
        IErrormessage += !error.instancePath ? `data debe ser de tipo ${error.params.type}` : `parámetro de ingreso ${schemaPath.pop()?.replace(/%20/g, ' ') || ''} debe ser de tipo ${error.params.type}`;
        break;
      case 'additionalProperties':
        IErrormessage = `parámetros de ingreso no debe poseer campos adicionales como ${error.params.additionalProperty}`;
        break;
      case 'minLength':
        IErrormessage = `parámetro de ingreso: ${parent} debe tener como mínimo ${error.params.limit} caracteres`;
        break;
      case 'maxLength':
        IErrormessage = `parámetro de ingreso: ${parent} debe tener como máximo ${error.params.limit} caracteres`;
        break;
      case 'length':
        IErrormessage = `parámetro de ingreso: ${parent} debe tener ${error.params.limit} caracteres`;
        break;
      case 'pattern':
        if (error.params.pattern === '^(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*\\d){2})(?=(?:.*[^A-Za-z\\d]){2})(?!.*[ñÑáéíóúÁÉÍÓÚ])[A-Za-z\\d!"#$%&\'()*+,\\-./:;<=>?@[\\\\\\]^_`{|}~]{12,30}$') {
          IErrormessage = `La contraseña no cumple con las políticas de seguridad`;
          break;
        }
        IErrormessage = `parámetro de ingreso: ${parent} no cumple con expresión regular ${error.params.pattern}`;
        break;
      case 'format':
        IErrormessage = `parámetro de ingreso: ${parent} no cumple con formato ${error.params.format}`;
        break;
      case 'enum':
        IErrormessage = `parámetro de ingreso: ${parent} con valor no válido. Solo se permite ${error.params.allowedValues.join(', ')}`;
        break;
      case 'minItems':
        IErrormessage = `parámetro de ingreso: ${parent} debe tener como mínimo ${error.params.limit} elemento(s)`;
        break;
      default:
        IErrormessage = `${error.params.type}`;
        break;
    }
    return IErrormessage;
  }
}
