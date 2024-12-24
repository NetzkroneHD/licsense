import {Component, computed, inject, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FileService} from '../../service/file.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {KeyStoreService} from '../../state/signature/key-store.service';
import {NotificationStoreService} from '../../state/notification/notification.service';
import {KeyStoreFacadeService} from '../../state/signature/key-store-facade.service';
import {LicenseDialogService} from '../../component/license-dialog/license-dialog.service';

@Component({
    selector: 'license-signature',
    imports: [
        MatButton,
        TranslateModule
    ],
    templateUrl: './signature.component.html',
    styleUrl: './signature.component.scss'
})
export class SignatureComponent {

    private readonly keyStoreService = inject(KeyStoreService);
    private readonly keyStoreFacadeService = inject(KeyStoreFacadeService);
    private readonly fileService = inject(FileService);
    private readonly notificationStoreService = inject(NotificationStoreService);
    private readonly translateService = inject(TranslateService);
    private readonly dialogService = inject(LicenseDialogService);

    private readonly downloading = signal(false);

    protected readonly generateDisabled = computed(() => this.keyStoreService.getLoadingGenerateKey());
    protected readonly downloadDisabled = computed(() => {
        return this.downloading() || !this.keyStoreService.getLoadingPublicKey() || !this.keyStoreService.getPublicKey();
    });

    protected generateKey() {
        if(this.generateDisabled()) {
            return;
        }
        this.dialogService.confirm({
            title: this.translateService.instant('dialog.generateKey.title'),
            message: this.translateService.instant('dialog.generateKey.message'),
            confirmCaption: this.translateService.instant('dialog.generateKey.confirm'),
            cancelCaption: this.translateService.instant('dialog.generateKey.cancel'),
            discardWithEscape: true
        }).subscribe(generate => {
            if(!generate) {
                return;
            }
            this.keyStoreFacadeService.generateKey();
        });

    }

    protected downloadKey() {
        if(this.downloadDisabled()) {
            return;
        }
        this.downloading.set(true);
        const publicKey = this.keyStoreService.getPublicKey();
        if(!publicKey) {
            this.notificationStoreService.setMessage({
                title: this.translateService.instant('Error while downloading public key.'),
                message: this.translateService.instant('Error: {{error}}', {error: 'Public key is not available.'}),
                type: 'ERROR'
            });
            this.downloading.set(false);
            return;
        }
        this.fileService.downloadGeneratedPublicKey(publicKey);
        this.downloading.set(false);
    }
}
