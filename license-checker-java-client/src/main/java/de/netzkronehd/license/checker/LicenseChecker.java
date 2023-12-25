package de.netzkronehd.license.checker;


import de.netzkronehd.license.api.client.webclient.api.LicenseApi;
import de.netzkronehd.license.api.client.webclient.invoker.ApiClient;
import de.netzkronehd.license.api.client.webclient.models.LicenseDto;
import de.netzkronehd.license.api.client.webclient.models.LicenseLogDto;
import jakarta.annotation.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;

public class LicenseChecker {

    private String basePath;
    private String jwtToken;
    private ApiClient apiClient;
    private LicenseApi licenseApi;

    /**
     * Constructs a new LicenseChecker instance with the specified base path and optional JWT token.
     *
     * @param basePath The api base path for license-related API operations.
     * @param jwtToken The optional JWT token for authentication. Can be null if not required.
     * @throws IllegalArgumentException If the basePath is empty or null.
     */
    public LicenseChecker(@Nonnull String basePath, @Nullable String jwtToken) {
        Objects.requireNonNull(basePath);
        if(basePath.trim().isBlank()) throw new IllegalArgumentException("basePath can not be empty.");

        this.basePath = basePath;
        this.jwtToken = jwtToken;

        this.apiClient = new ApiClient();
        this.apiClient.setBasePath(this.basePath);

        if(jwtToken != null) apiClient.setBearerToken(this.jwtToken);

        this.licenseApi = new LicenseApi(this.apiClient);
    }

    /**
     * Retrieves license information for the specified license key.
     *
     * @param licenseKey The license key to retrieve information for.
     * @return A Mono emitting the LicenseDto if retrieval is successful.
     */
    public Mono<LicenseDto> getLicense(String licenseKey) {
        return this.licenseApi.getLicense(licenseKey);
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
    public Mono<ResponseEntity<LicenseDto>> getLicenseWithHttpInfo(String licenseKey) {
        return this.licenseApi.getLicenseWithHttpInfo(licenseKey);
    }

    /**
     * Creates a new license using the provided LicenseDto.
     * You may need authentication and authorization for the api call.
     *
     * @param licenseDto The LicenseDto containing information for creating the license.
     * @return A Mono emitting the created LicenseDto if the creation is successful.
     */
    public Mono<LicenseDto> createLicense(LicenseDto licenseDto) {
        return this.licenseApi.createLicense(licenseDto);
    }

    /**
     * Creates a new license using the provided LicenseDto along with HTTP information.
     * You may need authentication and authorization for the api call.
     * <p><b>200</b> - License valid
     *
     * @param licenseDto The LicenseDto containing information for creating the license.
     * @return A Mono emitting the ResponseEntity containing the created LicenseDto if creation is successful.
     */
    public Mono<ResponseEntity<LicenseDto>> createLicenseWithHttpInfo(LicenseDto licenseDto) {
        return this.licenseApi.createLicenseWithHttpInfo(licenseDto);
    }

    /**
     * Deletes a license with the specified license key.
     * You may need authentication and authorization for the api call.
     *
     * @param license The license key to be deleted.
     * @return A Mono indicating the completion of the deletion operation.
     */
    public Mono<Void> deleteLicense(String license) {
        return this.licenseApi.deleteLicense(license);
    }

    /**
     * Deletes a license with the specified license key along with HTTP information.
     * You may need authentication and authorization for the api call.
     * <p><b>200</b> - License valid
     * <p><b>404</b> - License not found
     *
     * @param license The license key to be deleted.
     * @return A Mono emitting the ResponseEntity indicating the completion of the deletion operation.
     */
    public Mono<ResponseEntity<Void>> deleteLicenseWithHttpInfo(String license) {
        return this.licenseApi.deleteLicenseWithHttpInfo(license);
    }

    /**
     * Retrieves license logs for the specified license key.
     * You may need authentication and authorization for the api call.
     *
     * @param license The license key for which logs are to be retrieved.
     * @return A Flux emitting LicenseLogDto objects representing the license logs.
     */
    public Flux<LicenseLogDto> getLicenseLogs(String license) {
        return this.licenseApi.getLicenseLogs(license);
    }

    /**
     * Retrieves license logs for the specified license key along with HTTP information.
     * You may need authentication and authorization for the api call.
     * <p><b>200</b> - License valid
     * <p><b>404</b> - License not found
     *
     * @param license The license key for which logs are to be retrieved.
     * @return A Mono emitting the ResponseEntity containing a list of LicenseLogDto if retrieval is successful.
     */
    public Mono<ResponseEntity<List<LicenseLogDto>>> getLicenseLogsWithHttpInfo(String license) {
        return this.licenseApi.getLicenseLogsWithHttpInfo(license);
    }

    /**
     * Updates an existing license with the specified license key using the provided LicenseDto.
     * You may need authentication and authorization for the api call.
     *
     * @param license The license key to be updated.
     * @param licenseDto The LicenseDto containing information for updating the license.
     * @return A Mono emitting the updated LicenseDto if the update is successful.
     */
    public Mono<LicenseDto> updateLicense(String license, LicenseDto licenseDto) {
        return this.licenseApi.updateLicense(license, licenseDto);
    }

    /**
     * Updates an existing license with the specified license key using the provided LicenseDto along with HTTP information.
     * You may need authentication and authorization for the api call.
     * <p><b>200</b> - Updated
     * <p><b>404</b> - License not found
     *
     * @param license The license key to be updated.
     * @param licenseDto The LicenseDto containing information for updating the license.
     * @return A Mono emitting the ResponseEntity containing the updated LicenseDto if the update is successful.
     */
    public Mono<ResponseEntity<LicenseDto>> updateLicenseWithHttpInfo(String license, LicenseDto licenseDto) {
        return this.licenseApi.updateLicenseWithHttpInfo(license, licenseDto);
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

    public void setLicenseApi(LicenseApi licenseApi) {
        this.licenseApi = licenseApi;
    }

    public void setApiClient(ApiClient apiClient) {
        this.apiClient = apiClient;
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

    public LicenseApi getLicenseApi() {
        return licenseApi;
    }


    /**
     * @deprecated This method is not recommended for use due to its blocking nature,
     * which can lead to performance issues. Use {@link #isLicenseValid(String, String, Consumer)} instead.
     *
     * @param basePath The api base path for license validation.
     * @param license The license to be validated.
     * @return True if the license is valid; otherwise, false.
     */
    @Deprecated
    public static boolean isLicenseValidWithBlocking(String basePath, String license) {
        final LicenseChecker checker = new LicenseChecker(basePath, null);
        final Mono<ResponseEntity<LicenseDto>> licenseWithHttpInfo = checker.getLicenseWithHttpInfo(license);
        final ResponseEntity<LicenseDto> responseEntity = licenseWithHttpInfo.block();

        if(responseEntity == null) return false;
        if(responseEntity.getStatusCode() != HttpStatus.OK) return false;
        if(responseEntity.getBody() == null) return false;

        return responseEntity.getBody().getValid();
    }

    /**
     * Asynchronously checks the validity of a license and invokes the specified callback with the result.
     *
     * @param basePath The api base path for license validation.
     * @param license The license to be validated.
     * @param callback A consumer that will be invoked with the result of the license validation.
     *                 True if the license is valid; otherwise, false.
     */
    public static void isLicenseValid(String basePath, String license, Consumer<Boolean> callback) {
        Objects.requireNonNull(callback);
        final LicenseChecker checker = new LicenseChecker(basePath, null);
        final Mono<ResponseEntity<LicenseDto>> licenseWithHttpInfo = checker.getLicenseWithHttpInfo(license);
        licenseWithHttpInfo.subscribe(responseEntity -> {
            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                callback.accept(false);
                return;
            }
            if (responseEntity.getBody() == null) {
                callback.accept(false);
                return;
            }
            callback.accept(responseEntity.getBody().getValid());

        }, throwable ->
                callback.accept(false)
        );
    }

    /**
     * Retrieves license information without using a JWT token.
     *
     * @param basePath The api base path for license retrieval.
     * @param license The license to be retrieved.
     * @return A Mono emitting the LicenseDto if retrieval is successful.
     */
    public static Mono<LicenseDto> getLicense(String basePath, String license) {
        return getLicense(basePath, license, null);
    }

    /**
     * Retrieves license information using a JWT token for authentication.
     *
     * @param basePath The api base path for license retrieval.
     * @param license The license to be retrieved.
     * @param jwtToken The JWT token for authentication. Can be null if not required.
     * @return A Mono emitting the LicenseDto if retrieval is successful.
     */
    public static Mono<LicenseDto> getLicense(String basePath, String license, String jwtToken) {
        final LicenseChecker checker = new LicenseChecker(basePath, jwtToken);
        return checker.getLicense(license);
    }

}
