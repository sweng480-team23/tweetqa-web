import { SubscriptionAware } from "./subscription.aware";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../../components/error-dialog/error-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

export interface ErrorAware extends SubscriptionAware {
  error$: Observable<HttpErrorResponse>;
  dialog: MatDialog;
}

export function onError(state: ErrorAware): Subscription {
  return state.error$.subscribe(error => {
    if (error) {
        state.dialog.open(ErrorDialogComponent, {
          data: {
            message: error.message
          }
        });
    }
  });
}


export const ErrorAwareBehavior = (props: ErrorAware): ErrorAware => {
  const state = {
    subscription: props.subscription,
    error$: props.error$,
    dialog: props.dialog,
  } as ErrorAware;

  state.subscription.add(onError(state));

  return state;
}

