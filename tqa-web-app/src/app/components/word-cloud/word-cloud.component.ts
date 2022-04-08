import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { QaModelService } from "../../services/qa-model.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/store/app.state";
import * as formStateSelectors from "../../state/store/prediction-form/prediction-form.selector";

declare var require: any
const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {
  public highcharts = Highcharts;
  private mlType: string = '';

  public options: any = {
    title: {
      text: ''
    },
    series: [{
        type: 'wordcloud',
        data: []
    }]
  }

  constructor(
    public store$: Store<AppState>,
    protected modelService: QaModelService) {}

  ngOnInit(): void {
    this.store$.select(formStateSelectors.getFormState).subscribe(formState => {
      if (formState.prediction.model.ml_type != '' && formState.prediction.model.ml_type != this.mlType) {
        this.mlType = formState.prediction.model.ml_type;
        this.modelService.getWordCloud(formState.prediction.model.id).subscribe(wordCloud => {
          this.options.series[0].data = wordCloud.words;
          this.highcharts.chart('word-cloud-container', this.options);
        });
      }
    })

  }

}
