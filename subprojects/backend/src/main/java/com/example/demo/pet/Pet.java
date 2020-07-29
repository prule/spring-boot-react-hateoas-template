package com.example.demo.pet;

import com.example.demo.common.AbstractEntity;
import com.example.demo.common.Key;
import com.example.demo.person.Person;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Date;

@Entity
public class Pet extends AbstractEntity<String> {

    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    @Getter @Setter @Embedded @Valid private PetName name;

    @Basic @Getter @Setter private LocalDate dateOfBirth;

    @ManyToOne @Getter @Setter private Person owner;

    Pet() {
        super();
    }

    public Pet(Key key, PetName name) {
        super(key);
        this.name = name;
    }
}
