// noinspection DuplicatedCode

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {By} from '@angular/platform-browser';

import {LicenseConfirmComponent} from './license-confirm.component';
import {LicenseConfirmDialogData} from './license-confirm.interface';
import {MatButtonModule} from '@angular/material/button';
import {A11yModule} from '@angular/cdk/a11y';

const mockedDialogData: LicenseConfirmDialogData = {
  title: 'test-title',
  message: 'test-message',
  confirmCaption: 'test-confirm',
  cancelCaption: 'test-cancel',
  discardWithEscape: true,
};

describe('LicenseConfirmComponent', () => {
  let component: LicenseConfirmComponent;
  let fixture: ComponentFixture<LicenseConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LicenseConfirmComponent, MatDialogModule, MatButtonModule, A11yModule],
      providers: [
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        { provide: MatDialogRef, useValue: { close: (): void => {} } },
        { provide: MAT_DIALOG_DATA, useValue: mockedDialogData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', function () {
    const title = fixture.debugElement.query(By.css('div [mat-dialog-title]'));

    expect(title.nativeElement.textContent).toContain('test-title');
  });

  it('should have a message', function () {
    const message = fixture.debugElement.query(By.css('mat-dialog-content'));

    expect(message.nativeElement.textContent).toContain('test-message');
  });

  it('should have a confirm caption', function () {
    const cofirmText = fixture.debugElement.query(By.css('mat-dialog-actions button[ng-reflect-dialog-result="true"]'));

    expect(cofirmText.nativeElement.textContent).toContain('test-confirm');
  });

  it('should have a cancel caption', function () {
    const captionText = fixture.debugElement.query(By.css('mat-dialog-actions button[ng-reflect-dialog-result="false"]'));

    expect(captionText.nativeElement.textContent).toContain('test-cancel');
  });

  it('should close the dialog when keyEventEscape is triggered by @HostListener', function () {
    spyOn(component.dialogRef, 'close');

    component.keyEventEscape();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });

});
