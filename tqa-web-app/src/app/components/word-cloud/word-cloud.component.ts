import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import {QaModelService} from "../../services/qa-model.service";

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

  public options: any = {
    title: {
      text: ''
    },
    series: [{
        type: 'wordcloud',
        data: []
    }]
  }

  constructor(protected modelService: QaModelService) {}

  ngOnInit(): void {
    this.modelService.getWordCloud(1).subscribe(wordCloud => {
      this.options.series[0].data = wordCloud.words;
      this.highcharts.chart('word-cloud-container', this.options);
    });
  }

}
