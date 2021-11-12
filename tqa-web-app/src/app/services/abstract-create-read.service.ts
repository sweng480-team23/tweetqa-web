import { Injectable } from '@angular/core';
import { AbstractReadService } from "./abstract-read.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbstractCreateReadService <CREATE_REQUEST, RESPONSE> extends AbstractReadService<RESPONSE> {

  constructor(protected http: HttpClient, version: number, endpoint: string) {
    super(http, version, endpoint);
  }

  public create(request: CREATE_REQUEST, params?: {}): Observable<RESPONSE> {
    return this.http.post<RESPONSE>(
      `${this.version}/${this.endpoint}`,
      request,
      params
    );
  }

}
