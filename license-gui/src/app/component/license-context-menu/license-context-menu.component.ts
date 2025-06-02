import {Component, input, output, ViewChild} from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {LicenseContextMenuItem} from './license-context-menu-item.interface';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
    selector: 'license-context-menu',
    templateUrl: './license-context-menu.component.html',
    styleUrls: ['./license-context-menu.component.scss'],
    imports: [
        MatIconModule,
        MatButton,
        MatMenuTrigger,
        MatMenuItem,
        MatMenu
    ]
})
export class LicenseContextMenuComponent {

    public readonly item = input.required<LicenseContextMenuItem>();
    public readonly isRootNode = input<boolean>(false);

    public readonly onItemClick = output<string>();

    @ViewChild(MatMenuTrigger)
    protected matMenuTrigger: MatMenuTrigger | undefined;

    protected emitClick(itemId: string): void {
        this.onItemClick.emit(itemId);
    }

    public openMenu(): void {
        if(!this.matMenuTrigger) return;
        this.matMenuTrigger.openMenu();
    }


}
