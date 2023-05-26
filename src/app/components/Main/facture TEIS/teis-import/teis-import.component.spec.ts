import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeisImportComponent } from './teis-import.component';

describe('TeisImportComponent', () => {
  let component: TeisImportComponent;
  let fixture: ComponentFixture<TeisImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeisImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeisImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
