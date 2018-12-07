package com.example.demo.common;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.util.UUID;

@Embeddable
public class Key {

    @Getter private String key;

    public Key() {
        key = clean(UUID.randomUUID().toString());
    }

    public Key(String key) {
        this.key = key;
    }

    private String clean(String key) {
        return key.replace("-", "");
    }

}
