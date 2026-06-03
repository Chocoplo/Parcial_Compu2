package co.icesi.postManager.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class LoginDtoIn {
    
    @Schema(description = "Username of the user", example = "jdoe")
    private String username;
    @Schema(description = "Password of the user", example = "password")
    private String password;

}
