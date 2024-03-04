package de.netzkronehd.license.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.*;
import java.security.interfaces.RSAPrivateCrtKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;

@Service
@Slf4j
public class KeyService {

    private PrivateKey privateKey;
    private PublicKey publicKey;

    public KeyService() {
    }

    public void loadPrivateKey() throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        this.privateKey = loadPrivate();
    }

    public void loadPublicKey() throws NoSuchAlgorithmException, InvalidKeySpecException {
        this.publicKey = convert(privateKey);
    }

    public String encrypt(String plainText) throws GeneralSecurityException {
        final Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        return Base64.getEncoder().encodeToString(cipher.doFinal(plainText.getBytes()));
    }

    public String decrypt(String encoded) throws GeneralSecurityException {
        final Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        return new String(cipher.doFinal(Base64.getDecoder().decode(encoded)));
    }

    public PublicKey convert(PrivateKey privateKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        final RSAPrivateCrtKey rsaPrivateCrtKey = (RSAPrivateCrtKey) privateKey;

        final RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(rsaPrivateCrtKey.getModulus(), rsaPrivateCrtKey.getPublicExponent());
        final KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(publicKeySpec);
    }

    private PrivateKey loadPrivate() throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        final File file = new File("/home/app", "license-key");
        return readPKCS8PrivateKey(file);
    }

    public PrivateKey readPKCS8PrivateKey(File file) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] keyBytes = Files.readAllBytes(file.toPath());
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePrivate(spec);
    }

}
