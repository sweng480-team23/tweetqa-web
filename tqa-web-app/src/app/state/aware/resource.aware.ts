import {Observable, Subscription} from "rxjs";
import {SubscriptionAware} from "./subscription.aware";

export interface ResourceAware<DTO> extends SubscriptionAware {
  resource$: Observable<DTO>;
  resource: DTO;
}

export function onResourceChange<DTO>(state: ResourceAware<DTO>): Subscription {
  return state.resource$.subscribe(resource => {
    if (resource) {
      state.resource = resource;
    }
  });
}

export const ResourceAwareBehavior = <DTO>(props: ResourceAware<DTO>): ResourceAware<DTO> => {
  const state = {
    resource$: props.resource$,
    subscription: props.subscription,
  } as ResourceAware<DTO>;

  state.subscription.add(onResourceChange<DTO>(state));

  return state;
}
