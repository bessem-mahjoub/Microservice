import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComponentt } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponentt;
  let fixture: ComponentFixture<UpdateComponentt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComponentt ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateComponentt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
