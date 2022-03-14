import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { HeaderComponent } from './header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatIconModule,
        MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const logo: HTMLImageElement = fixture.debugElement.query(By.css('.logo-image')).nativeElement;
    expect(logo.src).toContain('assets/images/twitter-logo.png');
  });
});
