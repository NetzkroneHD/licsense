import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LicenseChoiceMenuComponent} from './license-choice.component';


describe('LicenseInputComponent', () => {
    let component: LicenseChoiceMenuComponent;
    let fixture: ComponentFixture<LicenseChoiceMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseChoiceMenuComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LicenseChoiceMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
