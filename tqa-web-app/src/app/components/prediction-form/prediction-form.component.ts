import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PredictionResponseV1 } from "../../dtos/v1/prediction.dto.v1";
import { DataResponseV1 } from "../../dtos/v1/data.dto.v1";
import {QAModelResponseV1} from "../../dtos/v1/qa-model.dto.v1";


@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent implements OnInit {

  prediction: PredictionResponseV1;
  predictionRequestForm: FormGroup;
  isSubmitButtonDisabled: boolean = true;
  showAnswer: boolean = false;
  showIsCorrect: boolean = false;
  showAltAnswer: boolean = false;

  constructor(fb: FormBuilder) {
    console.log("Prediction Form constructed");
    this.predictionRequestForm = fb.group({
      model: new FormControl(''),
      isCorrect: new FormControl(''),
      tweet: new FormControl(''),
      question: new FormControl(''),
      altAnswer: new FormControl(''),
    });

    this.prediction = this.getEmptyPrediction();
  }

  ngOnInit(): void {
    this.predictionRequestForm.valueChanges.subscribe(values => {
      this.prediction = this.getUpdatedPrediction()
      this.readyToSubmitInitialRequest(this.prediction);
      this.readyToAcceptAlternateAnswer(this.prediction);
      this.readyToSubmitFinalAnswer(this.prediction);
    });
  }

  getEmptyPrediction(): PredictionResponseV1 {
    return {
      alt_answer: '',
      datum: {
        tweet: '',
        question: '',
        answer: ''
      } as DataResponseV1,
      model: {
        ml_type: ''
      } as QAModelResponseV1
    } as PredictionResponseV1;
  }

  getUpdatedPrediction(): PredictionResponseV1 {
    return <PredictionResponseV1>{
      ...this.prediction,
      alt_answer: this.predictionRequestForm.get('altAnswer')?.value,
      datum: {
        ...this.prediction.datum,
        tweet: this.predictionRequestForm.get('tweet')?.value,
        question: this.predictionRequestForm.get('question')?.value,
      },
      is_correct: this.predictionRequestForm.get('isCorrect')?.value,
      model: {
        ...this.prediction.model,
        ml_type: this.predictionRequestForm.get('model')?.value
      },
    };
  }

  readyToSubmitInitialRequest(prediction: PredictionResponseV1): boolean {
    const ready: boolean = prediction.model.ml_type != ''
      && prediction.datum.tweet != ''
      && prediction.datum.question != ''
      && prediction.datum.answer == '';
    if (ready) {
      this.isSubmitButtonDisabled = false;
    }
    return ready;
  }

  readyToSubmitFinalAnswer(prediction: PredictionResponseV1): boolean {
    const ready: boolean = prediction.is_correct || prediction.alt_answer != '';
    if (ready) {
      this.isSubmitButtonDisabled = false;
    }
    return ready;
  }

  readyToAcceptAlternateAnswer(prediction: PredictionResponseV1): boolean {
    const ready: boolean = this.showIsCorrect && !prediction.is_correct && prediction.alt_answer == '';
    if (ready) {
      this.showAltAnswer = true;
      this.isSubmitButtonDisabled = true;
    }
    return ready;
  }

  onSubmit(): void {
    this.prediction = this.getUpdatedPrediction();

    if (this.readyToSubmitInitialRequest(this.prediction)) {
      this.prediction.datum.answer = "Woah, an answer was returned!"
      this.showAnswer = true;
      this.showIsCorrect = true;
      this.isSubmitButtonDisabled = true;
    }

    if (this.readyToSubmitFinalAnswer(this.prediction)) {
      this.predictionRequestForm.get('tweet')?.setValue('');
      this.predictionRequestForm.get('question')?.setValue('');
      this.predictionRequestForm.get('isCorrect')?.setValue(null);
      this.predictionRequestForm.get('altAnswer')?.setValue('');

      this.prediction = this.getEmptyPrediction();
      this.showAnswer = false;
      this.showIsCorrect = false;
      this.showAltAnswer = false;
      this.isSubmitButtonDisabled = true;
    }

    console.log(this.prediction);
  }

}
