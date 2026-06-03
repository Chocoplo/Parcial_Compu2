package co.icesi.postManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import co.icesi.postManager.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);
    
}
