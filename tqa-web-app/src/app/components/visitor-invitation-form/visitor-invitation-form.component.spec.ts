import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorInvitationFormComponent } from './visitor-invitation-form.component';
import {initialPredictionState} from "../../state/store/resources/prediction/prediction.reducer";
import {mockPredictionResponseV2} from "../../dtos/v2/mock/prediction.dto.v2.mock";
import {initialFormState} from "../../state/store/prediction-form/prediction-form.reducer";
import {initialVisitorState} from "../../state/store/resources/visitor/visitor.reducer";
import {mockVisitorResponseV2} from "../../dtos/v2/mock/visitor.dto.v2.mock";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

describe('VisitorInvitationFormComponent', () => {
  let component: VisitorInvitationFormComponent;
  let fixture: ComponentFixture<VisitorInvitationFormComponent>;
  let store: MockStore;
  const initialState = {
    predictions: {...initialPredictionState, resource: mockPredictionResponseV2()},
    predictionForm: initialFormState,
    visitors: {...initialVisitorState, resource: mockVisitorResponseV2()}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorInvitationFormComponent ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(VisitorInvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
