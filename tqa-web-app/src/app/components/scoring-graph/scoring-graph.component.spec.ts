import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringGraphComponent } from './scoring-graph.component';
import { QAModelCollectionResponseV1 } from "../../dtos/v1/qa-model.dto.v1";
import { mockQAModelCollectionResponseV1 } from "../../dtos/v1/mock/qa-model.dto.v1.mock";
import {ModelSeriesType} from "../../types/model-series.type";
import {SeriesOptionsType} from "highcharts";
import {By} from "@angular/platform-browser";

describe('ScoringGraphComponent', () => {
  let component: ScoringGraphComponent;
  let fixture: ComponentFixture<ScoringGraphComponent>;
  let mockQAModelCollectionResponse: QAModelCollectionResponseV1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoringGraphComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockQAModelCollectionResponse = mockQAModelCollectionResponseV1(20)();
    fixture = TestBed.createComponent(ScoringGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert QAModelCollectionResponse to ModelSeriesType', () => {
    const series: SeriesOptionsType[] = component.toSeries(mockQAModelCollectionResponse);
    expect(series[0].type).toEqual('line');
    const seriesData: ModelSeriesType[] = series.map(s => {
      return {...s} as ModelSeriesType;
    });
    expect(seriesData.length).toEqual(3);
    expect(seriesData[0].data.length).toEqual(mockQAModelCollectionResponse.collection.length);
    expect(seriesData[0].data.length).toEqual(seriesData[1].data.length);
    expect(seriesData[0].data[0].id).toEqual(seriesData[1].data[0].id);
  });

  it('should display chart for model scores', () => {
    const chartDiv: any = fixture.debugElement.query(By.css('.highcharts-container'));
    expect(chartDiv).toBeTruthy();
  });
});
