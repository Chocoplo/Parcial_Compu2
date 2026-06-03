package org.example.introspringboot.service;

import org.example.introspringboot.api.dto.VueloRequest;
import org.example.introspringboot.api.dto.VueloResponse;

import java.util.List;

public interface VueloService {
    VueloResponse createVuelo(VueloRequest vueloRequest);
    VueloResponse updateVuelo(Long id, VueloRequest vueloRequest);
    void deleteVuelo(Long id);
    List<VueloResponse> getAllVuelos();
    List<VueloResponse> getVuelosByNombreAerolinea(String nombreAerolinea);
}
