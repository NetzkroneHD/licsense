import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
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

  @Input({required: true}) menu!: LicenseChoiceMenu;

  @Output() itemTriggered$: EventEmitter<LicenseChoiceMenuItem> = new EventEmitter<LicenseChoiceMenuItem>();
  @Output() menuClosed$: EventEmitter<MenuCloseReason> = new EventEmitter<MenuCloseReason>();

  @ContentChild(TemplateRef) rootTriggerButton: TemplateRef<unknown> | null = null;
  @ViewChild(MatMenu) matMenu!: MatMenu;

  constructor() {
  }

  protected onChoiceClicked(item: LicenseChoiceMenuItem) {
    this.itemTriggered$.emit(item)
  }
}
