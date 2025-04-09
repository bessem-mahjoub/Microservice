import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedefenseComponent } from './createdefense.component';

describe('CreatedefenseComponent', () => {
  let component: CreatedefenseComponent;
  let fixture: ComponentFixture<CreatedefenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedefenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedefenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
