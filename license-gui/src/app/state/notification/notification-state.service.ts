import {Injectable, signal} from '@angular/core';

export type ToasterMessage = {
    title: string | undefined,
    message: string | undefined
    type: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR'
}

@Injectable({
    providedIn: 'root'
})
export class NotificationState {

    private readonly message = signal<ToasterMessage | undefined>(undefined);

    public readonly getMessage = this.message.asReadonly();

    public setMessage(message: ToasterMessage | undefined) {
        this.message.set(message);
    }
}
