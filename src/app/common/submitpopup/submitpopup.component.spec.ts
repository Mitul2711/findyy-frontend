import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitpopupComponent } from './submitpopup.component';

describe('SubmitpopupComponent', () => {
  let component: SubmitpopupComponent;
  let fixture: ComponentFixture<SubmitpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitpopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
