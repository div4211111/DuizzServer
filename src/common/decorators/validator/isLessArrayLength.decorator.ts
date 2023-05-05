import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsLessArrayLength(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isLessArrayLength',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return (
                        typeof value === 'number' &&
                        Array.isArray(relatedValue) &&
                        value <= relatedValue.length - 1
                    );
                },
                defaultMessage(args?: ValidationArguments): string {
                    return `Значение ${args.value} больше длины массива вопросов`;
                },
            },
        });
    };
}
