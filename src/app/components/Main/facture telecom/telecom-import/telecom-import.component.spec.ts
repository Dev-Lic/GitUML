import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecomImportComponent } from './telecom-import.component';

describe('TelecomImportComponent', () => {
  let component: TelecomImportComponent;
  let fixture: ComponentFixture<TelecomImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelecomImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelecomImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
