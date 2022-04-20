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
import {mockTrainingCreateRequestV2} from "../../dtos/v2/mock/training.dto.v2.mock";

describe('TrainingFormComponent', () => {
  let component: TrainingFormComponent;
  let fixture: ComponentFixture<TrainingFormComponent>;
  let store: MockStore;

  const initialState = {
    training: {
      ...initialTrainingState,
      resource: mockTrainingCreateRequestV2()
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
