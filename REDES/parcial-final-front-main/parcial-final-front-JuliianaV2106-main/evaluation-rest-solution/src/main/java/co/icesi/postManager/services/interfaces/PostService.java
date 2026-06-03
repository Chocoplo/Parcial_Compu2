package co.icesi.postManager.services.interfaces;

import java.util.List;

import co.icesi.postManager.model.Comments;
import co.icesi.postManager.model.Post;

public interface PostService {
    Post createPost(Post post);
    Post updatePost(Post post);
    void deletePost(long postId);
    Post getPostById(long postId);
    List<Post> getAllPosts();
    Comments addCommentToPost(Post post, Comments comment);
}
