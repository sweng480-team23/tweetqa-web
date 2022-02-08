import { Component, OnInit } from '@angular/core';
import { ModelSeriesType } from "../../types/model-series.type";
import { QAModelCollectionResponseV1, QAModelResponseV1 } from "../../dtos/v1/qa-model.dto.v1";
import { ModelDataType } from "../../types/model-data.type";
import { Score } from "../../constants/score.enum";
import * as Highcharts from 'highcharts';
import { mockQAModelCollectionResponseV1 } from "../../dtos/v1/mock/qa-model.dto.v1.mock";
import { SeriesOptionsType } from "highcharts";


@Component({
  selector: 'app-scoring-graph',
  templateUrl: './scoring-graph.component.html',
  styleUrls: ['./scoring-graph.component.scss']
})
export class ScoringGraphComponent implements OnInit {
  public highcharts = Highcharts;

  public options: Highcharts.Options = {
    title: {
      text: "Model Scores over Time"
    },
    xAxis: {
      title: {
        text: "Date Model Created"
      },
      type: "datetime"
    },
    yAxis: {
      title: {
        text: "Score"
      },
      type: "linear"
    },
    series: []
  }

  constructor() { }

  ngOnInit(): void {
    // Mock call is for dev purposes only, should be replaced with an api call and response
    const mockQAModelCollectionResponse = mockQAModelCollectionResponseV1(20)();
    mockQAModelCollectionResponse.collection.forEach(model => console.log(model));
    this.options.series = this.toSeries(mockQAModelCollectionResponse);
    this.highcharts.chart('score-chart-container', this.options);
  }

  toSeries(qaModels: QAModelCollectionResponseV1): SeriesOptionsType[] {
    let bleuData: ModelDataType[] = [];
    let rougeData: ModelDataType[] = [];
    let meteorData: ModelDataType[] = [];
    qaModels.collection.forEach(model => {
      this.toData(model).forEach(data => {
        switch (data.name) {
          case Score.BLEU.toString():
            bleuData.push(data);
            break;
          case Score.METEOR.toString():
            meteorData.push(data);
            break;
          case Score.ROUGE.toString():
            rougeData.push(data);
            break;
        }
      });
    });
    return [
      {color: "", data: bleuData, name: Score.BLEU.toString(), type: "line"},
      {color: "", data: meteorData, name: Score.METEOR.toString(), type: "line"},
      {color: "", data: rougeData, name: Score.ROUGE.toString(), type: "line"}
    ];
  }

  toData(qaModel: QAModelResponseV1): any[] {
    return [
      {modelId: qaModel.id, x: new Date(qaModel.created_date).getTime(), y: qaModel.bleu_score, name: Score.BLEU.toString()} as ModelDataType,
      {modelId: qaModel.id, x: new Date(qaModel.created_date).getTime(), y: qaModel.meteor_score, name: Score.METEOR.toString()} as ModelDataType,
      {modelId: qaModel.id, x: new Date(qaModel.created_date).getTime(), y: qaModel.rouge_score, name: Score.ROUGE.toString()} as ModelDataType,
    ]
  }

}
