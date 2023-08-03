import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSelectionComponent } from './landing-selection.component';

describe('LandingSelectionComponent', () => {
  let component: LandingSelectionComponent;
  let fixture: ComponentFixture<LandingSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
