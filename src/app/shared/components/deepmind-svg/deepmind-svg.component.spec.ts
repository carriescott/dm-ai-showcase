import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepmindSvgComponent } from './deepmind-svg.component';

describe('DeepmindSvgComponent', () => {
  let component: DeepmindSvgComponent;
  let fixture: ComponentFixture<DeepmindSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeepmindSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepmindSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
