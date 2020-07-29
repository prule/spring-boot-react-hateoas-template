package com.example.demo.person;

import com.example.demo.common.PredicateBuilder;
import com.querydsl.core.types.Predicate;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;

@Data
public class PersonSearchCriteria {

    private String filter;
    private Integer from;
    private Integer to;

    public Predicate toPredicate() {
        QPerson qPerson = QPerson.person;
        PredicateBuilder builder = new PredicateBuilder();

        builder
          .and(filter, () ->
            qPerson.name.firstName.containsIgnoreCase(filter)
              .or(qPerson.name.lastName.containsIgnoreCase(filter))
              .or(qPerson.name.otherNames.containsIgnoreCase(filter))
          )
          .and(from != null, () ->
            qPerson.dateOfBirth.after(LocalDate.of(from, 1, 1))
          )
          .and(to != null, () ->
            qPerson.dateOfBirth.before(LocalDate.of(to + 1, 1, 1))
          )
        ;

        return builder.toPredicate();
    }
}
