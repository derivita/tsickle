export function classDecorator(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

export function methodDecorator(value: boolean) {
  return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    if (descriptor) {
      descriptor.enumerable = value;
    }
  };
}

export function accessorDecorator(value: boolean,) {
  return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    if (descriptor) {
      descriptor.configurable = value;
    }
  };
}

