package com.example.demo.common;

import com.google.common.base.Splitter;

import java.util.List;
import java.util.stream.Collectors;

public class Fields {

    private static final String ALL = "*";
    private static final String NESTED_SEPARATOR = ".";

    private final List<String> fields;

    public Fields(String fields) {
        this.fields = Splitter.on(",").splitToList(fields == null ? ALL : fields);
    }

    private Fields(List<String> fields) {
        this.fields = fields;
    }

    public Fields set(String fieldName, Runnable setFunction) {
        if (hasField(fieldName)) {
            setFunction.run();
        }
        return this;
    }

    public Fields setNested(String fieldName, Runnable setFunction) {
        if (hasNestedField(fieldName)) {
            setFunction.run();
        }
        return this;
    }

    public boolean hasField(String fieldName) {
        return (!isNested(fieldName) && this.fields.contains(ALL)) || this.fields.contains(fieldName);
    }

    public boolean hasNestedField(String fieldName) {
        return fields.stream().anyMatch(name -> name.startsWith(fieldName + NESTED_SEPARATOR));
    }

    private boolean isNested(String fieldName) {
        return fieldName.contains(NESTED_SEPARATOR);
    }

    public Fields from(String path) {
        final String prefix = path + NESTED_SEPARATOR;
        final List<String> subset = fields.stream()
            .filter(name -> {
                return name.startsWith(prefix);
            })
            .map(name -> name.substring(prefix.length()))
            .collect(Collectors.toList());
        return new Fields(subset);
    }

    public static Fields all() {
        return new Fields(ALL);
    }

}
