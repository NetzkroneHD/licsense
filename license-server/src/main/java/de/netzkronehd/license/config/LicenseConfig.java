package de.netzkronehd.license.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LicenseConfig {

    @Value("${license.generation.multiplier}")
    private int generationMultiplier;

    @Value("${license.role-prefix}")
    private String rolePrefix;

    @Value("${license.private-key-file}")
    private String privateKeyFile;

    @Value("${license.signature-length}")
    private int signatureLength;

    @Value("${license.rate-limit}")
    private int rateLimit;

}
