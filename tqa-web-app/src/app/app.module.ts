import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictionFormComponent } from './components/prediction-form/prediction-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RequestInterceptor } from "./util/request-interceptor";
import { PredictionService } from "./services/prediction.service";
import { ScoringGraphComponent } from './components/scoring-graph/scoring-graph.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { HeaderComponent } from './components/header/header.component';
import { QaModelService } from "./services/qa-model.service";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./state/store/app.state";
import { EffectsModule } from "@ngrx/effects";
import { PredictionEffect } from "./state/store/resources/prediction/prediction.effect";
import { VisitorEffect } from "./state/store/resources/visitor/visitor.effect";
import { LocalStorageService } from "./services/local-storage.service";
import { MainComponent } from './components/main/main.component';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { VisitorInvitationFormComponent } from './components/visitor-invitation-form/visitor-invitation-form.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AdminAuthEffects } from './state/store/resources/adminauth/adminauth.effects';
import { QAModelEffect } from "./state/store/resources/qa-model/qa-model.effect";
import { TrainingFormComponent } from './components/training-form/training-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PredictionFormComponent,
    ScoringGraphComponent,
    WordCloudComponent,
    HeaderComponent,
    MainComponent,
    AdminAuthComponent,
    AdminComponent,
    VisitorInvitationFormComponent,
    SuccessDialogComponent,
    TrainingFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      PredictionEffect,
      VisitorEffect,
      AdminAuthEffects,
      QAModelEffect,
      VisitorEffect
    ]),
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    LocalStorageService,
    QaModelService,
    PredictionService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
