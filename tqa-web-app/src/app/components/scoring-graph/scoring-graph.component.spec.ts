import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringGraphComponent } from './scoring-graph.component';
import { QAModelCollectionResponseV2 } from "../../dtos/v2/qa-model.dto.v2";
import { mockQAModelCollectionResponseV2 } from "../../dtos/v2/mock/qa-model.dto.v2.mock";
import { ModelSeriesType } from "../../types/model-series.type";
import { SeriesOptionsType } from "highcharts";
import { By } from "@angular/platform-browser";
import { QaModelService } from "../../services/qa-model.service";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import { initialFormState } from "../../state/store/prediction-form/prediction-form.reducer";

describe('ScoringGraphComponent', () => {
  let component: ScoringGraphComponent;
  let store: MockStore;
  let fixture: ComponentFixture<ScoringGraphComponent>;
  let mockQAModelCollectionResponse: QAModelCollectionResponseV2;
  const initialState = {
    predictionForm: initialFormState,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoringGraphComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        QaModelService,
        HttpClientModule,
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockQAModelCollectionResponse = mockQAModelCollectionResponseV2(20)();
    store = TestBed.inject(MockStore);
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
    component.options.series = component.toSeries(mockQAModelCollectionResponse);
    component.highcharts.chart('score-chart-container', component.options);
    fixture.detectChanges();
    const chartDiv: any = fixture.debugElement.query(By.css('.highcharts-container'));
    expect(chartDiv).toBeTruthy();
  });

});
