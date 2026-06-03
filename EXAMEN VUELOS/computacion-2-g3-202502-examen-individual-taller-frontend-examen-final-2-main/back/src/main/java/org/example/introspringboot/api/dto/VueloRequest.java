package org.example.introspringboot.api.dto;

import org.example.introspringboot.entity.Vuelo.EstadoVuelo;

public class VueloRequest {
    
    private String numeroVuelo;
    private EstadoVuelo estado;
    private Long aerolineaId;

    public VueloRequest() {}

    public VueloRequest(String numeroVuelo, EstadoVuelo estado, Long aerolineaId) {
        this.numeroVuelo = numeroVuelo;
        this.estado = estado;
        this.aerolineaId = aerolineaId;
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
}
