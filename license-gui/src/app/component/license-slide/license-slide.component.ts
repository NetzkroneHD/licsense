import {Component, input, model, output} from '@angular/core';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'license-slide',
    imports: [
        MatSlideToggle
    ],
  templateUrl: './license-slide.component.html',
  styleUrl: './license-slide.component.scss'
})
export class LicenseSlideComponent {

    public readonly checked = model<boolean>(false);
    public readonly disabled = input<boolean>(false);
    public readonly text = input<{checked: string, unchecked: string} | undefined>(undefined);

    public readonly onCheckedChange = output<boolean>();

    protected onChange(event: MatSlideToggleChange) {
        this.checked.set(event.checked);
        this.onCheckedChange.emit(event.checked);
    }
}
