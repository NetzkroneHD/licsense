import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LicenseDatePickerComponent} from './license-date-picker.component';

describe('LicenseDatePickerComponent', () => {
  let component: LicenseDatePickerComponent;
  let fixture: ComponentFixture<LicenseDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseDatePickerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LicenseDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
