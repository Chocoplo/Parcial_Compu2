package co.icesi.postManager.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import co.icesi.postManager.dtos.PostDtoIn;
import co.icesi.postManager.dtos.PostDtoOut;
import co.icesi.postManager.model.Comments;
import co.icesi.postManager.model.Post;
import co.icesi.postManager.model.User;

@Mapper(componentModel = "spring", uses = { CommentsMapper.class })
public interface PostMapper {

    @Mappings({
            @Mapping(source = "user", target = "user"),
            @Mapping(source = "comments", target = "commentsCount", qualifiedByName = "commentsCount"),
    })
    PostDtoOut postToPostDto(Post post);

    @Mappings({
            @Mapping(source = "user", target = "user", ignore = true),
            @Mapping(target = "comments", ignore = true),
    })
    Post postDtoToPost(PostDtoOut postDto);

    @Mappings({
            @Mapping(source = "userId", target = "user", qualifiedByName = "longToUser"),
            @Mapping(target = "comments", ignore = true),
    })
    Post postDtoInToPost(PostDtoIn dto);

    @Named("longToUser")
    public default User longToUser(Long userId) {
        if (userId == null) {
            return null;
        }
        User user = new User();
        user.setId(userId);
        return user;
    }

    @Named("postToLong")
    public default Long postToLong(Post post) {
        return post != null ? post.getId() : null;
    }

    @Named("longToPost")
    public default Post longToPost(Long postId) {
        if (postId == null) {
            return null;
        }
        Post post = new Post();
        post.setId(postId);
        return post;
    }
    @Named("commentsCount")
    public default int commentsCount(List<Comments> comments) {
        return comments != null ? comments.size() : 0;
    }
}
