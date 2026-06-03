package org.example.introspringboot.repository;

import org.example.introspringboot.entity.Aerolinea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AerolineaRepository extends JpaRepository<Aerolinea, Long> {
    Optional<Aerolinea> findByNombre(String nombre);
}
