package com.example.demo.common;

import com.example.demo.person.Person;
import org.hibernate.dialect.lock.OptimisticEntityLockException;
import org.springframework.hateoas.RepresentationModel;

public abstract class VersionedRepresentationModel<T extends RepresentationModel<? extends T>> extends RepresentationModel<T> {

    public void checkVersion(Person model) {
        if (model.getVersion() != this.getVersion()) {
            throw new OptimisticEntityLockException(model, "Concurrent edit detected");
        }
    }

    public abstract long getVersion();
}
