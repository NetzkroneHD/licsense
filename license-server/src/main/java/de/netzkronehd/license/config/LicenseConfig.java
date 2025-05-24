package de.netzkronehd.license.config;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.Objects;

@Configuration
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LicenseConfig {

    @Value("${license.generation.multiplier}")
    private int generationMultiplier;

    @Value("${license.role-prefix}")
    private String rolePrefix;

    @Value("${license.signature-length}")
    private int signatureLength;

    @Value("${license.rate-limit}")
    private int rateLimit;

    @Value("${license.rate-limit-cache-expiration}")
    private long rateLimitCacheExpiration;

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof LicenseConfig that)) return false;
        return generationMultiplier == that.generationMultiplier && signatureLength == that.signatureLength && rateLimit == that.rateLimit && rateLimitCacheExpiration == that.rateLimitCacheExpiration && Objects.equals(rolePrefix, that.rolePrefix);
    }

    @Override
    public int hashCode() {
        int result = generationMultiplier;
        result = 31 * result + Objects.hashCode(rolePrefix);
        result = 31 * result + signatureLength;
        result = 31 * result + rateLimit;
        result = 31 * result + Long.hashCode(rateLimitCacheExpiration);
        return result;
    }
}
