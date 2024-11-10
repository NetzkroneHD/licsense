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
      const message: ToasterMessage = this.toasterState.getInfo();
      if (!this.show(message)) return;
      this.toasterService.info(message.message, message.title);
    });

    effect(() => {
      const message: ToasterMessage = this.toasterState.getSuccess();
      if (!this.show(message)) return;
      this.toasterService.success(message.message, message.title);
    });

    effect(() => {
      const message: ToasterMessage = this.toasterState.getWarn();
      if (!this.show(message)) return;
      this.toasterService.warning(message.message, message.title);
    });

    effect(() => {
      const message: ToasterMessage = this.toasterState.getError();
      if (!this.show(message)) return;
      this.toasterService.error(message.message, message.title);
    });

  }

  private show(message: ToasterMessage): boolean {
    if (message.title) {
      return true;
    } else if (message.message) {
      return true;
    }
    return false;
  }

  public setInfo(info: ToasterMessage, translate?: boolean) {
    if (translate) {
      let title = '';
      let message = '';
      if (info.title) {
        title = this.translateService.instant(info.title);
      }
      if (info.message) {
        message = this.translateService.instant(info.message);
      }
      this.toasterState.setInfo({title: title, message: message});
    } else this.toasterState.setInfo(info);
  }

  public setSuccess(success: ToasterMessage, translate?: boolean) {
    if (translate) {
      let title = '';
      let message = '';
      if (success.title) {
        title = this.translateService.instant(success.title);
      }
      if (success.message) {
        message = this.translateService.instant(success.message);
      }
      this.toasterState.setSuccess({title: title, message: message});
    } else this.toasterState.setSuccess(success);
  }

  public setWarn(warn: ToasterMessage, translate?: boolean) {
    if (translate) {
      let title = '';
      let message = '';
      if (warn.title) {
        title = this.translateService.instant(warn.title);
      }
      if (warn.message) {
        message = this.translateService.instant(warn.message);
      }
      this.toasterState.setWarn({title: title, message: message});
    } else this.toasterState.setWarn(warn);
  }

  public setError(error: ToasterMessage, translate?: boolean) {
    if (translate) {
      let title = '';
      let message = '';
      if (error.title) {
        title = this.translateService.instant(error.title);
      }
      if (error.message) {
        message = this.translateService.instant(error.message);
      }
      this.toasterState.setError({title: title, message: message});
    } else this.toasterState.setError(error);
  }

}



