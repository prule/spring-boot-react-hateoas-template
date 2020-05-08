package com.example.demo.common;

import com.sun.istack.NotNull;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Date;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class AbstractEntity<U> {

    @NotNull  @Getter @Embedded private Key key;
    @Basic @Getter @Version private long version;
    @CreatedDate private ZonedDateTime createdDate;
    @LastModifiedDate private ZonedDateTime lastModifiedDate;
    @CreatedBy private U createdBy;
    @LastModifiedBy private U lastModifiedBy;

    public AbstractEntity() {
        this.key = new Key();
    }

    public AbstractEntity(Key key) {
        this.key = key;
    }

}
