import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseLogComponent } from './license-log.component';

describe('LicenseLogComponent', () => {
  let component: LicenseLogComponent;
  let fixture: ComponentFixture<LicenseLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
