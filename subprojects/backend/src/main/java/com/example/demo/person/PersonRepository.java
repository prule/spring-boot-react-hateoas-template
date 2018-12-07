package com.example.demo.person;

import com.example.demo.common.Key;
import com.example.demo.common.KeyedCrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PersonRepository extends KeyedCrudRepository<Person, Long> {

    Optional<Person> findOneByKey(Key key);

    Page<Person> findAll(Pageable pageable);

}
