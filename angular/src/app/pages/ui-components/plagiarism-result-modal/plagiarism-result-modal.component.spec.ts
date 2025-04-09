import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlagiarismResultModalComponent } from './plagiarism-result-modal.component';

describe('PlagiarismResultModalComponent', () => {
  let component: PlagiarismResultModalComponent;
  let fixture: ComponentFixture<PlagiarismResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlagiarismResultModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlagiarismResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
