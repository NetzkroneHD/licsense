import {Pipe, PipeTransform} from '@angular/core';
import {LicenseSidenavItem} from './license-sidenav-item.interface';

@Pipe({
    name: 'licenseSidenavGroupMapper',
    standalone: true
})
export class LicenseSidenavGroupMapperPipe implements PipeTransform {

    transform(items: LicenseSidenavItem[]): Map<string, LicenseSidenavItem[]> {
        return items.reduce((map, value) => {
            const group = value.group;
            if (!map.has(group)) {
                map.set(group, []);
            }
            map.get(group).push(value);
            return map;
        }, new Map());
    }

}
