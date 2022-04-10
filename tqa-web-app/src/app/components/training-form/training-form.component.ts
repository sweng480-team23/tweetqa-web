import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AppState } from "../../state/store/app.state";
import { Store } from "@ngrx/store";
import { TrainingCreateRequestV2 } from "../../dtos/v2/training.dto.v2";
import { ResourceAware, ResourceAwareBehavior } from "../../state/aware/resource.aware";
import * as trainingActions from "../../state/store/resources/training/training.action";
import * as trainingSelectors from "../../state/store/resources/training/training.selector";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {

  trainingRequestForm: FormGroup;
  trainingAware: ResourceAware<TrainingCreateRequestV2>;
  possibleEpochs: number[] = [1, 2, 4, 8, 16, 32];
  possibleLearningRates: string[] = ["1.05e-7", "2.9e-5"];
  possibleBatchSizes: number[] = [4, 8, 16, 32]
  possibleBaseModels: string[]= ['bert-large-uncased-whole-word-masking-finetuned-squad]']

  constructor(
    public store$: Store<AppState>,
    fb: FormBuilder)
  {
    this.trainingAware = ResourceAwareBehavior({
      resource$: this.store$.select(trainingSelectors.selectResource),
      subscription: new Subscription()
    } as ResourceAware<TrainingCreateRequestV2>);

    this.trainingRequestForm = fb.group({
      epochs: new FormControl(this.possibleEpochs[1]),
      learningRate: new FormControl(this.possibleLearningRates[1]),
      batchSize: new FormControl(this.possibleBatchSizes[1]),
      baseModel: new FormControl(this.possibleBaseModels[0]),
      lastXLabels: new FormControl(5000),
      includeUserLabels: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.trainingRequestForm.valueChanges.subscribe(values => {
      this.store$.dispatch(trainingActions.updateResource({
        resource: {
          ...values
        } as TrainingCreateRequestV2
      }));
    });
  }

  onSubmit(): void {
    this.store$.dispatch(trainingActions.create({ request: this.trainingAware.resource }));
  }

}
