package de.netzkronehd.license.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import java.util.Collection;
import java.util.Objects;

import static de.netzkronehd.license.config.SecurityConfig.ROLE_ADMIN;
import static de.netzkronehd.license.config.SecurityConfig.ROLE_USER;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

    @Override
    public final boolean equals(Object o) {
        if (!(o instanceof OAuth2Model that)) return false;
        return Objects.equals(sub, that.sub) && Objects.equals(details, that.details) && Objects.equals(authorities, that.authorities) && Objects.equals(token, that.token);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(sub);
        result = 31 * result + Objects.hashCode(details);
        result = 31 * result + Objects.hashCode(authorities);
        result = 31 * result + Objects.hashCode(token);
        return result;
    }
}
