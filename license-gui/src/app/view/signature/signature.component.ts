import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FileService} from '../../service/file.service';
import {TranslateModule} from '@ngx-translate/core';

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

    private readonly fileService = inject(FileService);

    protected downloadKey() {
        this.fileService.downloadPublicKey();
    }
}
