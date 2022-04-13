import { AbstractReadService } from "../../../services/abstract/abstract-read.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as resourceActions from './resource.action';
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";


export abstract class ReadResourceEffect<
  RESPONSE,
  SERVICE extends AbstractReadService<RESPONSE>>
{
  constructor(
    protected actions$: Actions,
    protected service: SERVICE,
    protected typePrefix: string
  ) {}

  public getById$ = createEffect(() => this.actions$.pipe(
    ofType(resourceActions.getById(this.typePrefix)),
    switchMap(action => this.service.read(action.id)
      .pipe(
        map(response => ({
          type: resourceActions.getByIdSuccess(this.typePrefix).type,
          response
        })),
        catchError(error => of({
          type: resourceActions.error(this.typePrefix).type,
          message: error.message
        }))
      )
    )
  ));

}
