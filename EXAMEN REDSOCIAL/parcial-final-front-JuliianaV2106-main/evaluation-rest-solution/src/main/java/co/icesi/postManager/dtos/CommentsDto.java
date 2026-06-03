package co.icesi.postManager.dtos;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class CommentsDto {
    private Long id;
    private String content;
    private Timestamp createdAt;
    private Long postId;
    private UserDto user;
}
