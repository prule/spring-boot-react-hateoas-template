package com.example.demo.user;

import com.example.demo.common.KeyedCrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends KeyedCrudRepository<User, Long> {

    Page<User> findAll(Pageable pageable);

    User findByUsername(String username);
}
