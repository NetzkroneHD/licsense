import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LicenseDateSinglePickerComponent} from './license-date-single-picker.component';

describe('LicenseDateSinglePickerComponent', () => {
  let component: LicenseDateSinglePickerComponent;
  let fixture: ComponentFixture<LicenseDateSinglePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseDateSinglePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseDateSinglePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
