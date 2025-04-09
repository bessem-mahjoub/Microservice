/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddturninComponent } from './addturnin.component';

describe('AddturninComponent', () => {
  let component: AddturninComponent;
  let fixture: ComponentFixture<AddturninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddturninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddturninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
