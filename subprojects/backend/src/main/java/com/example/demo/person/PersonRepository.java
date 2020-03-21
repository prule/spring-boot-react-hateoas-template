package com.example.demo.person;

import com.example.demo.common.Key;
import com.example.demo.common.KeyedCrudRepository;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface PersonRepository extends KeyedCrudRepository<Person, Long>, PagingAndSortingRepository<Person, Long>, QuerydslPredicateExecutor<Person> {

    Optional<Person> findOneByKey(Key key);

    Page<Person> findAll(Predicate predicate, Pageable pageable);

}
