import { SubscriptionAware } from "./subscription.aware";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../../components/error-dialog/error-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import { resetError } from "../store/resources/resource.action";

export interface ErrorAware extends SubscriptionAware {
  error$: Observable<HttpErrorResponse>;
  dialog: MatDialog;
  store$: Store<AppState>,
  typePrefix: string;
}

export function onError(state: ErrorAware): Subscription {
  return state.error$.subscribe(error => {
    if (error) {
        state.dialog.open(ErrorDialogComponent, {
          data: {
            message: error.message
          }
        });
        state.store$.dispatch(resetError(state.typePrefix)());
    }
  });
}


export const ErrorAwareBehavior = (props: ErrorAware): ErrorAware => {
  const state = {
    subscription: props.subscription,
    error$: props.error$,
    dialog: props.dialog,
    store$: props.store$,
    typePrefix: props.typePrefix
  } as ErrorAware;

  state.subscription.add(onError(state));

  return state;
}

