import {Component, inject} from '@angular/core';
import {PublisherFacade} from '../../state/publiser/publisher-facade.service';
import {PublisherState} from '../../state/publiser/publisher-state.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'license-admin',
    imports: [
        JsonPipe
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

    protected readonly publisherFacade = inject(PublisherFacade);
    protected readonly publisherState = inject(PublisherState);

    constructor() {
        this.publisherFacade.loadPublishers();
    }

}
