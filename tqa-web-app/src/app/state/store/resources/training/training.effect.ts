import { Injectable } from "@angular/core";
import { typePrefix } from "./training.action";
import { Actions } from "@ngrx/effects";
import { CreateReadResourceEffect } from "../create-read-resource.effect";
import { TrainingCreateRequestV2, TrainingResponseV2 } from "../../../../dtos/v2/training.dto.v2";
import { TrainingService } from "../../../../services/training.service";

@Injectable()
export class TrainingEffect extends CreateReadResourceEffect<
  TrainingCreateRequestV2,
  TrainingResponseV2,
  TrainingService>
{

  constructor(protected action$: Actions, protected service: TrainingService) {
    super(action$, service, typePrefix);
  }

}
