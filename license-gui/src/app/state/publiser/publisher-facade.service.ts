import {inject, Injectable} from '@angular/core';
import {PublisherState} from './publisher-state.service';
import {PublisherApi} from '@license/license-api-client-typescript-fetch';
import {NotificationFacade} from '../notification/notification-facade.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class PublisherFacade {

    private readonly publisherApi = inject(PublisherApi);
    private readonly publisherState = inject(PublisherState);
    private readonly notificationFacade = inject(NotificationFacade);
    private readonly translateService = inject(TranslateService);

    constructor() {

    }

    public loadPublishers() {
        this.publisherState.setLoadingPublishers(true);
        this.publisherApi.getPublishers().then(publishers => {
            this.publisherState.setPublishers(publishers);
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'state.publisher.load-publishers.success',
                type: 'SUCCESS'
            }, true);
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: undefined,
                message: this.translateService.instant('state.publisher.load-publishers.error', { reason: String(reason) }),
                type: 'ERROR'
            });
        }).finally(() => {
            this.publisherState.setLoadingPublishers(false);
        });
    }
}



