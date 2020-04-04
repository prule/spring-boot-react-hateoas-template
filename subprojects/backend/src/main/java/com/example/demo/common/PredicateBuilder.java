package com.example.demo.common;

import com.google.common.base.Strings;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

public class PredicateBuilder {

    private BooleanBuilder builder;

    public PredicateBuilder() {
        builder = new BooleanBuilder();
    }

    public PredicateBuilder and(boolean include, Expression expression) {
        if (include) {
            builder.and(expression.build());
        }
        return this;
    }

    public PredicateBuilder and(String value, Expression expression) {
        if (!Strings.isNullOrEmpty(value)) {
            builder.and(expression.build());
        }
        return this;
    }

    public Predicate toPredicate() {
        return builder;
    }

}
