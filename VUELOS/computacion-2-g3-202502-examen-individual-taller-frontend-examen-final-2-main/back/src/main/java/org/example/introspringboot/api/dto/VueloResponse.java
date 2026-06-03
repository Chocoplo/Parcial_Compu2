package org.example.introspringboot.api.dto;

import org.example.introspringboot.entity.Vuelo.EstadoVuelo;

public class VueloResponse {
    
    private Long id;
    private String numeroVuelo;
    private EstadoVuelo estado;
    private Long aerolineaId;
    private String nombreAerolinea;

    public VueloResponse() {}

    public VueloResponse(Long id, String numeroVuelo, EstadoVuelo estado, Long aerolineaId, String nombreAerolinea) {
        this.id = id;
        this.numeroVuelo = numeroVuelo;
        this.estado = estado;
        this.aerolineaId = aerolineaId;
        this.nombreAerolinea = nombreAerolinea;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroVuelo() {
        return numeroVuelo;
    }

    public void setNumeroVuelo(String numeroVuelo) {
        this.numeroVuelo = numeroVuelo;
    }

    public EstadoVuelo getEstado() {
        return estado;
    }

    public void setEstado(EstadoVuelo estado) {
        this.estado = estado;
    }

    public Long getAerolineaId() {
        return aerolineaId;
    }

    public void setAerolineaId(Long aerolineaId) {
        this.aerolineaId = aerolineaId;
    }

    public String getNombreAerolinea() {
        return nombreAerolinea;
    }

    public void setNombreAerolinea(String nombreAerolinea) {
        this.nombreAerolinea = nombreAerolinea;
    }
}
