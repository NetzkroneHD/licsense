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
    CdkMenuItem,
    CdkMenuTrigger,
    ContextMenuCoordinates
} from '@angular/cdk/menu';
import {LicenseContextMenuItem} from './license-context-menu-item.interface';

import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'license-context-menu',
    templateUrl: './license-context-menu.component.html',
    styleUrls: ['./license-context-menu.component.scss'],
    imports: [
    CdkMenu,
    CdkMenuItem,
    CdkContextMenuTrigger,
    CdkMenuTrigger,
    MatIconModule
]
})
export class LicenseContextMenuComponent implements AfterViewChecked, OnDestroy {

    @Input()
    items: LicenseContextMenuItem[] = [];

    @Input()
    isAllowedToOpen: boolean = true;

    @Output()
    contextItemClickEmitter = new EventEmitter<LicenseContextMenuItem>();

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

    open(contextMenuCoordinates: ContextMenuCoordinates) {
        this.menuTrigger.open(contextMenuCoordinates);
    }

    close() {
        this.menuTrigger.close();
    }

    protected onItemClick(item: LicenseContextMenuItem) {
        this.contextItemClickEmitter.emit(item);
    }

    protected hasChildren(item: LicenseContextMenuItem) {
        return item.entries && item.entries.length > 0;
    }

    protected onOpened() {
        this.contextMenuOpened.emit();
        this.isOpened = true;
    }

    protected onClosed() {
        this.contextMenuClosed.emit();
    }

}
