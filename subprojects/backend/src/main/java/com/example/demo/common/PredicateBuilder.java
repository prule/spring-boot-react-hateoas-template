package com.example.demo.common;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

public class PredicateBuilder {

    private BooleanBuilder builder;

    public PredicateBuilder() {
        builder = new BooleanBuilder();
    }

    public void and(boolean include, Expression expression) {
        if (include) {
            builder.and(expression.build());
        }
    }

    public Predicate toPredicate() {
        return builder;
    }

}
