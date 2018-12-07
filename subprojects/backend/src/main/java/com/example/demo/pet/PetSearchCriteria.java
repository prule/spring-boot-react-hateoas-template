package com.example.demo.pet;

import com.example.demo.common.Key;
import com.example.demo.common.PredicateBuilder;
import com.google.common.base.Strings;
import com.querydsl.core.types.Predicate;
import lombok.Data;

@Data
public class PetSearchCriteria {

    private String personKey;

    public Predicate toPredicate() {
        QPet qPet = QPet.pet;
        PredicateBuilder builder = new PredicateBuilder();

        builder.and(!Strings.isNullOrEmpty(personKey), () -> qPet.owner.key.eq(new Key(personKey)));

        return builder.toPredicate();
    }
}
