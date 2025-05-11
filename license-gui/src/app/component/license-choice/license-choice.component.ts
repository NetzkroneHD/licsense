import {Component, ContentChild, input, output, TemplateRef, ViewChild} from '@angular/core';
import {MatMenu, MenuCloseReason} from '@angular/material/menu';
import {LicenseChoiceMenu} from './license-choice-menu.interface';
import {LicenseChoiceMenuItem} from './license-choice-menu-item.interface';
import {NgTemplateOutlet} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'license-choice',
    imports: [
        NgTemplateOutlet,
        MatMenu,
        MatCheckbox,
        FormsModule
    ],
    templateUrl: './license-choice.component.html',
    styleUrl: './license-choice.component.scss'
})
export class LicenseChoiceMenuComponent {

    public readonly menu = input.required<LicenseChoiceMenu>();

    public readonly itemTriggered = output<LicenseChoiceMenuItem>();
    public readonly menuClosed = output<MenuCloseReason>();

    @ContentChild(TemplateRef) rootTriggerButton: TemplateRef<unknown> | null = null;
    @ViewChild(MatMenu) matMenu!: MatMenu;

    constructor() {
    }

    protected onChoiceClicked(item: LicenseChoiceMenuItem) {
        this.itemTriggered.emit(item)
    }
}
