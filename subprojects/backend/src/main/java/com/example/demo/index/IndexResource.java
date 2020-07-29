package com.example.demo.index;

import com.example.demo.person.PersonApi;
import com.example.demo.pet.PetApi;
import com.example.demo.user.AuthenticationApi;
import lombok.Getter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.HttpMethod;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Getter
public class IndexResource extends RepresentationModel<IndexResource> {

    public IndexResource() {

        // public links that don't require login

        add(linkTo(methodOn(AuthenticationApi.class).login( null))
            .withRel("login")
            .withType(HttpMethod.POST.name()));

        add(linkTo(methodOn(AuthenticationApi.class).me())
            .withRel("user-me")
            .withType(HttpMethod.GET.name()));

    }

}
