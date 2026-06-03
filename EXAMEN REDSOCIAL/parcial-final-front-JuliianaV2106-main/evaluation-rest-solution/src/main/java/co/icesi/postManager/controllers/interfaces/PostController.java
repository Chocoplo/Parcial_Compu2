package co.icesi.postManager.controllers.interfaces;

import java.util.List;

import org.springframework.http.ResponseEntity;

import co.icesi.postManager.dtos.CommentsDtoIn;
import co.icesi.postManager.dtos.PostDtoIn;
import co.icesi.postManager.dtos.PostDtoOut;

public interface PostController {

    public ResponseEntity<List<PostDtoOut>> findAllPost();

    public ResponseEntity<?> addPost(PostDtoIn dto);

    public ResponseEntity<?> updatePost(PostDtoIn dto);

    public ResponseEntity<?> deletePost(long id);

    public ResponseEntity<?> findById(long id);

    public ResponseEntity<?> addComment(long id, CommentsDtoIn dto);

    public ResponseEntity<?> findCommentsByPostId(long id);

}
