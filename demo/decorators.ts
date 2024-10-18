export const classDecorator = (constructor: Function) => {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};

export const methodDecorator = (value: boolean) =>{
  return (target: unknown, propertyKey: string, descriptor?: PropertyDescriptor) => {
    if (descriptor) {
      descriptor.enumerable = value;
    }
  };
};

export const accessorDecorator = (value: boolean) => {
  return (target: unknown, propertyKey: string, descriptor?: PropertyDescriptor) => {
    if (descriptor) {
      descriptor.configurable = value;
    }
  };
};
