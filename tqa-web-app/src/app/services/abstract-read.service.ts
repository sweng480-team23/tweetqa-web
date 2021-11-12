import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbstractReadService<RESPONSE> {
  protected version: number;
  protected endpoint: string;

  constructor(protected http: HttpClient, version: number, endpoint: string) {
    this.version = version;
    this.endpoint = endpoint;
  }

  public read(uuid: string, params?: {}): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`${this.version}/${this.endpoint}/${uuid}`, { params });
  }

}
