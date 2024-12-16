import {MatPaginatorIntl} from "@angular/material/paginator";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class TranslatedMatPaginatorIntl extends MatPaginatorIntl {
    override changes = new Subject<void>();

    constructor(private translate: TranslateService) {
        super();
        this.translate.onDefaultLangChange.subscribe(() => {
            this.updateLabels();
        });
        this.translate.onLangChange.subscribe(() => {
            this.updateLabels();
        });
        this.updateLabels();
    }

    updateLabels() {
        this.itemsPerPageLabel = this.translate.instant('paginator.itemsPerPageLabel');
        this.nextPageLabel = this.translate.instant('paginator.nextPageLabel');
        this.previousPageLabel = this.translate.instant('paginator.previousPageLabel');
        this.firstPageLabel = this.translate.instant('paginator.firstPageLabel');
        this.lastPageLabel = this.translate.instant('paginator.lastPageLabel');
        this.changes.next();
    }

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        const separator = this.translate.instant('paginator.rangeSeparatorLabel');
        if (length === 0 || pageSize === 0) {
            return `0 ${separator} ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex =
            startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} ${separator} ${length}`;
    };
}
