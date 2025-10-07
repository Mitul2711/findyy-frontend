import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessreviewComponent } from './businessreview.component';

describe('BusinessreviewComponent', () => {
  let component: BusinessreviewComponent;
  let fixture: ComponentFixture<BusinessreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
