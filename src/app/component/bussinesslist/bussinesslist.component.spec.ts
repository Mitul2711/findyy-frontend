import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinesslistComponent } from './bussinesslist.component';

describe('BussinesslistComponent', () => {
  let component: BussinesslistComponent;
  let fixture: ComponentFixture<BussinesslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BussinesslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BussinesslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
