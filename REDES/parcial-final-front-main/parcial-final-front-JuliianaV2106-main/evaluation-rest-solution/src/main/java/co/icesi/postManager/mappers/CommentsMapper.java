package co.icesi.postManager.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import co.icesi.postManager.dtos.CommentsDto;
import co.icesi.postManager.dtos.CommentsDtoIn;
import co.icesi.postManager.model.Comments;

@Mapper(componentModel = "spring", uses = { PostMapper.class })
public interface CommentsMapper {

    @Mappings({
            @Mapping(source = "user", target = "user"),
            @Mapping(source = "post", target = "postId", qualifiedByName = "postToLong")
    })
    @Named("commentsToCommentsDto")
    CommentsDto commentsToCommentsDto(Comments comments);

    @Mappings({
            @Mapping(source = "userId", target = "user", qualifiedByName = "longToUser"),
            @Mapping(target = "post", ignore = true),
            @Mapping(target = "createdAt", ignore = true) 
    })
    Comments commentsDtoInToComments(CommentsDtoIn dto);

}
