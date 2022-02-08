import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordCloudComponent } from './word-cloud.component';
import { WordCloudResponseV1 } from "../../dtos/v1/word-cloud.dto.v1";
import { mockWordCloudResponseV1 } from "../../dtos/v1/mock/word-cloud.dto.v1.mock";
import { By } from "@angular/platform-browser";

describe('WordCloudComponent', () => {
  let component: WordCloudComponent;
  let fixture: ComponentFixture<WordCloudComponent>;
  let mockWordCloudResponse: WordCloudResponseV1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordCloudComponent ],
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
    const chartDiv: any = fixture.debugElement.query(By.css('.highcharts-container'));
    expect(chartDiv).toBeTruthy();
  });
});
