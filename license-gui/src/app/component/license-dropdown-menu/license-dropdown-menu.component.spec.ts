import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LicenseDropdownMenuComponent} from './license-dropdown-menu.component';

describe('ExampleDropdownMenuComponent', () => {
    let component: LicenseDropdownMenuComponent;
    let fixture: ComponentFixture<LicenseDropdownMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseDropdownMenuComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenseDropdownMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
