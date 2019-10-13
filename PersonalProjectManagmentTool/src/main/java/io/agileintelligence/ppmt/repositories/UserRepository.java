package io.agileintelligence.ppmt.repositories;

import io.agileintelligence.ppmt.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

    User findByUserName(String username);
    User getById(Long id);
}
