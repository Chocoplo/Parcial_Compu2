package org.example.introspringboot.service.impl;

import org.example.introspringboot.entity.Aerolinea;
import org.example.introspringboot.repository.AerolineaRepository;
import org.example.introspringboot.service.AerolineaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AerolineaServiceImpl implements AerolineaService {

    @Autowired
    private AerolineaRepository aerolineaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Aerolinea findByNombre(String nombre) {
        Optional<Aerolinea> aerolinea = aerolineaRepository.findByNombre(nombre);
        return aerolinea.orElse(null);
    }

    @Override
    public void createAerolinea(Aerolinea aerolinea) {
        String bcryptPass = passwordEncoder.encode(aerolinea.getPassword());
        aerolinea.setPassword(bcryptPass);
        aerolineaRepository.save(aerolinea);
    }

}
