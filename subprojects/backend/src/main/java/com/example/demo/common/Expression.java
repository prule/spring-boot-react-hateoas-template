package com.example.demo.common;

import com.querydsl.core.types.Predicate;

@FunctionalInterface
public interface Expression {
    Predicate build();
}
