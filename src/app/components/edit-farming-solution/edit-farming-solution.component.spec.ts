import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFarmingSolutionComponent } from './edit-farming-solution.component';

describe('EditFarmingSolutionComponent', () => {
  let component: EditFarmingSolutionComponent;
  let fixture: ComponentFixture<EditFarmingSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFarmingSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFarmingSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
