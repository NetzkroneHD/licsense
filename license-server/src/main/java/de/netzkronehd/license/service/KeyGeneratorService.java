package de.netzkronehd.license.service;

import de.netzkronehd.license.model.LicenseKeyModel;
import de.netzkronehd.license.repository.LicenseKeyRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
@Slf4j
public class KeyGeneratorService {

    private final LicenseKeyRepository licenseKeyRepository;

    public LicenseKeyModel generatePrivateKey(String owner, int keySize) throws NoSuchAlgorithmException {
        final KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(keySize);

        final KeyPair keyPair = keyPairGenerator.generateKeyPair();
        final String pkcs8PrivateKey = generatePrivateKey(keyPair.getPrivate());
        final String x509PublicKey = generatePublicKey(keyPair.getPublic());
        final LicenseKeyModel licenseKeyModel = new LicenseKeyModel(owner, pkcs8PrivateKey, x509PublicKey);

        return licenseKeyRepository.save(licenseKeyModel);
    }

    private String generatePublicKey(PublicKey publicKey) {
        final X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(publicKey.getEncoded());
        final byte[] x509Bytes = x509EncodedKeySpec.getEncoded();
        return Base64.getEncoder().encodeToString(x509Bytes);
    }

    private String generatePrivateKey(PrivateKey privateKey) {
        final PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(privateKey.getEncoded());
        final byte[] pkcs8Bytes = pkcs8EncodedKeySpec.getEncoded();
        return Base64.getEncoder().encodeToString(pkcs8Bytes);
    }

}
