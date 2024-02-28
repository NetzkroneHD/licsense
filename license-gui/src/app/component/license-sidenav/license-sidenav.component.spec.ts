import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseSidenavComponent } from './license-sidenav.component';

describe('LicenseSidenavComponent', () => {
  let component: LicenseSidenavComponent;
  let fixture: ComponentFixture<LicenseSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenseSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
