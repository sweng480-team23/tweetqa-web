export class AppRoute {

  public static ADMIN = new AppRoute('admin');
  public static ADMIN_AUTH = new AppRoute('admin/auth');
  public static ADMIN_TRAINING = new AppRoute('admin/training');
  public static ADMIN_VISITOR = new AppRoute('admin/visitor');
  public static ROOT = new AppRoute('');
  public static VISITOR = new AppRoute('visitor/:token')

  private readonly route: string;

  constructor(route: string) {
    this.route = route;
  }

  get getRoute(): string {
    return this.route;
  }

  get getRouterLink(): string {
    return `/${this.route}`;
  }

  public toString(): string {
    return this.getRoute;
  }

}
