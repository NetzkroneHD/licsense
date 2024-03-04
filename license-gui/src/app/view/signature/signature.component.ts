import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FileService} from '../../service/file.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'license-signature',
  standalone: true,
  imports: [
    MatButton,
    TranslateModule
  ],
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.scss'
})
export class SignatureComponent {

  constructor(private readonly fileService: FileService) {

  }


  protected downloadKey() {
    this.fileService.downloadPublicKey();
  }
}
