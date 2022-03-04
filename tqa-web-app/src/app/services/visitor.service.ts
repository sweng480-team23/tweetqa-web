import { Injectable } from '@angular/core';
import { AbstractCreateReadService } from "./abstract/abstract-create-read.service";
import { VisitorCreateRequestV2, VisitorResponseV2 } from "../dtos/v2/visitor.dto.v2";
import { HttpClient } from "@angular/common/http";
import {ApiMapping} from "../util/api-mapping";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisitorService extends AbstractCreateReadService<VisitorCreateRequestV2, VisitorResponseV2>{

  constructor(protected http: HttpClient) {
    super(http, 2, ApiMapping.VISITORS.getPath)
  }

  public readByToken(token: string, params?: {}): Observable<VisitorResponseV2> {
    return this.http.get<VisitorResponseV2>(`v${this.version}/${this.endpoint}/${token}`);
  }
}
