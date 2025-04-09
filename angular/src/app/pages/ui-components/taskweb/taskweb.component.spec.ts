/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskwebComponent } from './taskweb.component';

describe('TaskwebComponent', () => {
  let component: TaskwebComponent;
  let fixture: ComponentFixture<TaskwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
