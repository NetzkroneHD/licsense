import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class KeyState {

    private readonly publicKey = signal<string | undefined>(undefined);
    private readonly loadingPublicKey = signal(false);
    private readonly loadingGenerateKey = signal(false);

    public readonly getPublicKey = this.publicKey.asReadonly();
    public readonly getLoadingPublicKey = this.loadingPublicKey.asReadonly();
    public readonly getLoadingGenerateKey = this.loadingGenerateKey.asReadonly();

    public setPublicKey(publicKey: string) {
        this.publicKey.set(publicKey);
    }

    public setLoadingPublicKey(loading: boolean) {
        this.loadingPublicKey.set(loading);
        console.log("setLoadingPublicKey", loading);
    }

    public setLoadingGenerateKey(loading: boolean) {
        this.loadingGenerateKey.set(loading);
    }


}
