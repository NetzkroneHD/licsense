import {inject, Injectable} from '@angular/core';
import {PublisherState} from './publisher-state.service';
import {PublisherApi} from '@license/license-api-client-typescript-fetch';
import {NotificationFacade} from '../notification/notification-facade.service';


@Injectable({
    providedIn: 'root'
})
export class PublisherFacade {

    private readonly publisherApi = inject(PublisherApi);
    private readonly publisherState = inject(PublisherState);
    private readonly notificationFacade = inject(NotificationFacade);

    constructor() {

    }

    public loadPublishers() {
        this.publisherState.setLoadingPublishers(true);
        this.publisherApi.getPublishers().then(publishers => {
            this.publisherState.setPublishers(publishers);
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'Successfully loaded publishers.',
                type: 'SUCCESS'
            }, true);
        }).catch(reason => {
            this.notificationFacade.setMessage({
                title: undefined,
                message: 'Error: {{error}}'.replace('{{error}}', reason),
                type: 'ERROR'
            });
        }).finally(() => {
            this.publisherState.setLoadingPublishers(false);
        });
    }
}



