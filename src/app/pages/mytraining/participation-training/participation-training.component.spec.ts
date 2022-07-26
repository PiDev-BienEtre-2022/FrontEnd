import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationTrainingComponent } from './participation-training.component';

describe('ParticipationTrainingComponent', () => {
  let component: ParticipationTrainingComponent;
  let fixture: ComponentFixture<ParticipationTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipationTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
