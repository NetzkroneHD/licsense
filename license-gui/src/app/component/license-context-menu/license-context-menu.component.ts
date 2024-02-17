import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  CdkContextMenuTrigger,
  CdkMenu,
  CdkMenuGroup,
  CdkMenuItem,
  CdkMenuItemCheckbox,
  CdkMenuItemRadio,
  CdkMenuTrigger,
  ContextMenuCoordinates
} from '@angular/cdk/menu';
import {LicenseContextMenuItem} from './license-context-menu-item.interface';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'license-context-menu',
  standalone: true,
  templateUrl: './license-context-menu.component.html',
  styleUrls: ['./license-context-menu.component.scss'],
  imports: [
    CdkMenu,
    CdkMenuItem,
    CdkContextMenuTrigger,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    CdkMenuTrigger,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio,
    MatIconModule
  ]
})
export class LicenseContextMenuComponent implements AfterViewChecked, OnDestroy {

  @Input()
  items: LicenseContextMenuItem[] = [];

  @Input()
  isAllowedToOpen: boolean = true;

  @Output()
  contextItemClickEmitter = new EventEmitter<string>();

  @Output()
  contextMenuOpened = new EventEmitter<unknown>();

  @Output()
  contextMenuClosed = new EventEmitter<unknown>();

  @ViewChild('menu', {static: true})
  menu!: TemplateRef<any>;

  @ViewChild(CdkContextMenuTrigger)
  menuTrigger!: CdkContextMenuTrigger;

  @ViewChild('menuComponent')
  subMenu!: LicenseContextMenuComponent;

  isOpened: boolean = false;

  ngAfterViewChecked() {
    if (this.subMenu) {
      this.subMenu.contextMenuOpened.subscribe(id => {
        this.contextMenuOpened.emit(id);
      });
      this.subMenu.contextMenuClosed.subscribe(id => {
        this.contextMenuClosed.emit(id);
      });
      this.subMenu.contextItemClickEmitter.subscribe(id => {
        this.contextItemClickEmitter.emit(id);
      });
    }

  }

  ngOnDestroy() {
    if (this.subMenu) {
      this.subMenu.contextMenuOpened.unsubscribe();
      this.subMenu.contextMenuClosed.unsubscribe();
      this.subMenu.contextItemClickEmitter.unsubscribe();
    }
  }

  onItemClick(itemId: string) {
    this.contextItemClickEmitter.emit(itemId);
  }

  hasChildren(item: LicenseContextMenuItem) {
    return item.entries && item.entries.length > 0;
  }

  onOpened() {
    this.contextMenuOpened.emit();
    this.isOpened = true;
  }

  onClosed() {
    this.contextMenuClosed.emit();
  }

  open(contextMenuCoordinates: ContextMenuCoordinates) {
    this.menuTrigger.open(contextMenuCoordinates);
  }

  close() {
    this.menuTrigger.close();
  }

}
