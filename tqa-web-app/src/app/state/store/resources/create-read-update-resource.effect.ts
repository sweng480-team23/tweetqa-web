import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as resourceActions from "./resource.action";
import { map, switchMap } from "rxjs/operators";
import { CreateReadResourceEffect } from "./create-read-resource.effect";
import { AbstractCreateReadUpdateService } from "../../../services/abstract-create-read-update.service";

export abstract class CreateReadUpdateResourceEffect<
  CREATE_REQUEST,
  RESPONSE,
  UPDATE_REQUEST,
  SERVICE extends AbstractCreateReadUpdateService<CREATE_REQUEST, RESPONSE, UPDATE_REQUEST>>
  extends CreateReadResourceEffect<CREATE_REQUEST, RESPONSE, SERVICE>
{

  constructor(
    protected actions$: Actions,
    protected service: SERVICE,
    protected typePrefix: string)
  {
    super(actions$, service, typePrefix);
  }

  public update$ = createEffect(() => this.actions$.pipe(
    ofType(resourceActions.update(this.typePrefix)),
    switchMap(action => this.service.update(action.id, action.request as UPDATE_REQUEST)
      .pipe(
        map( updated => ({
          type: resourceActions.updateSuccess(this.typePrefix).type,
          response: updated
        })),
      )
    )
  ));

}
