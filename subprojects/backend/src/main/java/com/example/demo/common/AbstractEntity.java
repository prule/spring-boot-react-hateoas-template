package com.example.demo.common;

import lombok.Getter;

import javax.persistence.Basic;
import javax.persistence.Embedded;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

@MappedSuperclass
public class AbstractEntity {

    @Basic @Getter @Embedded private Key key;
    @Basic @Getter @Version private long version;

    public AbstractEntity() {
        this.key = new Key();
    }

    public AbstractEntity(Key key) {
        this.key = key;
    }

}
