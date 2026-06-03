INSERT INTO users (username, password, email, first_name, last_name, phone_number, address, is_active)
VALUES ('jdoe', '$2a$10$Xyfe1NDvBXTIgUn5na7TruVM7NqU3okrr4zfGh3AU5M56ljW/85iK', 'jdoe@example.com', 'John', 'Doe', '1234567890', '123 Main St', true);

INSERT INTO users (username, password, email, first_name, last_name, phone_number, address, is_active)
VALUES ('asmith', '$2a$10$Xyfe1NDvBXTIgUn5na7TruVM7NqU3okrr4zfGh3AU5M56ljW/85iK', 'asmith@example.com', 'Alice', 'Smith', '9876543210', '456 Oak Ave', true);

INSERT INTO users (username, password, email, first_name, last_name, phone_number, address, is_active)
VALUES ('nmartinez', '$2a$10$Xyfe1NDvBXTIgUn5na7TruVM7NqU3okrr4zfGh3AU5M56ljW/85iK', 'nmartinez@example.com', 'Natalia', 'Martinez', '3219876543', '789 Pine St', true);


INSERT INTO permission (name, description) VALUES ('CREATE_POST', 'Permite crear una nueva publicación');
INSERT INTO permission (name, description) VALUES ('UPDATE_POST', 'Permite actualizar una publicación existente');
INSERT INTO permission (name, description) VALUES ('DELETE_POST', 'Permite eliminar una publicación');
INSERT INTO permission (name, description) VALUES ('VIEW_POST', 'Permite ver los detalles de una publicación');

INSERT INTO permission (name, description) VALUES ('CREATE_COMMENT', 'Permite crear un nuevo comentario');
INSERT INTO permission (name, description) VALUES ('UPDATE_COMMENT', 'Permite actualizar un comentario existente');
INSERT INTO permission (name, description) VALUES ('DELETE_COMMENT', 'Permite eliminar un comentario');
INSERT INTO permission (name, description) VALUES ('VIEW_COMMENT', 'Permite ver los detalles de un comentario');

INSERT INTO role (name, description) VALUES ('ADMIN', 'Administrador con acceso total');
INSERT INTO role (name, description) VALUES ('USER', 'Usuario básico que gestiona sus tareas');


INSERT INTO role_permission (role_id, permission_id) VALUES (1, 1);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 2);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 3);
INSERT INTO role_permission (role_id, permission_id) VALUES (1, 4);

INSERT INTO role_permission (role_id, permission_id) VALUES (2, 4);

INSERT INTO user_role (role_id, user_id) VALUES (1, 1);
INSERT INTO user_role (role_id, user_id) VALUES (2, 2);
INSERT INTO user_role (role_id, user_id) VALUES (2, 3);

INSERT INTO post (content, created_at, user_id) VALUES 
('Primer post de Alice', '2024-06-01 09:00:00', 2),
('Segundo post de Natalia', '2024-06-02 10:00:00', 3),
('Tercer post de Natalia', '2024-06-03 11:00:00', 3);

INSERT INTO comments (content, post_id, user_id, created_at) VALUES 
('¡Buen post, Alice!', 1, 3, '2024-06-01 10:00:00'),
('Gracias por compartir.', 1, 3, '2024-06-01 10:05:00');

INSERT INTO comments (content, post_id, user_id, created_at) VALUES 
('Interesante aporte, Natalia.', 2, 2, '2024-06-02 11:00:00'),
('Me gusta tu enfoque.', 2, 2, '2024-06-02 11:10:00');

INSERT INTO comments (content, post_id, user_id, created_at) VALUES 
('Excelente publicación.', 3, 2, '2024-06-03 12:00:00'),
('Muy útil, gracias.', 3, 2, '2024-06-03 12:15:00');