import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEISComponent } from './teis.component';

describe('TEISComponent', () => {
  let component: TEISComponent;
  let fixture: ComponentFixture<TEISComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TEISComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TEISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
