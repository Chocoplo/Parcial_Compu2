package co.icesi.postManager.dtos;

import java.util.List;

import lombok.Data;

@Data
public class LoginDtoOut {
    private String token;
    private String username;
    private String name;
    private String lastName;
    private Long userId;
    private List<String> roles;
}
