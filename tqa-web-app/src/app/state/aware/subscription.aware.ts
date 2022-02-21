import { Subscription } from "rxjs";

export interface SubscriptionAware {
  subscription: Subscription;
}
