import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponentt } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponentt;
  let fixture: ComponentFixture<CreateComponentt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponentt ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComponentt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
