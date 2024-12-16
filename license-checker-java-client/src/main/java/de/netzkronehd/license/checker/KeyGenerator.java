package de.netzkronehd.license.checker;

import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class KeyGenerator {

    public static void main(String[] args) throws NoSuchAlgorithmException {
        final long time = System.currentTimeMillis();
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(4096);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();

        // Get the private and public keys
        PrivateKey privateKey = keyPair.getPrivate();
        PublicKey publicKey = keyPair.getPublic();

        // Convert private key to PKCS8 format
        PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(privateKey.getEncoded());
        byte[] pkcs8Bytes = pkcs8EncodedKeySpec.getEncoded();
        String pkcs8PrivateKey = Base64.getEncoder().encodeToString(pkcs8Bytes);
        System.out.printf("Private Key (PKCS8): '%s'%n", pkcs8PrivateKey);

        // Convert public key to X.509 format
        X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(publicKey.getEncoded());
        byte[] x509Bytes = x509EncodedKeySpec.getEncoded();
        String x509PublicKey = Base64.getEncoder().encodeToString(x509Bytes);
        System.out.printf("Public Key (X.509): '%s'%n", x509PublicKey);
        System.out.printf("Time: %dms%n", System.currentTimeMillis() - time);
    }

}
