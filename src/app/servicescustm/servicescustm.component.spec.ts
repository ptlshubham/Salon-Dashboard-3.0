import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicescustmComponent } from './servicescustm.component';

describe('ServicescustmComponent', () => {
  let component: ServicescustmComponent;
  let fixture: ComponentFixture<ServicescustmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicescustmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicescustmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
