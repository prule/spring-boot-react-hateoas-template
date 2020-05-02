package com.example.demo.user;

import com.example.demo.person.Person;
import com.example.demo.person.PersonApi;
import com.example.demo.pet.PetApi;
import lombok.Getter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.http.HttpMethod;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Getter
public class UserResource extends RepresentationModel<UserResource> {

    private String key;
    private String username;

    private String firstName;
    private String lastName;

    private boolean enabled;

    public UserResource fromModel(User model) {

        key = model.getKey().getKey();
        username = model.getUsername();

        firstName = model.getFirstName();
        lastName = model.getLastName();

        enabled = model.isEnabled();

        // user specific links

        add(linkTo(methodOn(PersonApi.class).search(null, null, null)).withRel("person-search").withType(HttpMethod.GET.name()));
        add(linkTo(methodOn(PersonApi.class).find(null)).withRel("person-find").withType(HttpMethod.GET.name()));

        add(linkTo(methodOn(PetApi.class).search(null, null, null)).withRel("pet-search").withType(HttpMethod.GET.name()));
        add(linkTo(methodOn(PetApi.class).find(null)).withRel("pet-find").withType(HttpMethod.GET.name()));
        add(linkTo(methodOn(PetApi.class).create(null)).withRel("pet-create").withType(HttpMethod.POST.name()));

        return this;

    }

    void toModel(User model) {

        final AuthenticatedUser user = AuthenticatedUser.getInstance();

        if (user.hasGroup(UserGroup.Group.ADMIN) || user.is(model.getUsername())) {

            // user settable fields
            model.setFirstName(this.getFirstName());
            model.setLastName(this.getLastName());

            // restricted fields
            if (user.hasGroup(UserGroup.Group.ADMIN)) {
                model.setEnabled(this.isEnabled());
            }

        }
    }
}
