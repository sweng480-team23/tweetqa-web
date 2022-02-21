import { ResourceAware, ResourceAwareBehavior } from "./resource.aware";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";
import { PredictionRequestFormState } from "../prediction-request-form/prediction-request-form.state";
import { Observable, Subscription } from "rxjs";
import { PredictionFormState } from "../store/prediction-form/prediction-form.reducer";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import * as formStateActions from "../store/prediction-form/prediction-form.action";

export interface PredictionStateAware extends ResourceAware<PredictionResponseV1> {
  store$: Store<AppState>
  formState$: Observable<PredictionFormState>,
  formState: PredictionFormState
}

export function onPredictionResponse (state: PredictionStateAware): Subscription {
  return state.resource$.subscribe(prediction => {
    if (prediction) {
      state.store$.dispatch(formStateActions.setPrediction({ value: prediction }));
    }
  });
}

export function onFormStateChange (state: PredictionStateAware): Subscription {
  return state.formState$.subscribe(formState => {
    if (formState) {
      state.formState = formState;
    }
  });
}

export const PredictionStateAwareBehavior = (props: PredictionStateAware): PredictionStateAware => {
  const state = {
    ...ResourceAwareBehavior({
      resource$: props.resource$,
      subscription: props.subscription
    } as ResourceAware<PredictionResponseV1>),
    formState$: props.formState$,
    store$: props.store$
  } as PredictionStateAware

  state.subscription.add(onFormStateChange(state));
  state.subscription.add(onPredictionResponse(state));

  return state;
}


