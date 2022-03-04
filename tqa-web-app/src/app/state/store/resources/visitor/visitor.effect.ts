import { Injectable } from "@angular/core";
import { CreateReadResourceEffect } from "../create-read-resource.effect";
import { typePrefix } from "./visitor.action";
import * as visitorActions from "./visitor.action";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { VisitorCreateRequestV2, VisitorResponseV2 } from "../../../../dtos/v2/visitor.dto.v2";
import { VisitorService } from "../../../../services/visitor.service";
import {map, switchMap} from "rxjs/operators";

@Injectable()
export class VisitorEffect extends CreateReadResourceEffect<
  VisitorCreateRequestV2,
  VisitorResponseV2,
  VisitorService>
{

  constructor(protected action$: Actions, protected service: VisitorService) {
    super(action$, service, typePrefix);
  }

  public getByToken$ = createEffect(() => this.actions$.pipe(
    ofType(visitorActions.getByToken),
    switchMap(action => this.service.readByToken(action.token)
      .pipe(
        map(response => ({
          type: visitorActions.getByTokenSuccess.type,
          response
        })),
      )
    )
  ));

}
