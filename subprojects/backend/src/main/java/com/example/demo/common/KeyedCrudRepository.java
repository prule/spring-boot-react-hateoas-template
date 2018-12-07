package com.example.demo.common;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface KeyedCrudRepository<T, ID> extends CrudRepository<T, ID> {

    Optional<T> findByKey(Key key);

}
