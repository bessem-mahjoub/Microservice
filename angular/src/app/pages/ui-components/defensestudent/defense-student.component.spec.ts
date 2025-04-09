import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseStudentComponent } from './defense-student.component';

describe('DefenseStudentComponent', () => {
  let component: DefenseStudentComponent;
  let fixture: ComponentFixture<DefenseStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefenseStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefenseStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
