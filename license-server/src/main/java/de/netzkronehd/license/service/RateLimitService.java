package de.netzkronehd.license.service;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import de.netzkronehd.license.config.LicenseConfig;
import de.netzkronehd.license.exception.RateLimitExceededException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RateLimitService {

    private final LicenseConfig licenseConfig;
    private final Cache<String, Long> ipCache = CacheBuilder.newBuilder()
            .expireAfterWrite(Duration.ofMinutes(1))
            .build();

    public void checkRateLimit(String ip, String method) throws RateLimitExceededException {
        final String key = ip+"-"+method;
        long count;
        try {
            count = ipCache.get(key, () -> 0L)+1;
        } catch (ExecutionException e) {
            count = 1;
        }
        ipCache.put(key, count);
        if (count > licenseConfig.getRateLimit()) {
            throw new RateLimitExceededException("Rate limit exceeded ("+count+"/"+licenseConfig.getRateLimit()+")");
        }
    }

}
