package org.example.introspringboot.api;

import org.example.introspringboot.api.dto.VueloRequest;
import org.example.introspringboot.api.dto.VueloResponse;
import org.example.introspringboot.api.dto.MessageResponse;
import org.example.introspringboot.service.VueloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vuelos")
public class VueloRestController {

    @Autowired
    private VueloService vueloService;

    @PostMapping
    public ResponseEntity<?> createVuelo(@RequestBody VueloRequest vueloRequest) {
        try {
            VueloResponse response = vueloService.createVuelo(vueloRequest);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(
                    new MessageResponse(e.getMessage())
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVuelo(@PathVariable Long id, 
                                         @RequestBody VueloRequest vueloRequest) {
        try {
            VueloResponse response = vueloService.updateVuelo(id, vueloRequest);
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new MessageResponse(e.getMessage())
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVuelo(@PathVariable Long id) {
        try {
            vueloService.deleteVuelo(id);
            return ResponseEntity.status(200).body(
                    new MessageResponse("Vuelo eliminado exitosamente")
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new MessageResponse(e.getMessage())
            );
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllVuelos() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String nombreAerolinea = authentication.getName();
            List<VueloResponse> vuelos = vueloService.getVuelosByNombreAerolinea(nombreAerolinea);
            return ResponseEntity.status(200).body(vuelos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new MessageResponse(e.getMessage())
            );
        }
    }
}
