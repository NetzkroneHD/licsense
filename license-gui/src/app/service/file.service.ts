import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  public downloadFile(filename: string): void {
    this.http.get(`assets/${filename}`, {responseType: 'blob'})
      .subscribe((data: Blob) => {
        const blob = new Blob([data], {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  public downloadPublicKey(): void {
    this.downloadFile('license-key-public.der');
  }

}
