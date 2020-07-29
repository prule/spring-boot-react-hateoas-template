package com.example.demo.pet;

import com.example.demo.common.Fields;
import com.example.demo.person.PersonResource;
import lombok.Getter;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDate;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Getter
class PetResource extends RepresentationModel<PetResource> {

    private String key;
    private long version;

    private PetName name;
    private LocalDate dateOfBirth;
    private PersonResource owner;

    PetResource fromModel(Pet model, Fields fields) {

        key = model.getKey().getKey();
        version = model.getVersion();

        fields.set("name", () -> name = model.getName());
        fields.set("dateOfBirth", () -> dateOfBirth = model.getDateOfBirth());

        fields.setNested("owner", model.getOwner(), (m, f) -> owner = new PersonResource().fromModel(m, f));

        add(linkTo(methodOn(PetApi.class).find(model.getKey().getKey(), null)).withSelfRel());
        add(linkTo(methodOn(PetApi.class).update(model.getKey().getKey(), null, null)).withRel("update"));

        return this;
    }

    void toModel(Pet model) {

        model.setName(name);
        model.setDateOfBirth(dateOfBirth);

    }

}
