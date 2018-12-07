package com.example.demo.person;

import com.example.demo.common.Address;
import com.example.demo.pet.PetApi;
import lombok.Getter;
import org.springframework.hateoas.ResourceSupport;

import java.util.Date;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Getter
public class PersonResource extends ResourceSupport {

    private String key;
    private PersonName name;
    private Address address;
    private Date dateOfBirth;

    public PersonResource fromModel(Person model) {

        key = model.getKey().getKey();
        name = model.getName();
        address = model.getAddress();
        dateOfBirth = model.getDateOfBirth();

        add(linkTo(methodOn(PersonApi.class).find(model.getKey().getKey())).withSelfRel());
        add(linkTo(methodOn(PersonApi.class).update(model.getKey().getKey(), null)).withRel("update"));
        add(linkTo(methodOn(PetApi.class).create(null)).withRel("pet-create"));

        return this;

    }

    void toModel(Person model) {

        model.setName(getName());
        model.setAddress(getAddress());
        model.setDateOfBirth(getDateOfBirth());

    }

}
