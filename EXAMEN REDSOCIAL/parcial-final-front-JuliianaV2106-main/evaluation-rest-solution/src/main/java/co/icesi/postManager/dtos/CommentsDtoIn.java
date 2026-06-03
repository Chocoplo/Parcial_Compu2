package co.icesi.postManager.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CommentsDtoIn {

    @Schema(description = "Unique identifier for the comment", example = "1")
    private Long id;

    @Schema(description = "Content of the comment", example = "This is a comment from swagger")
    private String content;

    @Schema(description = "ID of the user who made the comment", example = "1")
    private long userId;

}
