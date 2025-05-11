import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LicenseContextMenuComponent} from './license-context-menu.component';

describe('ExampleContextMenuComponent', () => {
    let component: LicenseContextMenuComponent;
    let fixture: ComponentFixture<LicenseContextMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseContextMenuComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenseContextMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
