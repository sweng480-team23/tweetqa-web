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

  public read(uuid: string, params?: {}): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`v${this.version}/${this.endpoint}/${uuid}`, { params });
  }

}
