import {effect, inject, Injectable} from '@angular/core';
import {NotificationStore, ToasterMessage} from './notification-store.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class NotificationStoreService {

    private readonly translateService = inject(TranslateService);
    private readonly toasterState = inject(NotificationStore);
    private readonly toasterService = inject(ToastrService);

    constructor() {

        effect(() => {
            const message: ToasterMessage | undefined = this.toasterState.getMessage();
            if (!message) return;
            if (!this.canShow(message)) return;
            if (message.type === 'SUCCESS') {
                this.toasterService.success(message.message, message.title);
            } else if (message.type === 'INFO') {
                this.toasterService.info(message.message, message.title);
            } else if (message.type === 'WARN') {
                this.toasterService.warning(message.message, message.title);
            } else if (message.type === 'ERROR') {
                this.toasterService.error(message.message, message.title);
            }
        });

    }

    public setMessage(info: ToasterMessage, translate?: boolean) {
        if (translate) {
            let title = '';
            let message = '';
            if (info.title) {
                title = this.translateService.instant(info.title);
            }
            if (info.message) {
                message = this.translateService.instant(info.message);
            }
            this.toasterState.setMessage({title: title, message: message, type: info.type});
        } else this.toasterState.setMessage(info);
    }

    private canShow(message: ToasterMessage): boolean {
        if (message.title) {
            return true;
        } else if (message.message) {
            return true;
        }
        return false;
    }

}



