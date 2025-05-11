import {inject, Injectable} from '@angular/core';
import {NotificationFacade} from '../notification/notification-facade.service';
import {KeyApiService} from '../../api/service/key-api.service';
import {KeyState} from './key-state.service';
import {TranslateService} from '@ngx-translate/core';
import {UserLicenseState} from '../user-license/user-license-state.service';

@Injectable({
    providedIn: 'root'
})
export class KeyFacade {

    private readonly keyState = inject(KeyState)
    private readonly keyApiService = inject(KeyApiService);
    private readonly userLicenseState = inject(UserLicenseState);
    private readonly notificationFacade = inject(NotificationFacade);
    private readonly translateService = inject(TranslateService);

    constructor() {
    }

    public loadPublicKey() {
        this.keyState.setLoadingPublicKey(true);
        this.keyApiService.getKey(this.userLicenseState.getSelectedPublisher()).then(keyModel => {
            this.keyState.setPublicKey(keyModel.publicKey);
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.key.load-public-key.error.title'),
                message: this.translateService.instant('state.key.load-public-key.error.message', {reason: String(reason)}),
                type: 'ERROR'
            });
        }).finally(() => {
            this.keyState.setLoadingPublicKey(false);
        });
    }

    public generateKey() {
        this.keyState.setLoadingGenerateKey(true);
        this.keyApiService.generatePublisherKey(this.userLicenseState.getSelectedPublisher()).then(keyModel => {
            this.keyState.setPublicKey(keyModel.publicKey);

            this.notificationFacade.setMessage({
                title: undefined,
                message: 'state.key.generate-key.success',
                type: 'INFO'
            }, true)
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('state.key.generate-key.error.title'),
                message: this.translateService.instant('state.key.generate-key.error.message', {reason: String(reason)}),
                type: 'ERROR'
            });
        }).finally(() => {
            this.keyState.setLoadingGenerateKey(false);
        });
    }



}
