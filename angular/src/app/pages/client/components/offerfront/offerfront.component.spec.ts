import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferfrontComponent } from './offerfront.component';

describe('OfferfrontComponent', () => {
  let component: OfferfrontComponent;
  let fixture: ComponentFixture<OfferfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
