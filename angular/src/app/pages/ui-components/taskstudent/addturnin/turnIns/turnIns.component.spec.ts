/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TurnInsComponent } from './turnIns.component';

describe('TurnInsComponent', () => {
  let component: TurnInsComponent;
  let fixture: ComponentFixture<TurnInsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnInsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
