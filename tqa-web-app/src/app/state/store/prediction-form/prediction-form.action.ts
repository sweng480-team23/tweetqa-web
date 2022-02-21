import { createAction, props } from "@ngrx/store";
import { PredictionResponseV1 } from "../../../dtos/v1/prediction.dto.v1";

export const typePrefix: string = '[Prediction Form]';

export const setIsButtonDisabled = createAction(
  `${typePrefix} set isButtonDisabled`,
  props<{value: boolean}>()
);

export const setShowAnswer = createAction(
  `${typePrefix} set showAnswer`,
  props<{value: boolean}>()
);

export const setShowIsCorrect = createAction(
  `${typePrefix} set showIsCorrect`,
  props<{value: boolean}>()
);

export const setShowAltAnswer = createAction(
  `${typePrefix} set showAltAnswer`,
  props<{value: boolean}>()
);

export const setPrediction = createAction(
  `${typePrefix} set prediction`,
  props<{value: PredictionResponseV1}>()
);
