import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    public downloadGeneratedPublicKey(base64Key: string): void {
        const binaryData = atob(base64Key);
        const byteArray = new Uint8Array(binaryData.length);

        for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([byteArray], {type: 'application/x-x509-ca-cert'});
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(blob);
        link.download = `license-public-key.der`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
