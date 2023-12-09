package de.netzkronehd.license.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OAuth2Model {

    private String sub;
    private WebAuthenticationDetails details;
    private Collection<GrantedAuthority> authorities;

}
