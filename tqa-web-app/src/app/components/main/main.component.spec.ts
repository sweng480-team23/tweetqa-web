import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { LocalStorageService } from "../../services/local-storage.service";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { initialVisitorState } from "../../state/store/resources/visitor/visitor.reducer";
import { mockVisitorResponseV2 } from "../../dtos/v2/mock/visitor.dto.v2.mock";
import faker from "@faker-js/faker";
import {of} from "rxjs";


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let service: LocalStorageService;
  let store: MockStore;

  const initialState = {
    visitors: {...initialVisitorState, resource: mockVisitorResponseV2()},
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [
        LocalStorageService,
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap(
              {
                token: faker.datatype.uuid()
              }
            ))
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(LocalStorageService);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
