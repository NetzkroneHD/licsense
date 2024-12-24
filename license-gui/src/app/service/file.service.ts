import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as forge from 'node-forge';

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

    public downloadGeneratedPublicKey(publicKeyPem: string): void {
        // Convert PEM to DER
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const derBuffer = forge.asn1.toDer(forge.pki.publicKeyToAsn1(publicKey)).getBytes();

        // Create a Blob from the DER buffer
        const blob = new Blob([new Uint8Array(derBuffer.split('').map(char => char.charCodeAt(0)))], { type: 'application/x-x509-ca-cert' });

        // Create a URL for the Blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'license-key-public.der';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

}
