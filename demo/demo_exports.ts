export function foo() {
  return "foo";
}

export function bar() {
  return "bar";
}

export function baz() {
  return "baz";
}

export class MyClass {
  constructor(private objName: string) {}

  public getName() {
    return this.objName;
  }
}