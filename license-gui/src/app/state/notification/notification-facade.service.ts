import {effect, inject, Injectable} from '@angular/core';
import {NotificationState, ToasterMessage} from './notification-state.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationFacade {

    private readonly translateService = inject(TranslateService);
    private readonly notificationState = inject(NotificationState);
    private readonly toasterService = inject(ToastrService);

    constructor() {

        effect(() => {
            const message: ToasterMessage | undefined = this.notificationState.getMessage();
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
            this.notificationState.setMessage({title: title, message: message, type: info.type});
        } else this.notificationState.setMessage(info);
    }

    private canShow(message: ToasterMessage): boolean {
        return (message.title !== undefined || message.message !== undefined);
    }

}



