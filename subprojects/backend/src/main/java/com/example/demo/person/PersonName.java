package com.example.demo.person;

import lombok.Getter;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Embeddable
@Getter
public class PersonName {

    @NotBlank private String firstName;
    @NotBlank private String lastName;
    private String otherNames;

    public PersonName() {
    }

    public PersonName(String firstName, String lastName, String otherNames) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.otherNames = otherNames;
    }

}
