-- Aerolineas
INSERT INTO aerolineas (nombre, password) VALUES ( 'Avianca', '$2y$10$6o5vS5YmB6/txDbxtABg8OlTI2XTrdzGdwwsOt4EgVRsJujeef6CC'),
                                                  ( 'VivaAir', '$2y$10$6o5vS5YmB6/txDbxtABg8OlTI2XTrdzGdwwsOt4EgVRsJujeef6CC');

-- Vuelos para Avianca
INSERT INTO vuelos (numero_vuelo, estado, aerolinea_id) VALUES ('AV101', 'PROGRAMADO', 1);
INSERT INTO vuelos (numero_vuelo, estado, aerolinea_id) VALUES ('AV202', 'EN_VUELO', 1);
INSERT INTO vuelos (numero_vuelo, estado, aerolinea_id) VALUES ('AV303', 'ATERRIZADO', 1);

-- Vuelos para VivaAir
INSERT INTO vuelos (numero_vuelo, estado, aerolinea_id) VALUES ('VV501', 'PROGRAMADO', 2);
INSERT INTO vuelos (numero_vuelo, estado, aerolinea_id) VALUES ('VV602', 'ATERRIZADO', 2);
INSERT INTO vuelos (numero_vuelo, estado, aerolinea_id) VALUES ('VV703', 'EN_VUELO', 2);
