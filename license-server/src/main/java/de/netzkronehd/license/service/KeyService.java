package de.netzkronehd.license.service;

import de.netzkronehd.license.exception.NoKeyModelException;
import de.netzkronehd.license.model.LicenseKeyModel;
import de.netzkronehd.license.repository.LicenseKeyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAPrivateCrtKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.List;

@Service
@Slf4j
public class KeyService {

    private final LicenseKeyRepository licenseKeyRepository;
    private final KeyFactory keyFactory;

    @Autowired
    public KeyService(LicenseKeyRepository licenseKeyRepository) throws NoSuchAlgorithmException {
        this.licenseKeyRepository = licenseKeyRepository;
        this.keyFactory = KeyFactory.getInstance("RSA");
    }

    public String encrypt(String plainText, PrivateKey privateKey) throws GeneralSecurityException {
        final Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        return Base64.getEncoder().encodeToString(cipher.doFinal(plainText.getBytes()));
    }

    public List<LicenseKeyModel> getLicenseKeyModels() {
        return licenseKeyRepository.findAll();
    }

    public LicenseKeyModel getLicenseKeyModel(String owner) throws NoKeyModelException {
        return licenseKeyRepository.findById(owner).orElseThrow(NoKeyModelException::new);
    }

    public PrivateKey loadPrivateKey(String base64PrivateKey) throws InvalidKeySpecException {
        final byte[] keyBytes = Base64.getDecoder().decode(base64PrivateKey);
        final PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        return keyFactory.generatePrivate(keySpec);
    }

    public PublicKey loadPublicKey(PrivateKey privateKey) throws InvalidKeySpecException {
        RSAPrivateCrtKeySpec privateKeySpec = keyFactory.getKeySpec(privateKey, RSAPrivateCrtKeySpec.class);
        RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(privateKeySpec.getModulus(), privateKeySpec.getPublicExponent());
        return keyFactory.generatePublic(publicKeySpec);
    }

}
