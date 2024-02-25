import {Component, inject, signal} from '@angular/core';
import {LicenseContextMenuItem} from '../../component/license-context-menu/license-context-menu-item.interface';
import {LicenseChoiceMenu} from '../../component/license-choice/license-choice-menu.interface';
import {LicenseChoiceMenuComponent} from '../../component/license-choice/license-choice.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {LicenseContextMenuComponent} from '../../component/license-context-menu/license-context-menu.component';
import {MatButton} from '@angular/material/button';
import {LicenseDatePickerComponent} from '../../component/license-date-picker/license-date-picker.component';
import {environment} from '../../../environments/environment';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LicenseApiService} from '../../api/service/license-api.service';
import {LicenseCheckApiService} from '../../api/service/license-check-api.service';
import {PublisherApiService} from '../../api/service/publisher-api.service';
import {LicenseDto} from '@license/license-api-client-typescript-fetch';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'license-home',
  standalone: true,
  imports: [
    LicenseChoiceMenuComponent,
    MatMenuTrigger,
    LicenseContextMenuComponent,
    MatButton,
    LicenseDatePickerComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  contextMenuItems: LicenseContextMenuItem[] = [
    {
      id: '1',
      title: 'test',
      icon: '',
      disabled: false,
      entries: [{
        id: '2',
        title: 'test2',
        icon: '',
        disabled: false,
        entries: [{id: '3', title: 'test3', icon: '', entries: [], disabled: false}, {
          id: '4',
          title: 'test4',
          icon: '',
          entries: [],
          disabled: false
        }]
      }],
    },
    {
      id: '5',
      title: 'test5',
      icon: '',
      disabled: false,
      entries: [{id: '6', title: 'test6', icon: '', entries: [], disabled: false}, {
        id: '7',
        title: 'test7',
        icon: '',
        disabled: false,
        entries: []
      }, {id: '8', title: 'test8', icon: '', entries: [], disabled: false}],
    },
    {
      id: '9', title: 'test9', icon: '', entries: [], disabled: false,
    }
  ];
  choiceMenu: LicenseChoiceMenu = {
    items: [
      {id: '1', value: 'Onion', activated: false},
      {id: '2', value: 'Sausage', activated: false},
      {id: '3', value: 'Tomato', activated: false}
    ]
  };

  protected readonly licenseApiService: LicenseApiService = inject(LicenseApiService);
  protected readonly licenseCheckApiService: LicenseCheckApiService = inject(LicenseCheckApiService);
  protected readonly publishApiService: PublisherApiService = inject(PublisherApiService);

  protected licenses: LicenseDto[] = [];

  constructor(private readonly translateService: TranslateService,
              private readonly oAuthService: OAuthService) {
    if (this.oAuthService.getIdentityClaims()) {
      console.log("logged in")
      this.publishApiService.getLicensesFromPublisher(this.publishApiService.getCurrentPublisher()).then(value => {
        this.licenses = value;
      })
    } else {
      console.log("waiting for login")
      this.oAuthService.events.subscribe(event => {

      })
    }
  }

  changeLanguage() {
    if (this.translateService.store.currentLang === 'de') {
      this.translateService.use("en").subscribe(() => console.log("changed from de to en"));
    } else {
      this.translateService.use("de").subscribe(() => console.log("changed from en to de"));
    }
  }

  protected readonly environment = environment;
}
