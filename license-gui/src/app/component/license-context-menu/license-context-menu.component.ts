import {Component, input, model, output, ViewChild} from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {LicenseContextMenuItem} from './license-context-menu-item.interface';
import {MatMenu, MatMenuItem, MatMenuTrigger, MenuCloseReason} from '@angular/material/menu';
import {LicenseContextMenuPosition} from './license-context-menu-position.interface';

@Component({
    selector: 'license-context-menu',
    templateUrl: './license-context-menu.component.html',
    styleUrls: ['./license-context-menu.component.scss'],
    imports: [
        MatIconModule,
        MatMenuTrigger,
        MatMenuItem,
        MatMenu
    ]
})
export class LicenseContextMenuComponent {

    public readonly items = input.required<LicenseContextMenuItem[]>();
    public readonly isRootNode = input<boolean>(false);
    public readonly customPosition = model<LicenseContextMenuPosition>({x: 0, y: 0});

    protected readonly currentItem = input<LicenseContextMenuItem>();

    public readonly onItemClick = output<string>();
    public readonly onClose = output<MenuCloseReason>();

    @ViewChild(MatMenuTrigger)
    protected matMenuTrigger: MatMenuTrigger | undefined;

    protected emitClick(itemId: string): void {
        this.onItemClick.emit(itemId);
    }

    public openMenu(position: LicenseContextMenuPosition): void {
        if(!this.matMenuTrigger) return;
        this.customPosition.set(position);
        this.matMenuTrigger.openMenu();
    }

    public closeMenu(): void {
        if(!this.matMenuTrigger) return;
        this.matMenuTrigger.closeMenu();
    }


    protected onMenuClosed(event: MenuCloseReason) {
        if(!this.isRootNode()) return;
        this.onClose.emit(event);
    }
}
