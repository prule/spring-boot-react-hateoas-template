package com.example.demo.person;

import com.example.demo.common.Key;
import com.example.demo.common.PredicateBuilder;
import com.example.demo.pet.QPet;
import com.google.common.base.Strings;
import com.querydsl.core.types.Predicate;
import lombok.Data;

@Data
public class PersonSearchCriteria {

    private String filter;

    public Predicate toPredicate() {
        QPerson qPerson = QPerson.person;
        PredicateBuilder builder = new PredicateBuilder();

        builder.and(filter, () ->
                qPerson.name.firstName.containsIgnoreCase(filter)
                        .or(qPerson.name.lastName.containsIgnoreCase(filter))
                        .or(qPerson.name.otherNames.containsIgnoreCase(filter))
        );

        return builder.toPredicate();
    }
}
