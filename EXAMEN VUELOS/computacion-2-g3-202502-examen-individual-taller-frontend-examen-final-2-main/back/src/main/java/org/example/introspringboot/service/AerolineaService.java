package org.example.introspringboot.service;

import org.example.introspringboot.entity.Aerolinea;

public interface AerolineaService {
    Aerolinea findByNombre(String nombre);
    void createAerolinea(Aerolinea aerolinea);
}
