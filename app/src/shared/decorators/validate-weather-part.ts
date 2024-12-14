import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { WeatherPart } from '../entities/weather';

@ValidatorConstraint({ async: false })
export class IsWeatherPartConstraint implements ValidatorConstraintInterface {
  validate(parts: string): boolean {
    if (!parts) return true;

    const values = parts.split(',');
    return values.every((part) => Object.values(WeatherPart).includes(part as WeatherPart));
  }

  defaultMessage(): string {
    return `Each value in "part" query param must be one of: ${Object.values(WeatherPart).join(', ')}`;
  }
}

export function IsWeatherPart(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsWeatherPartConstraint,
    });
  };
}
