import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchsedMembershipComponent } from './purchsed-membership.component';

describe('PurchsedMembershipComponent', () => {
  let component: PurchsedMembershipComponent;
  let fixture: ComponentFixture<PurchsedMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchsedMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchsedMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
