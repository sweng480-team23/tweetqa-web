import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive()
export abstract class SubscribedComponent implements OnDestroy {
  protected subscription: Subscription = new Subscription();

  constructor() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
