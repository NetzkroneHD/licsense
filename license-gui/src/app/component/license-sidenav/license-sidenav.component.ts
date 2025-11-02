import {Component, input, model, output} from '@angular/core';
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
import {KeyValuePipe} from '@angular/common';
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
    MatBadge,
    MatSidenavContent
],
    templateUrl: './license-sidenav.component.html',
    styleUrl: './license-sidenav.component.scss'
})
export class LicenseSidenavComponent {

    public readonly opened = model<boolean>(true);
    public readonly mode = input<MatDrawerMode>('side');
    public readonly fixedTopGap = input<number>(0);
    public readonly fixedInViewport = input<boolean>(true);

    public readonly items = input<LicenseSidenavItem[]>([]);

    public readonly dragDropDelay = input<number>(200);
    public readonly tooltipShowDelay = input<number>(500);

    public readonly listItemClicked = output<LicenseSidenavItem>();
    public readonly listItemsOrderChanged = output<LicenseSidenavItem[]>();

    public toggle() {
        this.opened.update(value => !value);
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

    protected onOpened(event: boolean) {
        this.opened.set(event);
    }
}
