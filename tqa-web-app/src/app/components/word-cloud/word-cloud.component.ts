import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { mockWordCloudResponseV1 } from "../../dtos/v1/mock/word-cloud.dto.v1.mock";

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
      text: 'Word Frequency of Dataset'
    },
    series: [{
        type: 'wordcloud',
        data: mockWordCloudResponseV1(100)().words
    }]
  }

  constructor() { }

  ngOnInit(): void {
    // Mock call is for dev purposes only, should be replaced with an api call and response
    const mockWordCloudResponse = mockWordCloudResponseV1(100)();
    this.options.series[0].data = mockWordCloudResponse.words;
    this.highcharts.chart('word-cloud-container', this.options);
  }

}
