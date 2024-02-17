import {Component} from '@angular/core';
import {LicenseContextMenuItem} from '../../component/license-context-menu/license-context-menu-item.interface';
import {LicenseChoiceMenu} from '../../component/license-choice/license-choice-menu.interface';
import {LicenseChoiceMenuComponent} from '../../component/license-choice/license-choice.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {LicenseContextMenuComponent} from '../../component/license-context-menu/license-context-menu.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'license-home',
  standalone: true,
  imports: [
    LicenseChoiceMenuComponent,
    MatMenuTrigger,
    LicenseContextMenuComponent,
    MatButton
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

}
