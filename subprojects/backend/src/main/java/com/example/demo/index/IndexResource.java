package com.example.demo.index;

import com.example.demo.person.PersonApi;
import com.example.demo.pet.PetApi;
import com.example.demo.user.AuthenticationApi;
import lombok.Getter;
import org.springframework.hateoas.ResourceSupport;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Getter
public class IndexResource extends ResourceSupport {

    public IndexResource() {

        add(linkTo(methodOn(AuthenticationApi.class).login( null)).withRel("login"));

        add(linkTo(methodOn(PersonApi.class).search(null, null)).withRel("person-search"));
        add(linkTo(methodOn(PersonApi.class).find(null)).withRel("person-find"));

        add(linkTo(methodOn(PetApi.class).search(null,null, null)).withRel("pet-search"));
        add(linkTo(methodOn(PetApi.class).find(null)).withRel("pet-find"));
        add(linkTo(methodOn(PetApi.class).create(null)).withRel("pet-create"));

    }

}
