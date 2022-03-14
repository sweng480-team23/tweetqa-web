import { SubscriptionAware } from "./subscription.aware";
import {Observable, Subscription} from "rxjs";

export interface CreateAware extends SubscriptionAware {
  created$: Observable<boolean>;
  created: boolean;
  onCreateSuccess: () => void;
}

export function onCreatedChange(state: CreateAware): Subscription {
  return state.created$.subscribe(created => {
    state.created = created;
    if (created) {
      state.onCreateSuccess();
    }
  });
}

export const CreateAwareBehavior = (props: CreateAware): CreateAware => {
  const state = {
    created$: props.created$,
    subscription: props.subscription,
    onCreateSuccess: props.onCreateSuccess
  } as CreateAware;

  state.subscription.add(onCreatedChange(state));

  return state;
}
