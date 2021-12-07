import { AbstractCreateReadService } from "./abstract-create-read.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class AbstractCreateReadUpdateService <CREATE_REQUEST, RESPONSE, UPDATE_REQUEST>
    extends AbstractCreateReadService<CREATE_REQUEST, RESPONSE> {

  protected constructor(protected http: HttpClient, version: number, endpoint: string) {
    super(http, version, endpoint);
  }

  public update(id: number, request: UPDATE_REQUEST, params?: {}): Observable<RESPONSE> {
    return this.http.post<RESPONSE>(
      `v${this.version}/${this.endpoint}/${id}`,
      request,
      { params }
    );
  }

}
