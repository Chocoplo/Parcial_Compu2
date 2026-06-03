package co.icesi.postManager.dtos;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class PostDtoOut {
    private Long id;
    private String content;
    private Timestamp createdAt;
    private UserDto user;
    private int commentsCount;
}
