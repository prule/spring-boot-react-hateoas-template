package com.example.demo.pet;

import com.example.demo.person.PersonResource;
import lombok.Getter;
import org.springframework.hateoas.ResourceSupport;

import java.util.Date;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Getter
class PetResource extends ResourceSupport {

    private String key;
    private PetName name;
    private Date dateOfBirth;
    private PersonResource owner;

    PetResource fromModel(Pet model) {

        key = model.getKey().getKey();
        name = model.getName();
        dateOfBirth = model.getDateOfBirth();

        owner = model.getOwner() != null ? new PersonResource().fromModel(model.getOwner()) : null;

        add(linkTo(methodOn(PetApi.class).find(model.getKey().getKey())).withSelfRel());
        add(linkTo(methodOn(PetApi.class).update(model.getKey().getKey(), null)).withRel("update"));

        return this;
    }

    void toModel(Pet model) {

        model.setName(name);
        model.setDateOfBirth(dateOfBirth);

    }

}
