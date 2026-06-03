package co.icesi.postManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.icesi.postManager.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
