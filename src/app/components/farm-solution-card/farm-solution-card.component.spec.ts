import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmSolutionCardComponent } from './farm-solution-card.component';

describe('FarmSolutionCardComponent', () => {
  let component: FarmSolutionCardComponent;
  let fixture: ComponentFixture<FarmSolutionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmSolutionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmSolutionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
