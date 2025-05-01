package de.netzkronehd.license.security;

import de.netzkronehd.license.model.OAuth2Model;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@Slf4j
public class OAuth2TokenSecurity {

    public OAuth2Model getModel(HttpServletRequest request) {
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer ")) {
            final String token = header.substring(("Bearer".length() - 1));
            final Jwt jwt = Jwt.withTokenValue(token).build();
            final JwtAuthenticationToken authToken = new JwtAuthenticationToken(jwt);
            return new OAuth2Model(jwt.getClaimAsString("sub"),
                    (WebAuthenticationDetails) authToken.getDetails(),
                    authToken.getAuthorities(),
                    jwt
            );
        }
        return null;
    }

    public OAuth2Model getModel(Authentication authentication) {
        if (authentication == null) return null;
        if (!(authentication.getPrincipal() instanceof Jwt jwt)) return null;
        return new OAuth2Model(jwt.getClaimAsString("sub"),
                (WebAuthenticationDetails) authentication.getDetails(),
                (Collection<GrantedAuthority>) authentication.getAuthorities(),
                jwt
        );
    }

}
