package com.example.demo.pet;

import lombok.Getter;

import javax.persistence.Basic;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Embeddable
public class PetName {

    @NotBlank @Basic @Getter private String name;

    PetName() {
    }

    public PetName(String name) {
        this.name = name;
    }

}
