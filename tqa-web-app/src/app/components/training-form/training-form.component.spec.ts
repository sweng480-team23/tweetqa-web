import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFormComponent } from './training-form.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialTrainingState} from "../../state/store/resources/training/training.reducer";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {mockTrainingCreateRequestV2, mockTrainingResponseV2} from "../../dtos/v2/mock/training.dto.v2.mock";
import {initialAdminState} from "../../state/store/resources/adminauth/adminauth.reducer";
import {AdminV2} from "../../dtos/v2/admin-auth.dto.v2";
import faker from "@faker-js/faker";


describe('TrainingFormComponent', () => {
  let component: TrainingFormComponent;
  let fixture: ComponentFixture<TrainingFormComponent>;
  let store: MockStore;

  const initialState = {
    adminAuth: {
      ...initialAdminState,
      resource: new AdminV2(
        faker.datatype.number(),
        faker.internet.email(),
        faker.datatype.uuid(),
        faker.datatype.datetime()
      )
    },
    training: {
      ...initialTrainingState,
      resource: mockTrainingCreateRequestV2(),
      response: mockTrainingResponseV2()
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingFormComponent ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
