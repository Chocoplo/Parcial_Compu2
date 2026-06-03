package org.example.introspringboot.service.impl;

import org.example.introspringboot.api.dto.VueloRequest;
import org.example.introspringboot.api.dto.VueloResponse;
import org.example.introspringboot.entity.Vuelo;
import org.example.introspringboot.entity.Aerolinea;
import org.example.introspringboot.repository.VueloRepository;
import org.example.introspringboot.repository.AerolineaRepository;
import org.example.introspringboot.service.VueloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VueloServiceImpl implements VueloService {

    @Autowired
    private VueloRepository vueloRepository;

    @Autowired
    private AerolineaRepository aerolineaRepository;

    @Override
    public VueloResponse createVuelo(VueloRequest vueloRequest) {
        Optional<Aerolinea> aerolineaOpt = aerolineaRepository.findById(vueloRequest.getAerolineaId());
        if (aerolineaOpt.isEmpty()) {
            throw new RuntimeException("Aerolínea no encontrada con id: " + vueloRequest.getAerolineaId());
        }

        Aerolinea aerolinea = aerolineaOpt.get();
        Vuelo vuelo = new Vuelo();
        vuelo.setNumeroVuelo(vueloRequest.getNumeroVuelo());
        vuelo.setEstado(vueloRequest.getEstado());
        vuelo.setAerolinea(aerolinea);

        Vuelo savedVuelo = vueloRepository.save(vuelo);
        return mapToResponse(savedVuelo);
    }

    @Override
    public VueloResponse updateVuelo(Long id, VueloRequest vueloRequest) {
        Optional<Vuelo> vueloOpt = vueloRepository.findById(id);
        if (vueloOpt.isEmpty()) {
            throw new RuntimeException("Vuelo no encontrado con id: " + id);
        }

        Vuelo vuelo = vueloOpt.get();
        vuelo.setNumeroVuelo(vueloRequest.getNumeroVuelo());
        vuelo.setEstado(vueloRequest.getEstado());

        Vuelo updatedVuelo = vueloRepository.save(vuelo);
        return mapToResponse(updatedVuelo);
    }

    @Override
    public void deleteVuelo(Long id) {
        Optional<Vuelo> vueloOpt = vueloRepository.findById(id);
        if (vueloOpt.isEmpty()) {
            throw new RuntimeException("Vuelo no encontrado con id: " + id);
        }
        vueloRepository.deleteById(id);
    }

    @Override
    public List<VueloResponse> getAllVuelos() {
        return vueloRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<VueloResponse> getVuelosByNombreAerolinea(String nombreAerolinea) {
        Optional<Aerolinea> aerolineaOpt = aerolineaRepository.findByNombre(nombreAerolinea);
        if (aerolineaOpt.isEmpty()) {
            throw new RuntimeException("Aerolínea no encontrada: " + nombreAerolinea);
        }
        return vueloRepository.findByAerolineaId(aerolineaOpt.get().getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private VueloResponse mapToResponse(Vuelo vuelo) {
        return new VueloResponse(
                vuelo.getId(),
                vuelo.getNumeroVuelo(),
                vuelo.getEstado(),
                vuelo.getAerolinea().getId(),
                vuelo.getAerolinea().getNombre()
        );
    }
}
