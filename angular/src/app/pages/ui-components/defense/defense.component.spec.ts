import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseComponent } from './defense.component';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';

describe('DefenseComponent', () => {
  let component: DefenseComponent;
  let fixture: ComponentFixture<DefenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
