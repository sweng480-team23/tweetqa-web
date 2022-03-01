import { AbstractCreateReadService } from "../../../services/abstract/abstract-create-read.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as resourceActions from './resource.action';
import { map, switchMap } from "rxjs/operators";
import { ReadResourceEffect } from "./read-resource.effect";


export abstract class CreateReadResourceEffect<
  CREATE_REQUEST,
  RESPONSE,
  SERVICE extends AbstractCreateReadService<CREATE_REQUEST, RESPONSE>>
  extends ReadResourceEffect<RESPONSE, SERVICE>
{

  constructor(
    protected actions$: Actions,
    protected service: SERVICE,
    protected typePrefix: string)
  {
    super(actions$, service, typePrefix);
  }

  public create$ = createEffect(() => this.actions$.pipe(
    ofType(resourceActions.create(this.typePrefix)),
    switchMap(action => this.service.create(action.request as CREATE_REQUEST)
      .pipe(
        map(created => ({
          type: resourceActions.createSuccess(this.typePrefix).type,
          response: created
        })),
      )
    )
  ));

}
