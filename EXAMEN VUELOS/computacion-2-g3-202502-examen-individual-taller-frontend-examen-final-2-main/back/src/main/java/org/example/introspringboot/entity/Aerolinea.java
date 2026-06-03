package org.example.introspringboot.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aerolineas")
public class Aerolinea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    private String password;

    @OneToMany(mappedBy = "aerolinea", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vuelo> vuelos = new ArrayList<>();

    public Aerolinea() {}

    public Aerolinea(String nombre, String password) {
        this.nombre = nombre;
        this.password = password;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
