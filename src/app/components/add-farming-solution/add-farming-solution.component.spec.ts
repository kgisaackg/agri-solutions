import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFarmingSolutionComponent } from './add-farming-solution.component';

describe('AddFarmingSolutionComponent', () => {
  let component: AddFarmingSolutionComponent;
  let fixture: ComponentFixture<AddFarmingSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFarmingSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFarmingSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
