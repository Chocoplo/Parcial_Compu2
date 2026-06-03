package org.example.introspringboot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vuelos")
public class Vuelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String numeroVuelo;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoVuelo estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aerolinea_id", nullable = false)
    private Aerolinea aerolinea;

    public enum EstadoVuelo {
        PROGRAMADO("Programado"),
        EN_VUELO("En vuelo"),
        ATERRIZADO("Aterrizado");

        private final String displayName;

        EstadoVuelo(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public Vuelo() {}

    public Vuelo(String numeroVuelo, EstadoVuelo estado, Aerolinea aerolinea) {
        this.numeroVuelo = numeroVuelo;
        this.estado = estado;
        this.aerolinea = aerolinea;
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

    public Aerolinea getAerolinea() {
        return aerolinea;
    }

    public void setAerolinea(Aerolinea aerolinea) {
        this.aerolinea = aerolinea;
    }
}
