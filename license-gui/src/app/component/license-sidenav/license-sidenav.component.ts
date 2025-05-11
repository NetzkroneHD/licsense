import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {LicenseSidenavItem} from './license-sidenav-item.interface';
import {
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
    transferArrayItem
} from '@angular/cdk/drag-drop';
import {LicenseSidenavGroupMapperPipe} from './license-sidenav-group-mapper.pipe';
import {KeyValuePipe, NgForOf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatBadge} from '@angular/material/badge';

@Component({
    selector: 'license-sidenav',
    imports: [
        MatSidenav,
        MatSidenavContainer,
        MatNavList,
        MatListItem,
        MatIcon,
        CdkDropList,
        CdkDragHandle,
        LicenseSidenavGroupMapperPipe,
        KeyValuePipe,
        CdkDrag,
        MatTooltip,
        NgForOf,
        MatBadge,
        MatSidenavContent
    ],
    templateUrl: './license-sidenav.component.html',
    styleUrl: './license-sidenav.component.scss'
})
export class LicenseSidenavComponent {

    @Input() opened = true;
    @Input() mode: MatDrawerMode = 'side';
    @Input() fixedTopGap = 0;
    @Input() fixedInViewport = true;

    @Input() items: LicenseSidenavItem[] = [];

    @Input() dragDropDelay = 200;
    @Input() tooltipShowDelay = 500;

    @Output() listItemClicked = new EventEmitter<LicenseSidenavItem>();
    @Output() listItemsOrderChanged = new EventEmitter<LicenseSidenavItem[]>();

    public toggle() {
        this.opened = !this.opened;
    }


    protected itemClicked(item: LicenseSidenavItem) {
        if (item.disabled.state) return;
        this.listItemClicked.emit(item);
    }

    protected onDrop(event: {
        container: { data: LicenseSidenavItem[] };
        item: { data: LicenseSidenavItem };
        previousContainer: { data: LicenseSidenavItem[] };
        currentIndex: number;
        previousIndex: number
    }): void {

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
        this.listItemsOrderChanged.emit([...event.container.data]);
    }

}
