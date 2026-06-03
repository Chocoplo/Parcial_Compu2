package org.example.introspringboot.repository;

import org.example.introspringboot.entity.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VueloRepository extends JpaRepository<Vuelo, Long> {
    List<Vuelo> findByAerolineaId(Long aerolineaId);
}
