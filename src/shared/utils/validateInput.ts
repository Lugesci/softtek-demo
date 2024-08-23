import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export async function validateInput<T extends object>(
  dtoClass: new () => T,
  plainObject: object
): Promise<T | null> {
  const instance = plainToInstance(dtoClass, plainObject);

  const errors = await validate(instance);

  if (errors.length > 0) {
    console.log('Falló la validación:', errors);
    return null;
  }

  return instance;
}
