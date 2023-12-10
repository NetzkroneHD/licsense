package de.netzkronehd.license.config;

import de.netzkronehd.license.security.OAuth2RoleConverter;
import de.netzkronehd.license.service.DefaultUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class SecurityConfig {

    private final LicenseConfig licenseConfig;
    private final DefaultUserDetailsService defaultUserDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/license/**",
                                "/api/v1/actuator/health"
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/logs**"
                        ).hasAnyAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.POST,
                                "/api/v1/license**",
                                "/api/v1/logs**"
                        ).hasAnyAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT,
                                "/api/v1/license**",
                                "/api/v1/logs**"
                        ).hasAnyAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE,
                                "/api/v1/license**",
                                "/api/v1/logs**"
                        ).hasAnyAuthority("ROLE_ADMIN")
                        .anyRequest().permitAll()
                )
                .userDetailsService(defaultUserDetailsService)
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())))
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        final JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setJwtGrantedAuthoritiesConverter(oAuth2RoleConverter());
        return authenticationConverter;
    }

    @Bean
    public OAuth2RoleConverter oAuth2RoleConverter() {
        return new OAuth2RoleConverter(licenseConfig.getRolePrefix());
    }

}
