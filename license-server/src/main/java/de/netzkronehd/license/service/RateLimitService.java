package de.netzkronehd.license.service;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import de.netzkronehd.license.config.LicenseConfig;
import de.netzkronehd.license.exception.RateLimitExceededException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class RateLimitService {

    private final LicenseConfig licenseConfig;
    @Getter
    private final Cache<String, Long> ipCache;

    private final Timer timer;

    @Autowired
    public RateLimitService(LicenseConfig licenseConfig) {
        this.licenseConfig = licenseConfig;
        this.ipCache = CacheBuilder.newBuilder()
                .expireAfterWrite(Duration.ofMinutes(licenseConfig.getRateLimitCacheExpiration()))
                .build();
        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                ipCache.cleanUp();
            }
        }, 0, TimeUnit.HOURS.toMillis(2));
    }

    public void checkRateLimit(String ip, String method) throws RateLimitExceededException {
        final String key = ip + "-" + method;
        long count;
        try {
            count = ipCache.get(key, () -> 0L) + 1;
        } catch (ExecutionException e) {
            count = 1;
        }
        ipCache.put(key, count);
        if (count > licenseConfig.getRateLimit()) {
            throw new RateLimitExceededException("Rate limit exceeded (" + count + "/" + licenseConfig.getRateLimit() + ")");
        }
    }

}
