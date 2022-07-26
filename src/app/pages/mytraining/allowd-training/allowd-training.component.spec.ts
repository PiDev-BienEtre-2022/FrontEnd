import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowdTrainingComponent } from './allowd-training.component';

describe('AllowdTrainingComponent', () => {
  let component: AllowdTrainingComponent;
  let fixture: ComponentFixture<AllowdTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowdTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowdTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
