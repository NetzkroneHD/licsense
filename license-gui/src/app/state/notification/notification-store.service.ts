import {Injectable, signal} from '@angular/core';

export type ToasterMessage = {
  title: string | undefined,
  message: string | undefined
}

@Injectable({
  providedIn: 'root'
})
export class NotificationStore {

  private readonly info = signal<ToasterMessage | null>(null);
  private readonly success = signal<ToasterMessage | null>(null);
  private readonly warn = signal<ToasterMessage | null>(null);
  private readonly error = signal<ToasterMessage | null>(null);

  public readonly getInfo = this.info.asReadonly();
  public readonly getSuccess = this.success.asReadonly();
  public readonly getWarn = this.warn.asReadonly();
  public readonly getError = this.error.asReadonly();

  public setInfo(info: ToasterMessage | null) {
    this.info.set(info);
  }

  public setSuccess(success: ToasterMessage | null) {
    this.success.set(success);
  }

  public setWarn(warn: ToasterMessage | null) {
    this.warn.set(warn);
  }

  public setError(error: ToasterMessage | null) {
    this.error.set(error)
  }

}
