package de.netzkronehd.license.checker.siganture;

import de.netzkronehd.license.api.client.webclient.models.LicenseCheckResultDto;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class SignatureChecker {

    private final PublicKey publicKey;

    public SignatureChecker() throws URISyntaxException, IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        this.publicKey = loadPublicKey(new File(getClass().getClassLoader().getResource("license-key-public.der").toURI()));
    }

    public SignatureChecker(PublicKey publicKey) {
        this.publicKey = publicKey;
    }

    private PublicKey loadPublicKey(File file) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        final byte[] keyBytes = Files.readAllBytes(file.toPath());
        final X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        final KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePublic(spec);
    }

    public String decrypt(String encoded) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException, NoSuchPaddingException, NoSuchAlgorithmException {
        final Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        return new String(cipher.doFinal(Base64.getDecoder().decode(encoded)));
    }

    public boolean isValidSignature(LicenseCheckResultDto licenseCheck) {
        try {
            decrypt(licenseCheck.getSignature());
            return true;
        } catch (InvalidKeyException | IllegalBlockSizeException | BadPaddingException | NoSuchPaddingException | NoSuchAlgorithmException e) {
            return false;
        }
    }

    public void checkValidSignature(LicenseCheckResultDto licenseCheck) throws InvalidSignatureException {
        try {
            decrypt(licenseCheck.getSignature());
        } catch (GeneralSecurityException e) {
            throw new InvalidSignatureException(e);
        }
    }

}
