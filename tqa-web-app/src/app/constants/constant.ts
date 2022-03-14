
export class Constant {

  public static TOKEN = new Constant('token');

  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  get getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.getValue;
  }
}
