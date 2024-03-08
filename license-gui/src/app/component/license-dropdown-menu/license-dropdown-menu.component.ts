import {
  AfterViewChecked,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {MatMenuModule, MatMenuTrigger, MenuCloseReason} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {LicenseDropdownMenuItem} from './license-dropdown-menu-item.interface';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'license-dropdown-menu',
  standalone: true,
  templateUrl: './license-dropdown-menu.component.html',
  styleUrls: ['./license-dropdown-menu.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    MatMenuModule,
    MatButtonModule,
    NgTemplateOutlet,
    MatIconModule
  ]
})
export class LicenseDropdownMenuComponent implements AfterViewChecked, OnDestroy {

  @Input({required: true}) items: LicenseDropdownMenuItem[] = [];
  @Input() trigger!: LicenseDropdownMenuItem;
  @Input() isRootNode = true;

  @Output() readonly itemClick$ = new EventEmitter<LicenseDropdownMenuItem>();
  @Output() readonly menuClosed$ = new EventEmitter<MenuCloseReason>();

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  @ViewChild(LicenseDropdownMenuComponent) subMenu!: LicenseDropdownMenuComponent;

  @ContentChild(TemplateRef) rootTriggerButton: TemplateRef<unknown> | null = null;

  constructor() {
  }

  ngAfterViewChecked() {
    if (this.subMenu) {
      this.subMenu.itemClick$.subscribe((id) => this.itemClick$.emit(id));
    }
  }

  ngOnDestroy() {
    if (this.subMenu) {
      this.subMenu.itemClick$.unsubscribe();
    }
  }

  open() {
    this.menuTrigger.openMenu();
  }

  close() {
    this.menuTrigger.closeMenu();
  }

  protected hasChildren(item: LicenseDropdownMenuItem) {
    return item.entries && item.entries.length > 0;
  }

  protected onItemClick(item: LicenseDropdownMenuItem) {
    this.itemClick$.emit(item);
  }
}
