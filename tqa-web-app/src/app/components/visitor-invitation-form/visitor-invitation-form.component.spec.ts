import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorInvitationFormComponent } from './visitor-invitation-form.component';

describe('VisitorInvitationFormComponent', () => {
  let component: VisitorInvitationFormComponent;
  let fixture: ComponentFixture<VisitorInvitationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorInvitationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorInvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
