package com.gottig.portfolio.jwtsecurity.swaggerconfig;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@OpenAPIDefinition(
  info =@Info(
    title = "Portfolio API",
    version = "${portfolio.version}",
    contact = @Contact(
      name = "Portfolio", email = "gottigjavier@gmail.com", url = "https://gottigportfolio.firebaseapp.com"
    ),
    license = @License(
      name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
    ),
    termsOfService = "In process",
    description = "Backend for Gottig Portfolio Site"
  ),
  servers = @Server(
    url = "${api.server.url}",
    description = "Development"
  )
)
public class SwaggerConfiguration {
    @Bean
public OpenAPI customizeOpenAPI() {
    final String securitySchemeName = "bearerAuth";
    return new OpenAPI()
      .addSecurityItem(new SecurityRequirement()
        .addList(securitySchemeName))
      .components(new Components()
        .addSecuritySchemes(securitySchemeName, new SecurityScheme()
          .name(securitySchemeName)
          .type(SecurityScheme.Type.HTTP)
          .scheme("bearer")
          .bearerFormat("JWT")));
    }
    
}
