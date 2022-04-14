import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/store/app.state";
import { Constant } from "../../constants/constant";
import * as visitorActions from "../../state/store/resources/visitor/visitor.action";
import * as modelActions from "../../state/store/resources/qa-model/qa-model.action";
import {SubscribedComponent} from "../abstract/subscribed-component.directive";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends SubscribedComponent implements OnInit {

  constructor(
      private localStorageService: LocalStorageService,
      private route: ActivatedRoute,
      private store: Store<AppState>)
  {
    super();
  }

  ngOnInit(): void {
    this.subscription.add(this.onRouteChange());
    this.store.dispatch(modelActions.getBestModels());
  }

  onRouteChange(): Subscription {
    return this.route.queryParamMap.subscribe(params => {
      let token: string | null = params.get(Constant.TOKEN.getValue);
      if (!!token) {
        this.localStorageService.setItem(`${Constant.TOKEN.getValue}`, token);
        this.store.dispatch(visitorActions.getByToken({ token }));
      } else {
        token = this.localStorageService.getItem(Constant.TOKEN.getValue);
        if (!!token) {
          this.store.dispatch(visitorActions.getByToken({ token }));
        }
      }
    });
  }

}
