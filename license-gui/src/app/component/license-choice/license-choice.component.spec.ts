import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LicenseChoiceComponent} from './license-choice.component';

describe('LicenseInputComponent', () => {
  let component: LicenseChoiceComponent;
  let fixture: ComponentFixture<LicenseChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
