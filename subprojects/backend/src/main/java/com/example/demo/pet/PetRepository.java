package com.example.demo.pet;

import com.example.demo.common.Key;
import com.example.demo.common.KeyedCrudRepository;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface PetRepository extends KeyedCrudRepository<Pet, Long>, QuerydslPredicateExecutor<Pet> {

    Optional<Pet> findByKey(Key key);

    Page<Pet> findAll(Predicate predicate, Pageable pageable);

}
