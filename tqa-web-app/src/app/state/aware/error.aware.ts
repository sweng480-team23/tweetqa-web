import { SubscriptionAware } from "./subscription.aware";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../../components/error-dialog/error-dialog.component";

export interface ErrorAware extends SubscriptionAware {
  error$: Observable<boolean>;
  errorMessage$: Observable<string>;
  dialog: MatDialog;
}

export function onError(state: ErrorAware): Subscription {
  return state.error$.subscribe(error => {
    if (error) {
      state.errorMessage$.subscribe(errorMessage => {
        state.dialog.open(ErrorDialogComponent, {
          data: {
            message: errorMessage
          }
        });
      })
    }
  });
}

export const ErrorAwareBehavior = (props: ErrorAware): ErrorAware => {
  const state = {
    subscription: props.subscription,
    error$: props.error$,
    errorMessage$: props.errorMessage$,
    dialog: props.dialog
  } as ErrorAware;

  state.subscription.add(onError(state));

  return state;
}

