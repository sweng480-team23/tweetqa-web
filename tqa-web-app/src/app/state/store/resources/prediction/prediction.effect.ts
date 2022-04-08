import { Injectable } from "@angular/core";
import { CreateReadUpdateResourceEffect } from "../create-read-update-resource.effect";
import {
  PredictionCreateRequestV2,
  PredictionResponseV2,
  PredictionUpdateRequestV2
} from "../../../../dtos/v2/prediction.dto.v2";
import { PredictionService } from "../../../../services/prediction.service";
import { typePrefix } from "./prediction.action";
import { Actions, createEffect, ofType } from "@ngrx/effects";

@Injectable()
export class PredictionEffect extends CreateReadUpdateResourceEffect<
  PredictionCreateRequestV2,
  PredictionResponseV2,
  PredictionUpdateRequestV2,
  PredictionService>
{
  constructor(protected action$: Actions, protected service: PredictionService) {
    super(action$, service, typePrefix);
  }
}
