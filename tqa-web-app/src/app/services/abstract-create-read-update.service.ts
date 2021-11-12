import { Injectable } from '@angular/core';
import {AbstractCreateReadService} from "./abstract-create-read.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbstractCreateReadUpdateService <CREATE_REQUEST, RESPONSE, UPDATE_REQUEST>
    extends AbstractCreateReadService<CREATE_REQUEST, RESPONSE> {

  constructor(protected http: HttpClient, version: number, endpoint: string) {
    super(http, version, endpoint);
  }

  public update(uuid: string, request: UPDATE_REQUEST, params?: {}): Observable<RESPONSE> {
    return this.http.put<RESPONSE>(
      `${this.version}/${this.endpoint}/${uuid}`,
      request,
      { params }
    );
  }

}
