package co.icesi.postManager.dtos;

import java.sql.Timestamp;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class PostDtoIn {
    @Schema(description = "ID of the post", example = "1")
    private Long id;
    @Schema(description = "Content of the post", example = "This is a sample post content")
    private String content;
    @Schema(description = "Creation timestamp of the post", example = "2023-10-01T12:00:00Z")
    private Timestamp createdAt;
    @Schema(description = "ID of the user who created the post", example = "2")
    private Long userId;
}
