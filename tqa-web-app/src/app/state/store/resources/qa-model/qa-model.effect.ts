import { Injectable } from "@angular/core";
import { typePrefix } from "./qa-model.action";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QAModelResponseV2 } from "../../../../dtos/v2/qa-model.dto.v2";
import { QaModelService } from "../../../../services/qa-model.service";
import { ReadResourceEffect } from "../read-resource.effect";
import * as qaModelActions from "./qa-model.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import * as resourceActions from "../resource.action";

@Injectable()
export class QAModelEffect extends ReadResourceEffect<
  QAModelResponseV2,
  QaModelService>
{

  constructor(protected action$: Actions, protected service: QaModelService) {
    super(action$, service, typePrefix);
  }

  public getBestModels$ = createEffect(() => this.action$.pipe(
    ofType(qaModelActions.getBestModels),
    switchMap(action => this.service.readBestModelsForEachType()
      .pipe(
        map(response => ({
          type: qaModelActions.getResourcesSuccess.type,
          resources: response
        })),
        catchError(error => of({
          type: resourceActions.error(this.typePrefix).type,
          message: error.message
        }))
      ))
  ));

}
