import { Injectable } from "@angular/core";
import { CreateReadResourceEffect } from "../create-read-resource.effect";
import { PredictionCreateRequestV1, PredictionResponseV1 } from "../../../../dtos/v1/prediction.dto.v1";
import { PredictionService } from "../../../../services/prediction.service";
import { typePrefix } from "./prediction.action";
import { Actions } from "@ngrx/effects";

@Injectable()
export class PredictionEffect extends CreateReadResourceEffect<
  PredictionCreateRequestV1,
  PredictionResponseV1,
  PredictionService>
{

  constructor(protected action$: Actions, protected service: PredictionService) {
    super(action$, service, typePrefix);
  }

}
