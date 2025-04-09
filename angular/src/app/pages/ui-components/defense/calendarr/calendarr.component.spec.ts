import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarrComponent } from './calendarr.component';

describe('CalendarrComponent', () => {
  let component: CalendarrComponent;
  let fixture: ComponentFixture<CalendarrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
