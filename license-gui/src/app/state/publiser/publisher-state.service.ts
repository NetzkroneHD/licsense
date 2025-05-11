import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PublisherState {

    private readonly loadingPublishers = signal<boolean>(false);
    private readonly publishers = signal<string[]>([]);

    public readonly getPublishers = this.publishers.asReadonly();
    public readonly getLoadingPublishers = this.loadingPublishers.asReadonly();

    public setLoadingPublishers(loadingPublishers: boolean) {
        this.loadingPublishers.set(loadingPublishers);
    }

    public setPublishers(publishers: string[]) {
        this.publishers.set(publishers);
    }

}
