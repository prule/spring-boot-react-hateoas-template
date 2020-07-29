package com.example.demo.person;

import com.example.demo.common.Address;
import com.example.demo.common.Fields;
import com.example.demo.common.VersionedRepresentationModel;
import com.example.demo.pet.PetApi;
import com.example.demo.user.UserGroup;
import lombok.Getter;
import org.springframework.http.HttpMethod;

import java.time.LocalDate;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@Getter
public class PersonResource extends VersionedRepresentationModel<PersonResource> {

    private String key;
    private long version;

    private PersonName name;
    private Address address;
    private LocalDate dateOfBirth;

    public PersonResource fromModel(Person model, Fields fields) {

        // fields that will always be set, regardless of fields parameters
        key = model.getKey().getKey();
        version = model.getVersion();

        // fields dependent on fields parameters
        fields.set("name", () -> name = model.getName());
        fields.set("address", () -> address = model.getAddress());
        fields.set("dateOfBirth", () -> dateOfBirth = model.getDateOfBirth());

        // links
        add(linkTo(methodOn(PersonApi.class).find(model.getKey().getKey(), null)).withSelfRel().withType(HttpMethod.GET.name()));
        add(linkTo(methodOn(PetApi.class).search(null, null, null, null)).withRel("pet-search").withType(HttpMethod.GET.name()));

        add(UserGroup.Group.ADMIN, linkTo(methodOn(PetApi.class).create(null, null)).withRel("pet-create").withType(HttpMethod.POST.name()));
        add(UserGroup.Group.ADMIN, linkTo(methodOn(PersonApi.class).update(model.getKey().getKey(), null, null)).withRel("update").withType(HttpMethod.PUT.name()));

        return this;

    }

    void toModel(Person model) {

        checkVersion(model);

        model.setName(getName());
        model.setAddress(getAddress());
        model.setDateOfBirth(getDateOfBirth());

    }

}
