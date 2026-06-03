package org.example.introspringboot.security;

import org.example.introspringboot.entity.Aerolinea;
import org.example.introspringboot.service.AerolineaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private AerolineaService aerolineaService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Aerolinea aerolinea = aerolineaService.findByNombre(username);
        CustomUserDetails appUser = new CustomUserDetails(aerolinea);
        return appUser;
    }
}
