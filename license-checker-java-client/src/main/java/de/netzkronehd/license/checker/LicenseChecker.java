package de.netzkronehd.license.checker;


import de.netzkronehd.license.api.client.webclient.api.LicenseCheckApi;
import de.netzkronehd.license.api.client.webclient.invoker.ApiClient;
import de.netzkronehd.license.api.client.webclient.models.LicenseCheckResultDto;
import de.netzkronehd.license.checker.siganture.SignatureChecker;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;

import java.util.Objects;
import java.util.function.Consumer;

import static de.netzkronehd.license.checker.LicenseCheckedStatus.*;

public class LicenseChecker {


    private String basePath;
    private String jwtToken;
    private ApiClient apiClient;
    private LicenseCheckApi licenseCheckApi;
    private SignatureChecker signatureChecker;

    /**
     * Constructs a new LicenseChecker instance with the specified base path and optional JWT token.
     *
     * @param basePath The api base path for license-related API operations.
     * @param jwtToken The optional JWT token for authentication. Can be null if not required.
     * @throws IllegalArgumentException If the basePath is empty or null.
     */
    public LicenseChecker(@Nonnull String basePath, @Nullable String jwtToken, @Nonnull SignatureChecker signatureChecker) {
        Objects.requireNonNull(basePath);
        if(basePath.trim().isBlank()) throw new IllegalArgumentException("basePath can not be empty.");

        this.basePath = basePath;
        this.jwtToken = jwtToken;

        this.apiClient = new ApiClient();
        this.apiClient.setBasePath(this.basePath);

        if(jwtToken != null) apiClient.setBearerToken(this.jwtToken);

        this.licenseCheckApi = new LicenseCheckApi(this.apiClient);
        this.signatureChecker = signatureChecker;
    }

    /**
     * Retrieves license information for the specified license key.
     *
     * @param licenseKey The license key to retrieve information for.
     * @return A Mono emitting the LicenseDto if retrieval is successful.
     */
    public Mono<LicenseCheckResultDto> checkLicense(String licenseKey) {
        return this.licenseCheckApi.checkLicense(licenseKey);
    }

    /**
     * Retrieves license information for the specified license key along with HTTP information.
     * <p><b>200</b> - License valid
     * <p><b>403</b> - License invalid
     * <p><b>404</b> - License not found
     *
     * @param licenseKey The license key to retrieve information for.
     * @return A Mono emitting the ResponseEntity containing LicenseDto if retrieval is successful.
     */
    public Mono<ResponseEntity<LicenseCheckResultDto>> checkLicenseWithHttpInfo(String licenseKey) {
        return this.licenseCheckApi.checkLicenseWithHttpInfo(licenseKey);
    }

    /**
     * @deprecated This method is not recommended for use due to its blocking nature,
     * which can lead to performance issues. Use {@link #isLicenseValid(String, Consumer)} instead.
     *
     * @param license The license to be validated.
     * @return True if the license is valid; otherwise, false.
     */
    @Deprecated
    public LicenseCheckedStatus isLicenseValid(String license) {
        final Mono<ResponseEntity<LicenseCheckResultDto>> licenseWithHttpInfo = checkLicenseWithHttpInfo(license);
        final ResponseEntity<LicenseCheckResultDto> responseEntity = licenseWithHttpInfo.block();

        if(responseEntity == null) return ERROR;
        if(responseEntity.getStatusCode() != HttpStatus.OK) return INVALID;
        if(responseEntity.getBody() == null) return INVALID;
        if(!signatureChecker.isValidSignature(responseEntity.getBody())) return INVALID_SIGNATURE;

        return ofValidity(responseEntity.getBody().getValid());
    }

    /**
     * Asynchronously checks the validity of a license and invokes the specified callback with the result.
     *
     * @param license The license to be validated.
     * @param callback A consumer that will be invoked with the result of the license validation.
     *                 True if the license is valid; otherwise, false.
     */
    public void isLicenseValid(String license, Consumer<LicenseCheckedStatus> callback) {
        Objects.requireNonNull(callback);
        final LicenseChecker checker = new LicenseChecker(basePath, jwtToken, signatureChecker);
        final Mono<ResponseEntity<LicenseCheckResultDto>> licenseWithHttpInfo = checker.checkLicenseWithHttpInfo(license);
        licenseWithHttpInfo.subscribe(responseEntity -> {
            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                callback.accept(INVALID);
                return;
            }
            if (responseEntity.getBody() == null) {
                callback.accept(INVALID);
                return;
            }
            if(!signatureChecker.isValidSignature(responseEntity.getBody())) {
                callback.accept(INVALID_SIGNATURE);
                return;
            }
            callback.accept(ofValidity(responseEntity.getBody().getValid()));

        }, throwable -> callback.accept(ERROR));
    }


    /**
     * Sets the base path for license-related API operations.
     *
     * @param basePath The new base path.
     * @throws IllegalArgumentException If the new base path is empty or null.
     */
    public void setBasePath(String basePath) {
        Objects.requireNonNull(basePath);
        if(basePath.trim().isBlank()) throw new IllegalArgumentException("basePath can not be empty.");
        this.basePath = basePath;
        if(this.apiClient != null) this.apiClient.setBasePath(basePath);
    }

    /**
     * Sets the JWT token for authentication.
     *
     * @param jwtToken The new JWT token. Can be null if not required.
     */
    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
        if(this.apiClient != null) this.apiClient.setBearerToken(jwtToken);
    }

    public void setLicenseCheckApi(LicenseCheckApi licenseCheckApi) {
        this.licenseCheckApi = licenseCheckApi;
    }

    public void setApiClient(ApiClient apiClient) {
        this.apiClient = apiClient;
    }

    public void setSignatureChecker(SignatureChecker signatureChecker) {
        this.signatureChecker = signatureChecker;
    }

    public String getBasePath() {
        return basePath;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public ApiClient getApiClient() {
        return apiClient;
    }

    public LicenseCheckApi getLicenseCheckApi() {
        return licenseCheckApi;
    }

    public SignatureChecker getSignatureChecker() {
        return signatureChecker;
    }

    /**
     * @deprecated This method is not recommended for use due to its blocking nature,
     * which can lead to performance issues. Use {@link #isLicenseValid(String, String, SignatureChecker, Consumer)} instead.
     *
     * @param basePath The api base path for license validation.
     * @param license The license to be validated.
     * @param signatureChecker The checker to check the signature of the response.
     * @return True if the license is valid; otherwise, false.
     */
    @Deprecated
    public static LicenseCheckedStatus isLicenseValid(String basePath, String license, SignatureChecker signatureChecker) {
        final LicenseChecker checker = new LicenseChecker(basePath, null, signatureChecker);
        return checker.isLicenseValid(license);
    }

    /**
     * Asynchronously checks the validity of a license and invokes the specified callback with the result.
     *
     * @param basePath The api base path for license validation.
     * @param license The license to be validated.
     * @param callback A consumer that will be invoked with the result of the license validation.
     *                 True if the license is valid; otherwise, false.
     */
    public static void isLicenseValid(String basePath, String license, SignatureChecker signatureChecker, Consumer<LicenseCheckedStatus> callback) {
        final LicenseChecker checker = new LicenseChecker(basePath, null, signatureChecker);
        checker.isLicenseValid(license, callback);
    }

}
