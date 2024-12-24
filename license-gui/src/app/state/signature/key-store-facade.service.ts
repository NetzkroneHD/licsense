import {inject, Injectable} from '@angular/core';
import {NotificationStoreService} from '../notification/notification.service';
import {KeyApiService} from '../../api/service/key-api.service';
import {PublisherApiService} from '../../api/service/publisher-api.service';
import {KeyStoreService} from './key-store.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class KeyStoreFacadeService {

    private readonly keyStoreService = inject(KeyStoreService)
    private readonly keyApiService = inject(KeyApiService);
    private readonly publisherApiService = inject(PublisherApiService);
    private readonly notificationStoreService = inject(NotificationStoreService);
    private readonly translateService = inject(TranslateService);

    constructor() {
        this.loadPublicKey();
    }

    public loadPublicKey() {
        this.keyStoreService.setLoadingPublicKey(true);
        this.keyApiService.getKey(this.publisherApiService.getCurrentPublisher()).then(keyModel => {
            this.keyStoreService.setPublicKey(keyModel.publicKey);
        }).catch(reason => {
            this.notificationStoreService.setMessage({
                title: this.translateService.instant('Error while loading public key.'),
                message:this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.keyStoreService.setLoadingPublicKey(false);
        });
    }

    public generateKey() {
        this.keyStoreService.setLoadingGenerateKey(true);
        this.keyApiService.generateKey().then(keyModel => {
            this.keyStoreService.setPublicKey(keyModel.publicKey);
            this.notificationStoreService.setMessage({
                title: undefined,
                message: 'Successfully generated a key.',
                type: 'INFO'
            }, true)
        }).catch(reason => {
            this.notificationStoreService.setMessage({
                title: this.translateService.instant('Error while generating key.'),
                message: this.translateService.instant('Error: {{error}}').replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.keyStoreService.setLoadingGenerateKey(false);
        });
    }



}
