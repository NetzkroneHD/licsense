import {Component, computed, inject, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FileService} from '../../service/file.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {KeyState} from '../../state/key/key-state.service';
import {NotificationFacade} from '../../state/notification/notification-facade.service';
import {KeyFacade} from '../../state/key/key-facade.service';
import {LicenseDialogService} from '../../component/license-dialog/license-dialog.service';

@Component({
    selector: 'license-key',
    imports: [
        MatButton,
        TranslateModule
    ],
    templateUrl: './signature.component.html',
    styleUrl: './signature.component.scss'
})
export class SignatureComponent {

    private readonly keyState = inject(KeyState);
    private readonly keyFacade = inject(KeyFacade);
    private readonly fileService = inject(FileService);
    private readonly notificationFacade = inject(NotificationFacade);
    private readonly translateService = inject(TranslateService);
    private readonly dialogService = inject(LicenseDialogService);

    private readonly downloading = signal(false);

    protected readonly generateDisabled = computed(() => this.keyState.getLoadingGenerateKey());
    protected readonly downloadDisabled = computed(() => {
        return this.downloading() || this.keyState.getLoadingPublicKey() || !this.keyState.getPublicKey() || this.keyState.getLoadingGenerateKey();
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
            this.keyFacade.generateKey();
        });

    }

    protected downloadKey() {
        if(this.downloadDisabled()) {
            return;
        }
        this.downloading.set(true);
        const publicKey = this.keyState.getPublicKey();
        if(!publicKey) {
            this.notificationFacade.setMessage({
                title: this.translateService.instant('view.key.download-key.error.title'),
                message: this.translateService.instant('view.key.download-key.error.message', {error: 'Public key is not available.'}),
                type: 'ERROR'
            });
            this.downloading.set(false);
            return;
        }
        this.fileService.downloadGeneratedPublicKey(publicKey);
        this.downloading.set(false);
    }
}
