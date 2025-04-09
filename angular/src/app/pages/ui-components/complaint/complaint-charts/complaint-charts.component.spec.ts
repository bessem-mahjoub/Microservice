import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintChartsComponent } from './complaint-charts.component';

describe('ComplaintChartsComponent', () => {
  let component: ComplaintChartsComponent;
  let fixture: ComponentFixture<ComplaintChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
