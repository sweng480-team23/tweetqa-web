import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { HeaderComponent } from './header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialAdminState} from "../../state/store/resources/adminauth/adminauth.reducer";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  const initialState = {
    adminAuth: { ...initialAdminState }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatIconModule,
        MatMenuModule
      ],
      providers: [
        provideMockStore( { initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const logo: HTMLImageElement = fixture.debugElement.query(By.css('.logo-image')).nativeElement;
    expect(logo.src).toContain('assets/images/twitter-logo.png');
  });
});
