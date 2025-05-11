import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseSlideComponent } from './license-slide.component';

describe('LicenseSlideComponent', () => {
  let component: LicenseSlideComponent;
  let fixture: ComponentFixture<LicenseSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
