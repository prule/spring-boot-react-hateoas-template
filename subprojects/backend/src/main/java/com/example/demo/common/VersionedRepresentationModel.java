package com.example.demo.common;

import com.example.demo.person.Person;
import com.example.demo.user.AuthenticatedUser;
import com.example.demo.user.UserGroup;
import org.hibernate.dialect.lock.OptimisticEntityLockException;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;

public abstract class VersionedRepresentationModel<T extends RepresentationModel<? extends T>> extends RepresentationModel<T> {

    public void checkVersion(Person model) {
        if (model.getVersion() != this.getVersion()) {
            throw new OptimisticEntityLockException(model, "Concurrent edit detected");
        }
    }

    public T add(UserGroup.Group group, Link link) {
        final AuthenticatedUser user = AuthenticatedUser.getInstance();
        if (user != null && user.hasGroup(group)) {
            return add(link);
        }
        return null;
    }

    public abstract long getVersion();
}
