import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmingSolutionComponent } from './farming-solution.component';

describe('FarmingSolutionComponent', () => {
  let component: FarmingSolutionComponent;
  let fixture: ComponentFixture<FarmingSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmingSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmingSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
