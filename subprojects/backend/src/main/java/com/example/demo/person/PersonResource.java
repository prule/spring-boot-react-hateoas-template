package com.example.demo.person;

import com.example.demo.common.Address;
import com.example.demo.pet.PetApi;
import lombok.Getter;
import org.springframework.hateoas.LinkRelation;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.HttpMethod;

import java.util.Date;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@Getter
public class PersonResource extends RepresentationModel<PersonResource> {

    private String key;
    private PersonName name;
    private Address address;
    private Date dateOfBirth;

    public PersonResource fromModel(Person model) {

        key = model.getKey().getKey();
        name = model.getName();
        address = model.getAddress();
        dateOfBirth = model.getDateOfBirth();

        add(linkTo(methodOn(PersonApi.class).find(model.getKey().getKey())).withSelfRel().withType(HttpMethod.GET.name()));
        add(linkTo(methodOn(PersonApi.class).update(model.getKey().getKey(), null)).withRel("update").withType(HttpMethod.PUT.name()));
        add(linkTo(methodOn(PetApi.class).create(null)).withRel("pet-create").withType(HttpMethod.POST.name()));

        return this;

    }

    void toModel(Person model) {

        model.setName(getName());
        model.setAddress(getAddress());
        model.setDateOfBirth(getDateOfBirth());

    }

}
