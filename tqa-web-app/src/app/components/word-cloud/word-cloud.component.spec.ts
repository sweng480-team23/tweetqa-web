import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordCloudComponent } from './word-cloud.component';
import { WordCloudResponseV2 } from "../../dtos/v2/word-cloud.dto.v2";
import { mockWordCloudResponseV2 } from "../../dtos/v2/mock/word-cloud.dto.v2.mock";
import { By } from "@angular/platform-browser";
import { QaModelService } from "../../services/qa-model.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { initialFormState } from "../../state/store/prediction-form/prediction-form.reducer";


describe('WordCloudComponent', () => {
  let component: WordCloudComponent;
  let store: MockStore;
  let fixture: ComponentFixture<WordCloudComponent>;
  let mockWordCloudResponse: WordCloudResponseV2;
  const initialState = {
    predictionForm: initialFormState,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordCloudComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        QaModelService,
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockWordCloudResponse = mockWordCloudResponseV2(100)();
    store = TestBed.inject(MockStore);
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
