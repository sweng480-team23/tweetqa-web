import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class AbstractReadService<RESPONSE> {

  protected constructor(
      protected http: HttpClient,
      protected version: number,
      protected endpoint: string) {
    this.version = version;
    this.endpoint = endpoint;
  }

  public read(id: number, params?: {}): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`v${this.version}/${this.endpoint}/${id}`, { params });
  }

  public getVersion(): number {
    return this.version;
  }
}
