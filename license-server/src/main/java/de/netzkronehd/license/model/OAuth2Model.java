package de.netzkronehd.license.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import java.util.Collection;

import static de.netzkronehd.license.config.SecurityConfig.ROLE_ADMIN;
import static de.netzkronehd.license.config.SecurityConfig.ROLE_USER;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OAuth2Model {

    private String sub;
    private WebAuthenticationDetails details;
    private Collection<GrantedAuthority> authorities;
    private Jwt token;

    public boolean hasRole(String role) {
        return authorities.stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equalsIgnoreCase(role));
    }

    public boolean isAdmin() {
        return hasRole(ROLE_ADMIN);
    }

    public boolean isUser() {
        return hasRole(ROLE_USER);
    }

    public boolean hasAccess() {
        return isUser() || isAdmin();
    }

}
