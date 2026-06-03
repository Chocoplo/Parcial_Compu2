package co.icesi.postManager.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

        @Value("${server.servlet.context-path:/}")
        private String baseUrl;

        @Value("${server.port:8080}")
        private String port;

        @Bean
        public OpenAPI customOpenAPI() {
                OpenAPI op = new OpenAPI();
                op.servers(List.of(new Server().url("http://localhost:" + port + baseUrl),
                                new Server().url("http://192.168.131.12:8080" + baseUrl)));

                op.addSecurityItem(new SecurityRequirement().addList("authorization"));

                Components components = new Components();
                components.addSecuritySchemes("authorization",
                                new SecurityScheme().name("authorization")
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT"));

                op.components(components);

                return op;
        }

}
