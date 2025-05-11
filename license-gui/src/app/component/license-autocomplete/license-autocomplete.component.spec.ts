import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseAutocompleteComponent } from './license-autocomplete.component';

describe('LicenseAutocompleteComponent', () => {
  let component: LicenseAutocompleteComponent;
  let fixture: ComponentFixture<LicenseAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
