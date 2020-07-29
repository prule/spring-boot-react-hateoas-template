package com.example.demo.support;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class QueryParams {
    private final Map<String, ?> map;

    public QueryParams(Object obj) {
        this.map = new ObjectMapper().convertValue(obj, Map.class);
    }

    public Map<String, ?> asMap() {
        return this.map;
    }
}
