import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmComparisonComponent } from './algorithm-comparison.component';

describe('AlgorithmComparisonComponent', () => {
  let component: AlgorithmComparisonComponent;
  let fixture: ComponentFixture<AlgorithmComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
