package org.example.introspringboot.security;

import org.example.introspringboot.entity.Aerolinea;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private Aerolinea aerolinea;
    public CustomUserDetails(Aerolinea aerolinea) {
        this.aerolinea = aerolinea;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<GrantedAuthority>();
    }

    @Override
    public String getPassword() {
        return aerolinea.getPassword();
    }

    @Override
    public String getUsername() {
        return aerolinea.getNombre();
    }
}
