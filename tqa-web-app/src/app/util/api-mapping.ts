
export class ApiMapping {

  public static PREDICTIONS = new ApiMapping('predictions');

  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  get getPath(): string {
    return this.path;
  }

  public toString(): string {
    return this.getPath;
  }

}
