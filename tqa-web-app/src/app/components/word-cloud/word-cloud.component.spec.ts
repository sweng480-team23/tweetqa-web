import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import { WordCloudComponent } from './word-cloud.component';
import { WordCloudResponseV1 } from "../../dtos/v1/word-cloud.dto.v1";
import { mockWordCloudResponseV1 } from "../../dtos/v1/mock/word-cloud.dto.v1.mock";
import { By } from "@angular/platform-browser";
import {QaModelService} from "../../services/qa-model.service";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('WordCloudComponent', () => {
  let component: WordCloudComponent;
  let fixture: ComponentFixture<WordCloudComponent>;
  let mockWordCloudResponse: WordCloudResponseV1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordCloudComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ QaModelService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockWordCloudResponse = mockWordCloudResponseV1(100)();
    fixture = TestBed.createComponent(WordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display highchart for word cloud', () => {
    component.options.series = mockWordCloudResponse.words;
    component.highcharts.chart('word-cloud-container', component.options);
    fixture.detectChanges();
    const chartDiv: any = fixture.debugElement.query(By.css('.highcharts-container'));
    expect(chartDiv).toBeTruthy();
  });
});
