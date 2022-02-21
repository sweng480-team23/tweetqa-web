import {AbstractCreateReadService} from "../../../services/abstract-create-read.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as resourceActions from './resource.action';
import {map, switchMap} from "rxjs/operators";


export abstract class CreateReadResourceEffect<
  CREATE_REQUEST,
  RESPONSE,
  SERVICE extends AbstractCreateReadService<CREATE_REQUEST, RESPONSE>>
{

  constructor(
    protected actions$: Actions,
    protected service: SERVICE,
    protected typePrefix: string) {}

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
