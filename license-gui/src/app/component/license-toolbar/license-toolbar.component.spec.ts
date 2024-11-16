import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseToolbarComponent } from './license-toolbar.component';

describe('LicenseToolbarComponent', () => {
  let component: LicenseToolbarComponent;
  let fixture: ComponentFixture<LicenseToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
