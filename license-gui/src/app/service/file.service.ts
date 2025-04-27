import {Injectable} from '@angular/core';
import * as forge from 'node-forge';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    public downloadGeneratedPublicKey(publicKeyPem: string): void {
        // Convert PEM to DER
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const derBuffer = forge.asn1.toDer(forge.pki.publicKeyToAsn1(publicKey)).getBytes();

        // Create a Blob from the DER buffer
        const blob = new Blob([new Uint8Array(derBuffer.split('').map(char => char.charCodeAt(0)))], {type: 'application/x-x509-ca-cert'});

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
