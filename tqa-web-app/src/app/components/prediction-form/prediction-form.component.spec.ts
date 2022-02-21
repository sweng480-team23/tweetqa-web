import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {PredictionFormComponent} from './prediction-form.component';
import {PredictionResponseV1} from "../../dtos/v1/prediction.dto.v1";
import {mockPredictionResponseV1} from "../../dtos/v1/mock/prediction.dto.v1.mock";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {PredictionService} from "../../services/prediction.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AwaitingPredictionRequestState} from "../../state/prediction-request-form/awaiting-prediction-request.state";
import {AwaitingIsCorrectState} from "../../state/prediction-request-form/awaiting-is-correct.state";
import {By} from "@angular/platform-browser";
import {FormAction} from "../../state/prediction-request-form/form-action";
import {AwaitingCorrectSubmissionState} from "../../state/prediction-request-form/awaiting-correct-submission.state";
import {InitialFormState} from "../../state/prediction-request-form/initial-form.state";
import {AwaitingAlternateAnswerState} from "../../state/prediction-request-form/awaiting-alternate-answer.state";
import {AwaitingIncorrectSubmissionState} from "../../state/prediction-request-form/awaiting-incorrect-submission.state";
import {initialFormState, PredictionFormState} from "../../state/store/prediction-form/prediction-form.reducer";
import {initialPredictionState} from "../../state/store/resources/prediction/prediction.reducer";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {PredictionRequestFormState} from "../../state/prediction-request-form/prediction-request-form.state";


describe('PredictionFormComponent', () => {
  let component: PredictionFormComponent;
  let store: MockStore;
  let fixture: ComponentFixture<PredictionFormComponent>;
  let mockPredictionResponse: PredictionResponseV1;
  let button: HTMLButtonElement;
  const initialState = {
    predictions: {...initialPredictionState, resource: mockPredictionResponseV1()},
    predictionForm: initialFormState
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictionFormComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule
      ],
      providers: [
        PredictionService,
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockPredictionResponse = mockPredictionResponseV1()
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PredictionFormComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(By.css('button')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button should initially be disabled', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
    expect(component.formState instanceof InitialFormState);
  });

  it('should be ready to submit prediction', () => {
    enterAwaitingPredictionRequestState();
    expect(component.formState instanceof AwaitingPredictionRequestState).toBeTrue();
    expect(button.disabled).toBeFalse();
  });

  it('should be ready to collect correct/incorrect response', waitForAsync(() => {
    enterAwaitingPredictionRequestState();
    spyOn(component, 'onSubmit');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
    enterAwaitingIsCorrectState()
    fixture.whenStable().then(() => {
      expect(component.formState instanceof AwaitingIsCorrectState).toBeTrue();
      expect(button.disabled).toBeTrue();
    });
  }));

  it('should be ready to submit correct response', () => {
    enterAwaitingCorrectSubmissionState();
    expect(button.disabled).toBeFalse();
    expect(component.formState instanceof AwaitingCorrectSubmissionState).toBeTrue();
  });

  it('should be ready to collect alternate answer', () => {
    enterAwaitingAlternateAnswerState()
    expect(button.disabled).toBeTrue();
    expect(component.formState instanceof AwaitingAlternateAnswerState).toBeTrue();
  });

  it('should be ready to submit incorrect answer', () => {
    enterAwaitingIncorrectSubmissionState();
    expect(button.disabled).toBeFalse();
    expect(component.formState instanceof AwaitingIncorrectSubmissionState).toBeTrue();
  });

  it('submission should return form to initial state', () => {
    reEnterInitialState();
    expect(button.disabled).toBeTrue();
    expect(component.predictionRequestForm.controls['tweet'].value).toBe('');
    expect(component.formState instanceof InitialFormState);
  });

  it('should switch between incorrect and correct answer', () => {
    enterAwaitingCorrectSubmissionState();
    expect(button.disabled).toBeFalse();
    expect(component.formState instanceof AwaitingCorrectSubmissionState).toBeTrue();
    component.predictionRequestForm.controls['isCorrect'].setValue(false);
    enter({
      prediction: {
        ...mockPredictionResponse,
        alt_answer: '',
        is_correct: false
      },
      showAnswer: true,
      showIsCorrect: true,
      showAltAnswer: true,
      isSubmitButtonDisabled: true
    });
    component.formState = component.formState.nextState(FormAction.VALUE_CHANGED);
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();
    expect(component.formState instanceof AwaitingAlternateAnswerState).toBeTrue();
  });

  afterEach(() => {
    fixture.destroy();
  });

  //////////////////////////// Helper Functions ////////////////////////////

  function fillOutInitialPredictionRequest(): void {
    component.predictionRequestForm.controls['model'].setValue(mockPredictionResponse.model.ml_type);
    component.predictionRequestForm.controls['tweet'].setValue(mockPredictionResponse.datum.tweet);
    component.predictionRequestForm.controls['question'].setValue(mockPredictionResponse.datum.question);
  }

  function reEnterInitialState(): void {
    enterAwaitingCorrectSubmissionState();
    enter({
      prediction: PredictionRequestFormState.getEmptyPrediction(),
      showAnswer: false,
      showIsCorrect: false,
      showAltAnswer: false,
      isSubmitButtonDisabled: true
    });
    component.formState = component.formState.nextState(FormAction.SUBMIT);
    fixture.detectChanges();
  }

  function enterAwaitingPredictionRequestState(): void {
    fillOutInitialPredictionRequest();
    enter({
      prediction: mockPredictionResponse,
      showAnswer: false,
      showIsCorrect: false,
      showAltAnswer: false,
      isSubmitButtonDisabled: false
    });
    component.formState = component.formState.nextState(FormAction.VALUE_CHANGED);
    fixture.detectChanges();
  }

  function enterAwaitingIsCorrectState(): void {
    enterAwaitingPredictionRequestState();
    enter({
      prediction: mockPredictionResponse,
      showAnswer: true,
      showIsCorrect: true,
      showAltAnswer: false,
      isSubmitButtonDisabled: true
    });
    component.formState = component.formState.nextState(FormAction.SUBMIT);
    fixture.detectChanges();
  }

  function enterAwaitingCorrectSubmissionState(): void {
    enterAwaitingIsCorrectState();
    component.predictionRequestForm.controls['isCorrect'].setValue(true);
    enter({
      prediction: {
        ...mockPredictionResponse,
        is_correct: true
      },
      showAnswer: true,
      showIsCorrect: true,
      showAltAnswer: false,
      isSubmitButtonDisabled: false
    });
    component.formState = component.formState.nextState(FormAction.VALUE_CHANGED);
    fixture.detectChanges();
  }

  function enterAwaitingAlternateAnswerState(): void {
    enterAwaitingIsCorrectState();
    component.predictionRequestForm.controls['isCorrect'].setValue(false);
    enter({
      prediction: {
        ...mockPredictionResponse,
        is_correct: false,
        alt_answer: ''
      },
      showAnswer: true,
      showIsCorrect: true,
      showAltAnswer: true,
      isSubmitButtonDisabled: true
    });
    component.formState = component.formState.nextState(FormAction.VALUE_CHANGED);
    fixture.detectChanges();
  }

  function enterAwaitingIncorrectSubmissionState(): void {
    enterAwaitingAlternateAnswerState();
    component.predictionRequestForm.controls['altAnswer'].setValue(mockPredictionResponse.alt_answer);
    enter({
      prediction: mockPredictionResponse,
      showAnswer: true,
      showIsCorrect: true,
      showAltAnswer: true,
      isSubmitButtonDisabled: false
    });
    component.formState = component.formState.nextState(FormAction.VALUE_CHANGED);
    fixture.detectChanges();
  }

  function enter(newFormState: PredictionFormState): void {
    store.setState({
      ...initialState,
      predictionForm: newFormState
    });
  }
});
