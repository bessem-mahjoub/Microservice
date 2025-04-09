import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDefenceComponent } from './update-defence.component';

describe('UpdateDefenceComponent', () => {
  let component: UpdateDefenceComponent;
  let fixture: ComponentFixture<UpdateDefenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDefenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDefenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
